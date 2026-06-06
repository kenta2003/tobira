-- seed-miyagi-extra.sql
-- 宮城県スポット追加: 5件
-- Sendai Asaichi Market / Shiogama Seafood Market / Akiu Crafts Village / Sendai Aquarium / Sendai Castle Ruins

INSERT INTO spots (
  id, name, prefecture, region, categories, description,
  address, lat, lng, image_url, tags, is_premium,
  highlights, best_season, access, admission, duration,
  website_url, opening_hours, tips
) VALUES
(
  'sendai-asaichi-market',
  'Sendai Asaichi Market',
  'Miyagi',
  'tohoku',
  ARRAY['food'],
  'Sendai Asaichi — the morning market — has served as the city''s culinary heart for generations, offering a concentrated taste of Miyagi''s food culture within easy walking distance of Sendai Station. Stalls and shops sell fresh seafood, local vegetables, Miyagi beef, sasa-kamaboko fish cakes, and a full range of prepared foods. Several dedicated gyutan (beef tongue) restaurants operate within the arcade, making it a natural first stop for visitors seeking the quintessential Sendai food experience. The market atmosphere is lively from early morning, with vendors calling out to shoppers in a way that feels genuinely local rather than tourist-facing.',
  'Chuo, Aoba-ku, Sendai, Miyagi',
  38.2608, 140.8742,
  'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=800&auto=format&fit=crop&q=80',
  ARRAY['sendai', 'market', 'food', 'gyutan', 'beef tongue', 'sasa-kamaboko', 'seafood'],
  false,
  ARRAY[
    'Sendai''s most concentrated food destination — gyutan, seafood, and local produce under one roof.',
    'Just 5 minutes on foot from Sendai Station, making it an effortless first stop in the city.',
    'Sasa-kamaboko (fish cakes moulded into bamboo-leaf shapes) are a Miyagi signature sold here.',
    'Early morning arrivals see the market at its liveliest, with fresh deliveries just in.'
  ],
  'Year-round',
  '5-minute walk from Sendai Station (JR Tohoku/Akita/Yamagata Shinkansen).',
  'Free to browse; food purchases vary',
  '1–2 hours',
  'https://sendaiasaichi.com',
  '7:00–18:00 (individual shops vary; some close on Sundays)',
  'Arrive early for the freshest seafood and the most energetic atmosphere. Gyutan restaurants in the market often have queues by 11am — go at opening or after 14:00. The market also sells excellent packaged sasa-kamaboko to take home.'
),
(
  'shiogama-seafood-market',
  'Shiogama Seafood Wholesale Market',
  'Miyagi',
  'tohoku',
  ARRAY['food'],
  'The Shiogama Seafood Wholesale Market is one of the largest fish markets in Tohoku, handling a significant share of the Pacific catch that arrives through Shiogama Port each morning. The market opens to the general public, allowing visitors to browse fresh tuna, oysters, sea urchin, and seasonal catch at wholesale prices, and many stalls sell directly for on-site eating. Shiogama is home to Japan''s largest concentration of sushi restaurants per capita, and the city''s "Higashimono" bigeye tuna — caught in autumn — is regarded as some of the finest eating fish in the country. The market is most rewarding when visited on a Sunday morning, when weekend shoppers join the usual traders.',
  'Minato-machi, Shiogama, Miyagi',
  38.3131, 141.0218,
  'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=800&auto=format&fit=crop&q=80',
  ARRAY['shiogama', 'fish market', 'tuna', 'oyster', 'seafood', 'wholesale', 'sushi'],
  false,
  ARRAY[
    'One of Tohoku''s largest fish markets — open to the public at wholesale prices.',
    'Shiogama''s "Higashimono" bigeye tuna, caught in autumn, is considered among Japan''s finest.',
    'Shiogama has the highest density of sushi restaurants per capita in Japan.',
    'Combine with a scenic ferry ride to Matsushima Bay (25 minutes) for a full day out.'
  ],
  'Year-round (best October–March for Higashimono tuna)',
  'From Sendai Station, take the JR Senseki Line to Hon-Shiogama Station (approx. 25 minutes), then walk 10 minutes to the market.',
  'Free to enter; food purchases vary',
  '1–3 hours',
  'https://www.city.shiogama.miyagi.jp',
  '8:00–14:00 (Sunday market most active; individual stalls vary)',
  'Sunday mornings are the best time to visit — more stalls are open and the atmosphere is lively. Many vendors will let you eat on the spot; bring cash as card payment is not always accepted. The ferry from Shiogama to Matsushima (¥1,500) is a scenic way to continue the day.'
),
(
  'akiu-crafts-village',
  'Akiu Traditional Crafts Village',
  'Miyagi',
  'tohoku',
  ARRAY['activity'],
  'Set in the forested hills of the Akiu valley, a short drive from Akiu Onsen, Akiu Traditional Crafts Village (Akiu Kogeino-Sato) is a working craft complex where visitors can watch artisans produce traditional Miyagi crafts and try their hand at making them. Workshops cover kokeshi doll painting, Sendai tansu chest joinery, dyeing and weaving, and lacquerware finishing — skills that have been practised in this region for centuries. The village setting, surrounded by cedar trees and mountain streams, gives the experience a calm, unhurried atmosphere that contrasts with the bustle of Sendai, just 30 minutes away.',
  'Taihaku-ku, Sendai, Miyagi',
  38.1528, 140.7583,
  'https://images.unsplash.com/photo-1527090526205-beaac8dc3c62?w=800&auto=format&fit=crop&q=80',
  ARRAY['kokeshi', 'crafts', 'akiu', 'traditional', 'workshop', 'activity', 'sendai'],
  false,
  ARRAY[
    'Hands-on kokeshi doll painting and lacquerware workshops in a forested mountain setting.',
    'Working artisans in residence — watch Sendai tansu joinery and dyeing techniques up close.',
    'Situated near Akiu Onsen, making it easy to combine craft experience with a hot spring stay.',
    'One of the few places in Tohoku where multiple traditional crafts are practised in one location.'
  ],
  'Year-round (autumn foliage October–November is particularly scenic)',
  'From Sendai Station, take a bus bound for Akiu Onsen (approx. 50 minutes) and get off at Akiu Kogeino-Sato-mae stop.',
  'Free to enter; workshop fees ¥500–¥2,000 depending on activity',
  '1–3 hours',
  'https://www.tohokukanko.jp/en/attractions/detail_1373.html',
  '9:00–17:00 (closed Tuesdays)',
  'Workshop reservations are recommended, especially for kokeshi painting which is the most popular activity. Combine with Akiu Onsen for a full day in the valley — the crafts village and onsen ryokan are within a short taxi ride of each other.'
),
(
  'sendai-umino-mori-aquarium',
  'Sendai Umino-Mori Aquarium',
  'Miyagi',
  'tohoku',
  ARRAY['activity'],
  'Opened in 2015, Sendai Umino-Mori Aquarium is the largest aquarium in the Tohoku region, built on the site of the former Sendai port fish market near the coast. Its centrepiece is a massive tank recreating the Sanriku coastal ecosystem, with schools of sardines, rays, and sharks moving through water that evokes the extraordinary richness of the sea off Miyagi''s coast. The aquarium also features dolphin and sea lion performances in an open-air stadium, a touch pool area, and a dedicated section focusing on ocean recovery after the 2011 tsunami. It offers a weather-proof, immersive way to experience the character of Miyagi''s sea — particularly meaningful in a prefecture whose coastal communities were reshaped by the disaster.',
  'Nakano, Miyagino-ku, Sendai, Miyagi',
  38.2792, 141.0211,
  'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&auto=format&fit=crop&q=80',
  ARRAY['aquarium', 'sendai', 'sanriku', 'dolphins', 'family', 'activity', 'tohoku'],
  false,
  ARRAY[
    'Largest aquarium in Tohoku — a massive Sanriku coastal tank with sharks, rays, and sardine schools.',
    'Dolphin and sea lion performances in an open-air stadium by the water.',
    'A dedicated section on ocean recovery following the 2011 Great East Japan Earthquake.',
    'Weather-proof — a reliable option for rainy days or travelling with children.'
  ],
  'Year-round',
  'From Sendai Station, take the JR Senseki Line to Nakano-Sakana-ichiba Station (approx. 20 minutes), then walk 5 minutes. Alternatively, a direct shuttle bus operates from Sendai Station on weekends.',
  '¥2,400 (adults), ¥1,200 (children 3–15)',
  '2–4 hours',
  'https://www.uminomori.jp',
  '9:00–17:30 (last entry 16:30); extended hours during summer and holidays',
  'Book tickets online in advance to avoid queues, particularly during school holidays. The dolphin show times vary by season — check the website before visiting. Allow at least 3 hours to see everything comfortably.'
),
(
  'sendai-castle-ruins',
  'Sendai Castle Ruins (Aoba Castle)',
  'Miyagi',
  'tohoku',
  ARRAY['history'],
  'Aoba Castle, perched on a forested hill overlooking the city Date Masamune founded in 1601, is the defining symbol of Sendai and one of Tohoku''s most visited historical sites. The castle itself no longer stands — it was never rebuilt after its destruction in the Second World War — but the surviving stone walls, a reconstructed corner turret, and the iconic equestrian statue of Date Masamune command sweeping views over the city, the Hirose River, and on clear days, the Pacific Ocean. A museum on site tells the story of the One-Eyed Dragon''s political acumen and his remarkable overseas diplomacy. The hilltop atmosphere, with cherry trees lining the approach in spring, remains genuinely atmospheric.',
  'Kawauchi, Aoba-ku, Sendai, Miyagi',
  38.2528, 140.8567,
  'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&auto=format&fit=crop&q=80',
  ARRAY['sendai castle', 'aoba castle', 'date masamune', 'history', 'sendai', 'panorama', 'samurai'],
  true,
  ARRAY[
    'Site of Date Masamune''s 1601 castle — the founding symbol of modern Sendai.',
    'Iconic equestrian statue of the One-Eyed Dragon with panoramic city views.',
    'Surviving stone walls and reconstructed turret evoke the castle''s original scale.',
    'Cherry blossoms line the approach path in late April, one of Sendai''s finest hanami spots.'
  ],
  'April–May (cherry blossoms), October–November (autumn foliage)',
  'From Sendai Station, take the Loople Sendai sightseeing bus to Aoba Castle (approx. 20 minutes). Alternatively, take the subway Tozai Line to Kawauchi Station and walk 20 minutes uphill.',
  'Free (grounds); museum ¥700 (adults)',
  '1–2 hours',
  'https://www.sendaijoato.jp',
  'Grounds: open 24 hours; museum: 9:00–17:00 (closed Mondays in winter)',
  'The Loople Sendai bus (¥630 all-day pass) connects the castle with Zuihoden mausoleum and Osaki Hachimangu Shrine — a convenient way to cover multiple Sendai historical sites. Visit in the evening for city light views, which are particularly beautiful on clear nights.'
)
;
