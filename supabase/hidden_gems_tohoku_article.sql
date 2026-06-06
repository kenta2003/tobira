insert into blog_posts (
  slug, title, description, read_minutes, cover_image,
  intro, sections, cta_heading, cta_body, related_region, status, published_at
)
values (
  'hidden-gems-tohoku',
  'Best Hidden Gems in Tohoku',
  'Six Tohoku destinations reachable by Shinkansen from Tokyo — Hiraizumi''s golden temples, Ginzan Onsen under snow, Lake Towada, and the kura warehouses of Kitakata.',
  11,
  null,
  'Most travellers treat Tohoku as too far and too cold. The Tohoku Shinkansen reaches Morioka in two hours and Shin-Aomori in three, which reframes the question. These six destinations are what the extra hour north looks like.',
  '[
    {
      "heading": "Hiraizumi — The Golden City That Burned and Left Its Temples Standing",
      "travel_time": "2.5 hrs from Tokyo by Tohoku Shinkansen to Ichinoseki, then 8 min by local train",
      "best_season": "Apr–May for cherry blossoms at Motsuji · Oct–Nov for autumn colour",
      "body": "Hiraizumi was the capital of the Northern Fujiwara clan in the 12th century — a city that briefly rivalled Kyoto in ambition and was burned to the ground within a generation. What survived is Konjiki-do, a small golden hall inside Chusonji temple covered entirely in gold leaf and mother-of-pearl inlay, and the garden temple of Motsuji, one of Japan''s oldest surviving Pure Land gardens. UNESCO listed the complex in 2011; the crowds have not yet caught up with the designation.\n\nOne full day is enough; two allows for a slower reading of the sites. The queue for Konjiki-do''s inner viewing is short but the hall itself is small — arrive as early as the site opens. Motsuji''s pond garden is best in the early morning before the coach tours arrive from Sendai.\n\nFor a traveller who has done Kyoto''s temple circuit, Hiraizumi offers the same quality of historical architecture with a different emotional register: less ceremony, more surviving against the odds.",
      "spot_query": {"address_contains": "Hiraizumi", "prefecture": "Iwate", "categories": ["history"], "limit": 3},
      "section_link": {"text": "Explore Iwate", "href": "/guides/iwate"}
    },
    {
      "heading": "Matsushima — Two Hundred and Sixty Islands and One Serious Zen Temple",
      "travel_time": "1.5 hrs from Tokyo by Tohoku Shinkansen to Sendai, then 40 min by local train",
      "best_season": "Mar–Apr for cherry blossoms · Oct–Nov for autumn colour over the bay",
      "body": "Matsushima Bay holds 260 pine-covered islands in varying shapes and sizes, and has been considered one of Japan''s three great views since the Edo period. The view is genuine — the bay at dawn, before the tourist boats start, is as good as the reputation suggests. Zuiganji temple, a major Zen complex rebuilt by Date Masamune in the early 17th century, anchors the town and gives it a weight the island view alone wouldn''t supply.\n\nOne day is the standard visit; an overnight allows for the bay at twilight and morning, which are its best two hours. Tourist boats run every thirty minutes between the islands. The Kanrantei teahouse on the waterfront — a structure moved here by Date Masamune — takes fifteen minutes but repays the entrance fee.\n\nFor a traveller arriving from Tokyo, Matsushima is the first confirmation that Tohoku has its own distinct visual register — and that getting here took less time than the journey to Kyoto.",
      "spot_ids": ["matsushima-bay"],
      "section_link": {"text": "Explore Miyagi", "href": "/guides/miyagi"}
    },
    {
      "heading": "Ginzan Onsen — The Hot Spring Village That Looks Best Under Snow",
      "travel_time": "3 hrs from Tokyo by Yamagata Shinkansen to Oishida, then 30 min by bus",
      "best_season": "Dec–Feb for snow-covered wooden facades · Oct–Nov for autumn colour",
      "body": "Ginzan Onsen is a single street of three-storey Taisho-era ryokan built along both sides of a mountain stream, lit by gas lanterns at night and buried in snow for four months of the year. The silver mine that gave the village its name exhausted itself centuries ago; the hot springs stayed. It is exactly what it appears to be in photographs, which is unusual and worth noting.\n\nTwo nights is the ideal stay: one to arrive and absorb, one to use the onsen correctly — morning bath before breakfast, light walk in the snow, afternoon bath, dinner. The ryokan here serve kaiseki at a standard that the price point doesn''t immediately suggest. Reserve three to six months ahead for winter weekends.\n\nFor a traveller who has dismissed Japanese hot spring villages as over-photographed, Ginzan is the one that earns the pictures.",
      "spot_query": {"address_contains": "Ginzan", "prefecture": "Yamagata", "categories": ["onsen"], "limit": 3},
      "section_link": {"text": "Explore Yamagata", "href": "/guides/yamagata"}
    },
    {
      "heading": "Nyuto Onsen — Seven Inns at the End of a Mountain Road",
      "travel_time": "3.5 hrs from Tokyo by Akita Shinkansen to Tazawa-ko, then 40 min by bus",
      "best_season": "Dec–Mar for snow rotenburo · Oct for autumn colour in the beech forest",
      "body": "Nyuto Onsen is a cluster of seven separate hot spring inns deep in the Akita mountains, each with its own source and rotenburo open to the forest. The waters range in colour from milky white — Tsuru-no-yu, the oldest and most photographed — to clear and sulphurous. The road in is a single lane through beech forest; the car park at Tsuru-no-yu fills by 9am on any weekend between October and March. Arrive on a weekday.\n\nOne night is the minimum; two nights between different inns is the way to understand the variation in the springs. The mixed outdoor bath at Tsuru-no-yu, set in a clearing in the forest, is the image that most rotenburo photographs attempt to replicate. Book directly and three months ahead for winter.\n\nFor a traveller who found Beppu''s onsen impressive but industrial, Nyuto shows what the same volcanic activity looks like when it''s left in the forest.",
      "spot_ids": ["nyuto-onsen"],
      "section_link": {"text": "Explore Akita", "href": "/guides/akita"}
    },
    {
      "heading": "Towada — A Crater Lake and a Contemporary Art Museum at the End of the Line",
      "travel_time": "3 hrs from Tokyo by Tohoku Shinkansen to Hachinohe, then 2 hrs by bus to the lake",
      "best_season": "Mid-Oct–early Nov for Oirase Gorge autumn colour · Jun–Sep for hiking season",
      "body": "Lake Towada is a double-caldera lake in the mountains of northern Aomori, cold and clear in a way that lowland lakes are not. The Oirase Stream flows eleven kilometres from the lake through a basalt gorge to the east — the trail alongside it is flat, forested, and at its best in the third week of October when the beech trees colour. The Towada Art Center in the city of Towada-shi, an hour north by bus, adds contemporary art at scale: Yayoi Kusama, Ron Mueck, and outdoor installations spread across the surrounding streets.\n\nTwo days structures the visit naturally: the first for the gorge trail and lake, the second for the art centre and the rental bicycle circuit of its outdoor works. The two sites are different enough in character that the combination doesn''t feel forced.\n\nFor a traveller who assumed the Shinkansen''s northern terminus meant the end of interesting Japan, Towada makes the counter-argument.",
      "spot_query": {"address_contains": "Towada", "prefecture": "Aomori", "categories": ["nature"], "limit": 3},
      "section_link": {"text": "Explore Aomori", "href": "/guides/aomori"}
    },
    {
      "heading": "Kitakata — Three Thousand Storehouses and Ramen Before 8am",
      "travel_time": "3 hrs from Tokyo by Tohoku Shinkansen to Koriyama, then local train via Aizu-Wakamatsu",
      "best_season": "Apr for cherry blossoms · Oct–Nov for kura in autumn light · Dec–Feb for winter ramen culture",
      "body": "Kitakata has more kura — traditional clay-and-tile storehouses — per capita than any other city in Japan: over three thousand, built by Meiji-era merchants to store sake, miso, and tobacco in a region known for humidity and cold winters. They are not a museum exhibit; they are the walls of the city, repurposed as breweries, restaurants, galleries, and the occasional convenience store front. The aesthetic is consistent in a way that preserved post-towns rarely are.\n\nOne full day covers the main kura district on foot and the sake brewery tours — Yamatogawa Shuzo is the most accessible, with a museum attached — and still leaves time for the city''s main idiosyncrasy: a culture of eating ramen before 8am. Kitakata-style ramen uses flat wheat noodles in a clear soy broth, and the queues at the better shops form before most visitors have left their ryokan.\n\nFor a traveller who has absorbed Aizu-Wakamatsu''s samurai history on a previous trip, Kitakata is the merchant counterpart — the same Fukushima, a different set of values.",
      "spot_query": {"address_contains": "Kitakata", "prefecture": "Fukushima", "categories": ["history"], "limit": 3},
      "section_link": {"text": "Explore Fukushima", "href": "/guides/fukushima"}
    },
    {
      "heading": "When to Go",
      "body": "Tohoku runs about two weeks behind Tokyo in the cherry blossom calendar, which means late April to early May is the peak for most of the region. Hiraizumi''s Motsuji garden and Matsushima bay are at their best in that window. Avoid Golden Week — the first week of May — for Matsushima and Ginzan Onsen, which fill entirely with domestic visitors.\n\nAutumn makes the stronger argument for a first visit. The beech forests around Nyuto Onsen and the Oirase Gorge trail near Lake Towada colour earlier and more intensely than anywhere else in Honshu. Mid-October to early November, when the colour has moved from the mountain tops down to the valley floors, is the time to go.\n\nWinter is the region''s most honest season and its least visited. Ginzan Onsen under snow is the best reason; Hiraizumi in January, Chusonji temple empty of tourists, is close behind. The Tohoku Shinkansen runs reliably through snow; the cold is real but the infrastructure handles it."
    }
  ]'::jsonb,
  'Plan Your Tohoku Journey from Tokyo',
  'Use tobira to explore spots, plan routes, and find where to stay across Tohoku''s six prefectures.',
  null,
  'published',
  now()
);
