import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createAdminClient } from '@/lib/supabase/admin';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature');

  if (!sig || !process.env.STRIPE_WEBHOOK_SECRET || process.env.STRIPE_WEBHOOK_SECRET === 'whsec_...') {
    return NextResponse.json({ error: 'Webhook not configured' }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch {
    return NextResponse.json({ error: 'Webhook signature verification failed' }, { status: 400 });
  }

  const supabase = createAdminClient();

  const syncSubscription = async (subscription: Stripe.Subscription) => {
    const customerId = subscription.customer as string;
    const customerResult = await stripe.customers.retrieve(customerId);
    if (customerResult.deleted) return;

    const userId = customerResult.metadata?.supabase_user_id;
    if (!userId) {
      console.error('syncSubscription: supabase_user_id not found in customer metadata', customerId);
      return;
    }

    // current_period_end may be missing or moved in newer API versions
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const rawSub = subscription as any;
    const periodEndTs: number | undefined = rawSub.current_period_end;
    const current_period_end = periodEndTs
      ? new Date(periodEndTs * 1000).toISOString()
      : null;

    const { error } = await supabase.from('subscriptions').upsert({
      user_id: userId,
      stripe_customer_id: customerId,
      stripe_subscription_id: subscription.id,
      status: subscription.status,
      current_period_end,
    });

    if (error) {
      console.error('syncSubscription: Supabase upsert failed', error);
      throw error;
    }
  };

  if (
    event.type === 'customer.subscription.created' ||
    event.type === 'customer.subscription.updated'
  ) {
    await syncSubscription(event.data.object as Stripe.Subscription);
  }

  if (event.type === 'customer.subscription.deleted') {
    const subscription = event.data.object as Stripe.Subscription;
    await supabase
      .from('subscriptions')
      .update({ status: 'canceled' })
      .eq('stripe_subscription_id', subscription.id);
  }

  return NextResponse.json({ received: true });
}
