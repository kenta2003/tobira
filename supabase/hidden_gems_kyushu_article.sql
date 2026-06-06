insert into blog_posts (
  slug, title, description, read_minutes, cover_image,
  intro, sections, cta_heading, cta_body, related_region, status, published_at
)
values (
  'hidden-gems-kyushu',
  'Best Hidden Gems in Kyushu',
  'Beyond Fukuoka and Beppu, Kyushu holds seven destinations worth the trip — Nagasaki, Takachiho, Arita porcelain, island churches, and volcanic mountain shrines.',
  12,
  'https://YOUR_PROJECT_REF.supabase.co/storage/v1/object/public/spot-images/blog/hidden-gems-kyushu.jpg',
  'Fukuoka is where most visitors to Kyushu start. Beppu is where they discover hot springs. These seven places are what comes after — the version of Kyushu that has nothing to prove and nowhere to be.',
  '[
    {
      "heading": "Nagasaki — Japan''s Only City That Never Quite Belonged",
      "travel_time": "2 hrs from Hakata by limited express",
      "best_season": "Nov–Mar for Nagasaki Lantern Festival · Apr–May for Glover Garden in bloom",
      "body": "Nagasaki spent two centuries as Japan''s only open port during the Edo period, absorbing Dutch trade, Portuguese Christianity, and Chinese commerce while the rest of the country stayed closed. The result is an urban texture that exists nowhere else in Japan — Glover Garden''s colonial mansions, the reconstructed Dejima trading post, and Sofuku-ji temple all within thirty minutes of each other. If you''ve seen how Japan presented itself in Fukuoka, Nagasaki shows how it was forced to negotiate with the outside world.\n\nTwo days is the right amount of time. The Atomic Bomb Museum and Hypocenter Park require most of the first afternoon, and they demand a different quality of attention than the rest of the city. The second day covers the Hollander Slope, the Chinese quarter around Sofuku-ji, and the harbour. Nagasaki chanpon and kakuni manju belong in the itinerary.\n\nFor a traveller who has done Fukuoka''s food scene and Beppu''s steam, Nagasaki offers something rarer: a Japanese city with a genuinely complicated history it hasn''t smoothed over for visitors.",
      "spot_query": {"address_contains": "Nagasaki", "prefecture": "Nagasaki", "categories": ["history"], "limit": 3},
      "section_link": {"text": "Explore Nagasaki", "href": "/guides/nagasaki"}
    },
    {
      "heading": "Yufuin — Beppu''s Quieter, More Considered Neighbour",
      "travel_time": "2 hrs from Hakata by the Yufuin no Mori limited express",
      "best_season": "Nov for autumn colour and low crowds · Jun for misty rainy season atmosphere",
      "body": "Yufuin sits in a mountain basin overlooked by the volcanic double peak of Yufu-dake, an hour from Beppu by road but entirely different in character. Where Beppu is industrial and proudly loud about it, Yufuin operates on a smaller, more deliberate scale — boutique ryokan with private rotenburo, art galleries in converted farmhouses, and a lake you can walk around before breakfast. The onsen here are gentler in smell and temperature, suited to a longer soak than Beppu''s more dramatic springs.\n\nTwo days gives a rhythm the place rewards. Arrive late afternoon, onsen before dinner, walk around Kinrin-ko lake at dawn. The morning mist over the rice paddies, with Yufu-dake behind, is the image that most photographs of the area try and mostly fail to capture. The craft shops along the main lane are at their quietest before 10am.\n\nIf Beppu is the reason you came to Oita, Yufuin is the reason you stayed.",
      "spot_query": {"address_contains": "Yufuin", "prefecture": "Oita", "categories": ["onsen"], "limit": 3},
      "section_link": {"text": "Explore Oita", "href": "/guides/oita"}
    },
    {
      "heading": "Takachiho — Where the Mythology Is Built Into the Gorge",
      "travel_time": "3.5 hrs from Hakata by express bus",
      "best_season": "Oct–Nov for autumn colour · Jul for the Takachiho Yokagura night dance festival",
      "body": "Takachiho Gorge is a two-kilometre stretch of river canyon cut through volcanic basalt, with a waterfall dropping directly into the boat-hire pool at the bottom. The mythology around it is older than written Japanese history: the Ama-no-Iwato cave, where Amaterasu is said to have hidden, is ten minutes away by road, and the ritual Yokagura dance performed at Takachiho Shrine traces its origins to that event. The geography and the religion here occupy the same territory.\n\nTwo days makes the visit worthwhile given the journey. The gorge boats operate from sunrise — arrive early and you''ll have the canyon almost entirely to yourself, the mist still sitting in the basalt columns. The night kagura performance, held in the shrine grounds on Friday and Saturday evenings, runs three hours and stages scenes from the founding myths of Japan. It is unlike anything else in the country.\n\nIf the food scene in Fukuoka satisfied one appetite, Takachiho answers a different question about what Japan was before it became a destination.",
      "spot_query": {"address_contains": "Takachiho", "prefecture": "Miyazaki", "categories": ["nature"], "limit": 3},
      "section_link": {"text": "Explore Miyazaki", "href": "/guides/miyazaki"}
    },
    {
      "heading": "Arita — Four Hundred Years of Porcelain, Still in Production",
      "travel_time": "1 hr from Hakata by train",
      "best_season": "Apr–May for the Arita Ceramic Fair · Oct for quieter kiln visits",
      "body": "Arita produced Japan''s first true porcelain in 1616 and has continued making it on the same ridge of kaolin-rich clay ever since. The main street is a long row of showrooms, each representing a different kiln family, with prices running from a hundred yen for a sake cup to several thousand for a hand-painted charger that may have months of work behind it. This is not a museum town — the kilns are working and the craft is alive.\n\nOne full day is enough; two allows for visits to production facilities and the Kyushu Ceramic Museum, which traces the full arc of porcelain from Arita''s founding through the export period when European royalty collected it as status objects. The neighbouring town of Imari, ten minutes by bus, adds Imari-style decorated ware to the comparison.\n\nFor a traveller who has shopped Fukuoka''s markets and drunk sake in Beppu''s street bars, Arita offers the thing that actually goes home and stays useful.",
      "spot_query": {"address_contains": "Arita", "prefecture": "Saga", "categories": ["history"], "limit": 3},
      "section_link": {"text": "Explore Saga", "href": "/guides/saga"}
    },
    {
      "heading": "Amakusa — Christianity''s Last Stronghold, Mostly Forgotten",
      "travel_time": "2.5 hrs from Hakata by Shinkansen to Kumamoto, then ferry or bus",
      "best_season": "Mar–Nov for sea crossings and dolphin watching · Jan–Feb for the emptiest beaches in Kyushu",
      "body": "The Amakusa Islands were the last place in Japan where Christianity survived the Edo period''s systematic suppression — practised in secret for two and a half centuries until the ban was lifted in 1873. The result is a scattered landscape of small Catholic churches, some barely larger than a village hall, tucked into fishing communities on islands connected by a chain of five bridges. The Amakusa Rosario Museum handles the history; the churches themselves are active and visited by almost no one from outside the prefecture.\n\nTwo days covers the main island circuit by rental car — the bridges span thirty kilometres of island chain — with time for dolphin watching in Itsuwawan Bay, where a resident pod operates year-round. The local fish markets open at dawn and the hairtail caught here is the best reason to eat in the area.\n\nFor a traveller who has seen how Japan presents its history in Fukuoka''s museums, Amakusa shows what that history preferred not to discuss.",
      "spot_query": {"address_contains": "Amakusa", "prefecture": "Kumamoto", "categories": ["history"], "limit": 3},
      "section_link": {"text": "Explore Kumamoto", "href": "/guides/kumamoto"}
    },
    {
      "heading": "Kirishima — Where the Volcanoes and the Shrines Share the Same Ridge",
      "travel_time": "2.5 hrs from Hakata by Shinkansen to Kagoshima-Chuo, then local train and bus",
      "best_season": "Apr–May for azalea blooms across the volcanic terrain · Oct–Nov for autumn colour and clear views of Sakurajima",
      "body": "Kirishima is a chain of volcanic peaks with the Kirishima Jingu shrine — one of the oldest Shinto shrines in Japan — built directly into the mountain complex at an elevation where the forest opens and the clouds sit at eye level. The hiking trails between peaks pass crater lakes of different colours, sulphur vents, and viewpoints over Kagoshima Bay with Sakurajima in the distance. The mountains are both actively volcanic and ritually significant.\n\nTwo days gives time for a serious hike — the Ebino Kogen plateau is the main base — and the area''s onsen, which use the volcanic groundwater differently from Beppu: lower sulphur, higher mineral content, suited to the overnight bath rather than the quick dip. The ryokan in Kirishima-Jingu town are small and personal in a way the larger onsen resorts around Beppu are not.\n\nFor a traveller who found Beppu''s steam impressive but industrial, Kirishima shows what Kyushu''s volcanic activity looks like when it''s still in the mountains.",
      "spot_query": {"address_contains": "Kirishima", "prefecture": "Kagoshima", "categories": ["nature"], "limit": 3},
      "section_link": {"text": "Explore Kagoshima", "href": "/guides/kagoshima"}
    },
    {
      "heading": "Yanagawa — Canal Town, Eel Broths, and a Different Kind of Fukuoka",
      "travel_time": "1 hr from Hakata by Nishitetsu express",
      "best_season": "Mar–Apr for cherry blossoms along the canals · Oct–Nov for autumn colour and cooler boat rides",
      "body": "Yanagawa is a former castle town built around a network of moats and canals dug for defensive purposes in the Edo period, now used as the main attraction — flat-bottomed boats poled slowly through willow-lined waterways while the boatman sings a local rowing song. The city is quiet, well-preserved, and sees mostly domestic visitors. It produces the best unagi in Kyushu: specifically mushi-unagi, steamed then grilled, served over rice in lacquered boxes, and the difference from standard grilled eel is worth making the trip for.\n\nOne full day is the right amount. The canal circuit by boat takes ninety minutes; the Ohana garden and villa — a Meiji-era estate that belonged to the local feudal lord''s family — takes an hour more. Eat at Wakaebisho or Motoyoshiya, both on the main canal, and you''ve done Yanagawa correctly.\n\nFor a traveller who has eaten through Fukuoka''s Tenjin food stalls, Yanagawa offers the one dish Fukuoka city doesn''t quite pull off.",
      "spot_query": {"address_contains": "Yanagawa", "prefecture": "Fukuoka", "categories": ["food"], "limit": 3},
      "section_link": {"text": "Explore Fukuoka", "href": "/guides/fukuoka"}
    },
    {
      "heading": "How to Plan Your Route",
      "body": "Most of these places work as day trips from Fukuoka, but all of them reward a night or two on site. The Hakata–Nagasaki corridor and the Hakata–Arita section are the most efficient starting points; from either, you can build a loop south through Kumamoto (Amakusa) and Kagoshima (Kirishima) before returning via Miyazaki (Takachiho).\n\nRental car is the honest answer for Amakusa and Takachiho, where public transport runs infrequently and the distances between sites are long. For Nagasaki, Yufuin, Arita, and Yanagawa, the train connections from Hakata are reliable enough that a car is optional.\n\nOne practical note: Kyushu''s interior is much less visited than its coastal cities, and the accommodation options reflect that. Book ahead in cherry blossom season (late March to early April) and autumn (late October to early November), when domestic travellers fill the smaller ryokan weeks in advance."
    }
  ]'::jsonb,
  'Find Your Next Stop in Kyushu',
  'Use tobira to explore spots, plan routes, and find where to stay across Kyushu''s most overlooked prefectures.',
  null,
  'published',
  now()
);
