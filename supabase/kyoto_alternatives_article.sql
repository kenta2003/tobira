insert into blog_posts (
  slug, title, description, read_minutes, cover_image,
  intro, sections, cta_heading, cta_body, related_region, status, published_at
)
values (
  'kyoto-alternatives-without-crowds',
  '10 Alternatives to Kyoto Without the Crowds',
  'Ten Japanese cities that match Kyoto''s cultural depth — ancient temples, traditional crafts, and preserved feudal streets — with far fewer crowds.',
  13,
  'https://YOUR_PROJECT_REF.supabase.co/storage/v1/object/public/spot-images/blog/kyoto-alternatives-without-crowds.jpg',
  'Kyoto earns its reputation. It also earns its queues, its tour groups, and its fully booked hotels in cherry blossom season. These ten cities offer the same ancient culture and living craft traditions — with room to actually think.',
  '[
    {
      "heading": "Kanazawa — The Kyoto That Stayed",
      "travel_time": "2.5 hrs from Tokyo by Shinkansen · 2.5 hrs from Osaka by limited express",
      "best_season": "Mar–Apr for cherry blossoms · Sep–Oct for autumn colour",
      "body": "Kanazawa has the same bones as Kyoto — a geisha district, samurai quarters, and centuries of craft tradition in gold leaf and Kaga silk — but the comparison ends at the station exit. Same depth of craft tradition, none of the tour groups.\n\nTwo days is the working minimum; three allows for a Noto Peninsula detour that adds a different register of rural Japan altogether. Kenroku-en garden rewards an early arrival before the tour buses; Omicho market is best around noon when the fish stalls are at full volume.\n\nThe city''s most underrated quality is its walkability. The geisha and samurai districts are twenty minutes apart on foot, with the 21st Century Museum of Contemporary Art sitting between them. Kanazawa doesn''t require a plan.",
      "spot_query": {"address_contains": "Kanazawa", "limit": 3},
      "section_link": {"text": "Explore Ishikawa", "href": "/guides/ishikawa"}
    },
    {
      "heading": "Nara — Same Antiquity, a Quarter of the Visitors",
      "travel_time": "45 min from Kyoto by express train · 40 min from Osaka by express",
      "best_season": "Mar–Apr for cherry blossoms · Oct–Nov for autumn colour",
      "body": "Nara was Japan''s capital before Kyoto took the role, which means its temples predate Kinkaku-ji by centuries and carry a different historical weight. The Todai-ji complex, with the world''s largest bronze Buddha, draws crowds at the gate but the grounds absorb them quickly. Same ancient-capital scale, far more room between the visitors.\n\nPlan for two days at minimum. The morning light in Kasugayama Primeval Forest — a UNESCO World Heritage site connected to the main deer park — is worth staying overnight for, rather than treating Nara as a day trip from Osaka or Kyoto.\n\nNara''s underappreciated quarter is Naramachi, the old merchant district south of Kofuku-ji, where traditional machiya townhouses have become craft shops and quiet cafes. It sees a fraction of the temple-trail crowds and repays the detour.",
      "spot_query": {"address_contains": "Nara", "limit": 3},
      "section_link": {"text": "Explore Nara", "href": "/guides/nara"}
    },
    {
      "heading": "Kurashiki — Where the Merchant Quarter Survived",
      "travel_time": "3.5 hrs from Tokyo by Shinkansen · 1 hr from Osaka by Shinkansen",
      "best_season": "Mar–Apr for cherry blossoms along the canal · Oct–Nov for quieter streets",
      "body": "Kurashiki''s Bikan historical quarter is a preserved grid of white-walled storehouses along a willow-lined canal, built for Edo-period rice and cotton merchants and left largely unchanged since. It has none of Kyoto''s shrine density but the same quality of old architecture in daily use — galleries, cafes, and craft shops now occupying buildings three centuries old. Same preservation instinct, a completely different aesthetic.\n\nOne to two days covers the historical quarter; a third spent on a day trip to Naoshima island adds a contemporary art dimension that reframes the whole visit. The Ohara Museum of Art — Japan''s first Western-art museum — sits directly on the canal and deserves more time than most visitors give it.\n\nThe crowds peak on weekends between April and November. Arriving on a weekday morning, before the tour groups from Hiroshima and Osaka, gives the canal area a stillness that is worth building the trip around.",
      "spot_query": {"address_contains": "Kurashiki", "limit": 3},
      "section_link": {"text": "Explore Okayama", "href": "/guides/okayama"}
    },
    {
      "heading": "Matsue — A Castle Town on Dark Water",
      "travel_time": "3 hrs from Osaka by limited express · 6.5 hrs from Tokyo by train",
      "best_season": "Apr for cherry blossoms · Oct–Nov for autumn colour · Dec–Feb for winter solitude",
      "body": "Matsue is built around one of Japan''s few original wooden castles and the lake system that surrounds it — a geography that gives the city a moody, reflective quality quite unlike Kyoto''s landlocked density. The writer Lafcadio Hearn lived here in the 1890s and never fully recovered from it. Same castle-town character and tea ceremony culture, with a genuine local pace.\n\nTwo days covers the key sites: the castle, the Hearn residences, and the Adachi Museum of Art, whose garden is widely considered the finest in Japan. Three days adds Izumo Taisha — one of Japan''s oldest and most significant shrines, an hour west by rail — which changes the nature of the trip entirely.\n\nMatsue is genuinely undiscovered by overseas visitors in a way Kyoto hasn''t been for thirty years. Expect hotel staff who want to practise English but rarely get the chance.",
      "spot_query": {"address_contains": "Matsue", "limit": 3},
      "section_link": {"text": "Explore Shimane", "href": "/guides/shimane"}
    },
    {
      "heading": "Aizu-Wakamatsu — Where the Samurai History Is Still Raw",
      "travel_time": "3.5 hrs from Tokyo by Shinkansen and local express",
      "best_season": "Apr–May for cherry blossoms at Tsuruga Castle · Oct–Nov for autumn colour",
      "body": "Aizu-Wakamatsu is where the last serious samurai resistance happened, in 1868, and the city has never entirely processed the loss. The rebuilt Tsuruga Castle, the Byakkotai memorial on Iimori Hill, and the nearby post town of Ouchi-juku together form one of the most historically honest itineraries in Japan. Same samurai-era architecture and lacquerware craft as Kyoto, none of the softening that mass tourism brings.\n\nTwo days covers the castle, Iimori Hill, and the sake district along Nanokamachi Street. A third day adds Ouchi-juku — thirty minutes south by car or bus — where a post town preserved so completely that restaurants still serve noodles eaten with a leek in place of chopsticks.\n\nAizu lacquerware is the region''s craft tradition and worth seeking out in the shops along Nanokamachi. Unlike Kyoto''s souvenir shops, most of what''s sold here is made locally and priced for local buyers.",
      "spot_query": {"address_contains": "Aizu-Wakamatsu", "limit": 3},
      "section_link": {"text": "Explore Fukushima", "href": "/guides/fukushima"}
    },
    {
      "heading": "Hikone — A Castle Above the Lake Nobody Crowds",
      "travel_time": "1.5 hrs from Kyoto by local train · 1 hr from Osaka by train",
      "best_season": "Mar–Apr for cherry blossoms in the castle grounds · Oct–Nov for autumn colour",
      "body": "Hikone Castle sits above Lake Biwa — Japan''s largest lake — and is one of only four castles in the country designated a National Treasure. By any measure it is more impressive than Kyoto''s reconstructed Nijo Castle and sees a fraction of the visitors. Same feudal-era craftsmanship, without a single tour bus in the car park.\n\nOne full day covers the castle grounds and the adjacent Genkyuen garden, a daimyo-period design viewable from the keep above. Two days allows for a slower circuit of the old-town market arcade below the castle, which carries lacquerware and Omi silk textiles at unhurried local prices.\n\nHikone is thirty minutes by train from Kyoto and viable as a half-day trip, but it rewards an overnight. The lake provides evening and morning light that the landlocked alternatives in this list cannot.",
      "spot_query": {"address_contains": "Hikone", "limit": 3},
      "section_link": {"text": "Explore Shiga", "href": "/guides/shiga"}
    },
    {
      "heading": "Kakunodate — Samurai Streets Under Weeping Cherries",
      "travel_time": "2.5 hrs from Tokyo by Shinkansen · 40 min from Akita City by Shinkansen",
      "best_season": "Late Apr–early May for cherry blossoms (National Natural Monument) · Jul for summer festivals",
      "body": "Kakunodate''s samurai district is a straight street of black-fenced compounds flanked by weeping cherry trees — three hundred of them, planted centuries ago and designated a National Natural Monument. The architecture is Tohoku''s answer to Kyoto''s Higashiyama: same period, same purpose, a fraction of the foot traffic. Same preserved samurai district, far more snow and silence outside peak season.\n\nTwo days is the recommended stay: one in the samurai district and cherry grove, one at Tazawa-ko — Japan''s deepest lake, thirty minutes by bus — or at the Nyuto Onsen rotenburo high in the surrounding mountains. The town itself quiets by 8pm.\n\nVisit in late April when the cherry blossoms are at peak. The contrast between the dark wooden fences, white blossoms, and occasional spring snow flurry is the kind of image that doesn''t require a photographer''s eye.",
      "spot_query": {"address_contains": "Kakunodate", "limit": 3},
      "section_link": {"text": "Explore Akita", "href": "/guides/akita"}
    },
    {
      "heading": "Ise — Older Than Kyoto, Rebuilt Every Twenty Years",
      "travel_time": "1.5 hrs from Nagoya by limited express · 2 hrs from Osaka by limited express",
      "best_season": "Oct–Nov for autumn colour · Jan–Feb for the solemnity of low-season quiet",
      "body": "The Ise Grand Shrines are among the oldest in Japan and are rebuilt every twenty years using ancient carpentry techniques — an act of ritual renewal that has continued for fourteen centuries. The inner shrine, Naiku, cannot be entered or photographed beyond its first torii gate, which forces a quality of attention quite unlike Kyoto''s open-door temple circuit. Same spiritual weight as Fushimi Inari, older and more austere in every respect.\n\nOne full day covers both shrines and the Okage Yokocho historic food street; two days allows for a slower pace and the fishing harbour of Toba nearby. The approach to Naiku along the Isuzu River through cedar forest is the best walk in the region and should not be rushed.\n\nIse is not a conventional sightseeing destination. The shrines demand composure; the surrounding town is built around the ritual economy of pilgrim food and craft. Come prepared to slow down.",
      "spot_query": {"address_contains": "Ise", "limit": 3},
      "section_link": {"text": "Explore Mie", "href": "/guides/mie"}
    },
    {
      "heading": "Hagi — A Kiln Town That Forgot to Change",
      "travel_time": "4.5 hrs from Osaka by Shinkansen and express bus · 5 hrs from Hiroshima by Shinkansen and bus",
      "best_season": "Apr–May for spring light · Oct–Nov for autumn colour and the potters'' busiest season",
      "body": "Hagi is an Edo-period castle town on the Sea of Japan coast that produced more Meiji-era reformers per square kilometre than anywhere else in the country — and it shows in the intensity with which the city preserves its streets. The castle ruins, samurai and merchant districts, and the Hagi-yaki pottery tradition occupy a compact town that sees a fraction of the traffic of comparable Kyoto neighbourhoods. Same Edo-period town plan still walkable today, kiln culture instead of weaving.\n\nTwo days is the right amount of time: one for the historical quarter and castle ruins, one for the pottery studios in the residential streets west of the centre, where working kilns allow visitors to observe and sometimes participate in the making process. Hagi-yaki tea bowls are among the most respected in Japan.\n\nGetting here requires commitment — Hagi is not on the Shinkansen line. That difficulty is, in a sense, the city''s most reliable quality control.",
      "spot_query": {"address_contains": "Hagi", "limit": 3},
      "section_link": {"text": "Explore Yamaguchi", "href": "/guides/yamaguchi"}
    },
    {
      "heading": "Kamakura — Ancient Temples With the Sea Behind Them",
      "travel_time": "1 hr from Tokyo by train · 45 min from Yokohama by train",
      "best_season": "Late Jun–early Jul for hydrangea blooms on the temple trails · Oct–Nov for autumn colour",
      "body": "Kamakura was Japan''s political capital in the thirteenth century and built accordingly — over seventy temples and shrines concentrated across a valley system backed by wooded hills and opening to the sea. The Great Buddha at Kotoku-in sits in the open air; the hiking trails between shrines offer a register of the city entirely unlike the street-level circuit. Same density of significant religious architecture as Kyoto, with an ocean view at the end of most paths.\n\nTwo days is the practical minimum; three is better. Day one covers the main sites — Kenchoji, Engakuji, Kotoku-in — on foot and by the Enoden coastal railway. Day two reaches Hokokuji''s bamboo grove (less famous than Arashiyama, quieter, and honest about its scale) and the clifftop paths above Sagami Bay.\n\nKamakura''s proximity to Tokyo makes it a popular weekend day trip. Arriving on a weekday morning is the difference between a crowd and a considered visit; staying overnight is the difference between a considered visit and an actual one.",
      "spot_query": {"address_contains": "Kamakura", "limit": 3},
      "section_link": {"text": "Explore Kanagawa", "href": "/guides/kanagawa"}
    },
    {
      "heading": "How to Choose",
      "body": "The simplest way to decide is by what drew you to Kyoto in the first place. If it was the temples and shrines, Nara and Kamakura have the density. If it was the preserved streetscapes, Kurashiki and Hagi have the architecture. If it was the craft tradition, Kanazawa and Aizu-Wakamatsu have the depth.\n\nFor travellers with limited time, Hikone and Nara are both within ninety minutes of Kyoto and pair naturally with it on an existing itinerary — no extra logistics required. For those willing to commit to a longer journey, Matsue and Kakunodate offer the reward of places that international tourism hasn''t yet standardised.\n\nOne practical note: the further from the Tokaido Shinkansen line, the more the crowds drop. Hagi, Matsue, and Aizu-Wakamatsu are all a deliberate journey rather than a convenient detour. That inconvenience, more than anything else on this list, is what keeps them the way they are."
    }
  ]'::jsonb,
  'Find Your Quiet Alternative to Kyoto',
  'Use tobira to search spots, plan routes, and discover where to stay across Japan''s less-visited cultural cities.',
  null,
  'published',
  now()
);
