-- seed-fukushima-extra.sql
-- 福島県スポット追加: 5件
-- Shiramizu Amidado / Aquamarine Fukushima / Abukuma Cave / Bandai-Azuma Skyline / Fruits Line

INSERT INTO spots (
  id, name, prefecture, region, categories, description,
  address, lat, lng, image_url, tags, is_premium,
  highlights, best_season, access, admission, duration,
  website_url, opening_hours, tips
) VALUES
(
  'shiramizu-amidado',
  'Shiramizu Amidado Temple',
  'Fukushima',
  'tohoku',
  ARRAY['spiritual'],
  'Shiramizu Amidado is a small Amida hall dating from 1160, the only National Treasure building in Fukushima Prefecture and one of the finest surviving examples of Heian-period Buddhist architecture in Tohoku. The hall''s gilded Amida triad and four flanking bodhisattvas are preserved in remarkable condition, while the surrounding Pure Land garden — centred on a lotus pond — evokes the Buddhist paradise with quiet grace. In summer, the lotus flowers bloom in spectacular profusion around the hall; in autumn, ginkgo and maple trees frame the structure in gold and red. Located in Iwaki, the temple also represents the first major spiritual landmark in the long-neglected Hamadori coastal region.',
  'Uchigo, Iwaki, Fukushima',
  37.0353, 140.9089,
  'https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?w=800&auto=format&fit=crop&q=80',
  ARRAY['national treasure', 'heian', 'amida', 'temple', 'iwaki', 'pure land garden', 'spiritual'],
  true,
  ARRAY[
    'Fukushima''s only National Treasure building — a remarkably intact Heian-period Amida hall.',
    'Pure Land garden with a lotus pond reflecting the hall''s graceful silhouette.',
    'Summer lotus bloom and autumn ginkgo foliage are two of the finest seasonal views in Tohoku.',
    'Gilded Amida triad and four bodhisattvas preserved inside — rare and deeply moving.'
  ],
  'July–August (lotus blooms), October–November (autumn foliage)',
  'From Iwaki Station (JR Joban Line), take a bus or taxi (approx. 20 minutes). Iwaki Station is about 2 hours from Sendai by limited express, or 2.5 hours from Tokyo by Shinkansen to Koriyama then limited express.',
  '¥300 (adults), ¥150 (children)',
  '1–2 hours',
  'https://www.city.iwaki.lg.jp',
  '8:30–17:00 (Apr–Sep), 8:30–16:30 (Oct–Mar)',
  'The lotus blooms peak in late July to early August — arrive in the morning before heat wilts the flowers. Autumn foliage (late October to mid-November) is equally photogenic. The site is small and peaceful — allow time to sit by the pond rather than rushing through.'
),
(
  'aquamarine-fukushima',
  'Aquamarine Fukushima',
  'Fukushima',
  'tohoku',
  ARRAY['activity'],
  'Aquamarine Fukushima is one of Japan''s most conceptually distinctive aquariums, built around the theme of the Kuroshio and Oyashio ocean currents that collide off the Fukushima coast, creating one of the world''s most biologically rich seas. The centrepiece is a vast tunnel tank through which visitors walk beneath schools of tuna, rays, and sharks. Unlike conventional aquariums, Aquamarine also incorporates rice paddy exhibits, river ecosystems, and a beachside outdoor zone, reflecting the connection between land and sea that defines the Hamadori coast. Hands-on programs include touch pools, fishing experiences, and behind-the-scenes tours, making it one of the most engaging aquariums in Tohoku.',
  'Tatsumi-cho, Iwaki, Fukushima',
  37.0469, 140.9903,
  'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&auto=format&fit=crop&q=80',
  ARRAY['aquarium', 'iwaki', 'kuroshio', 'marine', 'activity', 'family', 'fukushima'],
  false,
  ARRAY[
    'Built around the Kuroshio-Oyashio collision — one of the world''s richest ocean ecosystems.',
    'Walk-through tunnel tank with tuna, rays, and open-ocean sharks overhead.',
    'Unusual exhibits connecting river, rice paddy, and sea ecosystems.',
    'Hands-on programs including touch pools, fishing experiences, and backyard tours.'
  ],
  'Year-round',
  'From Iwaki Station (JR Joban Line), take a bus bound for Spa Resort Hawaiians (approx. 30 minutes) or a direct shuttle. By car, approximately 10 minutes from Iwaki IC on the Joban Expressway.',
  '¥1,850 (adults), ¥930 (elementary students)',
  '2–4 hours',
  'https://www.aquamarine.or.jp',
  '9:00–17:30 (last entry 16:30); closed Wednesdays in winter (check official calendar)',
  'Book the hands-on fishing or touch pool sessions in advance — they fill quickly on weekends. The outdoor beachside zone is best in summer. Combine with Spa Resort Hawaiians (15 minutes by car) for a full Iwaki day.'
),
(
  'abukuma-cave',
  'Abukuma Cave',
  'Fukushima',
  'tohoku',
  ARRAY['nature'],
  'Abukuma Cave is one of the largest limestone caverns in eastern Japan, formed over 80 million years and stretching more than 3 kilometres beneath the hills of central Fukushima. Approximately 600 metres are open to the public along a well-lit standard course, where stalactites, stalagmites, and flowstone formations of extraordinary delicacy fill illuminated chambers. An additional adventure course — requiring a helmet and crawling through narrow passages — takes visitors into sections rarely seen in Japanese show caves. The cave maintains a year-round temperature of around 15°C, making it refreshingly cool in summer and pleasantly mild in winter.',
  'Takine, Tamura, Fukushima',
  37.4408, 140.7153,
  'https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?w=800&auto=format&fit=crop&q=80',
  ARRAY['cave', 'stalactite', 'limestone', 'tamura', 'nature', 'fukushima', 'underground'],
  false,
  ARRAY[
    'One of eastern Japan''s largest limestone caves — 80 million years of geological history.',
    'Delicate stalactite and flowstone formations in illuminated chambers along a 600m course.',
    'Adventure course lets visitors crawl through unexplored-feeling passages with a helmet.',
    'Year-round 15°C interior — cool in summer, mild in winter.'
  ],
  'Year-round',
  'By car: approximately 30 minutes from Koriyama IC or Abukuma Expressway Tamura IC. No direct public transport — a taxi from Abiko Station (Suigun Line) takes approximately 30 minutes.',
  '¥1,200 (adults, standard course), ¥600 (children); adventure course additional ¥500',
  '1–2 hours',
  'https://abukumado.com',
  '8:30–17:30 (Mar–Nov), 8:30–16:30 (Dec–Feb)',
  'A rental car is strongly recommended as public transport access is poor. The adventure course requires pre-booking and appropriate clothing — bring clothes you don''t mind getting muddy. The cave stays 15°C year-round, so bring a light layer even in summer.'
),
(
  'bandai-azuma-skyline',
  'Bandai-Azuma Skyline',
  'Fukushima',
  'tohoku',
  ARRAY['nature'],
  'The Bandai-Azuma Skyline is a 29-kilometre mountain road crossing the Azuma volcanic range at over 1,600 metres, connecting Fukushima city with the Bandai plateau. The drive passes through landscapes that shift dramatically with the seasons: in early spring, walls of snow several metres high line the freshly opened road; in summer, volcanic vents at Jododaira emit sulphurous steam beside hiking trails; and in autumn, the entire mountainside erupts in one of Tohoku''s finest displays of red and gold foliage. The road is closed in winter, making the spring opening — typically in late April — one of the most anticipated events of the Fukushima outdoor calendar.',
  'Fukushima city to Bandai, Fukushima',
  37.7322, 140.2697,
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&auto=format&fit=crop&q=80',
  ARRAY['skyline', 'mountain drive', 'azuma', 'bandai', 'autumn foliage', 'volcano', 'fukushima'],
  true,
  ARRAY[
    'Spring snow corridor with walls up to 10 metres high when the road first opens in late April.',
    'Jododaira rest area at 1,580 m — volcanic vents, hiking trails, and panoramic views.',
    'Tohoku''s finest alpine autumn foliage, typically peaking in early October.',
    'The 29 km drive passes through volcanic, alpine, and forested zones in a single route.'
  ],
  'Late April–May (snow corridor), October (autumn foliage)',
  'By car: start from Fukushima city (approx. 30 minutes to the Takayu Onsen entrance). No public transport along the skyline itself; a rental car or taxi is required. The road is closed from November to late April.',
  'Free (toll road)',
  '1–3 hours (drive + stops)',
  'https://www.kanko-fukushima.jp',
  'Open late April–early November (exact dates vary by snow conditions)',
  'Check the official road opening date before planning — the spring opening varies by up to two weeks depending on snowfall. For autumn foliage, the colours typically peak around October 5–15 at the summit. Stop at Jododaira for at least 30 minutes to walk the volcanic boardwalk trail.'
),
(
  'fukushima-fruits-line',
  'Fukushima Fruits Line',
  'Fukushima',
  'tohoku',
  ARRAY['food', 'activity'],
  'The Fruits Line is a scenic road winding through the orchard country on the western slopes above Fukushima city, where the combination of altitude, sunlight, and cold nights produces fruit of exceptional sweetness. From June through November, a succession of crops ripen in sequence: cherries in June, peaches in July and August, grapes in September, pears in October, and apples in October and November — each with its own pick-your-own farms open to visitors. Fukushima is one of Japan''s top fruit-producing prefectures, and eating a just-picked peach or cherry in the orchard, with the Abukuma mountains visible in the distance, is one of those simple pleasures that stays with you.',
  'Fukushima city, Fukushima',
  37.7469, 140.4128,
  'https://images.unsplash.com/photo-1595475038784-bbe439ff41e6?w=800&auto=format&fit=crop&q=80',
  ARRAY['fruit picking', 'peach', 'cherry', 'apple', 'fukushima city', 'orchard', 'food'],
  false,
  ARRAY[
    'Six months of sequential fruit picking — cherries, peaches, grapes, pears, and apples from June to November.',
    'Fukushima is one of Japan''s top fruit prefectures — exceptional sweetness from altitude and cold nights.',
    'Pick-your-own orchards scattered along a scenic road above Fukushima city.',
    'A just-picked Fukushima peach in summer is regarded as one of Japan''s finest eating experiences.'
  ],
  'June (cherries), July–August (peaches), September (grapes), October–November (pears, apples)',
  'From Fukushima Station, take a bus towards Iizaka Onsen (approx. 30 minutes) and get off near the orchard area, or take a taxi (approx. 20 minutes). A rental car allows the most flexibility to explore multiple farms along the road.',
  'Varies by farm and fruit (typically ¥800–¥2,000 per person for all-you-can-eat)',
  '1–3 hours',
  'https://www.kanko-fukushima.jp',
  'June–November: hours vary by farm (typically 9:00–16:00; reservation recommended)',
  'Peach season (mid-July to late August) is the most popular — book specific farms in advance. Ask for "Akatsuki" variety peaches, considered among Japan''s finest. Bring a cooler bag if you plan to buy fruit to take home — the peaches bruise easily.'
)
;
