-- seed-iwate-extra.sql
-- 岩手県スポット追加: 5件
-- Morioka Castle Ruins / Morioka Wanko Soba / Motsuji Temple / Iwate-san Volcano / Morioka Reimen

INSERT INTO spots (
  id, name, prefecture, region, categories, description,
  address, lat, lng, image_url, tags, is_premium,
  highlights, best_season, access, admission, duration,
  website_url, opening_hours, tips
) VALUES
(
  'morioka-castle-ruins',
  'Morioka Castle Ruins',
  'Iwate',
  'tohoku',
  ARRAY['history'],
  'Morioka Castle, built in the early 17th century by the Nanbu clan, now stands as a serene park at the heart of the city. The stone walls and foundations are remarkably well preserved, offering a vivid impression of feudal-era architecture. Cherry blossoms transform the grounds into a pink canopy each spring, making it one of Iwate''s most beloved hanami spots. The Kitakami River flows nearby, adding to the peaceful atmosphere. A small museum on-site provides context on the castle''s long history.',
  'Ueda, Morioka, Iwate',
  39.7040, 141.1527,
  'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&auto=format&fit=crop&q=80',
  ARRAY['morioka', 'castle', 'history', 'cherry blossom', 'nanbu clan', 'park', 'ruins'],
  false,
  ARRAY[
    'Stone walls and moat foundations dating back over 400 years.',
    'One of Tohoku''s finest cherry blossom viewing spots in late April.',
    'Panoramic views of the Kitakami River and Iwate-san in clear weather.',
    'Free entry makes it an ideal stop between sightseeing in central Morioka.'
  ],
  'April–May (cherry blossoms), October–November (autumn foliage)',
  '15-minute walk from Morioka Station (JR Tohoku/Akita Shinkansen).',
  'Free',
  '1–2 hours',
  'https://www.morioka-tourism.com',
  'Open 24 hours (park grounds)',
  'Visit in late April for cherry blossoms — the castle walls framed by pink blooms are stunning. Combine with a stroll along the Nakatsu River wanko soba area nearby.'
),
(
  'morioka-wanko-soba',
  'Morioka Wanko Soba Experience',
  'Iwate',
  'tohoku',
  ARRAY['food', 'activity'],
  'Wanko soba is Iwate''s most iconic culinary tradition — small one-bite portions of buckwheat noodles served continuously by an attentive host, who keeps refilling your bowl until you place the lid on top. Restaurants in central Morioka have perfected this ritual over generations, turning a simple meal into a lively competitive event. The average person finishes around 50 bowls, but serious eaters tackle well over 100. It''s equal parts delicious and theatrical, and a quintessential Iwate experience.',
  'Nakano-koji, Morioka, Iwate',
  39.7014, 141.1532,
  'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=800&auto=format&fit=crop&q=80',
  ARRAY['wanko soba', 'noodles', 'morioka', 'food culture', 'local cuisine', 'experience', 'buckwheat'],
  false,
  ARRAY[
    'Continuous bowl-refilling ritual unique to Iwate — a truly hands-on dining experience.',
    'Average diner finishes 50+ bowls; competitive eaters aim for 100 or more.',
    'Comes with a variety of side condiments including sesame, walnut, and natto.',
    'Completing the challenge earns a certificate at many restaurants.'
  ],
  'Year-round',
  '15-minute walk from Morioka Station. Main restaurants are located in the Nakano-koji and Saien areas of central Morioka.',
  '¥2,500–¥3,500 per person (all-you-can-eat)',
  '1–2 hours',
  'https://www.wankosoba-azumaya.co.jp',
  '11:00–20:00 (last entry 19:00; varies by restaurant)',
  'Reserve in advance on weekends. Pace yourself early — many people slow down around bowl 30. Wearing stretchy clothing is genuinely recommended by locals.'
),
(
  'hiraizumi-motsuji',
  'Motsuji Temple',
  'Iwate',
  'tohoku',
  ARRAY['history', 'spiritual'],
  'Motsuji Temple, founded in the 9th century, was once one of the grandest temple complexes in all of Japan, rivalling even Kyoto in scale and beauty. Today, the original buildings are gone, but the Pure Land garden — a UNESCO World Heritage Site alongside nearby Chusonji — survives in near-perfect condition, centred on the tranquil Oizumi-ga-ike pond. The garden represents the Buddhist concept of paradise on earth, and walking its gravel paths feels genuinely otherworldly. Seasonal events including the Genpei Ennen-no-Mai dance performance bring the site to life throughout the year.',
  '58 Osawa, Hiraizumi, Nishiiwai-gun, Iwate',
  38.9897, 141.1116,
  'https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?w=800&auto=format&fit=crop&q=80',
  ARRAY['hiraizumi', 'UNESCO', 'temple', 'pure land garden', 'history', 'spiritual', 'pond'],
  true,
  ARRAY[
    'UNESCO World Heritage Pure Land garden with an intact 12th-century pond landscape.',
    'One of Japan''s finest examples of Heian-period garden design.',
    'Irises bloom spectacularly around the pond in mid-June.',
    'Traditional Ennen-no-Mai dance performances held seasonally on the grounds.'
  ],
  'May–June (irises), October–November (autumn foliage)',
  '5-minute walk from Hiraizumi Station (JR Tohoku Main Line). Hiraizumi is 40 minutes from Morioka by Shinkansen to Ichinoseki, then local train.',
  '¥700 (adults), ¥400 (high school students), ¥200 (children)',
  '1–2 hours',
  'https://www.motsuji.or.jp',
  '8:30–17:00 (Mar–Nov), 8:30–16:30 (Dec–Feb)',
  'Visit Chusonji Temple on the same day — they are 15 minutes apart by foot or bike. The iris season in June is spectacular and far less crowded than the autumn foliage peak.'
),
(
  'iwate-san-volcano',
  'Iwate-san Volcano',
  'Iwate',
  'tohoku',
  ARRAY['nature', 'activity'],
  'Iwate-san, at 2,038 metres, is the highest peak in Iwate Prefecture and one of the most visually striking volcanoes in the Tohoku region. Known locally as the "Fuji of Nanbu", its symmetrical cone dominates the skyline from Morioka on clear days. Several well-marked trails lead to the summit, rewarding hikers with sweeping views across Tohoku and, on exceptional days, as far as the Pacific Ocean. The mountain is still volcanically active, and the crater area retains a raw, elemental energy. Alpine wildflowers colour the slopes from July through August.',
  'Hachimantai, Iwate',
  39.8529, 141.0003,
  'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=800&auto=format&fit=crop&q=80',
  ARRAY['volcano', 'hiking', 'mountain', 'iwate-san', 'nature', 'alpine', 'tohoku'],
  true,
  ARRAY[
    'Iwate''s highest peak at 2,038 m — a rewarding full-day volcano hike.',
    'Panoramic summit views stretching across Tohoku on clear days.',
    'Alpine wildflowers carpet the slopes in July and August.',
    'Volcano crater with fumarolic vents adds dramatic geological interest.'
  ],
  'July–September (hiking season)',
  'Take a bus from Morioka Station to the Umoregi-no-yu trailhead (approx. 90 minutes). Alternatively, drive to Amihari Onsen trailhead, which shortens the ascent.',
  'Free',
  '6–8 hours (round trip)',
  'https://www.pref.iwate.jp',
  'Open year-round; summer hiking season July–September recommended',
  'Start no later than 6:00 am to summit safely and descend before afternoon clouds gather. Carry rain gear — weather changes rapidly above 1,500 m. Check volcanic activity alerts before departure at the Japan Meteorological Agency site.'
),
(
  'morioka-reimen',
  'Morioka Cold Noodles (Reimen)',
  'Iwate',
  'tohoku',
  ARRAY['food'],
  'Morioka reimen is one of the three great noodle dishes of Morioka, alongside wanko soba and jajamen. Introduced by a Korean immigrant chef in the 1950s, the dish features thick, chewy noodles in a clear, icy beef broth, topped with kimchi, watermelon or nashi pear, and sliced beef. The combination of cold, refreshing broth and bold kimchi heat is distinctive and deeply satisfying. Dozens of restaurants throughout Morioka serve their own version, each with subtle differences in broth and topping style, making a reimen crawl a rewarding evening activity.',
  'Central Morioka, Iwate',
  39.7010, 141.1528,
  'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=800&auto=format&fit=crop&q=80',
  ARRAY['reimen', 'cold noodles', 'morioka', 'local cuisine', 'food', 'beef broth', 'kimchi'],
  false,
  ARRAY[
    'Thick, chewy noodles in icy beef broth — a uniquely Morioka comfort food.',
    'Born from Korean culinary tradition, now a beloved local institution since the 1950s.',
    'Classic toppings include kimchi, watermelon slice, and sliced beef.',
    'Best experienced on the same evening as wanko soba for Morioka''s full noodle trilogy.'
  ],
  'Year-round (especially refreshing in summer)',
  '10-minute walk from Morioka Station. Most reimen restaurants are concentrated in the Saien and Ekimae areas of central Morioka.',
  '¥900–¥1,300 per bowl',
  '30–60 minutes',
  '',
  '11:00–22:00 (varies by restaurant)',
  'The kimchi spice level is usually adjustable — ask for "kara-sa hikae-me" if you prefer mild. Pairing reimen with yakiniku (grilled meat) at the same restaurant is the classic Morioka way to enjoy it.'
)
;
