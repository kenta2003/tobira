-- seed-yamagata-extra.sql
-- 山形県スポット追加: 5件
-- Kajo Park / Bunshokan / Imoni Festival / Cherry Picking Experience / Zao Snow Monsters

INSERT INTO spots (
  id, name, prefecture, region, categories, description,
  address, lat, lng, image_url, tags, is_premium,
  highlights, best_season, access, admission, duration,
  website_url, opening_hours, tips
) VALUES
(
  'yamagata-kajo-park',
  'Kajo Park & Yamagata Castle Ruins',
  'Yamagata',
  'tohoku',
  ARRAY['history', 'nature'],
  'Kajo Park occupies the grounds of Yamagata Castle, a sprawling fortification built in 1357 and one of Japan''s 100 Famous Castles. The stone walls, moats, and reconstructed East Great Gate (Higashi-Otemon) give a vivid sense of the castle''s former scale, while the surrounding park provides one of the finest cherry blossom settings in the Tohoku region, with approximately 1,500 trees blooming each April. Located just minutes from Yamagata Station, the park is the natural starting point for exploring the city and connects easily to the nearby Bunshokan cultural hall.',
  'Kajo-machi, Yamagata, Yamagata',
  38.2553, 140.3397,
  'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&auto=format&fit=crop&q=80',
  ARRAY['castle ruins', 'cherry blossom', 'yamagata city', 'history', 'park', 'tohoku', 'sakura'],
  false,
  ARRAY[
    'One of Japan''s 100 Famous Castles, with well-preserved stone walls and moats.',
    'Approximately 1,500 cherry trees make this one of Tohoku''s finest hanami spots.',
    'Reconstructed East Great Gate offers a vivid impression of the original fortress.',
    'Just 15 minutes on foot from Yamagata Station — ideal as a city walk starting point.'
  ],
  'Late April (cherry blossoms), October–November (autumn foliage)',
  '15-minute walk or 5-minute bus ride from Yamagata Station (JR Yamagata Shinkansen).',
  'Free',
  '1–2 hours',
  'https://yamagatakanko.com/en/attractions/detail_2304.html',
  'Open 24 hours (park grounds); East Great Gate interior: 9:00–17:00 (closed Mondays)',
  'Visit in late April for cherry blossoms — arrive early on weekends as the park gets very busy. Combine with Bunshokan (10-minute walk) for a full Yamagata city morning.'
),
(
  'yamagata-bunshokan',
  'Bunshokan — Yamagata Prefectural Museum',
  'Yamagata',
  'tohoku',
  ARRAY['history'],
  'Bunshokan is a striking red-brick building completed in 1916, originally serving as the Yamagata Prefectural Office and Assembly Hall before being designated an Important Cultural Property of Japan. The Taisho-era Western-style architecture, complete with a central clocktower, stands in sharp contrast to the castle walls of the adjacent Kajo Park, offering a window into a different chapter of Yamagata''s history. Today the building functions as the Yamagata Prefectural Museum of Art, housing rotating exhibitions and permanent displays, and remains one of the most recognisable landmarks in the city.',
  '1-1 Kajo-machi, Yamagata, Yamagata',
  38.2561, 140.3378,
  'https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?w=800&auto=format&fit=crop&q=80',
  ARRAY['bunshokan', 'meiji architecture', 'red brick', 'yamagata city', 'history', 'cultural property', 'museum'],
  false,
  ARRAY[
    'Important Cultural Property — a rare intact example of Taisho-era Western-style civic architecture.',
    'The clocktower and red-brick facade are among Yamagata city''s most iconic landmarks.',
    'Adjacent to Kajo Park, making it an easy addition to a Yamagata city walk.',
    'Free to enter the grounds; rotating art exhibitions inside are occasionally open to the public.'
  ],
  'Year-round',
  '10-minute walk from Yamagata Station, or adjacent to Kajo Park.',
  'Free (exterior and grounds); exhibition admission varies',
  '30–60 minutes',
  'https://yamagatakanko.com/en/attractions/detail_2515.html',
  'Exterior viewing: open 24 hours; interior exhibitions: 9:00–17:00 (closed Mondays)',
  'The exterior and clocktower are the main draw and fully free to visit. Combine with Kajo Park next door for a convenient half-day Yamagata city itinerary.'
),
(
  'yamagata-imoni-festival',
  'Yamagata Imoni Festival',
  'Yamagata',
  'tohoku',
  ARRAY['food'],
  'Every September, the banks of the Mamigasaki River in Yamagata city become the site of one of Japan''s most extraordinary food events: the Yamagata Imoni Festival, where a 6-metre-wide iron pot is used to cook imoni (taro root stew) for approximately 30,000 people in a single day. The stew, made with beef, taro, konjac, and leeks in a soy-based broth, is the defining autumn dish of Yamagata. A construction crane is used to stir the pot, and the whole event has the infectious energy of a city letting its hair down. The festival is a perfect introduction to Yamagata''s food culture and its distinctive personality.',
  'Mamigasaki River, Yamagata, Yamagata',
  38.2488, 140.3561,
  'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=800&auto=format&fit=crop&q=80',
  ARRAY['imoni', 'taro stew', 'food festival', 'yamagata city', 'autumn', 'local cuisine', 'september'],
  false,
  ARRAY[
    'A 6-metre iron pot feeds 30,000 people in one day — stirred by a construction crane.',
    'Imoni (taro and beef stew) is Yamagata''s defining autumn comfort food.',
    'Held on the first Sunday of September on the banks of the Mamigasaki River.',
    'Beyond the festival, imoni restaurants serve the dish across Yamagata from September to November.'
  ],
  'September (festival); September–November (restaurants)',
  '20-minute walk or 10-minute bus from Yamagata Station. The festival site is along the Mamigasaki River on the east side of the city.',
  'Free to attend; imoni bowl ¥500–¥800',
  '2–3 hours (festival day); 1 hour (restaurant)',
  'https://yamagatakanko.com/en/festivals/detail_2957.html',
  'Festival: first Sunday of September, approximately 10:00–15:00; restaurants: September–November, lunch and dinner',
  'Arrive early — queues for the giant pot form quickly after 10am. If you miss the festival, imoni is available at restaurants and riverside self-cooking spots (imoni-kai) throughout the autumn. Locals gather at the river with portable gas stoves on weekends to cook their own — a relaxed and welcoming scene to join.'
),
(
  'yamagata-cherry-picking',
  'Yamagata Cherry Picking Experience',
  'Yamagata',
  'tohoku',
  ARRAY['food', 'activity'],
  'Yamagata Prefecture produces more cherries than any other prefecture in Japan, accounting for over 70% of national output. Every June and July, more than 400 farms open their orchards to visitors for all-you-can-eat cherry picking, offering direct access to varieties such as Sato Nishiki, Beni Shuho, and the prized Nanyo cherries. The experience — wandering through rows of laden trees under bright summer skies, eating directly from the branches — is a simple, joyful contrast to the temple-and-mountain circuits of the rest of Tohoku. Many farms also offer grape, pear, and apple picking from August through October, making Yamagata''s fruit culture a multi-season attraction.',
  'Higashine and Tendo areas, Yamagata',
  38.4308, 140.3897,
  'https://images.unsplash.com/photo-1595475038784-bbe439ff41e6?w=800&auto=format&fit=crop&q=80',
  ARRAY['cherry picking', 'fruit', 'yamagata', 'food', 'activity', 'summer', 'orchard'],
  false,
  ARRAY[
    'Yamagata grows over 70% of Japan''s cherries — the finest cherry-picking destination in the country.',
    'All-you-can-eat picking at 400+ farms during June and July.',
    'Premium varieties including Sato Nishiki and Nanyo cherries eaten straight from the branch.',
    'Extend the season with grape, pear, and apple picking from August through October.'
  ],
  'June–July (cherries), August–October (grapes, pears, apples)',
  'Higashine Station or Tendo Station on the JR Ou Line (30–40 minutes from Yamagata Station). Many farms offer free shuttle pickup from nearby stations — check with individual farms when booking.',
  '¥1,500–¥2,500 per person (all-you-can-eat, 30–40 minutes)',
  '1–2 hours',
  'https://yamagatakanko.com/en/features/detail_15.html',
  'June–July: 9:00–16:00 (most farms; reservation recommended)',
  'Book directly with farms at least a few days ahead in peak season (mid-June to early July). Bring a small cooler bag if you want to take cherries home. The Higashine area has the highest concentration of farms and is easiest to access by train.'
),
(
  'zao-snow-monsters',
  'Zao Snow Monsters (Juhyo)',
  'Yamagata',
  'tohoku',
  ARRAY['nature', 'activity'],
  'Every winter, the fir trees near the summit of Zao Mountain are transformed into towering snow sculptures known as juhyo — literally "ice trees" or snow monsters. The phenomenon occurs when supercooled water droplets from clouds freeze onto the branches in repeated layers, encasing the trees in thick white armour and turning the mountaintop into a surreal, otherworldly landscape. Viewed from the Zao Ropeway or during night illumination events, the snow monsters are among the most photographically striking natural phenomena in Japan. The season runs from late December through February, depending on conditions.',
  'Zao Onsen, Yamagata, Yamagata',
  38.1438, 140.4547,
  'https://images.unsplash.com/photo-1548013146-72479768bada?w=800&auto=format&fit=crop&q=80',
  ARRAY['juhyo', 'snow monsters', 'zao', 'winter', 'nature', 'ropeway', 'illumination'],
  true,
  ARRAY[
    'Fir trees encased in ice up to several metres thick — a genuinely alien winter landscape.',
    'Best viewed from the Zao Ropeway, which runs to the Monster Zone at 1,660 m elevation.',
    'Night illumination events (Juhyo Fantasy) light up the snow monsters after dark.',
    'Combine with skiing at Zao Onsen ski resort — one of Tohoku''s largest ski areas.'
  ],
  'Late December–February (peak: January–mid-February)',
  'Take a bus from Yamagata Station to Zao Onsen (approx. 40 minutes), then the Zao Ropeway to the Monster Zone. Direct buses run frequently in winter from Yamagata Station.',
  'Zao Ropeway round trip ¥2,500 (adults)',
  '2–4 hours',
  'https://yamagatakanko.com/en/attractions/detail_12230.html',
  'Ropeway: 8:30–17:00 (winter season; weather dependent); night illumination: 17:00–21:00 on select dates',
  'Check the Zao Ropeway website the evening before for conditions — fog can obscure the monsters entirely. The night illumination (Juhyo Fantasy) runs on set dates in January and February and is worth planning around. Dress for -10°C or colder at the summit.'
)
;
