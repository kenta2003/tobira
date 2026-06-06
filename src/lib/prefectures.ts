import type { Prefecture } from '@/types';

export const PREFECTURE_INTRO: Record<Prefecture, string> = {
  Hokkaido:
    "Japan's wild northern frontier — vast national parks, volcanic landscapes, and some of the country's best skiing and seafood. Each season brings a dramatically different character: white powder snow and ski resorts in winter, lavender fields and wildflower meadows in summer, and fiery foliage blanketing the hills each autumn.",

  Aomori:
    "The end of Honshu's mainland, where Tohoku's spirit runs deepest. Home to the iconic Nebuta Festival, the sacred volcanic caldera of Osorezan, and some of Japan's finest apples and scallops. The Shirakami-Sanchi beech forest — a UNESCO World Heritage site — stretches unspoiled across the mountains in primeval silence.",

  Iwate:
    "Japan's second-largest prefecture by area, yet one of its least visited — which is exactly the appeal. The scenic Sanriku coastline, the medieval pilgrimage temple of Chūsonji, and traditional Nambu ironware make Iwate a destination for travelers seeking depth over crowds and time over itineraries.",

  Miyagi:
    "Gateway to Tohoku, anchored by the vibrant city of Sendai. Matsushima Bay — one of Japan's classically celebrated 'three views' — scatters 260 pine-covered islands across a misty sea. Gyūtan (grilled beef tongue) and fresh Pacific oysters are local staples worth building a meal around.",

  Akita:
    "Known for long winters, exceptional nihonshu (sake), and the strikingly serene Kakunodate samurai district, lined with weeping cherry trees and preserved kura storehouses. The Oga Peninsula's Namahage demon tradition and the mirror-still Tazawako — Japan's deepest lake — capture Akita at its most elemental.",

  Yamagata:
    "A prefecture shaped by mountains and seasons. The Three Dewa Shrines draw ascetic pilgrims year-round; Zao Onsen hosts Japan's most dramatic snow-monster trees; and the cliff-clinging Yamadera temple offers vistas that moved poet Matsuo Bashō to verse. Cherry blossoms, tart cherries, and tender Yonezawa beef complete the picture.",

  Fukushima:
    "Larger than many imagine, Fukushima spans the sake-and-lacquerware Aizu basin in the west, the highland marshes of Oze in the north, and the rugged Pacific Hamadori coast in the east. Tsurugajo Castle in Aizu-Wakamatsu stands among Japan's most storied strongholds; the Ouchi-juku post town feels genuinely lifted from the Edo period.",

  Tokyo:
    "Japan's electric capital and one of the world's most layered cities. Beyond the neon and the queues, Tokyo rewards slow exploration — backstreet kissaten coffee shops, neighborhood shotengai shopping arcades, deep izakaya culture, and the kind of obsessive craft and quality found in only a handful of cities on earth. Every district tells a different story.",

  Kanagawa:
    "South of Tokyo, Kanagawa packs remarkable variety into a small space. Kamakura's Great Buddha and bamboo groves, the cosmopolitan port city of Yokohama with its Chinatown and warehouses-turned-galleries, and the laid-back surf culture of the Shonan coast — all within an hour of the capital.",

  Saitama:
    "Often overlooked as Tokyo's commuter belt, Saitama holds its own quiet pleasures: the Kawagoe 'Little Edo' historic district with its clay-walled kura storehouses, the scenic mountain valley of Chichibu and its night festival, and the vast Musashi-Kyuryo national park where cycling trails wind through 304 hectares of green.",

  Chiba:
    "Stretching into the Pacific, Chiba offers the dramatic Boso Peninsula coastline, ancient cedar forests at Kominato, and the monzenmachi temple-town atmosphere of Naritasan. Insider food culture runs deep here — fresh seafood from Tokyo Bay and a peanut-rich local cuisine are among the prefecture's most authentic pleasures.",

  Ibaraki:
    "Ibaraki wears its achievements quietly. The Mito Kairaku-en, one of Japan's three great gardens, reaches its peak during plum blossom season when over 3,000 trees bloom in concert. Mount Tsukuba — one of the country's 100 famous mountains — offers sweeping Kanto plains views without the Fuji-area crowds. This is also where Japan's natto fermented soybean tradition was born.",

  Tochigi:
    "Home to Nikko — the lavish Edo-period mausoleum complex set deep in ancient cedar forests and listed as a UNESCO World Heritage Site. Beyond Nikko: Nasu's highland onsen resorts, the century-old wisteria tunnels of Ashikaga, and Tochigi city's quiet canal-lined historic center offer far more than one trip can hold.",

  Gunma:
    "Ringed by mountains and blessed with hot springs, Gunma is where Tokyo escapes to soak. Kusatsu Onsen — rated among Japan's finest — conducts its unique yumomi water-cooling ritual daily. The Oze wetlands turn gold each autumn; the Tomioka Silk Mill, Japan's first modern industrial facility, carries UNESCO recognition.",

  Niigata:
    "Facing the Japan Sea, Niigata is where rice and sake reach their purest expression. Koshihikari rice from Uonuma, aged in cold humidity, is widely considered Japan's finest. The island of Sado — home to the Kodo taiko drumming tradition, golden mining history, and the elusive toki (crested ibis) — sits offshore like a world apart.",

  Toyama:
    "Toyama's defining feature is contrast: the Tateyama Kurobe Alpine Route cuts through 3,000-metre peaks draped in snow walls up to 20 metres high, while below, Toyama Bay delivers some of Japan's most exceptional seafood — firefly squid, white shrimp, and prized buri yellowtail all celebrated nationally.",

  Ishikawa:
    "Centered on Kanazawa, one of Japan's finest surviving castle towns, Ishikawa offers cultural richness that rivals Kyoto without the crowds. Kenrokuen garden, the Higashi Chaya geisha district, the 21st Century Museum of Contemporary Art, and the Omicho morning market combine to make Kanazawa a city worth spending days in.",

  Fukui:
    "Little-visited but quietly remarkable. Eiheiji — one of Japan's most austere Zen monasteries — sits deep in a cedar forest, its wooden corridors unchanged for seven centuries. The Echizen coast is wild and dramatic; Mikata-goko's five lakes cycle through nine color shifts with the seasons; and Fukui's dinosaur museum is genuinely world-class.",

  Yamanashi:
    "Gathered at the base of Mount Fuji — visible on clear days from almost anywhere in the prefecture — Yamanashi pairs iconic views with unexpected depth. The ancient Aokigahara lava forest, crystalline Lake Kawaguchiko, and the Kofu basin's peach orchards and Koshu vineyards make this far more than a Fuji launching pad.",

  Nagano:
    "Framed by the Japanese Alps and home to more 3,000-metre peaks than any other prefecture, Nagano is Japan's highland heartland. The snow-monkey onsen of Jigokudani, the pilgrimage city of Zenkoji, and the untouched Kamikochi alpine valley are standouts — as is the wasabi, buckwheat soba, and oyaki dumplings that define local life.",

  Shizuoka:
    "Mount Fuji claims Shizuoka as its home prefecture, rising from the Izu Peninsula side in full drama. Beyond the mountain: the Izu coastline draws divers and cyclists; terraced green tea fields carpet the hillsides above Shizuoka city; and the deep-sea seafood of Suruga Bay — including premium tuna and sakura shrimp — is a world-class destination in itself.",

  Aichi:
    "Nagoya — Japan's fourth city and economic engine of the Chubu region — anchors Aichi with a character all its own: the castle's golden dolphin roof ornaments, the Atsuta Shrine's sacred blade, and a hyper-local food culture of miso katsu, hitsumabushi eel, and morning 'morning service' cafe culture. The Toyota museum and Inuyama's authentic hilltop castle add historic depth.",

  Gifu:
    "Bisected by the Kiso River valley, Gifu combines two UNESCO-listed villages — Shirakawa-go's towering gasshozukuri thatched farmhouses — with the 1,300-year-old cormorant fishing tradition of the Nagara River. The well-preserved Edo merchant town of Takayama completes an extraordinary trifecta of living heritage.",

  Mie:
    "Birthplace of Japan's spiritual life. Ise Jingu — the nation's most sacred Shinto shrine complex — anchors a prefecture that also contains the Kumano Kodo UNESCO pilgrimage routes, the pearl-diving ama women of Toba, and the remote sacred peaks of Odaigahara. Matsusaka beef, argued by some connoisseurs to rival Kobe, is the local table's crowning achievement.",

  Shiga:
    "Wrapping around Lake Biwa — Japan's largest lake by far — Shiga offers a reflective, unhurried counterpoint to the Kyoto crowds just over the hill. Hikone Castle is among Japan's 12 original surviving castles, and the Omi merchant heritage has left handsome preserved townscapes in Omihachiman and Nagahama.",

  Kyoto:
    "The soul of traditional Japan and the country's cultural center for over a millennium. Kyoto's 17 UNESCO World Heritage sites — among them Kinkakuji, Fushimi Inari, and Ryoanji's stone garden — anchor a city where kaiseki cuisine, tea ceremony, Nishijin textiles, and machiya townhouses survive as living traditions. The depth that keeps drawing people back is real.",

  Osaka:
    "Japan's kitchen and its most extroverted city. Osaka's food culture — takoyaki, okonomiyaki, kushikatsu, and the legendary Kuromon Market — is inseparable from its civic identity. The neon canyons of Dotonbori, the castle moat cycling paths, and the underground izakaya warrens of Hozenji Yokocho reward those who eat, drink, and wander without a fixed plan.",

  Hyogo:
    "Kobe — Japan's most cosmopolitan port city — brings together French patisseries, a historic Chinatown, the Kitano Ijinkan foreign residences, and some of Japan's finest beef, all within sight of the Rokko mountains. Himeji Castle, arguably the country's most beautiful, stands an hour west; the famed sake breweries of Nada are between.",

  Nara:
    "Before Kyoto, there was Nara — Japan's first permanent capital. Todaiji houses the world's largest wooden structure and a 15-metre bronze Buddha; over 1,000 tame deer roam Nara Park as living national treasures. Yoshino's mountain cherry blossoms — celebrated for over 1,300 years — are among Japan's most sublime seasonal spectacles.",

  Wakayama:
    "The spiritual south of the Kinki region. Mount Koya (Koyasan), a monastery-village at 800 metres, is where Shingon Buddhism was born and where pilgrims still sleep in temples centuries old. The Kumano Kodo trail network — UNESCO-listed alongside the Camino de Santiago — winds through ancient cedar and moss down to Nachi waterfall, Japan's tallest.",

  Tottori:
    "Japan's least populous prefecture reveals its character in extremes. The Tottori Sand Dunes — the country's only large-scale dune system — ripple along the Japan Sea coast with an otherworldly quiet. Daisen, the Chugoku Region's highest peak, dominates the western skyline, and the Uradome coast's sea-carved cliffs provide dramatic contrast at every turn.",

  Shimane:
    "Home to Izumo Taisha — Japan's oldest Shinto shrine, believed to predate all written records — Shimane occupies a mythological space in the Japanese imagination. The Adachi Museum of Art, routinely ranked Asia's finest garden, sits amid rice fields here. Matsue's castle town wraps around a lake, one of the country's 12 original castles still intact.",

  Okayama:
    "'Sunny Okayama' earns its nickname — the region averages more clear days than almost anywhere in Japan, ripening the Muscat grapes and white peaches for which it is prized. Korakuen, one of the three great traditional gardens, spreads along the Asahi River in sight of the castle. The Kurashiki Bikan canal district's whitewashed walls and willows look unchanged from the Edo era.",

  Hiroshima:
    "Hiroshima carries its history with quiet dignity. The Peace Memorial Park and Museum — necessary, sobering, ultimately hopeful — draw visitors from across the world. Beyond this, the city breathes: vibrant covered arcades, oysters at every turn, the island sanctuary of Miyajima with its floating torii gate, and the cycling paradise of the Shimanami Kaido threading islands across the Seto Inland Sea.",

  Yamaguchi:
    "At Honshu's westernmost tip, Yamaguchi offers a contemplative pace that feels rare in Japan. The Rurikoji five-storied pagoda is among the country's finest; Hagi's remarkably intact samurai district produced much of the Meiji Restoration's leadership; and Akiyoshidai's limestone plateau hides Japan's largest cave system beneath its rolling karst surface.",

  Tokushima:
    "The starting point of the Shikoku 88 Temple Pilgrimage and the home of Awa Odori — the most exuberant of Japan's summer dance festivals. The Iya Valley's vine bridges, mist-wrapped gorges, and thatched-roof farmhouses in the deep Shikoku mountains offer the kind of remoteness that most of Japan has quietly lost.",

  Kagawa:
    "Japan's smallest prefecture punches well above its weight. Sanuki udon — springy, wheat-forward, served in dozens of permutations at shops open before dawn — is a genuine regional obsession. The islands of the Seto Inland Sea host one of the world's most distinctive art destinations: Naoshima and Teshima's museum-islands, where Tadao Ando concrete meets Monet and James Turrell.",

  Ehime:
    "Matsuyama Castle — one of Japan's 12 original surviving castles — presides over a city where Dogo Onsen, the country's oldest operating hot spring, has received guests for over 3,000 years. The Shimanami Kaido cycling route threads Ehime's Imabari coast across the Seto Inland Sea; the sunken terraced citrus groves of the Uwa region cling to hillsides above an extraordinary Pacific coast.",

  Kochi:
    "The wildest of the Shikoku prefectures, where the Pacific crashes into dramatic cape coastlines and the Shimanto River — one of Japan's last near-pristine major rivers — winds through forested mountains to the sea. Katsuo no tataki (lightly seared bonito over straw flame) is a dish of genuine local distinction; the cape at Ashizuri is one of Japan's most dramatic viewpoints.",

  Fukuoka:
    "The gateway to Kyushu and arguably Japan's most liveable city. Fukuoka's food culture — tonkotsu ramen, fresh Genkai Sea seafood, mentaiko cod roe, and the open-air yatai stalls lining the canal — drives its identity as powerfully as any landmark. Canal City, the Dazaifu Tenmangu plum blossom shrine, and the offshore Genkai islands deliver more than any first visit can hold.",

  Saga:
    "Between Fukuoka and Nagasaki, Saga is Japan's porcelain soul. Arita — birthplace of Japanese porcelain production in the early 17th century — still fires kilns today; Imari and Karatsu maintain their own distinct ceramic traditions. Yoshinogari, Japan's largest Yayoi-period archaeological site, preserves a settlement from 2,000 years ago in remarkable detail.",

  Nagasaki:
    "No city in Japan holds more layers. Dutch trading history, Chinese merchant culture, the Urakami Cathedral and atomic bombing legacy, and a surrounding archipelago of island communities all converge in a hilly port that is instantly unlike anywhere else in the country. The battleship island of Hashima (Gunkanjima) — UNESCO industrial heritage — is one of Japan's most haunting day trips.",

  Kumamoto:
    "Kumamoto Castle — one of Japan's three great castles, still being meticulously restored after the 2016 earthquakes — anchors a prefecture of remarkable natural drama. Mount Aso's active caldera, the largest accessible volcanic crater in the world, smokes above a green highland landscape dotted with onsen villages. Amakusa's island chain preserves a clandestine Christian heritage centuries old.",

  Oita:
    "Japan's onsen capital in both volume and variety. Beppu's eight 'hells' (jigoku) — boiling pools in vivid blues, reds, and whites — are a spectacle unlike anything else in the country. Yufuin, an hour inland, has grown into Japan's most refined hot spring resort town, ringed by volcanic Yufu peaks. The Kunisaki Peninsula's ancient Buddhist stone carvings add a dimension few visitors discover.",

  Miyazaki:
    "Where Japan catches its most intense subtropical light. Aoshima's palm-fringed island and its 'devil's washboard' wave-cut rock formations, the Takachiho Gorge where Shinto gods are said to have descended from the heavens, and Kirishima's volcanic highland trails define a prefecture that rewards those willing to go beyond the coast.",

  Kagoshima:
    "At the southern tip of Kyushu, Kagoshima lives in the shadow — and spectacular light — of Sakurajima, one of the world's most active volcanoes, which dusts the city in fine ash and makes every clear-sky day feel like a gift. The subtropical Amami and Yakushima islands — the latter a UNESCO forest of ancient cedar trees that reportedly inspired Ghibli's Princess Mononoke — are Kagoshima's most extraordinary cards.",

  Okinawa:
    "Japan's southernmost island chain feels like a world apart — and it genuinely is. Ryukyu culture, distinct from mainland Japan in language, cuisine, architecture, and spiritual practice, survives vigorously in the Okinawan way of life. Coral reefs of extraordinary clarity, the medieval Shuri Castle, traditional bingata textiles, champuru stir-fries, and the layered Pacific War history all coexist in an archipelago that rewards slow, curious travel.",
};
