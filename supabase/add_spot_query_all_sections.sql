-- 全セクションから手動 image を削除し、spot_query を追加
-- → 各セクションがマッチしたスポットの画像を自動で使うようになる
-- Run in Supabase SQL Editor

update blog_posts
set sections = '[
  {
    "heading": "Kanazawa — The Kyoto Nobody Told You About",
    "body": "On the Sea of Japan coast, Kanazawa was one of the few major cities never bombed during World War II. The result is an intact old quarter of samurai residences, geisha districts, and teahouses that feels genuinely lived-in rather than preserved for tourism.\n\nKenroku-en, one of Japan''s three great gardens, is worth the visit alone — but the real draw is wandering the Higashi Chaya district at dusk, or finding a counter seat in the Omicho market fish hall for a bowl of fresh seafood on rice. Kanazawa is the food capital of the Hokuriku coast, and that''s a high bar. Shinkansen from Tokyo: 2.5 hours.",
    "spot_query": { "address_contains": "Kanazawa", "limit": 3 },
    "section_link": { "text": "Explore Kanazawa & Ishikawa", "href": "/guides/ishikawa" }
  },
  {
    "heading": "Yakushima — A Forest That Predates Civilisation",
    "body": "The island of Yakushima sits off the southern tip of Kyushu, and its interior is ancient in a way that''s hard to convey in photographs. The yakusugi cedar trees — some over 3,000 years old — grow through moss-covered terrain that inspired the landscapes of Princess Mononoke. Rainfall here is measured in metres, not centimetres, which is why the forest looks the way it does.\n\nThe Jomonsugi hike, at 22km round-trip, is the main event — but the island has beaches where sea turtles nest, waterfalls that drop directly into the sea, and a handful of onsen that cost almost nothing. This is one of the few places in Japan that genuinely feels wild.",
    "spot_query": { "address_contains": "Yakushima", "limit": 3 },
    "section_link": { "text": "Explore Kagoshima", "href": "/guides/kagoshima" }
  },
  {
    "heading": "Matsumoto — A Castle Town in the Alps",
    "body": "The Japanese Alps don''t get the attention of the Swiss or French equivalents, but the scenery is comparable and the access is far easier. Matsumoto sits at the foot of the Azumino valley and makes a practical base for both mountain and city experiences.\n\nThe centrepiece is Matsumoto Castle — jet-black and reflected in its surrounding moat, it''s the oldest surviving original castle in Japan. The old town around it has galleries, sake breweries, and craft shops that don''t feel like tourist traps. From here, the Kamikochi valley is 90 minutes by bus: glacially carved, ringed by 3,000-metre peaks, and closed to private vehicles. Late October brings foliage that competes with anything in Nikko.",
    "spot_query": { "address_contains": "Matsumoto", "limit": 3 },
    "section_link": { "text": "Explore Nagano", "href": "/guides/nagano" }
  },
  {
    "heading": "Beppu — Where the Earth Is Still Boiling",
    "body": "Beppu, on the east coast of Kyushu, produces more geothermal output than anywhere in Japan outside of Hokkaido. The city has eight geothermal zones — called the ''Hells'' — where boiling water erupts in different colours: blood red, cobalt blue, grey mud. These are not spa resorts. They''re geological phenomena that happen to be within a medium-sized Japanese city.\n\nBut Beppu is also a serious onsen town. The variety of baths is unusual even by Japanese standards — sand baths where attendants bury you to the neck, steam rooms built over vents in the ground, and rotenburo with views of Beppu Bay. It''s one of the more genuinely strange places in the country, and it rewards two nights.",
    "spot_query": { "address_contains": "Beppu", "limit": 3 },
    "section_link": { "text": "Explore all Oita spots", "href": "/guides/oita" }
  },
  {
    "heading": "Aomori — The Apple Country at the Top of Honshu",
    "body": "Most Tohoku itineraries end in Sendai. That''s a mistake. Aomori, at the very top of Honshu, is the jumping-off point for Osorezan — a volcanic crater lake that''s been associated with the entrance to the underworld for over a thousand years — and the Shirakami-Sanchi beech forest, a UNESCO site that spans the prefecture''s mountainous interior.\n\nThe city itself is best in August, when the Nebuta festival fills the streets with enormous illuminated floats carried through the night by dancing crowds. Outside festival season, the market at Furukawa serves the best scallops you''re likely to eat anywhere, and the Aomori Museum of Art contains a Chagall stage backdrop — the largest Chagall work outside Russia — that most people in Japan don''t know exists.",
    "spot_query": { "prefecture": "Aomori", "limit": 3 },
    "section_link": { "text": "Explore Aomori", "href": "/guides/aomori" }
  },
  {
    "heading": "The Noto Peninsula — Where Japan Slows Down",
    "body": "The Noto Peninsula juts into the Sea of Japan from Ishikawa Prefecture, and it operates at a different pace from almost everywhere else in the country. The coastline on the western side — called the Okunoto — has cliffs, sea stacks, and small fishing villages where families have been salt-farming for centuries.\n\nNoto was severely damaged by the January 2024 earthquake, and the recovery is ongoing. Visiting now is both an act of support for local businesses and an opportunity to see a part of Japan that few international travellers ever reach. The ryokan on the coast here — old wooden buildings with seafood dinners and outdoor baths facing the water — represent a kind of slow travel that''s increasingly rare.",
    "spot_query": { "address_contains": "Noto", "limit": 3 },
    "section_link": { "text": "Explore Ishikawa", "href": "/guides/ishikawa" }
  },
  {
    "heading": "Naoshima — Where Art Colonised an Island",
    "body": "The islands of the Seto Inland Sea were depopulating by the 1980s — fishing industries declining, young people leaving. Then the Benesse Foundation chose Naoshima as the site for a long-term art installation project, and the result is something that doesn''t exist anywhere else: a semi-rural island where Tadao Ando-designed museums are built into hillsides, where houses in the old fishing village have been converted into site-specific artworks, where Yayoi Kusama''s polka-dotted pumpkins sit on the end of a pier.\n\nNaoshima is 50 minutes by ferry from Takamatsu. The Chichu Art Museum alone — three Monets, a James Turrell, and a Walter De Maria, all in a building entirely below ground — is one of the most affecting experiences in Japan.",
    "spot_query": { "address_contains": "Naoshima", "limit": 3 },
    "section_link": { "text": "Explore Kagawa", "href": "/guides/kagawa" }
  },
  {
    "heading": "How Far to Go",
    "body": "The destinations above are not particularly difficult to reach. Kanazawa has direct shinkansen from Tokyo and Osaka. Yakushima has flights from Kagoshima. Matsumoto is two hours from Shinjuku by limited express. Naoshima is a short ferry from the main Shikoku rail network.\n\nThe barrier is not logistics. It''s habit — the tendency to return to the same itinerary because it''s proven. Japan is unusually good at rewarding travellers who deviate from it. These places have been waiting."
  }
]'::jsonb
where slug = 'best-places-in-japan-beyond-tokyo';
