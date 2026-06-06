insert into blog_posts (
  slug, title, description, read_minutes, cover_image,
  intro, sections, cta_heading, cta_body, related_region, status, published_at
)
values (
  'best-places-japan-without-car',
  'Best Places in Japan Without a Car',
  'Six Japanese destinations — hot spring towns, art islands, tram cities, and live volcanoes — all reachable and explorable without renting a car.',
  11,
  null,
  'Japan is one of the few countries where not having a driving licence is a genuine advantage. The public transport network is faster, cheaper, and more reliable than a car in almost every situation — and a few of the best places to visit are only reachable without one. These six destinations are the strongest arguments for leaving the keys at home.',
  '[
    {
      "heading": "Hakone — Where Japan Built Its Best Transport Network for Non-Drivers",
      "travel_time": "1.5 hrs from Tokyo by Romancecar limited express from Shinjuku to Hakone-Yumoto · no Shinkansen required",
      "best_season": "Nov for autumn colour at Lake Ashi · Jun–Jul for hydrangeas along the mountain railway · Mar–Apr for cherry blossoms",
      "body": "Hakone is the clearest proof that Japan designed some of its most spectacular landscapes for people who don''t drive. The Romancecar limited express from Shinjuku delivers you to Hakone-Yumoto in ninety minutes; from there, the Hakone-Tozan mountain railway zigzags up through forest to Gora; a funicular connects to Sounzan; the ropeway crosses the volcanic sulphur fields of Owakudani; and the Lake Ashi cruise puts you within walking distance of the Hakone Open-Air Museum on the far side. The whole circuit is a single day''s itinerary, car optional in name only.\n\nTwo days allows the loop at a slower pace and time in a ryokan onsen in the evening, which is the real reason to stay overnight rather than completing the circuit as a day trip from Tokyo. The mountain railway is at its best in June, when hydrangeas line both sides of the track; the ropeway over Owakudani — with Fuji visible on clear days in autumn and winter — is never better than from the gondola.\n\nFor a solo traveller who assumed that Japan''s natural scenery required a rental car, Hakone disproves the assumption in a single afternoon.",
      "spot_query": {"address_contains": "Hakone", "prefecture": "Kanagawa", "categories": ["onsen"], "limit": 3},
      "section_link": {"text": "Explore Kanagawa", "href": "/guides/kanagawa"}
    },
    {
      "heading": "Kinosaki Onsen — Seven Bathhouses, All Within Walking Distance",
      "travel_time": "3 hrs from Osaka by Kinosaki limited express, direct to Kinosaki Onsen station · 3.5 hrs from Kyoto",
      "best_season": "Dec–Feb for snow and yukata in the cold · Mar–Apr for cherry blossoms along the canal",
      "body": "Kinosaki Onsen is a hot spring town built along a willow-lined canal where the main attraction — seven public bathhouses, each with different architecture and water — is designed entirely around guests in yukata walking between them on foot. There is no other transport required. You arrive at the station, check into a ryokan three minutes from the platform, put on yukata, and begin the circuit on your own schedule. The whole town is four hundred metres long.\n\nTwo nights is the standard stay: one evening to try three or four bathhouses at a measured pace, one to cover the rest and revisit favourites at different times of day. The onsen passport, issued at your ryokan, covers all seven. Mornings, when the town is quiet and most guests are still sleeping, are the best time for the outdoor baths.\n\nKinosaki is the template for what an onsen town should be when the experience is designed for people who arrive by train: a single street, a clear circuit, and no reason to move faster than walking pace.",
      "spot_query": {"address_contains": "Kinosaki", "prefecture": "Hyogo", "categories": ["onsen"], "limit": 3},
      "section_link": {"text": "Explore Hyogo", "href": "/guides/hyogo"}
    },
    {
      "heading": "Naoshima — The Island You Can Only Do Justice to on Two Wheels",
      "travel_time": "2 hrs from Osaka by Shinkansen to Okayama, then Uno Line and ferry · 30 min by ferry from Uno Port",
      "best_season": "Apr–May and Sep–Oct for mild weather and shorter museum queues · Mar for the Setouchi Triennale",
      "body": "Naoshima is an island in the Seto Inland Sea that has given over large parts of its coastline to contemporary art — Tadao Ando''s Chichu Art Museum, half-buried in a hillside above the sea; the Benesse House complex; the Art House Project, where traditional wooden homes in the fishing village of Honmura have been converted into permanent installations. A car would be useless here: the roads are narrow, parking minimal, and the correct way to move between sites is by bicycle, which every accommodation on the island rents by the hour.\n\nOne full day is the minimum; two is better. The museums require advance booking and timed entries — arrive at Uno port early to get the first ferry crossing and a full morning at Chichu before the afternoon crowds. The Honmura neighbourhood, with its Art House installations and the Ando-designed hall, needs a slow afternoon on foot.\n\nFor a traveller who assumed that island Japan required organised group transport, Naoshima shows what independence on two wheels and a ferry ticket looks like.",
      "spot_query": {"address_contains": "Naoshima", "prefecture": "Kagawa", "categories": ["nature"], "limit": 3},
      "section_link": {"text": "Explore Kagawa", "href": "/guides/kagawa"}
    },
    {
      "heading": "Hiroshima — Trams to the Peace Park, Ferry to the Sacred Island",
      "travel_time": "4 hrs from Tokyo by Shinkansen · 1.5 hrs from Osaka by Shinkansen",
      "best_season": "Mar–Apr for cherry blossoms at the Peace Memorial Park · Oct–Nov for autumn colour",
      "body": "Hiroshima has one of Japan''s most complete tram networks — eight lines covering the city centre, running every few minutes and cheap enough that the bus stop map in most guidebooks is irrelevant. The Peace Memorial Museum and Peace Park sit at one end of the Hondori tram route; Hiroshima Castle and Shukkei-en garden are two stops further. Everything that matters in the city is on the tram.\n\nThe Miyajima ferry runs every fifteen minutes from Hiroshima Port — reached by tram — to the island that holds the famous floating torii gate and Itsukushima Shrine. The island is entirely on foot; no vehicles of any kind beyond the ferry. One day in the city, one morning on the island, and a Shinkansen back covers the visit comfortably; two nights adds time to both without feeling rushed.\n\nHiroshima is the city that most consistently rewards the traveller who left the car keys at home — the tram does what a car can''t, and the ferry gets you somewhere a car never could.",
      "spot_query": {"address_contains": "Hiroshima", "prefecture": "Hiroshima", "categories": ["history"], "limit": 3},
      "section_link": {"text": "Explore Hiroshima", "href": "/guides/hiroshima"}
    },
    {
      "heading": "Kagoshima — Trams, a Live Volcano, and a Fifteen-Minute Ferry",
      "travel_time": "6.5 hrs from Tokyo by Shinkansen to Kagoshima-Chuo · 3.5 hrs from Osaka by Shinkansen",
      "best_season": "Oct–Nov for clear views of Sakurajima · Mar–Apr for cherry blossoms at Shiroyama",
      "body": "Kagoshima is built on the edge of Kinko Bay, with Sakurajima — one of Japan''s most active volcanoes — visible across the water from every vantage point in the city. The city tram runs two lines through the centre, connecting Kagoshima-Chuo Shinkansen station to the port and the Tenmonkan shopping district. The ferry to Sakurajima runs from the port every fifteen minutes and takes fifteen minutes; a free bus circuit of the island''s main observation points runs from the ferry terminal on the other side, completing a half-day loop entirely without a car.\n\nOne full day in the city covers Sengan-en garden — a feudal-era estate designed with Sakurajima as borrowed landscape — the Shochu Museum, and the Tenmonkan arcade. A second day for Sakurajima allows the full volcano circuit by bus and the Yunohira Observatory, which offers the closest legal approach to the active crater. Kagoshima''s food makes the second night worthwhile: black pork tonkatsu and sweet potato shochu are both local and both good.\n\nKagoshima is where the Shinkansen ends and the tram takes over — which turns out to be entirely sufficient.",
      "spot_query": {"address_contains": "Kagoshima", "prefecture": "Kagoshima", "categories": ["nature"], "limit": 3},
      "section_link": {"text": "Explore Kagoshima", "href": "/guides/kagoshima"}
    },
    {
      "heading": "Morioka — A Castle Town That Fits Inside an Afternoon on Foot",
      "travel_time": "2 hrs from Tokyo by Tohoku Shinkansen — the fastest accessible city in northern Honshu",
      "best_season": "Late Apr–May for cherry blossoms in the castle ruins · Sep–Oct for autumn colour",
      "body": "Morioka is a castle town at the confluence of three rivers in Iwate Prefecture that is demonstrably more interesting than its low international profile suggests. The castle ruins, the Konyamachi samurai district, the Nakamuraya ironwork gallery — a working Nanbu tekki cast-iron studio — and the Hashimoto store, a Meiji-era folk craft shop, all sit within twenty minutes'' walk of each other and of Morioka station. A car would only create parking problems.\n\nOne full day covers the city; an overnight allows for the evening noodle ritual. Morioka has three local noodle traditions — wanko soba, jajamen (flat noodles with miso walnut paste), and reimen (cold Korean-style noodles from the post-war period) — and the correct approach is to try all three across two days. Pairon and Daito-en are the references for reimen; Azumaya for wanko if the theatrical bowl-stacking is part of the appeal.\n\nFor a traveller who has taken the Shinkansen to Sendai but assumed nothing further north was worth the extra hour, Morioka is the answer: two hours from Tokyo, entirely on foot.",
      "spot_query": {"address_contains": "Morioka", "prefecture": "Iwate", "categories": ["history"], "limit": 3},
      "section_link": {"text": "Explore Iwate", "href": "/guides/iwate"}
    },
    {
      "heading": "Practical Notes",
      "body": "Japan Rail Pass holders will find most of these destinations already covered: the Shinkansen to Hiroshima, Kagoshima, and Morioka; the limited expresses to Kinosaki Onsen and Hakone as far as Odawara (from which the private Odakyu Romancecar and Hakone-Tozan railway begin, requiring separate payment). Naoshima''s ferry requires separate payment regardless of pass type.\n\nIC cards — Suica and Icoca — work on local trains, trams, and buses across all six destinations and can be loaded at any major station. They make tram systems in Hiroshima and Kagoshima fully friction-free: tap in, tap out, no need to carry exact change.\n\nThe practical rule is simpler than it sounds: if a place has a tram, you don''t need a car. If it''s an island, you need a ferry, which is a better way to arrive than a car anyway. Japan''s public transport is not a concession to travellers without licences — for most of the country, it''s the correct way to move."
    }
  ]'::jsonb,
  'Find Car-Free Adventures Across Japan',
  'Use tobira to search spots and plan routes across Japan''s most rewarding car-free destinations — from art islands to live volcanoes.',
  null,
  'published',
  now()
);
