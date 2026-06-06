import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

// Spots selected for premium upgrade:
// - Tokyo: hidden urban nature + atmospheric alleys
// - Osaka: UNESCO burial mounds + hidden lantern alley
// - Kanagawa: multi-temple trail + coastal walk
// - Hiroshima: remote gorge + preserved fishing village + merchant town
// - Aichi: open-air architecture museum + pottery capital
// - Hyogo: "Japan's Machu Picchu" + traditional onsen town + rural castle town
// - Okinawa: remote island jungle + westernmost island (underwater ruins) + preserved Ryukyu village + UNESCO forest
// - Fukuoka: scenic peninsula + dramatic sea cave + UNESCO island shrine

const premiumIds = [
  // Tokyo (0 → 3)
  'todoroki-valley',       // hidden river valley gorge inside Tokyo
  'kagurazaka',            // atmospheric French-Japanese alleys, geisha history
  'hamarikyu-gardens',     // tidal garden surrounded by skyscrapers

  // Osaka (0 → 3)
  'hozenji-yokocho',       // moss-covered lantern alley, centuries-old atmosphere
  'sakai-mounded-tombs',   // UNESCO giant keyhole burial mounds, rarely visited
  'expo70-park',           // Tower of the Sun, retro future landmark

  // Kanagawa (0 → 2)
  'kamakura-temples-trail', // multi-temple hiking trail through cedar forest
  'miura-peninsula',        // scenic coastal walk, fishermen's coves

  // Hiroshima (0 → 3)
  'sandankyo-gorge',        // remote emerald gorge, seasonal foliage
  'tomonoura',              // ancient fishing port, inspired Studio Ghibli's Ponyo
  'takehara',               // perfectly preserved Edo-era merchant townscape

  // Aichi (0 → 2)
  'meiji-mura',             // open-air museum of Meiji architecture
  'seto-city-ceramics',     // kiln-dotted pottery capital, artisan workshops

  // Hyogo (0 → 3)
  'takeda-castle-ruins',    // "Japan's Machu Picchu", cloud-sea views
  'kinosaki-onsen',         // 7-bathhouse onsen town, traditional yukata culture
  'tamba-sasayama',         // quiet castle town, black-bean cuisine

  // Okinawa (1 → 5)
  'iriomote-island',        // 90% jungle, mangrove kayaking, UNESCO
  'yonaguni-island',        // Japan's westernmost point, mysterious underwater ruins
  'taketomi-island',        // buffalo carts, pristine Ryukyu village, star sand
  'yanbaru-national-park',  // UNESCO biosphere, Yambaru kuina endemic bird

  // Fukuoka (1 → 4)
  'itoshima-peninsula',     // dramatic sea pillars, local farm restaurants
  'keya-no-oto-cave',       // largest sea cave in western Japan
  'munakata-taisha',        // UNESCO island shrine, forbidden inner island
];

console.log(`Updating ${premiumIds.length} spots to is_premium = true...\n`);

const { data, error } = await supabase
  .from('spots')
  .update({ is_premium: true })
  .in('id', premiumIds)
  .select('id, name, prefecture');

if (error) {
  console.error('Error:', error);
  process.exit(1);
}

console.log(`✅ Updated ${data.length} spots:\n`);

const byPref = {};
for (const s of data) {
  if (!byPref[s.prefecture]) byPref[s.prefecture] = [];
  byPref[s.prefecture].push(s.name);
}

for (const [pref, names] of Object.entries(byPref).sort()) {
  console.log(`${pref} (+${names.length}):`);
  for (const n of names) console.log(`  • ${n}`);
}
