import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@/lib/supabase/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { data: sub } = await supabase
    .from('subscriptions')
    .select('stripe_customer_id')
    .eq('user_id', user.id)
    .single();

  if (!sub?.stripe_customer_id || sub.stripe_customer_id === 'manual') {
    return NextResponse.json({ error: 'No Stripe subscription found' }, { status: 404 });
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

  try {
    const session = await stripe.billingPortal.sessions.create({
      customer: sub.stripe_customer_id,
      return_url: siteUrl,
    });
    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error('Stripe portal error:', err);
    return NextResponse.json({ error: 'Failed to create portal session' }, { status: 500 });
  }
}
