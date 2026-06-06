-- seed-akita-extra.sql
-- 秋田県スポット追加: 5件
-- Akita Kanto Festival / Shirakami-Sanchi / Kiritanpo / Inaniwa Udon / Kubota Castle Ruins

INSERT INTO spots (
  id, name, prefecture, region, categories, description,
  address, lat, lng, image_url, tags, is_premium,
  highlights, best_season, access, admission, duration,
  website_url, opening_hours, tips
) VALUES
(
  'akita-kanto-festival',
  'Akita Kanto Festival',
  'Akita',
  'tohoku',
  ARRAY['activity'],
  'The Akita Kanto Festival, held every August, is one of the great summer festivals of Tohoku and a designated Important Intangible Folk Cultural Property of Japan. Performers balance towering bamboo poles hung with dozens of glowing paper lanterns — some poles reaching 12 metres and weighing 50 kilograms — on their foreheads, shoulders, lower backs, and even hips. The sight of thousands of lanterns swaying against the night sky is genuinely breathtaking. Each evening, the main boulevard fills with performers and spectators, and the collective skill on display has been refined over 270 years.',
  'Kanto-odori, Akita, Akita',
  39.7186, 140.1023,
  'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&auto=format&fit=crop&q=80',
  ARRAY['kanto festival', 'lanterns', 'summer festival', 'akita', 'tohoku', 'traditional', 'august'],
  true,
  ARRAY[
    'Towering bamboo poles with up to 46 paper lanterns balanced on one performer''s body.',
    'One of Tohoku''s three great summer festivals, with 270 years of history.',
    'Evening performances line the main boulevard for four consecutive nights in early August.',
    'Daytime workshops allow visitors to try balancing a kanto pole themselves.'
  ],
  'Early August (festival dates: 3–6 August)',
  '10-minute walk from Akita Station (JR Akita Shinkansen). The main venue is Kanto-odori boulevard in central Akita.',
  'Free (street viewing); grandstand seats ¥600',
  '2–3 hours',
  'https://www.kantou.gr.jp',
  'Evening performances: 19:05–21:00 (3–6 August); daytime event: 10:00–16:00 (4–5 August)',
  'Arrive by 18:30 to secure a good street-side viewing spot. The grandstand seats (¥600) offer an elevated view and are worth booking in advance. The daytime workshop on 4–5 August lets you try the pole — highly recommended.'
),
(
  'shirakami-sanchi',
  'Shirakami-Sanchi World Heritage Forest',
  'Akita',
  'tohoku',
  ARRAY['nature'],
  'Shirakami-Sanchi is a vast mountain range straddling Akita and Aomori prefectures, home to the largest remaining primeval beech forest in East Asia and a UNESCO World Heritage Site since 1993. The core zone is entirely untouched by human development, and the ancient beech trees — some over 400 years old — create a cathedral-like canopy that filters light in extraordinary ways. Trails lead to emerald-green lakes, including the famous Juniko lakes, and the forest hosts rare wildlife including golden eagles and black bears. The autumn foliage, when the beech turns amber and gold, is among the most spectacular in Japan.',
  'Fujisato, Yamamoto-gun, Akita',
  40.4667, 140.1833,
  'https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?w=800&auto=format&fit=crop&q=80',
  ARRAY['UNESCO', 'beech forest', 'world heritage', 'nature', 'hiking', 'autumn foliage', 'shirakami'],
  true,
  ARRAY[
    'UNESCO World Heritage primeval beech forest — the largest in East Asia.',
    'Juniko lakes offer stunning emerald-green water surrounded by ancient trees.',
    'Autumn foliage (October) transforms the forest into a blaze of amber and gold.',
    'Home to golden eagles, black bears, and numerous other protected species.'
  ],
  'May–June (fresh green), October–November (autumn foliage)',
  'From Akita Station, take the JR Gono Line to Juniko Station (approx. 2.5 hours). The Juniko trail area is a 20-minute walk from the station. A rental car from Akita is recommended for accessing remote trail areas.',
  'Free (some trail areas require a forest management fee of ¥500)',
  '3–6 hours (depending on trail)',
  'https://shirakami-sanchi.net',
  'May–November (trails open; core zone closed in winter)',
  'The Juniko lakes loop trail (3.3 km) is the most accessible entry point and takes about 90 minutes. Bring waterproof footwear — the forest floor stays damp. Visit on a weekday to avoid crowds at the most photographed lake, Aoike.'
),
(
  'akita-kiritanpo',
  'Kiritanpo — Akita''s Hearth Dish',
  'Akita',
  'tohoku',
  ARRAY['food'],
  'Kiritanpo is Akita''s most beloved regional dish — cylindrical rice cakes made by wrapping cooked rice around cedar skewers, grilling them over charcoal, then simmering in a richly flavoured chicken broth with burdock root, maitake mushrooms, and green onions. The result is a warming, deeply comforting nabe (hot pot) that has sustained people through Akita''s long, cold winters for centuries. Originally a hunters'' mountain food, kiritanpo nabe is now the defining dish of the prefecture and is available throughout Akita city from autumn through spring.',
  'Central Akita, Akita',
  39.7180, 140.1028,
  'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=800&auto=format&fit=crop&q=80',
  ARRAY['kiritanpo', 'nabe', 'hot pot', 'akita', 'local cuisine', 'food', 'winter'],
  false,
  ARRAY[
    'Rice cakes grilled on cedar skewers then simmered in rich chicken and dashi broth.',
    'Akita''s most iconic local dish, with roots in mountain hunters'' cuisine.',
    'Served with burdock, maitake mushrooms, and green onions for deep umami flavour.',
    'Many restaurants near Akita Station offer kiritanpo nabe sets from ¥1,500.'
  ],
  'October–March (peak season; available year-round at specialist restaurants)',
  '5–10 minute walk from Akita Station. Several dedicated kiritanpo restaurants are clustered in the Omachi and Naka-dori areas of central Akita.',
  '¥1,500–¥3,000 per person (set meal)',
  '1–2 hours',
  '',
  '11:30–14:00, 17:00–22:00 (varies by restaurant)',
  'Order the full nabe set rather than a single skewer to appreciate the dish properly. Restaurants get busy on autumn and winter evenings — reserve ahead. The grilled skewer (miso-dare variety) sold at markets is also delicious as a street snack.'
),
(
  'inaniwa-udon',
  'Inaniwa Udon — Silken Noodles of Akita',
  'Akita',
  'tohoku',
  ARRAY['food'],
  'Inaniwa udon, produced in the small village of Inaniwa in southern Akita, is one of Japan''s three great udon styles and has been made by hand using the same technique for over 350 years. Unlike the thick, chewy udon of Kagawa, Inaniwa noodles are thin, flat, and silky smooth, with a delicate bite that feels almost refined. The noodles are hand-stretched and dried over several days without machines. Eating them in their home region — hot in a light dashi broth or chilled in summer — is a markedly different experience from packaged versions sold elsewhere in Japan.',
  'Inaniwa, Yuzawa, Akita',
  39.1420, 140.5580,
  'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=800&auto=format&fit=crop&q=80',
  ARRAY['inaniwa udon', 'noodles', 'akita', 'local cuisine', 'food', 'traditional', 'handmade'],
  false,
  ARRAY[
    'One of Japan''s three great udon styles — hand-stretched and dried over several days.',
    'Silky, flat noodles with a delicate texture unlike any other udon in Japan.',
    'Over 350 years of unbroken production in Inaniwa village.',
    'Best eaten fresh at a local restaurant, where the quality far exceeds packaged versions.'
  ],
  'Year-round',
  'From Akita Station, take the JR Ou Line to Yuzawa Station (approx. 1 hour), then a local bus or taxi to Inaniwa (approx. 30 minutes). Alternatively, drive from Akita (approx. 1.5 hours via the Akita Expressway).',
  '¥1,000–¥2,000 per person',
  '1–2 hours',
  'https://www.inaniwa-udon.co.jp',
  '11:00–15:00 (main restaurants; check individual hours)',
  'The Sato Yosuke main restaurant in Inaniwa is the most famous and tends to have queues on weekends. Arrive before opening or visit on a weekday. Take home a boxed set — the dried noodles keep well and make an excellent souvenir.'
),
(
  'kubota-castle-ruins',
  'Kubota Castle Ruins (Senshu Park)',
  'Akita',
  'tohoku',
  ARRAY['history'],
  'Kubota Castle, the seat of the Satake clan who ruled the Akita domain for over 260 years, stood at the heart of present-day Akita city from 1604. Unlike many Japanese castles, Kubota was deliberately built without stone walls or a keep, relying instead on earthen ramparts and water features — a reflection of the Satake clan''s political caution during the Edo period. Today the grounds form Senshu Park, one of Akita''s finest green spaces, with a reconstructed turret (Osumi-yagura) offering city views. Cherry blossoms in spring and autumn foliage make it a year-round destination for locals and visitors alike.',
  'Senshu Park, Chuo, Akita, Akita',
  39.7194, 140.1031,
  'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&auto=format&fit=crop&q=80',
  ARRAY['kubota castle', 'history', 'samurai', 'akita', 'senshu park', 'satake clan', 'cherry blossom'],
  false,
  ARRAY[
    'Seat of the Satake clan for 260+ years — one of Japan''s few castles built without a stone keep.',
    'Reconstructed Osumi-yagura turret with panoramic views over Akita city.',
    'Senshu Park is one of Japan''s top 100 cherry blossom viewing spots.',
    'Adjacent Akita Museum of Art houses the world''s largest canvas painting by Ikuo Hirayama.'
  ],
  'April–May (cherry blossoms), October–November (autumn foliage)',
  '15-minute walk from Akita Station (JR Akita Shinkansen). The park entrance is on the east side of the castle grounds.',
  'Free (park); Osumi-yagura turret ¥100',
  '1–2 hours',
  'https://www.city.akita.lg.jp',
  'Park: open 24 hours; Osumi-yagura: 9:00–16:30 (closed in winter)',
  'Combine with the Akita Museum of Art (Hirayama World) next door for a half-day itinerary. The castle grounds are especially beautiful in late April when the cherry trees are in full bloom — arrive early to avoid weekend crowds.'
)
;
