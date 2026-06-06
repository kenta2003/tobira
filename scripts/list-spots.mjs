import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

const targets = ['Tokyo', 'Osaka', 'Kanagawa', 'Hiroshima', 'Aichi', 'Hyogo', 'Okinawa', 'Fukuoka'];

const { data, error } = await supabase
  .from('spots')
  .select('id, name, prefecture, is_premium, categories, tags')
  .in('prefecture', targets)
  .order('prefecture')
  .order('name');

if (error) {
  console.error(error);
  process.exit(1);
}

for (const pref of targets) {
  const spots = data.filter(s => s.prefecture === pref);
  console.log(`\n=== ${pref} (${spots.length} total, ${spots.filter(s => s.is_premium).length} premium) ===`);
  for (const s of spots) {
    console.log(`  ${s.is_premium ? '[PRO]' : '     '} ${s.id}  ${s.name}  [${s.categories.join(', ')}]`);
  }
}
