import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: join(__dirname, '../.env.local') });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);

const PH = 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&auto=format&fit=crop&q=80';

const spots = [

  // ──────────────────────────────────────────────────────────────────
  // OSAKA
  // ──────────────────────────────────────────────────────────────────
  {
    id: 'hozenji-yokocho',
    name: 'Hozenji Yokocho',
    prefecture: 'Osaka',
    region: 'kinki',
    categories: ['spiritual', 'food', 'history'],
    description: 'A narrow stone-paved alley tucked behind the Dotonbori crowds, lined with intimate restaurants and presided over by a moss-draped Fudo Myo-o statue. Locals splash water on the statue for good luck, giving it its distinctive emerald coat. The alley feels untouched by tourism despite sitting metres from Namba.',
    address: '1-1-17 Namba, Chuo-ku, Osaka',
    lat: 34.6675, lng: 135.5025,
    image_url: PH, tags: ['alley', 'shrine', 'nightlife', 'local'], is_premium: false,
    highlights: [
      'The moss-covered Fudo statue receives hundreds of water offerings daily — visit at night for a magical atmosphere',
      'Dozen kappo (counter-dining) restaurants serve kaiseki-style food in intimate six-seat bars',
      'Connected to Hozenji Temple, a 350-year-old sanctuary surviving in the heart of the entertainment district',
    ],
    best_season: 'Year-round', access: '3 min walk from Namba Station (Midosuji Line)', admission: 'Free', duration: '30–60 min',
  },
  {
    id: 'shinsekai-district',
    name: 'Shinsekai',
    prefecture: 'Osaka',
    region: 'kinki',
    categories: ['food', 'history'],
    description: 'Built in 1912 to mimic Paris and New York, Shinsekai fell into gentle decline and preserved its retro Showa-era atmosphere almost perfectly. Kushikatsu (skewered deep-fried food) was invented here, and the double-dip rule is sacred. The neighbourhood radiates working-class Osaka character.',
    address: 'Shinsekai, Naniwa-ku, Osaka',
    lat: 34.6521, lng: 135.5063,
    image_url: PH, tags: ['retro', 'kushikatsu', 'showa', 'local food'], is_premium: false,
    highlights: [
      'Kushikatsu — the local street food — must never be double-dipped in communal sauce (cardinal rule)',
      'Tsutenkaku Tower dates to 1912 and presides over the neighbourhood like a retro beacon',
      'Far fewer tourists than Dotonbori, yet more authentically Osaka in atmosphere and price',
    ],
    best_season: 'Year-round', access: '5 min walk from Dobutsuen-mae Station (Midosuji Line)', admission: 'Free (tower ¥800)', duration: '1–2 hours',
  },
  {
    id: 'sumiyoshi-taisha',
    name: 'Sumiyoshi Taisha',
    prefecture: 'Osaka',
    region: 'kinki',
    categories: ['spiritual', 'history'],
    description: 'Japan\'s oldest Shinto shrine predating Buddhism\'s arrival, and the prototype for all Sumiyoshi shrines nationwide. The iconic arched Taiko bridge over the reflecting pond requires a steep climb and is one of Osaka\'s most photographed scenes. The compound is strikingly calm despite its urban location.',
    address: '2-9-89 Sumiyoshi, Sumiyoshi-ku, Osaka',
    lat: 34.6130, lng: 135.4931,
    image_url: PH, tags: ['shrine', 'ancient', 'arched bridge', 'new year'], is_premium: false,
    highlights: [
      'The arched Taiko bridge is steeply curved by design — crossing it symbolises the journey from the earthly to the divine',
      'Over 2,300 years old and the model for 2,300 Sumiyoshi shrines across Japan',
      'Hosts one of Japan\'s largest New Year visits with over 2 million pilgrims in three days',
    ],
    best_season: 'Year-round (New Year exceptional)', access: '3 min walk from Sumiyoshi Taisha Station (Nankai Line)', admission: 'Free', duration: '30–60 min',
  },
  {
    id: 'namba-yasaka-shrine',
    name: 'Namba Yasaka Shrine',
    prefecture: 'Osaka',
    region: 'kinki',
    categories: ['spiritual'],
    description: 'Hidden in a quiet residential block minutes from Dotonbori, this shrine is famous for its enormous lion-head stage — a 12-metre demon face with gaping mouth used as an outdoor performance space. The contrast between the giant folkloric face and the quiet neighbourhood lane is quintessentially Osaka.',
    address: '2-9-19 Motomachi, Naniwa-ku, Osaka',
    lat: 34.6658, lng: 135.5013,
    image_url: PH, tags: ['shrine', 'lion', 'festival', 'unique'], is_premium: false,
    highlights: [
      'The 12-metre lion head stage (Ema-den) has a mouth wide enough to stand inside and is used for traditional performances',
      'Dedicated to the deity Susanoo-no-Mikoto — said to devour evil and bring victory',
      'Only a 10-minute walk from Dotonbori yet almost entirely undiscovered by tourists',
    ],
    best_season: 'Year-round', access: '5 min walk from Namba Station (Midosuji Line)', admission: 'Free', duration: '20–30 min',
  },
  {
    id: 'kuromon-ichiba',
    name: 'Kuromon Ichiba Market',
    prefecture: 'Osaka',
    region: 'kinki',
    categories: ['food'],
    description: 'A 580-metre covered arcade of 170 stalls that has supplied Osaka\'s restaurants and households for nearly 200 years. Known as "Osaka\'s Kitchen," it specialises in fresh seafood, Wagyu beef, and ready-to-eat bites. Arrive before 10am to see chefs doing their morning shopping.',
    address: '2-4-1 Nipponbashi, Chuo-ku, Osaka',
    lat: 34.6680, lng: 135.5080,
    image_url: PH, tags: ['market', 'seafood', 'street food', 'morning'], is_premium: false,
    highlights: [
      'Snow crab, sea urchin, fresh oysters and grilled scallops consumed on the spot — prices are honest',
      'Many vendors have operated for three or four generations',
      'Visit early morning (before 10am) when professional chefs shop alongside tourists',
    ],
    best_season: 'Year-round', access: '1 min walk from Nipponbashi Station (Sennichimae Line)', admission: 'Free', duration: '1–2 hours',
  },

  // ──────────────────────────────────────────────────────────────────
  // KYOTO
  // ──────────────────────────────────────────────────────────────────
  {
    id: 'jonangu-shrine',
    name: 'Jonan-gu Shrine',
    prefecture: 'Kyoto',
    region: 'kinki',
    categories: ['spiritual', 'nature'],
    description: 'A serene Heian-era garden shrine in southern Kyoto, completely overlooked by the tourist circuit. The layered garden recreates the plant landscapes described in The Tale of Genji, transforming dramatically with each season — plum blossoms in February, wisteria in April, wild irises in summer.',
    address: '1 Nakajima, Fushimi-ku, Kyoto',
    lat: 34.9436, lng: 135.7419,
    image_url: PH, tags: ['garden', 'shrine', 'seasonal', 'wisteria', 'uncrowded'], is_premium: true,
    highlights: [
      'The wisteria display in late April rivals Ashikaga Flower Park at a fraction of the crowds',
      'Five distinct garden zones — each representing a chapter in Heian court literature',
      'Almost entirely unknown to foreign visitors despite being 20 minutes from central Kyoto',
    ],
    best_season: 'February–May (plum, cherry, wisteria)', access: '15 min bus from Kyoto Station (City Bus #19)', admission: '¥600', duration: '1–2 hours',
    website_url: 'https://jonangu.com',
  },
  {
    id: 'kurama-village',
    name: 'Kurama Village & Temple',
    prefecture: 'Kyoto',
    region: 'kinki',
    categories: ['spiritual', 'nature'],
    description: 'A mountain village 30 minutes from central Kyoto that feels centuries removed. The steep cedar-forested trail to Kurama-dera temple rewards climbers with mountain air, ancient moss, and the option to descend through bamboo groves to the hot spring village of Kibune. A full-day mountain escape from the city.',
    address: '1074 Kurama Honmachi, Sakyo-ku, Kyoto',
    lat: 35.1151, lng: 135.7700,
    image_url: PH, tags: ['mountain', 'hiking', 'temple', 'onsen', 'cedar forest'], is_premium: false,
    highlights: [
      'The 2.5km trail from Kurama to Kibune passes ancient cryptomeria trees and mossy stone lanterns',
      'Kurama Onsen (outdoor bath) sits at 400m elevation with forest views',
      'Kurama Fire Festival (October 22) is one of Kyoto\'s three great festivals',
    ],
    best_season: 'April–May, October–November', access: '30 min from Demachiyanagi Station (Eizan Line)', admission: '¥500 (temple)', duration: 'Full day', website_url: 'https://www.kuramadera.or.jp',
  },
  {
    id: 'daitokuji-temple',
    name: 'Daitoku-ji Temple Complex',
    prefecture: 'Kyoto',
    region: 'kinki',
    categories: ['spiritual', 'history'],
    description: 'A vast Zen complex of 22 sub-temples in northwestern Kyoto, most of which remain closed to the public. The handful that do open their gates reveal some of Japan\'s finest dry-landscape (karesansui) gardens — composed of raked gravel, moss, and carefully placed stones that reward slow, quiet contemplation.',
    address: '53 Daitokujicho, Kita-ku, Kyoto',
    lat: 35.0397, lng: 135.7480,
    image_url: PH, tags: ['zen', 'garden', 'temple', 'quiet', 'moss'], is_premium: true,
    highlights: [
      'Koto-in sub-temple has what many consider Kyoto\'s most perfect autumn maple display',
      'Ryogen-in contains Japan\'s smallest Zen garden (Totekiko — just 4 tatami mats of gravel)',
      'Far fewer visitors than Ryoan-ji despite equally profound gardens',
    ],
    best_season: 'April–May, October–November', access: '12 min bus from Kyoto Station (Bus #205)', admission: '¥400–600 per sub-temple', duration: '2–3 hours',
  },
  {
    id: 'fushimi-sake-district',
    name: 'Fushimi Sake District',
    prefecture: 'Kyoto',
    region: 'kinki',
    categories: ['food', 'history'],
    description: 'Southern Kyoto\'s Fushimi has brewed sake for over 400 years, fed by the exceptionally soft underground water from the Momoyama Hills. While tourists crowd Fushimi Inari\'s gates to the north, the old sake breweries along the willow-lined Fushimi canal remain remarkably peaceful and locals still visit sakagura for morning sake.',
    address: 'Fushimi-ku, Kyoto (around Chushojima Station)',
    lat: 34.9321, lng: 135.7636,
    image_url: PH, tags: ['sake', 'brewery', 'canal', 'historic', 'local'], is_premium: false,
    highlights: [
      'Row boat tours through the willow-lined canals past 400-year-old sake warehouse walls',
      'Gekkeikan Okura Sake Museum offers ¥600 tasting flights of premium nihonshu in Edo-era cellars',
      'Ten minutes from tourist-choked Fushimi Inari yet almost entirely undiscovered',
    ],
    best_season: 'March–May, September–November', access: '3 min walk from Chushojima Station (Kintetsu Kyoto Line)', admission: 'Free (museum ¥600)', duration: '2–3 hours',
  },
  {
    id: 'kifune-shrine',
    name: 'Kifune Shrine',
    prefecture: 'Kyoto',
    region: 'kinki',
    categories: ['spiritual', 'nature'],
    description: 'Ascending through a cedar-forested mountain valley north of Kurama, Kifune Shrine is Kyoto\'s deity of water. The stone lantern-flanked approach through moss and ancient trees is one of Japan\'s most atmospheric shrine paths. In summer, restaurants suspend dining platforms over the mountain stream (kawadoko dining).',
    address: '180 Kibunecho, Sakyo-ku, Kyoto',
    lat: 35.1229, lng: 135.7538,
    image_url: PH, tags: ['shrine', 'water', 'mountain', 'summer dining', 'lanterns'], is_premium: true,
    highlights: [
      'Kawadoko platform dining over the rushing mountain stream in summer — one of Kyoto\'s most unique experiences',
      'The stone lantern approach is illuminated on winter evenings creating a truly magical atmosphere',
      'Ancient water deity shrine where fortune slips (omikuji) are read by floating them on water',
    ],
    best_season: 'May–October (kawadoko), Winter evenings (lanterns)', access: '30 min from Demachiyanagi Station (Eizan Line) + 5 min bus', admission: 'Free', duration: '1–2 hours',
  },

  // ──────────────────────────────────────────────────────────────────
  // NARA
  // ──────────────────────────────────────────────────────────────────
  {
    id: 'naramachi',
    name: 'Naramachi Merchant Quarter',
    prefecture: 'Nara',
    region: 'kinki',
    categories: ['history'],
    description: 'The preserved Edo-period merchant district of Nara, where narrow lanes wind between machiya townhouses and small workshops. Unlike the deer-park crowds, Naramachi moves at an unhurried pace with traditional craft shops, sake breweries, and hidden garden cafes occupying centuries-old buildings. The best after-hours Nara experience.',
    address: 'Naramachi, Nara-shi, Nara',
    lat: 34.6831, lng: 135.8315,
    image_url: PH, tags: ['merchant quarter', 'machiya', 'craft', 'quiet', 'historic'], is_premium: false,
    highlights: [
      'Koshi-no-ie (grated window house) is a fully restored Edo machiya you can enter for free',
      'Independent craft studios sell Nara-specific items: ink sticks, brushes, and persimmon-tanned leather',
      'Fewer than 5 minutes from the deer park yet receives a fraction of the visitor numbers',
    ],
    best_season: 'Year-round', access: '15 min walk from Kintetsu Nara Station', admission: 'Free (some venues paid)', duration: '1–2 hours',
  },
  {
    id: 'yoshino-mountain',
    name: 'Yoshino Mountain',
    prefecture: 'Nara',
    region: 'kinki',
    categories: ['nature', 'spiritual'],
    description: 'A sacred mountain village 90 minutes from Osaka/Kyoto that hosts Japan\'s most celebrated cherry blossom display — 30,000 trees covering four altitudinal zones that bloom in sequence over several weeks. Yoshino has been a place of imperial exile, Buddhist pilgrimage, and poetic inspiration for over 1,300 years.',
    address: 'Yoshino-cho, Yoshino-gun, Nara',
    lat: 34.3706, lng: 135.8581,
    image_url: PH, tags: ['cherry blossoms', 'mountain', 'pilgrim route', 'UNESCO', 'sacred'], is_premium: true,
    highlights: [
      '30,000 Yoshino cherry trees bloom in four bands from late March to mid-April — a rolling wave of pink from valley to peak',
      'Starting point of the ancient Omine-Okugake-Michi pilgrim route to Kumano (UNESCO World Heritage)',
      'Kinpusen-ji Temple at the summit dates to 7th-century En no Gyoja and houses three massive Buddha figures',
    ],
    best_season: 'Late March–mid April (cherry), October–November (autumn)', access: '90 min from Osaka Abenobashi (Kintetsu Yoshino Line)', admission: 'Free (temple ¥700)', duration: 'Full day',
  },
  {
    id: 'kasugayama-forest',
    name: 'Kasugayama Primeval Forest',
    prefecture: 'Nara',
    region: 'kinki',
    categories: ['nature'],
    description: 'One of Japan\'s oldest protected forests, left completely undisturbed since Kasuga Grand Shrine was founded in 768 AD. The result is a primeval broadleaf temperate forest where trees up to 700 years old tower over the walking paths — a rare living example of what pre-human Japan looked like. Part of the UNESCO World Heritage site.',
    address: 'Behind Kasuga Grand Shrine, Nara Park, Nara',
    lat: 34.6882, lng: 135.8472,
    image_url: PH, tags: ['ancient forest', 'UNESCO', 'nature', 'sacred', 'undisturbed'], is_premium: false,
    highlights: [
      '1,200 years of zero human interference has produced trees of extraordinary age and size',
      'Designated UNESCO World Heritage natural area — one of the oldest protected forests in Asia',
      'The forest path is walkable in 45 minutes and begins just behind the famous Kasuga lanterns',
    ],
    best_season: 'May–June (fresh leaves), November (golden canopy)', access: '15 min walk from Kintetsu Nara Station via Nara Park', admission: 'Free', duration: '1–2 hours',
  },
  {
    id: 'muro-ji-temple',
    name: 'Muro-ji Temple',
    prefecture: 'Nara',
    region: 'kinki',
    categories: ['spiritual', 'history'],
    description: 'A remote Shingon temple deep in the Muro mountains of eastern Nara, famous for its five-story pagoda — Japan\'s smallest, yet perhaps its most perfectly proportioned, standing amid ancient cryptomeria trees. The temple welcomed female worshippers when all other Koya-san affiliated temples were closed to women.',
    address: '78 Muro, Uda-shi, Nara',
    lat: 34.5422, lng: 135.9094,
    image_url: PH, tags: ['pagoda', 'temple', 'mountain', 'remote', 'female-friendly'], is_premium: true,
    highlights: [
      'The 16-metre pagoda, Japan\'s smallest five-story one, has stood since the 9th century amid soaring cedars',
      'Known as the "women\'s Koya-san" — it opened to female pilgrims centuries before Mount Koya',
      'Reached via a 400-step stone staircase through cedar forest — the ascent is part of the experience',
    ],
    best_season: 'April–May (shakunage azalea), October–November', access: '10 min bus from Muroguchi-Ono Station (Kintetsu Osaka Line)', admission: '¥600', duration: '1.5–2 hours',
  },

  // ──────────────────────────────────────────────────────────────────
  // HYOGO
  // ──────────────────────────────────────────────────────────────────
  {
    id: 'kinosaki-onsen',
    name: 'Kinosaki Onsen',
    prefecture: 'Hyogo',
    region: 'kinki',
    categories: ['onsen', 'history'],
    description: 'A classic Tajima hot spring town where a willow-lined canal connects seven public bathhouses — each with a distinct architectural style and character. Guests wear yukata robes to walk between baths (soto-yu meguri), an Edo-period tradition still alive today. Snow crabs in winter make this one of Japan\'s finest ryokan destinations.',
    address: 'Kinosaki-cho, Toyooka-shi, Hyogo',
    lat: 35.6221, lng: 134.8037,
    image_url: PH, tags: ['onsen', 'canal', 'yukata', 'ryokan', 'snow crab', 'traditional'], is_premium: false,
    highlights: [
      'Seven public bathhouses with distinct personalities — admission included in most ryokan stays',
      'The willow-canal main street and yukata-clad strollers feel unchanged from the Meiji period',
      'Winter season (November–March) brings Matsuba crab from the Sea of Japan — one of Japan\'s great food experiences',
    ],
    best_season: 'November–March (snow crab), June–August (summer onsen)', access: '2h 40min from Osaka by Konotori Express (JR)', admission: 'Day pass ¥1,500', duration: 'Overnight recommended',
    website_url: 'https://www.kinosaki-spa.gr.jp/english',
  },
  {
    id: 'takeda-castle-ruins',
    name: 'Takeda Castle Ruins',
    prefecture: 'Hyogo',
    region: 'kinki',
    categories: ['history', 'nature'],
    description: 'A 15th-century mountain castle whose stone foundations sit at 353 metres elevation, surrounded on autumn mornings by a sea of clouds that earns it the nickname "Japan\'s Machu Picchu." The ruins themselves are haunting without the clouds, with panoramic views of the Maruyama River valley. Predawn hikes are rewarded with the most dramatic mist.',
    address: 'Wadayama-cho Takeda, Asago-shi, Hyogo',
    lat: 35.2986, lng: 134.8244,
    image_url: PH, tags: ['castle ruins', 'cloud sea', 'mountain', 'sunrise', 'Machu Picchu'], is_premium: false,
    highlights: [
      'Sea of clouds typically forms between late September and late November on mornings after rain',
      'The best viewing platform is Ritsuunkyo across the valley — arrive by 5am for optimal conditions',
      'Only original stone walls remain — the absence of reconstructed buildings makes the ruins more atmospheric',
    ],
    best_season: 'September–November (cloud sea), April–May (cherry)', access: '20 min walk from Takeda Station (JR Bantan Line)', admission: '¥500 (Oct–Nov)', duration: '1.5–2 hours',
  },
  {
    id: 'arima-onsen',
    name: 'Arima Onsen',
    prefecture: 'Hyogo',
    region: 'kinki',
    categories: ['onsen', 'history'],
    description: 'Japan\'s oldest hot spring resort, cited in the Nihon Shoki (720 AD) and visited by Toyotomi Hideyoshi who reportedly bathed here over a thousand times. The town divides into "kin-sen" (gold spring — iron-rich, amber-coloured) and "gin-sen" (silver spring — clear carbonic water), both with distinct therapeutic properties.',
    address: 'Arima-cho, Kita-ku, Kobe-shi, Hyogo',
    lat: 34.8007, lng: 135.2466,
    image_url: PH, tags: ['onsen', 'ancient', 'gold spring', 'Toyotomi', 'history'], is_premium: true,
    highlights: [
      'Kin-no-yu (Gold Bath) — Japan\'s most iron-rich hot spring turns skin a golden-amber colour within minutes',
      'The village predates Kyoto as a resort destination — its lanes and bathhouses feel genuinely ancient',
      'Easily combined with a day trip from Osaka (35 min by Hankyu) or Kyoto (60 min)',
    ],
    best_season: 'Year-round (winter especially atmospheric)', access: '35 min from Shin-Osaka by bus, or via Hankyu Arima Line', admission: 'Kin-no-yu ¥800, Gin-no-yu ¥550', duration: '3–6 hours',
  },

  // ──────────────────────────────────────────────────────────────────
  // SHIGA
  // ──────────────────────────────────────────────────────────────────
  {
    id: 'hikone-castle',
    name: 'Hikone Castle',
    prefecture: 'Shiga',
    region: 'kinki',
    categories: ['history'],
    description: 'One of Japan\'s four original unaltered castles (alongside Matsumoto, Inuyama, and Kochi), Hikone\'s white three-tiered keep stands on a hill above Lake Biwa and looks much as it did in 1622. The surrounding Genkyu-en garden, originally built for the feudal lord\'s leisure, is reflected perfectly in a pond fed by lake water.',
    address: '1-1 Konkicho, Hikone-shi, Shiga',
    lat: 35.2762, lng: 136.2546,
    image_url: PH, tags: ['original castle', 'Lake Biwa', 'samurai', 'garden', 'authentic'], is_premium: false,
    highlights: [
      'One of only four castles in Japan with the original Edo-era structure intact — not a reconstruction',
      'Genkyu-en garden (1677) replicates the scenery of Lake Biwa\'s eight famous views in miniature',
      'Far less visited than Himeji yet considered by many castle specialists to be equally impressive',
    ],
    best_season: 'March–April (cherry), October–November (autumn)', access: '5 min walk from Hikone Station (JR Biwako Line)', admission: '¥800', duration: '1.5–2 hours',
  },
  {
    id: 'omi-hachiman',
    name: 'Omi-Hachiman Canal Town',
    prefecture: 'Shiga',
    region: 'kinki',
    categories: ['history'],
    description: 'A canal-laced merchant town on the eastern shore of Lake Biwa that thrived from the 16th century through travelling Omi merchants. The preserved Hachimanbori canal district, with its willow-draped stone walls, has been used as a film location for period dramas so frequently that it has a dedicated "eiga mura" section.',
    address: 'Omi-Hachiman-shi, Shiga',
    lat: 35.1281, lng: 136.0981,
    image_url: PH, tags: ['canal', 'merchant quarter', 'film location', 'willow', 'historic'], is_premium: false,
    highlights: [
      'Hachimanbori canal was dug in 1585 by Toyotomi Hidetsugu and has barely changed in appearance since',
      'Reed-thatched roofed boat tours through the canal offer a perspective unavailable on foot',
      'The Vories Architecture district features early 20th-century Western buildings by American missionary W.M. Vories',
    ],
    best_season: 'April–May (wisteria, fresh reeds), October–November', access: '5 min bus from Omi-Hachiman Station (JR Biwako Line)', admission: 'Free', duration: '2–3 hours',
  },

  // ──────────────────────────────────────────────────────────────────
  // WAKAYAMA
  // ──────────────────────────────────────────────────────────────────
  {
    id: 'koyasan',
    name: 'Koya-san',
    prefecture: 'Wakayama',
    region: 'kinki',
    categories: ['spiritual', 'history'],
    description: 'A mountaintop monastery town at 900m elevation, founded by Kukai (Kobo Daishi) in 816 AD and home to 117 temples. Staying overnight in a shukubo (temple lodging) and attending pre-dawn morning prayers is one of Japan\'s most profound travel experiences. The Okunoin cemetery — Japan\'s largest — has over 200,000 graves disappearing into ancient cedar forest.',
    address: 'Koya-cho, Ito-gun, Wakayama',
    lat: 34.2132, lng: 135.5846,
    image_url: PH, tags: ['temple town', 'Buddhist', 'cemetery', 'shukubo', 'sacred', 'overnight'], is_premium: true,
    highlights: [
      'Okunoin cemetery: 2km of stone lanterns and 200,000 moss-covered graves beneath 1,000-year-old cedars — best visited at night',
      'Shukubo temple stays include vegetarian Buddhist cuisine (shojin ryori) and morning meditation',
      'The ropeway approach from Gokurakubashi frames the mountain entry dramatically',
    ],
    best_season: 'April–November (snow may close access in winter)', access: '2h from Osaka Namba by Nankai Limited Express + ropeway', admission: 'Free (shukubo ¥12,000+/night)', duration: 'Overnight recommended',
    website_url: 'https://www.koyasan.or.jp/en/',
  },
  {
    id: 'nachi-waterfall',
    name: 'Nachi Falls & Kumano Nachi Taisha',
    prefecture: 'Wakayama',
    region: 'kinki',
    categories: ['nature', 'spiritual'],
    description: 'Japan\'s tallest waterfall (133 metres) plunges from the Nachi mountains directly beside the vermilion pagoda and grand shrine of Kumano Nachi Taisha, creating one of Japan\'s most dramatic natural-sacred tableaux. The falls are themselves worshipped as a deity and can be approached closely for ¥300.',
    address: '1 Nachisan, Nachikatsuura-cho, Higashimuro-gun, Wakayama',
    lat: 33.6700, lng: 135.8981,
    image_url: PH, tags: ['waterfall', 'shrine', 'UNESCO', 'tallest', 'sacred'], is_premium: false,
    highlights: [
      'At 133m, Nachi Falls is Japan\'s tallest waterfall — viewed from the pagoda platform for the classic shot',
      'The falls are worshipped as Hiryu Gongen, a divine manifestation — you can approach within 50 metres',
      'Part of the Kumano Kodo UNESCO pilgrimage route that has been walked for over 1,000 years',
    ],
    best_season: 'Year-round', access: '15 min bus from Nachi Station (JR Kisei Line)', admission: '¥300 (waterfall viewing area)', duration: '1.5–2 hours',
  },
  {
    id: 'kumano-kodo',
    name: 'Kumano Kodo Trail',
    prefecture: 'Wakayama',
    region: 'kinki',
    categories: ['nature', 'spiritual', 'activity'],
    description: 'One of only two pilgrimage routes in the world to hold UNESCO World Heritage status (the other being the Camino de Santiago, with which it shares a certified spiritual connection). Ancient stone paths through primeval forest connect three Grand Shrines and have been walked by pilgrims — from emperors to common folk — for over 1,000 years.',
    address: 'Nakahechi Trail: Tanabe-shi to Hongu, Wakayama',
    lat: 33.8954, lng: 135.7656,
    image_url: PH, tags: ['UNESCO', 'pilgrimage', 'hiking', 'ancient trail', 'cedar forest'], is_premium: true,
    highlights: [
      'The Nakahechi route (2–3 days) is the most accessible: mossy stone paths through ancient sugi forest with ryokan stays',
      'Kumano Hongu Taisha Grand Shrine at the trail\'s heart has the largest torii gate in Japan',
      'Baggage transfer services allow you to walk with only a daypack between accommodation points',
    ],
    best_season: 'March–June, September–November', access: '3h from Osaka by train to Tanabe (JR + Kisei Line)', admission: 'Free trail', duration: '2–5 days (sections possible)',
    website_url: 'https://www.tb-kumano.jp/en/kumano-kodo/',
  },

  // ──────────────────────────────────────────────────────────────────
  // MIE
  // ──────────────────────────────────────────────────────────────────
  {
    id: 'ise-jingu',
    name: 'Ise Jingu',
    prefecture: 'Mie',
    region: 'kinki',
    categories: ['spiritual', 'history'],
    description: 'Japan\'s most sacred Shinto shrine complex, dedicated to the sun goddess Amaterasu and rebuilt in identical form every 20 years — a ritual of renewal (Shikinen Sengu) performed continuously since 690 AD. The approach through cedar forest and over the Uji Bridge creates a transition between worlds that even secular visitors find deeply moving.',
    address: 'Ujitachi-cho, Ise-shi, Mie',
    lat: 34.4553, lng: 136.7252,
    image_url: PH, tags: ['sacred', 'Shinto', 'ancient', 'forest', 'renewal ritual'], is_premium: false,
    highlights: [
      'The shrine buildings are rebuilt identically every 20 years — the current structures were completed in 2013',
      'The inner sanctuary (Naiku) is approached via a 300-year-old cedar forest that filters sound and light',
      'Oharai-machi traditional street beside the shrine has excellent Ise udon, akafuku mochi, and matcha',
    ],
    best_season: 'Year-round (early morning visits least crowded)', access: '90 min from Nagoya by Kintetsu Limited Express', admission: 'Free', duration: '2–4 hours',
    website_url: 'https://www.isejingu.or.jp/en/',
  },
  {
    id: 'meotoiwa-rocks',
    name: 'Meotoiwa — The Wedded Rocks',
    prefecture: 'Mie',
    region: 'kinki',
    categories: ['spiritual', 'nature'],
    description: 'Two rocks rising from Futami Bay, joined by a thick shimenawa (sacred rope) changed in ceremonial ritual three times a year. The larger rock (Otoko-iwa, 9m) has a small torii gate at its summit. At summer solstice, the sun rises perfectly between the rocks, making this one of Japan\'s most photogenic sacred sunrise spots.',
    address: '575 Futami-cho Oe, Ise-shi, Mie',
    lat: 34.4880, lng: 136.7827,
    image_url: PH, tags: ['sacred rocks', 'sunrise', 'torii', 'ocean', 'sacred rope'], is_premium: false,
    highlights: [
      'Summer solstice sunrise between the rocks is one of Japan\'s most celebrated natural-sacred alignments',
      'The shimenawa rope weighing over a tonne is replaced in a formal Shinto ceremony each May, September, and December',
      'The beach path features 700 stone frog figurines — frogs (kaeru) mean "to return" in Japanese',
    ],
    best_season: 'May–July (sunrise alignment), Year-round for scenery', access: '10 min from Futaminoura Station (Sangu Line from Ise-shi)', admission: 'Free', duration: '30–60 min',
  },
  {
    id: 'ago-bay',
    name: 'Ago Bay Pearl Farms',
    prefecture: 'Mie',
    region: 'kinki',
    categories: ['nature', 'history'],
    description: 'The sheltered, island-dotted bay where Mikimoto Kokichi cultivated the world\'s first cultured pearl in 1893, creating an industry that transformed Japan. Boat tours pass working pearl raft farms where akoya oysters still grow under the same conditions. Toba Aquarium beside the bay is Japan\'s largest and most scientifically serious.',
    address: 'Ago-cho, Shima-shi, Mie',
    lat: 34.3140, lng: 136.8220,
    image_url: PH, tags: ['pearl', 'bay', 'islands', 'Mikimoto', 'boat tour'], is_premium: false,
    highlights: [
      'Mikimoto Pearl Island in Toba shows live pearl insertion demonstrations and the history of the world-changing discovery',
      'Ago Bay sunset cruises on traditional Shima-style boats are among Japan\'s finest coastal experiences',
      'Ama (female free-divers) still work these waters — some villages offer demonstrations and meal experiences',
    ],
    best_season: 'April–October', access: '90 min from Nagoya by Kintetsu Limited Express to Kashikojima', admission: 'Mikimoto Island ¥1,500', duration: '3–5 hours',
  },

  // ──────────────────────────────────────────────────────────────────
  // AICHI
  // ──────────────────────────────────────────────────────────────────
  {
    id: 'inuyama-castle',
    name: 'Inuyama Castle',
    prefecture: 'Aichi',
    region: 'chubu',
    categories: ['history'],
    description: 'The oldest surviving original castle keep in Japan (built 1537), perched dramatically on a cliff above the Kiso River gorge. Unlike most Japanese castles which are concrete reconstructions, Inuyama\'s wooden interior has never been altered. The narrow twisting staircases, low beams, and trap doors are exactly as defenders left them.',
    address: '65-2 Kitakoken, Inuyama-shi, Aichi',
    lat: 35.3830, lng: 136.9446,
    image_url: PH, tags: ['original castle', 'wooden', 'river', 'ancient', 'authentic'], is_premium: false,
    highlights: [
      'The only castle in Japan to have remained in private hands (the Naruse family) until 2004',
      'The original 1537 wooden structure — the steep staircases inside require crawling on all fours',
      'View from the top balcony over the Kiso River is unchanged from what the castle lords surveyed 500 years ago',
    ],
    best_season: 'March–April (cherry), October–November', access: '30 min from Nagoya by Meitetsu Inuyama Line', admission: '¥550', duration: '1.5–2 hours',
  },
  {
    id: 'meiji-mura',
    name: 'Meiji Mura Open-Air Museum',
    prefecture: 'Aichi',
    region: 'chubu',
    categories: ['history'],
    description: 'An extraordinary 100-hectare hillside museum preserving 67 buildings from the Meiji era (1868–1912) that were dismantled from their original sites across Japan and reconstructed here. Among them: the original lobby of Frank Lloyd Wright\'s Imperial Hotel (saved from the 1923 earthquake and the 1968 demolition), the Kyoto Central Telephone Exchange, and a prison.',
    address: '1 Uchiyama, Inuyama-shi, Aichi',
    lat: 35.3728, lng: 136.9228,
    image_url: PH, tags: ['Meiji era', 'Frank Lloyd Wright', 'open air museum', 'architecture', 'historic'], is_premium: false,
    highlights: [
      'Frank Lloyd Wright\'s Imperial Hotel lobby — the only surviving Wright building in Japan, saved from the 1968 demolition',
      '67 buildings spanning from feudal-era medical clinic to early electric trolleybus — all walkable and enterable',
      'Steam locomotive rides and period-costumed photography add to the total-immersion experience',
    ],
    best_season: 'March–November', access: '20 min bus from Inuyama Station (Meitetsu Inuyama Line)', admission: '¥2,000', duration: 'Full day',
    website_url: 'https://www.meijimura.com/english/',
  },

  // ──────────────────────────────────────────────────────────────────
  // SHIZUOKA
  // ──────────────────────────────────────────────────────────────────
  {
    id: 'miho-no-matsubara',
    name: 'Miho no Matsubara',
    prefecture: 'Shizuoka',
    region: 'chubu',
    categories: ['nature'],
    description: 'A UNESCO World Heritage pine grove beach where 30,000 ancient Japanese black pines stretch for 3km along Suruga Bay with Mt Fuji rising behind. The site is the setting of the hagoromo legend (a celestial maiden loses her feather robe) and has inspired Japanese artists for over 1,000 years. Dawn visits in clear winter are otherworldly.',
    address: 'Miho, Shimizu-ku, Shizuoka-shi, Shizuoka',
    lat: 35.0166, lng: 138.5174,
    image_url: PH, tags: ['Mt Fuji view', 'pine grove', 'UNESCO', 'beach', 'sunrise'], is_premium: false,
    highlights: [
      'On clear winter mornings the reflection of Mt Fuji in the bay and pine silhouettes create Japan\'s most iconic landscape',
      'The grove contains pines over 700 years old — some planted during the Muromachi period',
      'The Hagoromo Pine marks where a celestial maiden hung her celestial robe — a tree visited by Japanese poets for centuries',
    ],
    best_season: 'November–February (clearest Fuji views)', access: '20 min bus from Shimizu Station (JR Tokaido Line)', admission: 'Free', duration: '1–2 hours',
  },
  {
    id: 'shuzenji-onsen',
    name: 'Shuzenji Onsen',
    prefecture: 'Shizuoka',
    region: 'chubu',
    categories: ['onsen', 'history'],
    description: 'The oldest hot spring on the Izu Peninsula, discovered by Kobo Daishi in 807 AD and later a place of tragic exile for the young Kamakura shogun Minamoto no Yoriie. The bamboo-forested Katsura River valley, its covered walking bridges, and centuries-old inn district create a remarkably complete traditional hot spring atmosphere.',
    address: 'Shuzenji, Izu-shi, Shizuoka',
    lat: 34.9677, lng: 138.9285,
    image_url: PH, tags: ['onsen', 'bamboo', 'Kamakura', 'historic', 'river walk'], is_premium: true,
    highlights: [
      'Tokko-no-yu outdoor foot bath beside the river is Izu\'s oldest hot spring — discovered 1,200 years ago',
      'The bamboo-lined Sawa-otome path (700m) along the Katsura River is Izu\'s most atmospheric walk',
      'Numerous ryokan have their own private rotemburo (outdoor baths) with bamboo garden views',
    ],
    best_season: 'Year-round (December–February for winter onsen, autumn for foliage)', access: '30 min from Mishima Station by bus or train (Sunzu Line)', admission: 'Free (foot bath)', duration: 'Overnight recommended',
  },

  // ──────────────────────────────────────────────────────────────────
  // NAGANO
  // ──────────────────────────────────────────────────────────────────
  {
    id: 'matsumoto-castle',
    name: 'Matsumoto Castle',
    prefecture: 'Nagano',
    region: 'chubu',
    categories: ['history'],
    description: 'Japan\'s most dramatically sited original castle — a black-and-white six-tiered keep reflected in its surrounding moat against the Northern Alps backdrop. Built in 1594, it is one of four surviving original castles and the oldest in the country. Known as the "Crow Castle" for its black lacquered walls.',
    address: '4-1 Marunouchi, Matsumoto-shi, Nagano',
    lat: 36.2380, lng: 137.9727,
    image_url: PH, tags: ['original castle', 'Crow Castle', 'Alps view', 'moat reflection', 'ancient'], is_premium: false,
    highlights: [
      'The castle walls are painted black with lead-based lacquer — the only surviving black castle in Japan',
      'The Moon-viewing turret (Tsukimi Yagura) was added in 1636 purely for aesthetic purposes, not defense',
      'Cherry blossom season brings the perfect pink-black-mountain contrast — Matsumoto\'s most photographed view',
    ],
    best_season: 'April (cherry blossom), October–November (Alps colour)', access: '15 min walk or 10 min bus from Matsumoto Station (JR Chuo Line)', admission: '¥700', duration: '1–2 hours',
  },
  {
    id: 'jigokudani-monkey-park',
    name: 'Jigokudani Monkey Park',
    prefecture: 'Nagano',
    region: 'chubu',
    categories: ['nature', 'activity'],
    description: 'The only place in the world where wild Japanese macaques (snow monkeys) bathe in a natural outdoor hot spring. The 30-minute forest trail approach through steam vents and deep snow heightens the surreal arrival at the thermal pool where monkeys float, groom, and sleep. Best visited on the coldest mornings when steam is thickest.',
    address: '405 Shiga, Yamanouchi-machi, Shimotakai-gun, Nagano',
    lat: 36.7323, lng: 138.4618,
    image_url: PH, tags: ['snow monkeys', 'macaque', 'onsen', 'winter', 'wildlife', 'unique'], is_premium: false,
    highlights: [
      'Wild snow monkeys use the thermal spring from November through March — completely of their own free will',
      'The 30-min forest trail crosses a gorge with active steam vents — the monkey pool appears suddenly through the trees',
      'January–February offers deepest snow and most dramatic steam, with monkeys visibly warming their paws',
    ],
    best_season: 'November–March (snow season), Year-round (monkeys present)', access: '30 min bus from Yudanaka Station (Nagano Dentetsu Line) + 30 min walk', admission: '¥800', duration: '2–3 hours',
    website_url: 'https://jigokudani-yaenkoen.co.jp/english/',
  },
  {
    id: 'kamikochi-valley',
    name: 'Kamikochi Alpine Valley',
    prefecture: 'Nagano',
    region: 'chubu',
    categories: ['nature', 'activity'],
    description: 'A pristine alpine valley at 1,500 metres, accessible only by bus or on foot (private vehicles banned since 1975), with the Azusa River winding through birch and fir forests beneath the jagged Hotaka range. The clear blue-green water of Taisho Pond reflects the volcanic Yake-dake peak. One of Japan\'s great wilderness walks.',
    address: 'Kamikochi, Matsumoto-shi, Nagano',
    lat: 36.2393, lng: 137.6504,
    image_url: PH, tags: ['alpine', 'river', 'wilderness', 'hiking', 'no cars', 'clear water'], is_premium: true,
    highlights: [
      'Private cars banned — the valley maintains its 1920s "discovery" atmosphere of clean air and silence',
      'The 10km Kappa-bashi to Myojin Pond walk follows the crystal-clear Azusa River through ancient forest',
      'Walter Weston, the British missionary who introduced alpinism to Japan, is commemorated with a plaque at Kappa-bashi',
    ],
    best_season: 'May–October (closed November–April)', access: '30 min bus from Matsumoto Bus Terminal', admission: 'Free (bus ¥2,400 return)', duration: 'Full day',
    website_url: 'https://www.kamikochi.org/en',
  },
  {
    id: 'narai-juku',
    name: 'Narai-juku Post Town',
    prefecture: 'Nagano',
    region: 'chubu',
    categories: ['history'],
    description: 'The best-preserved of the 69 Nakasendo highway post towns, its single 1km street flanked by 350-year-old wooden inns, lacquerware shops, and sake breweries that still operate as they did in the Edo period. Known as "Narai of a Thousand Houses" for its former prosperity. Almost entirely overlooked by international visitors.',
    address: 'Narai, Shiojiri-shi, Nagano',
    lat: 35.9720, lng: 137.8655,
    image_url: PH, tags: ['Nakasendo', 'post town', 'Edo period', 'lacquerware', 'preserved'], is_premium: false,
    highlights: [
      'The 1km preserved street has more surviving original Edo-period buildings than any other Nakasendo post town',
      'Local lacquerware (Kiso-nuri) has been produced here for 400 years — available from workshops still using traditional techniques',
      'JR Chuo Line stops directly in town — no tourist infrastructure between the train tracks and history',
    ],
    best_season: 'April–November', access: 'Direct from Matsumoto or Nagoya on JR Chuo Line (Narai Station)', admission: 'Free', duration: '1.5–3 hours',
  },

  // ──────────────────────────────────────────────────────────────────
  // ISHIKAWA
  // ──────────────────────────────────────────────────────────────────
  {
    id: 'higashi-chaya-district',
    name: 'Higashi Chaya District',
    prefecture: 'Ishikawa',
    region: 'hokuriku',
    categories: ['history'],
    description: 'Kanazawa\'s most intact geisha teahouse quarter, established by the Maeda clan in 1820 and little changed since. The ochaya (teahouses) with their latticed facades and inner gardens still operate — some as galleries and gold-leaf shops, a few as active geisha venues accessible by reservation. Kanazawa retains more active geisha than anywhere outside Kyoto.',
    address: 'Higashiyama 1-chome, Kanazawa-shi, Ishikawa',
    lat: 36.5714, lng: 136.6701,
    image_url: PH, tags: ['geisha', 'teahouse', 'Kanazawa', 'gold leaf', 'preserved'], is_premium: false,
    highlights: [
      'Kanazawa has more active geisha than anywhere in Japan outside Kyoto — evening strolls may reveal them',
      'Shima ochaya (teahouse museum) lets you see an intact geisha venue interior with original instruments and lacquerware',
      'Gold leaf craft studios line the district — Kanazawa produces 99% of Japan\'s gold leaf',
    ],
    best_season: 'Year-round', access: '15 min walk from Kanazawa Station (JR Hokuriku Shinkansen)', admission: 'Shima ¥750', duration: '1–2 hours',
  },
  {
    id: 'noto-peninsula',
    name: 'Noto Peninsula',
    prefecture: 'Ishikawa',
    region: 'hokuriku',
    categories: ['nature', 'history'],
    description: 'A rugged finger of land pointing into the Sea of Japan, the Noto Peninsula has resisted modernisation through simple geography. Ancient terraced rice paddies (Senmaida) cascade to cliffside seas, fishing villages process salt by traditional fire methods, and the interior\'s primeval beech forests remain among Japan\'s least visited. The 2024 earthquake has since strengthened community bonds.',
    address: 'Noto-cho and surrounding areas, Hosu-gun, Ishikawa',
    lat: 37.2503, lng: 136.9009,
    image_url: PH, tags: ['coastline', 'rice terraces', 'fishing village', 'remote', 'traditional'], is_premium: true,
    highlights: [
      'Shiroyone Senmaida — 1,004 terraced rice paddies on a coastal cliff, illuminated by 21,000 LED lights in autumn evenings',
      'Wajima Morning Market has operated daily since the 11th century — lacquerware, seafood, and pickles',
      'The coastal Okunoto Saltpan uses fire-heated trays — the only place in Japan still using traditional "age-hama" salt production',
    ],
    best_season: 'May–October (rice season), September (harvest)', access: '90 min bus from Kanazawa Station to Wajima', admission: 'Free (illumination ¥1,000)', duration: '1–2 days',
  },
  {
    id: 'kenroku-en-garden',
    name: 'Kenroku-en Garden',
    prefecture: 'Ishikawa',
    region: 'hokuriku',
    categories: ['nature', 'history'],
    description: 'One of Japan\'s three great landscape gardens, developed over 180 years by the Maeda clan beside Kanazawa Castle. The name means "garden with six attributes" (spaciousness, seclusion, artifice, antiquity, waterways, panoramas) — all present simultaneously. The famous two-legged stone lantern (Kotojitoro) reflected in the pond has become Kanazawa\'s symbol.',
    address: '1 Kenrokumachi, Kanazawa-shi, Ishikawa',
    lat: 36.5612, lng: 136.6625,
    image_url: PH, tags: ['garden', 'feudal lord', 'stone lantern', 'canal', 'Maeda clan'], is_premium: false,
    highlights: [
      'Kenroku-en is one of only three gardens in Japan rated "perfect" by Edo-period landscape criteria',
      'The Kotojitoro lantern (1837) stands in water on two mismatched legs — the most reproduced image in Kanazawa',
      'Winter snow covering (yukitsuri — straw rope cones protecting tree branches) from November is extraordinarily beautiful',
    ],
    best_season: 'April (cherry), November–March (yukitsuri)', access: '10 min walk from Kanazawa Station bus terminal', admission: '¥320', duration: '1–2 hours',
    website_url: 'https://kenrokuen.or.jp/en/',
  },

  // ──────────────────────────────────────────────────────────────────
  // GIFU
  // ──────────────────────────────────────────────────────────────────
  {
    id: 'shirakawa-go',
    name: 'Shirakawa-go',
    prefecture: 'Gifu',
    region: 'chubu',
    categories: ['history', 'nature'],
    description: 'A UNESCO World Heritage village of gassho-zukuri farmhouses — steep A-frame thatched roofs designed to bear the Hida region\'s legendary 3-metre snowfalls. The village of Ogimachi has been continuously inhabited for centuries and several farmhouses remain working agricultural homes that accept overnight guests. In winter, coordinated illuminations turn the snow-laden roofs golden.',
    address: 'Shirakawa-mura, Ono-gun, Gifu',
    lat: 36.2572, lng: 136.9051,
    image_url: PH, tags: ['UNESCO', 'gassho-zukuri', 'thatched roof', 'snow village', 'farmhouse stay'], is_premium: false,
    highlights: [
      'Gasshō-zukuri farmhouses are built entirely without nails — the steep thatch roof angle sheds up to 3m of snow',
      'Winter illumination events (January–February weekends) light the snow-blanketed village at dusk',
      'Several farmhouses remain working agricultural homes — guests help with chores before a mountain-vegetable dinner',
    ],
    best_season: 'December–March (snow), May–June (fresh green)', access: '50 min bus from Takayama Station or 90 min from Kanazawa', admission: '¥300 (observation deck)', duration: 'Half to full day',
    website_url: 'https://shirakawa-go.org/en/',
  },
  {
    id: 'gujo-hachiman',
    name: 'Gujo Hachiman',
    prefecture: 'Gifu',
    region: 'chubu',
    categories: ['history', 'nature'],
    description: 'A mountain castle town threaded by crystal-clear streams where children still swim and play as they have for centuries. The town\'s water channels (suiro) were engineered so carefully that each neighbourhood has its own designated times for water usage — drinking, washing clothes, washing vegetables, and so on — a system still observed today.',
    address: 'Hachiman-cho, Gujo-shi, Gifu',
    lat: 35.7494, lng: 136.9680,
    image_url: PH, tags: ['castle town', 'crystal water', 'Obon dance', 'traditional', 'mountain'], is_premium: false,
    highlights: [
      'The water is so pure that children jump from bridges into the town canal — the only place in Japan where this is an official summer activity',
      'Gujo Odori dance festival (July–September) includes 32 consecutive nights of traditional Bon dancing until dawn',
      'Traditional food replica crafts (shokuhin sampuru) were invented and are still made in Gujo Hachiman',
    ],
    best_season: 'July–August (festival/swimming), April (cherry blossom)', access: '60 min bus from Gero Station (JR Hida Line) or from Nagoya by highway bus', admission: 'Free', duration: '2–4 hours',
  },
];

async function main() {
  const normalized = spots.map((s) => ({ website_url: '', ...s }));
  console.log(`\n📍 Seeding ${normalized.length} Kinki & Chubu spots...\n`);
  const { error } = await supabase.from('spots').upsert(normalized, { onConflict: 'id' });
  if (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
  console.log(`✅ Done: ${spots.length} spots inserted/updated\n`);
}

main();
