-- 北海道追加スポット 10件
-- 既存12件に加え、札幌・旭川・大雪山・摩周湖・流氷・釧路・函館山・ニセコ・礼文島をカバー

INSERT INTO spots (id, name, prefecture, region, categories, description, address, lat, lng, image_url, tags, is_premium, highlights, best_season, access, admission, duration) VALUES

(
  'sapporo-odori-park',
  'Odori Park & Sapporo Snow Festival',
  'Hokkaido',
  'hokkaido',
  ARRAY['nature', 'activity'],
  'A 1.5 km green boulevard bisecting central Sapporo that transforms each February into the world-famous Snow Festival — 200-plus enormous ice and snow sculptures lit up across six blocks. In summer the park hosts flower gardens, beer gardens and outdoor concerts beneath the TV Tower.',
  'Odori Nishi, Chuo-ku, Sapporo, Hokkaido',
  43.0588, 141.3530,
  'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&auto=format&fit=crop&q=80',
  ARRAY['sapporo', 'snow festival', 'yuki matsuri', 'hokkaido', 'winter', 'ice sculpture'],
  true,
  ARRAY[
    'The Sapporo Snow Festival (Yuki Matsuri) runs for one week in early February, drawing over 2 million visitors',
    'Giant snow sculptures — some six storeys tall — are carved by JSDF soldiers and civilian teams over weeks',
    'The TV Tower at the park''s east end offers panoramic views of the boulevard below',
    'Summer beer gardens operated by Sapporo, Asahi, Kirin and Suntory all open simultaneously in July–August'
  ],
  'February (Snow Festival); June–August (beer gardens & flowers)',
  '2-min walk from Odori Station (Subway Namboku / Tozai / Toho Line)',
  'Free (park); TV Tower observation deck ¥800 adult',
  '1–2 hours'
),

(
  'sapporo-beer-garden',
  'Sapporo Beer Garden & Museum',
  'Hokkaido',
  'hokkaido',
  ARRAY['food', 'history'],
  'The birthplace of Sapporo Beer, housed in a grand red-brick factory complex built in 1890. The free museum traces the history of Japan''s oldest brand through vintage posters and brewing machinery, while the cavernous Genghis Khan halls serve all-you-can-eat lamb BBQ and unlimited draft beer beneath soaring ceilings.',
  'Kita 9-jo Higashi 9-chome, Higashi-ku, Sapporo, Hokkaido',
  43.0745, 141.3640,
  'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&auto=format&fit=crop&q=80',
  ARRAY['sapporo', 'beer', 'hokkaido', 'genghis khan', 'lamb bbq', 'history'],
  false,
  ARRAY[
    'Sapporo Beer was first brewed here in 1876, making it Japan''s oldest beer brand still in production',
    'The Genghis Khan (jingisukan) lamb BBQ is Hokkaido''s signature dish — fat drips onto a domed iron grill',
    'The Star Hall seats over 1,000 diners under the original vaulted brick ceiling of the 19th-century malt factory',
    'A free shuttle bus runs from Sapporo Station every 15 minutes during opening hours'
  ],
  'Year-round',
  '10-min walk from JR Sapporo Station; or free shuttle bus from Sapporo Station (East Exit)',
  'Museum free; Genghis Khan BBQ from ¥2,728 per person (90 min)',
  '2–3 hours'
),

(
  'asahiyama-zoo',
  'Asahiyama Zoo',
  'Hokkaido',
  'hokkaido',
  ARRAY['activity'],
  'Japan''s most innovative zoo, which rescued itself from near-closure in the 1990s by pioneering "behaviour exhibits" — glass tunnels through penguin tanks, polar bear pools with underwater viewing, and orangutan sky-walks overhead. The winter penguin parade, when keepers walk the birds through snow for exercise, has become one of Hokkaido''s most beloved daily spectacles.',
  'Kuranuma, Higashiasahikawa-cho, Asahikawa, Hokkaido',
  43.7705, 142.4830,
  'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&auto=format&fit=crop&q=80',
  ARRAY['asahikawa', 'zoo', 'hokkaido', 'penguins', 'polar bear', 'animals'],
  false,
  ARRAY[
    'The penguin walk (January–March) sees 100+ penguins waddling through the zoo grounds in a single-file parade',
    'The underwater polar bear exhibit lets visitors stand nose-to-nose with swimming bears through thick acrylic glass',
    'Orangutans cross between buildings on a high-wire "sky walk" 17 metres above visitors'' heads',
    'The zoo was on the verge of closing in 1994 but reinvented itself with immersive exhibits and now draws 1 million visitors annually'
  ],
  'April–November (summer season); January–March (winter penguin walks)',
  'About 30 min by bus from Asahikawa Station (Higashiasahikawa-bound bus, alight at Asahiyama Zoo)',
  '¥1,000 adult; free for junior high school students and below',
  '3–4 hours'
),

(
  'daisetsuzan-national-park',
  'Daisetsuzan National Park',
  'Hokkaido',
  'hokkaido',
  ARRAY['nature', 'activity', 'onsen'],
  'Japan''s largest national park — bigger than Tokyo Prefecture — a volcanic plateau of jagged peaks, alpine meadows and cascading waterfalls at the geographical heart of Hokkaido. Autumn colours arrive here 6–8 weeks earlier than the rest of Japan, earning Daisetsuzan the title "first stage of autumn in Japan". The Sounkyo gorge, with its 150m basalt columns and twin waterfalls, is the most dramatic gateway into the park.',
  'Kamikawa District / Kato District, Hokkaido',
  43.6435, 142.8560,
  'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&auto=format&fit=crop&q=80',
  ARRAY['daisetsuzan', 'hokkaido', 'national park', 'koyo', 'sounkyo', 'hiking', 'onsen'],
  true,
  ARRAY[
    'Autumn colours (koyo) peak on Daisetsuzan''s summits in mid-September — the earliest in Japan',
    'Sounkyo Gorge''s 8 km of sheer basalt columns include two waterfalls: Ryusei-no-taki and Ginga-no-taki',
    'The Sounkyo ropeway and chairlift carry hikers to 1,900 m where alpine meadows bloom with Ezo-Fujizakura',
    'Sounkyo Onsen village at the gorge entrance offers a dozen ryokan with hot spring baths overlooking the cliffs'
  ],
  'Late June–October (hiking); late September (koyo); February–March (ice waterfall festival)',
  'Bus from Asahikawa Station to Sounkyo Onsen approx. 1 hour 30 min (Dohoku Bus)',
  'Free (park); Sounkyo Ropeway round-trip ¥2,000 adult',
  '1–3 days'
),

(
  'lake-mashu',
  'Lake Mashu',
  'Hokkaido',
  'hokkaido',
  ARRAY['nature'],
  'One of the world''s clearest lakes — a caldera filled to its brim with translucent cobalt water, ringed by sheer 200m cliffs that drop straight into the lake with no shoreline. The Ainu called it "Lake of the Devil" for the impenetrable fog that rolls in from the sea of Okhotsk and swallows it whole. No rivers enter or leave; the water is naturally filtered to near-distilled clarity.',
  'Teshikaga, Kawakami District, Hokkaido',
  43.5745, 144.5413,
  'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&auto=format&fit=crop&q=80',
  ARRAY['mashu', 'hokkaido', 'caldera', 'lake', 'clear water', 'fog', 'ainu'],
  false,
  ARRAY[
    'Lake Mashu''s transparency once measured 41.6 m — among the world''s highest ever recorded for a lake',
    'The lake sits 200 m below the crater rim; there is no accessible shoreline and swimming is prohibited',
    'Fog rolls in from the Okhotsk coast and fills the caldera without warning, erasing the lake from view',
    'Local legend says those who see the lake clearly on their first visit will never get married — hence the nickname "mystery lake"'
  ],
  'May–October; early morning for the best chance of a clear view',
  'About 25-min drive from Mashu Station (JR Senmo Line); limited bus service from Kawayu Onsen in summer',
  '¥450 (parking fee per vehicle; walk-in free)',
  '1–2 hours'
),

(
  'abashiri-drift-ice',
  'Abashiri Drift Ice & Aurora Icebreaker Cruise',
  'Hokkaido',
  'hokkaido',
  ARRAY['nature', 'activity'],
  'Each winter the Sea of Okhotsk freezes in Siberia and vast sheets of drift ice — up to 1 metre thick — flow south to Abashiri, turning the sea into a grinding white plain. The Aurora icebreaker smashes through these floes on 1-hour cruises, and on calm days visitors can step onto the ice itself. This is the southernmost naturally occurring drift ice on the planet.',
  'Minato-cho, Abashiri, Hokkaido',
  44.0220, 144.2730,
  'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&auto=format&fit=crop&q=80',
  ARRAY['abashiri', 'drift ice', 'hokkaido', 'okhotsk', 'icebreaker', 'winter', 'cruise'],
  true,
  ARRAY[
    'Drift ice arrives from the Amur River delta in Siberia — the southernmost naturally occurring sea ice on Earth',
    'The Aurora icebreaker runs up to 4 sailings per day in peak season; the ship''s hull crushes metre-thick ice sheets',
    'Steller sea eagles and white-tailed eagles hunt seals on the drift ice — the cruise doubles as a raptor-watching tour',
    'The Okhotsk Drift Ice Museum in Abashiri recreates the -15°C experience of standing on sea ice indoors year-round'
  ],
  'Late January–mid-March (drift ice season)',
  'From Abashiri Station, 10-min by taxi to Abashiri Port; or Memanbetsu Airport to Abashiri by bus approx. 25 min',
  '¥4,000 adult, ¥2,000 child (Aurora icebreaker cruise); advance booking strongly recommended',
  '1 hour (cruise) + travel'
),

(
  'kushiro-wetlands',
  'Kushiro Wetlands National Park',
  'Hokkaido',
  'hokkaido',
  ARRAY['nature', 'activity'],
  'Japan''s largest wetland, a peat-bog wilderness of reeds, meandering rivers and oxbow lakes covering 183 km² — a primeval landscape unchanged since the ice age. The park is the last stronghold of the red-crowned crane (tancho), the rarest crane on Earth. In winter, dozens of cranes gather at feeding stations and perform elaborate courtship dances on the snow.',
  'Hokuto, Kushiro, Hokkaido',
  43.1667, 144.3833,
  'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&auto=format&fit=crop&q=80',
  ARRAY['kushiro', 'wetlands', 'hokkaido', 'tancho', 'red-crowned crane', 'nature', 'national park'],
  false,
  ARRAY[
    'About 1,000 red-crowned cranes (tancho) live in Hokkaido — the entire wild population of the subspecies',
    'Winter feeding grounds at Tsurui village draw dozens of cranes daily; courtship dances happen January–February',
    'The Norokko Train runs along the wetland edge in summer (June–October), with open-air observation cars',
    'Canoe tours paddle the Kushiro River through a corridor of reeds where cranes, deer and foxes are commonly spotted'
  ],
  'January–February (crane dances on snow); June–October (canoeing & Norokko Train)',
  'Bus from Kushiro Station to Hosooka Observatory approx. 40 min (Akan Bus); or rental car recommended',
  'Free (wetlands & observatories)',
  '2–4 hours'
),

(
  'hakodate-mountain-night-view',
  'Mt. Hakodate Night View',
  'Hokkaido',
  'hokkaido',
  ARRAY['nature'],
  'From the 334m summit of Mt. Hakodate, the city glitters below in one of the world''s most celebrated night views — a narrow hourglass of light pinched between two bays, the dark ocean curving away on both sides. Listed alongside Naples and Hong Kong as one of the world''s three great night views, the panorama is most dramatic in the blue hour just after sunset.',
  'Hakodate-yama, Hakodate, Hokkaido',
  41.7580, 140.6980,
  'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&auto=format&fit=crop&q=80',
  ARRAY['hakodate', 'night view', 'hokkaido', 'mountain', 'ropeway', 'panorama'],
  true,
  ARRAY[
    'Hakodate''s isthmus shape creates a pinched hourglass of city lights with black ocean on both sides — unlike any other night view',
    'The summit ropeway takes 3 minutes; the observation deck at the top is open until 10pm',
    'In winter the mountain road is closed; the ropeway is the only access after October',
    'The blue hour — 20 minutes after sunset — is optimal: the sky retains colour while city lights intensify'
  ],
  'Year-round; most dramatic on clear evenings; avoid foggy days',
  'Tram to Jujigai stop then 10-min walk to ropeway base; or direct bus (Hakodate Bus route 26) from Hakodate Station',
  'Ropeway round-trip ¥1,800 adult, ¥900 child (ages 6–12)',
  '1–2 hours'
),

(
  'niseko-ski-resort',
  'Niseko United Ski Resort',
  'Hokkaido',
  'hokkaido',
  ARRAY['activity', 'nature'],
  'Asia''s premier powder skiing destination — four interconnected resorts on the flanks of the active volcano Mt. Yotei receive an average of 15 metres of feather-light JAPOWder snow per season, driven by cold air crossing the Sea of Japan and wrung dry over the mountains. In summer the resorts reinvent themselves as mountain biking and hiking hubs with Yotei''s perfect cone as a backdrop.',
  'Aza Yamada, Niseko-cho, Abuta District, Hokkaido',
  42.8060, 140.6873,
  'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&auto=format&fit=crop&q=80',
  ARRAY['niseko', 'hokkaido', 'ski', 'powder snow', 'japow', 'snowboard', 'yotei'],
  false,
  ARRAY[
    'Niseko averages 15 m of snowfall per season — among the highest recorded at any ski resort on Earth',
    'The "JAPOW" phenomenon: cold Siberian air collects moisture over the Sea of Japan then dumps ultra-dry powder on the mountains',
    'Mt. Yotei (1,898 m), visible from every run, is nicknamed "Hokkaido Fuji" for its symmetrical cone',
    'Night skiing until 9pm is available at multiple resorts, with floodlit powder runs unique in Asia'
  ],
  'December–March (ski season); July–September (mountain biking, hiking)',
  'Shuttle bus from New Chitose Airport approx. 2 hours 30 min (advance booking essential in peak season); or JR to Niseko Station then local bus',
  '1-day lift pass from ¥8,800 adult (varies by resort and season)',
  '1–7 days'
),

(
  'rebun-island',
  'Rebun Island',
  'Hokkaido',
  'hokkaido',
  ARRAY['nature', 'activity'],
  'A sliver of island 60 km off the northern tip of Hokkaido, closer to Sakhalin than to Sapporo — nicknamed "the floating island of flowers" for the 300 alpine plant species that bloom across its treeless plateau each June and July. Because the island has no mountains high enough to create snow-line conditions, these rare arctic-alpine flowers grow unusually low, just metres above sea level.',
  'Rebun-cho, Rebun District, Hokkaido',
  45.3833, 141.0333,
  'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&auto=format&fit=crop&q=80',
  ARRAY['rebun', 'hokkaido', 'island', 'flowers', 'hiking', 'northernmost', 'alpine'],
  false,
  ARRAY[
    '300 species of alpine flowers bloom on the plateau in June–July, including the rare Rebun-usuyukisou (edelweiss relative)',
    'The 8-hour hiking course traverses the full length of the island''s west coast along dramatic sea-cliff trails',
    'Sea urchin (uni) harvested in Rebun''s cold waters is regarded as some of Japan''s finest — served raw at harbour-side restaurants',
    'Cape Sukoton at the north end of the island looks across to Sakhalin on clear days'
  ],
  'June–August (flowers peak); May–September (ferry season)',
  'Ferry from Wakkanai Port approx. 2 hours (Heart Land Ferry, ¥2,570 adult one-way 2nd class). Wakkanai by JR Super Soya Ltd. Express from Sapporo approx. 5 hours',
  'Ferry fare ¥2,570 adult one-way (2nd class)',
  '1–2 days'
);
