-- blog_posts table
-- Run this in the Supabase SQL editor (Dashboard → SQL Editor)

create table if not exists blog_posts (
  id            uuid primary key default gen_random_uuid(),
  slug          text unique not null,
  title         text not null,
  description   text not null default '',
  published_at  timestamptz,
  read_minutes  int not null default 5,
  cover_image   text,
  intro         text not null default '',
  sections      jsonb not null default '[]',
  cta_heading   text not null default '',
  cta_body      text not null default '',
  related_region text,
  status        text not null default 'draft',
  created_at    timestamptz not null default now(),
  constraint blog_posts_status_check check (status in ('draft', 'published'))
);

-- RLS
alter table blog_posts enable row level security;

create policy "public can read published posts"
  on blog_posts for select
  using (status = 'published');

-- Seed: migrate existing 6 static articles (status = published)
insert into blog_posts (slug, title, description, published_at, read_minutes, cover_image, intro, sections, cta_heading, cta_body, related_region, status)
values
(
  'best-places-in-japan-beyond-tokyo',
  'Best Places in Japan Beyond Tokyo',
  'Tokyo is just the beginning. Discover the most rewarding destinations across Japan that most visitors never reach — from mountain villages to volcanic coastlines.',
  '2025-03-13 00:00:00+00',
  7,
  'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=1200&q=80',
  'Most first-time visitors to Japan spend their entire trip in Tokyo, Kyoto, and Osaka. Those cities are worth visiting — but they represent a tiny fraction of what Japan has to offer. The country has 47 prefectures, each with its own food, dialect, landscape, and character. Here are the destinations that reward the effort of going further.',
  '[
    {"heading":"Kanazawa — The Kyoto Nobody Told You About","body":"On the Sea of Japan coast, Kanazawa was one of the few major cities never bombed during World War II. The result is an intact old quarter of samurai residences, geisha districts, and teahouses that feels genuinely lived-in rather than preserved for tourism.\n\nKenroku-en, one of Japan''s three great gardens, is worth the visit alone — but the real draw is wandering the Higashi Chaya district at dusk, or finding a counter seat in the Omicho market fish hall for a bowl of fresh seafood on rice. Kanazawa is the food capital of the Hokuriku coast, and that''s a high bar. Shinkansen from Tokyo: 2.5 hours."},
    {"heading":"Yakushima — A Forest That Predates Civilisation","body":"The island of Yakushima sits off the southern tip of Kyushu, and its interior is ancient in a way that''s hard to convey in photographs. The yakusugi cedar trees — some over 3,000 years old — grow through moss-covered terrain that inspired the landscapes of Princess Mononoke. Rainfall here is measured in metres, not centimetres, which is why the forest looks the way it does.\n\nThe Jomonsugi hike, at 22km round-trip, is the main event — but the island has beaches where sea turtles nest, waterfalls that drop directly into the sea, and a handful of onsen that cost almost nothing. This is one of the few places in Japan that genuinely feels wild."},
    {"heading":"Matsumoto — A Castle Town in the Alps","body":"The Japanese Alps don''t get the attention of the Swiss or French equivalents, but the scenery is comparable and the access is far easier. Matsumoto sits at the foot of the Azumino valley and makes a practical base for both mountain and city experiences.\n\nThe centrepiece is Matsumoto Castle — jet-black and reflected in its surrounding moat, it''s the oldest surviving original castle in Japan. The old town around it has galleries, sake breweries, and craft shops that don''t feel like tourist traps. From here, the Kamikochi valley is 90 minutes by bus: glacially carved, ringed by 3,000-metre peaks, and closed to private vehicles. Late October brings foliage that competes with anything in Nikko."},
    {"heading":"Beppu — Where the Earth Is Still Boiling","body":"Beppu, on the east coast of Kyushu, produces more geothermal output than anywhere in Japan outside of Hokkaido. The city has eight geothermal zones — called the ''Hells'' — where boiling water erupts in different colours: blood red, cobalt blue, grey mud. These are not spa resorts. They''re geological phenomena that happen to be within a medium-sized Japanese city.\n\nBut Beppu is also a serious onsen town. The variety of baths is unusual even by Japanese standards — sand baths where attendants bury you to the neck, steam rooms built over vents in the ground, and rotenburo with views of Beppu Bay. It''s one of the more genuinely strange places in the country, and it rewards two nights."},
    {"heading":"Aomori — The Apple Country at the Top of Honshu","body":"Most Tohoku itineraries end in Sendai. That''s a mistake. Aomori, at the very top of Honshu, is the jumping-off point for Osorezan — a volcanic crater lake that''s been associated with the entrance to the underworld for over a thousand years — and the Shirakami-Sanchi beech forest, a UNESCO site that spans the prefecture''s mountainous interior.\n\nThe city itself is best in August, when the Nebuta festival fills the streets with enormous illuminated floats carried through the night by dancing crowds. Outside festival season, the market at Furukawa serves the best scallops you''re likely to eat anywhere, and the Aomori Museum of Art contains a Chagall stage backdrop — the largest Chagall work outside Russia — that most people in Japan don''t know exists."},
    {"heading":"The Noto Peninsula — Where Japan Slows Down","body":"The Noto Peninsula juts into the Sea of Japan from Ishikawa Prefecture, and it operates at a different pace from almost everywhere else in the country. The coastline on the western side — called the Okunoto — has cliffs, sea stacks, and small fishing villages where families have been salt-farming for centuries.\n\nNoto was severely damaged by the January 2024 earthquake, and the recovery is ongoing. Visiting now is both an act of support for local businesses and an opportunity to see a part of Japan that few international travellers ever reach. The ryokan on the coast here — old wooden buildings with seafood dinners and outdoor baths facing the water — represent a kind of slow travel that''s increasingly rare."},
    {"heading":"Naoshima — Where Art Colonised an Island","body":"The islands of the Seto Inland Sea were depopulating by the 1980s — fishing industries declining, young people leaving. Then the Benesse Foundation chose Naoshima as the site for a long-term art installation project, and the result is something that doesn''t exist anywhere else: a semi-rural island where Tadao Ando-designed museums are built into hillsides, where houses in the old fishing village have been converted into site-specific artworks, where Yayoi Kusama''s polka-dotted pumpkins sit on the end of a pier.\n\nNaoshima is 50 minutes by ferry from Takamatsu. The Chichu Art Museum alone — three Monets, a James Turrell, and a Walter De Maria, all in a building entirely below ground — is one of the most affecting experiences in Japan."},
    {"heading":"How Far to Go","body":"The destinations above are not particularly difficult to reach. Kanazawa has direct shinkansen from Tokyo and Osaka. Yakushima has flights from Kagoshima. Matsumoto is two hours from Shinjuku by limited express. Naoshima is a short ferry from the main Shikoku rail network.\n\nThe barrier is not logistics. It''s habit — the tendency to return to the same itinerary because it''s proven. Japan is unusually good at rewarding travellers who deviate from it. These places have been waiting."}
  ]'::jsonb,
  'Find the Japan that fits you',
  'Answer a few questions about what draws you to Japan — nature, history, food, or onsen — and we''ll match you with the spots that fit your style.',
  null,
  'published'
),
(
  'second-trip-to-japan',
  'Where to Go in Japan for a Second Trip',
  'Done Tokyo and Kyoto? Here''s where to go on your second visit to Japan — slower, deeper, and further off the tourist trail.',
  '2025-03-13 00:00:00+00',
  6,
  'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1200&q=80',
  'Your first trip to Japan probably followed the Golden Route — Tokyo, Hakone, Kyoto, Osaka. Maybe Hiroshima. It''s a great introduction, but Japan rewards return visits. The second trip is where it gets interesting: smaller cities, quieter landscapes, and a Japan that feels genuinely discovered rather than toured.',
  '[]'::jsonb,
  'Ready to go deeper?',
  'Tell us what you loved about your last trip — and what you want more of. We''ll find the spots that match your next chapter in Japan.',
  null,
  'published'
),
(
  'alternatives-to-kyoto',
  '10 Alternatives to Kyoto Without the Crowds',
  'Kyoto is unforgettable — and overcrowded. These 10 destinations offer the same ancient temples, castle towns, and traditional culture without the queues.',
  '2025-03-13 00:00:00+00',
  8,
  'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=1200&q=80',
  'Kyoto received over 50 million visitors in 2023. The most famous sites are genuinely beautiful — but experiencing them surrounded by tour groups and selfie sticks is a different thing entirely. Japan has dozens of cities with the same feudal history, Buddhist temples, and traditional crafts. These are the alternatives worth knowing.',
  '[]'::jsonb,
  'Find your version of old Japan',
  'History, temples, and traditional culture — there''s more of it than Kyoto. Tell us what calls to you and we''ll point you to the places that still feel discovered.',
  'kinki',
  'published'
),
(
  'hidden-gems-kyushu',
  'Best Hidden Gems in Kyushu',
  'Kyushu is Japan''s southernmost main island — volcanic, subtropical, and home to some of the country''s best onsen, food, and off-the-beaten-path landscapes.',
  '2025-03-13 00:00:00+00',
  7,
  'https://images.unsplash.com/photo-1526481280693-3bfa7568e0f3?w=1200&q=80',
  'Kyushu gets far fewer international visitors than Honshu, which is exactly why it''s worth prioritising. The island has active volcanoes, world-class onsen towns, subtropical coastline, and a food culture — built around tonkotsu ramen, fresh seafood, and shochu — that stands apart from the rest of Japan.',
  '[]'::jsonb,
  'Explore Kyushu your way',
  'Whether you''re after volcanic landscapes, onsen retreats, or coastal adventures — take the quiz and find the Kyushu spots that match your style.',
  'kyushu',
  'published'
),
(
  'hidden-gems-tohoku',
  'Best Hidden Gems in Tohoku',
  'Tohoku — Japan''s wild northeast — is one of the country''s least-visited regions. Deep mountains, ancient pilgrimage routes, and festivals unlike anything in the south.',
  '2025-03-13 00:00:00+00',
  7,
  'https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=1200&q=80',
  'Tohoku sits just north of Tokyo, but most visitors never go. That''s a mistake. The region has some of Japan''s most dramatic mountain scenery, samurai castle towns that see a fraction of Kyoto''s crowds, and summer festivals — the Nebuta in Aomori, the Tanabata in Sendai — that rank among the country''s most spectacular.',
  '[]'::jsonb,
  'Discover the real north of Japan',
  'Tohoku rewards travellers who go looking for it. Tell us what you''re after and we''ll find the hidden spots that make the journey worthwhile.',
  'tohoku',
  'published'
),
(
  'best-places-without-a-car',
  'Best Places in Japan Without a Car',
  'Japan''s train network is legendary — but some of the best destinations are far more accessible than you''d expect. Here''s where to go without renting a car.',
  '2025-03-13 00:00:00+00',
  6,
  'https://images.unsplash.com/photo-1513407030348-c983a97b98d8?w=1200&q=80',
  'One of the most common misconceptions about travel in rural Japan is that you need a car. For some destinations you do — but Japan''s train and bus network is extensive enough that many of the most rewarding off-the-beaten-path spots are reachable without one. Here''s where to focus.',
  '[]'::jsonb,
  'Plan your car-free Japan trip',
  'Tell us your interests and travel pace — we''ll match you with spots that are reachable by train or bus, and build a day-by-day itinerary around them.',
  null,
  'published'
)
on conflict (slug) do nothing;
