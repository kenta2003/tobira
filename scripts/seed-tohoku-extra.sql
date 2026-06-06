-- 東北追加スポット（第1弾: 青森）
-- 既存 seed-hokkaido-tohoku.mjs の青森9件と id が被らないもののみ
-- region = tohoku / prefecture = Aomori

INSERT INTO spots (
  id, name, prefecture, region, categories, description,
  address, lat, lng, image_url, tags, is_premium,
  highlights, best_season, access, admission, duration,
  website_url, opening_hours, tips
) VALUES

(
  'aomori-museum-of-art',
  'Aomori Museum of Art',
  'Aomori',
  'tohoku',
  ARRAY['history', 'activity'],
  'A striking contemporary museum on Aomori Bay designed by Jun Aoki, known for its tall, light-filled atrium and major holdings of Marc Chagall — including stage backdrops for ballet that rank among the largest Chagall works on public display outside Russia. The collection also features works by local artists and rotating exhibitions of modern Japanese art. The building itself, with its white geometric facade, has become a symbol of the city alongside the Nebuta Museum.',
  '1-9-30 Chuo, Aomori, Aomori',
  40.8242, 140.7475,
  'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&auto=format&fit=crop&q=80',
  ARRAY['aomori', 'museum', 'chagall', 'contemporary art', 'jun aoki', 'tohoku', 'culture'],
  true,
  ARRAY[
    'The museum holds monumental Marc Chagall stage curtains and backdrops rarely seen outside Europe',
    'Jun Aoki''s architecture frames the Tsugaru light — the atrium is one of Tohoku''s finest gallery spaces',
    'The bayfront location pairs easily with Wa・Rasse and Aomori Station on foot',
    'English audio guides and labels are available for major permanent displays'
  ],
  'Year-round',
  '10-min walk from JR Aomori Station; 5-min walk from Nebuta Museum Wa・Rasse',
  '¥600 adult; discounts for students and seniors',
  '1–2 hours',
  'https://www.aomori-museum.jp/en/',
  '10:00–17:00 (last entry 16:30; closed Mon, or Tue if Mon is a holiday)',
  'Buy a combined ticket with the nearby archaeology museum if you plan both. Weekday mornings are quietest.'
),

(
  'aomori-furukawa-fish-market',
  'Aomori Gyosai Center (Furukawa Fish Market)',
  'Aomori',
  'tohoku',
  ARRAY['food', 'activity'],
  'A working market a short walk from Aomori Station where the signature experience is nokkedon — a bowl of rice topped with sashimi you choose yourself from stalls selling tickets by the slice. Scallops from Mutsu Bay, tuna, sea urchin and squid are local specialties. The market opens early and fills with locals and travellers grabbing breakfast before trains and ferries.',
  '1-11-16 Furukawa, Aomori, Aomori',
  40.8265, 140.7470,
  'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&auto=format&fit=crop&q=80',
  ARRAY['aomori', 'fish market', 'sashimi', 'scallops', 'nokkedon', 'breakfast', 'tohoku'],
  false,
  ARRAY[
    'Nokkedon lets you build your own seafood bowl from dozens of fresh cuts sold by the piece',
    'Mutsu Bay scallops are a regional icon — sweet and often eaten raw or lightly seared',
    'The market sits between the station and the waterfront — easy to combine with Wa・Rasse',
    'Many stalls open from around 7:00 — ideal before a day trip to Hakkoda or the Shimokita Peninsula'
  ],
  'Year-round; summer mornings busiest',
  '7-min walk from JR Aomori Station',
  'Free entry; nokkedon typically ¥1,000–¥3,000 depending on fish chosen',
  '45 min–1 hour',
  'https://www.aomori-tourism.com/en/spot/furukawa_fish_market.html',
  'Varies by stall; many core vendors approx. 7:00–16:00 (confirm on arrival)',
  'Carry cash; some stalls do not take cards. Go before 10:00 for the widest selection and fewer queues.'
),

(
  'towada-art-center',
  'Towada Art Center',
  'Aomori',
  'tohoku',
  ARRAY['history', 'activity'],
  'A contemporary art museum in Towada City that anchors a public "art town" project — outdoor sculptures and installations line streets and parks, and the building hosts major names in Japanese and international art including site-specific commissions. The city promotes cycling routes linking the museum to outdoor works. It pairs naturally with Lake Towada and Oirase for a two-day art-and-nature itinerary.',
  'Towada, Towada City, Aomori',
  40.6085, 141.2055,
  'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&auto=format&fit=crop&q=80',
  ARRAY['towada', 'contemporary art', 'museum', 'aomori', 'kusama', 'outdoor sculpture', 'tohoku'],
  true,
  ARRAY[
    'Large-scale installations and rotating shows feature leading Japanese and global artists',
    'Free outdoor art trail connects the museum to works scattered across central Towada',
    'Rental bicycles make it easy to tour sculptures beyond the main building',
    'Combines well with Oirase Gorge and Lake Towada on a multi-day northern Tohoku trip'
  ],
  'Year-round; outdoor art best May–October',
  'About 15-min walk from Towada-minami Station (JR) or use local bus from Towada terminal',
  'Varies by exhibition; typical adult ticket around ¥1,000–¥1,800 (check site)',
  '2–3 hours (museum + outdoor circuit)',
  'https://towadaart.com/en/',
  '10:00–17:00 (last entry 16:30; closed Mon, or Tue if Mon is a holiday)',
  'Pick up a map of outdoor works at reception. Winter snow may limit access to some outdoor pieces.'
),

(
  'hakkoda-ropeway-sukayu',
  'Hakkoda Ropeway & Sukayu Onsen',
  'Aomori',
  'tohoku',
  ARRAY['nature', 'onsen', 'activity'],
  'The Hakkoda ropeway climbs from near Sukayu Onsen into the Hakkoda mountain range, famous for deep snow, alpine marshland and, in winter, "snow monster" juhyo ice-coated trees. Sukayu below is known for Japan''s largest mixed-gender cedar bath (konyoku) in a classic mountain setting. Summer offers hiking and wildflowers above the treeline.',
  'Kansu, Arakawa, Aomori, Aomori',
  40.6648, 140.8812,
  'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&auto=format&fit=crop&q=80',
  ARRAY['hakkoda', 'ropeway', 'onsen', 'sukayu', 'juhyo', 'winter', 'aomori', 'tohoku'],
  true,
  ARRAY[
    'Winter ropeway rides access iconic juhyo frost-covered trees on the high plateau',
    'Sukayu''s large hinoki co-ed bath is a registered national hot-spring health resort',
    'Summer and autumn bring alpine flowers and early koyo compared with lowland Tohoku',
    'Direct buses run from Aomori Station in season — check current timetables'
  ],
  'December–March (juhyo & ropeway); June–October (hiking & green season)',
  'JR bus from Aomori Station to Sukayu/Hakkoda ropeway (seasonal; about 80–100 min)',
  'Ropeway round-trip approx. ¥2,000 adult; onsen fee separate (around ¥1,000)',
  'Half day to full day',
  'https://www.hakkoda-ropeway.jp/en/',
  'Ropeway typically 9:00–16:00 (seasonal; shorter in deep winter); Sukayu onsen hours on facility site',
  'Dress for sudden weather changes at the summit. Juhyo season is extremely cold — full winter gear essential.'
),

(
  'asamushi-onsen',
  'Asamushi Onsen',
  'Aomori',
  'tohoku',
  ARRAY['onsen', 'nature'],
  'A historic hot-spring village on Mutsu Bay northeast of Aomori City, where ryokan and day-use baths line a quiet coast of pine and tidal flats. The water is mild and said to be gentle on the skin. Small aquarium and walking paths along the shore make it a relaxed half-day escape from the city without heading as far as Shimokita.',
  'Asamushi, Aomori, Aomori',
  40.8940, 140.8565,
  'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&auto=format&fit=crop&q=80',
  ARRAY['asamushi', 'onsen', 'aomori', 'mutsu bay', 'coast', 'ryokan', 'tohoku'],
  false,
  ARRAY[
    'Seaside setting with pine groves and views over Mutsu Bay',
    'Multiple ryokan offer day baths — choose by view and water type',
    'The local train from Aomori is scenic and stress-free',
    'Morning low tide reveals wide mudflats popular with shorebirds'
  ],
  'Year-round; summer for sea breeze; winter for snow and quiet',
  'About 30 min by JR Ou Line from Aomori Station to Asamushi-Onsen Station; then walk or taxi',
  'Day baths typically ¥500–¥1,200 depending on facility',
  '2–4 hours',
  'https://www.asamushi.com/english/',
  'Day baths often 10:00–21:00; varies by ryokan — confirm before travel',
  'Bring a small towel or buy one on site. Last trains back to Aomori can be early — check the timetable.'
)
;
