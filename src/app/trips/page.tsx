import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import TripsClient from '@/components/TripsClient';

export const metadata = { title: 'My Trips — tobira' };

export default async function TripsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  const adminClient = createAdminClient();
  const { data: trips } = await adminClient
    .from('saved_trips')
    .select('id, title, overview, share_token, created_at')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  return <TripsClient trips={trips ?? []} />;
}
