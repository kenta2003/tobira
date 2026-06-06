import type { Region } from '@/types';

export type RegionId = Region;

export type RegionMeta = {
  label: string;
  color: string;
  hoverColor: string;
  cities: string[];
  tagline: string;
  prefectures: string[];
  cityLabels: Array<{ name: string; x: number; y: number }>;
};

export const REGION_META: Record<RegionId, RegionMeta> = {
  hokkaido: {
    label: 'Hokkaido',
    color: '#3b82f6',
    hoverColor: '#2563eb',
    cities: ['Sapporo', 'Hakodate', 'Asahikawa'],
    tagline: "Japan's northernmost island stays wild year-round — powder snow beloved by skiers across Asia in winter, lavender fields blanketing Furano in summer, and vast national parks where brown bears still roam. Sapporo's Ramen Alley and the island's legendary fresh seafood make it one of Japan's top food destinations too.",
    prefectures: ['Hokkaido'],
    cityLabels: [{ name: 'Sapporo', x: 368, y: 78 }],
  },
  tohoku: {
    label: 'Tohoku',
    color: '#10b981',
    hoverColor: '#059669',
    cities: ['Sendai', 'Aomori', 'Akita'],
    tagline: 'Six prefectures of cedar forests, volcanic crater lakes, and remote onsen you can have entirely to yourself. This is samurai country — Sendai, Aizu, and Kakunodate all preserve their warrior heritage — while cliff-hugging Yamadera and the rugged Sanriku coast reward anyone willing to venture off the shinkansen.',
    prefectures: ['Aomori', 'Iwate', 'Miyagi', 'Akita', 'Yamagata', 'Fukushima'],
    cityLabels: [{ name: 'Sendai', x: 358, y: 212 }],
  },
  kanto: {
    label: 'Kanto',
    color: '#f59e0b',
    hoverColor: '#d97706',
    cities: ['Tokyo', 'Yokohama', 'Nikko', 'Kamakura'],
    tagline: "Tokyo is just the starting point. Day-trip to Nikko's ornate mountain shrines, Kamakura's Great Buddha by the sea, or the Chichibu highlands and you've barely scratched the surface. Seven prefectures packed between the Pacific coast and the Alps — intense urban energy meets surprisingly wild countryside.",
    prefectures: ['Tokyo', 'Kanagawa', 'Saitama', 'Chiba', 'Ibaraki', 'Tochigi', 'Gunma'],
    cityLabels: [{ name: 'Tokyo', x: 390, y: 290 }],
  },
  hokuriku: {
    label: 'Hokuriku',
    color: '#8b5cf6',
    hoverColor: '#7c3aed',
    cities: ['Kanazawa', 'Niigata', 'Fukui'],
    tagline: "The Japan Sea coast that most tourists never reach. Kanazawa rivals Kyoto in preserved geisha districts and samurai neighbourhoods, Niigata produces Japan's finest sake and rice, and Fukui hides dinosaur fossils alongside cliffside temples. Travel slowly here — the rewards are proportional to how far off the trail you go.",
    prefectures: ['Niigata', 'Toyama', 'Ishikawa', 'Fukui'],
    cityLabels: [{ name: 'Kanazawa', x: 210, y: 252 }],
  },
  chubu: {
    label: 'Chubu',
    color: '#f97316',
    hoverColor: '#ea580c',
    cities: ['Nagoya', 'Matsumoto', 'Mt. Fuji'],
    tagline: 'The spine of Honshu, shaped by the Northern Alps. UNESCO-listed Shirakawa-go villages sit under deep snow half the year; snow monkeys bathe in hot springs near Nagano; and Yamanashi puts Mt Fuji within reach of a morning. Nagoya anchors the region with castle culture, miso cuisine, and a surprisingly vibrant art scene.',
    prefectures: ['Aichi', 'Shizuoka', 'Nagano', 'Gifu', 'Yamanashi'],
    cityLabels: [{ name: 'Nagoya', x: 280, y: 355 }],
  },
  kinki: {
    label: 'Kansai',
    color: '#ec4899',
    hoverColor: '#db2777',
    cities: ['Osaka', 'Kyoto', 'Nara', 'Kobe'],
    tagline: "The cultural heartland of Japan. Kyoto's thousand temples and hidden gardens, Osaka's relentless street food culture, Nara's sacred free-roaming deer, Kobe's cosmopolitan harbour — all within an hour of each other. Push further into Wakayama and Mie for pilgrimage mountains, pearl bays, and the holiest site in all of Shinto.",
    prefectures: ['Osaka', 'Kyoto', 'Nara', 'Hyogo', 'Shiga', 'Wakayama', 'Mie'],
    cityLabels: [
      { name: 'Kyoto', x: 198, y: 318 },
      { name: 'Osaka', x: 188, y: 332 },
    ],
  },
  chugoku: {
    label: 'Chugoku',
    color: '#14b8a6',
    hoverColor: '#0d9488',
    cities: ['Hiroshima', 'Okayama', 'Tottori'],
    tagline: "Hiroshima carries the weight of history with quiet dignity, while just offshore, the floating torii of Miyajima is one of Japan's most iconic images. Okayama has one of the country's three great gardens; Tottori a wind-sculpted dune desert; Shimane the oldest shrine in Japan. The San'in coast is dramatic, crowd-free, and almost entirely overlooked.",
    prefectures: ['Hiroshima', 'Yamaguchi', 'Okayama', 'Tottori', 'Shimane'],
    cityLabels: [{ name: 'Hiroshima', x: 135, y: 382 }],
  },
  shikoku: {
    label: 'Shikoku',
    color: '#84cc16',
    hoverColor: '#65a30d',
    cities: ['Matsuyama', 'Kochi', 'Takamatsu'],
    tagline: "The smallest of Japan's four main islands draws pilgrims completing the 1,200-year-old 88-temple circuit of Kōbō-Daishi. Between the temples: whirlpools thundering through the Naruto Strait, vine-rope suspension bridges deep in the Iya Valley, contemporary art transforming tiny island communities, and uncrowded Pacific surf beaches.",
    prefectures: ['Ehime', 'Kochi', 'Tokushima', 'Kagawa'],
    cityLabels: [{ name: 'Kochi', x: 238, y: 408 }],
  },
  kyushu: {
    label: 'Kyushu',
    color: '#ef4444',
    hoverColor: '#dc2626',
    cities: ['Fukuoka', 'Kagoshima', 'Beppu', 'Nagasaki'],
    tagline: "Steaming, volcanic, and generous — Kyushu has been welcoming outsiders for centuries through Nagasaki's international port. Beppu's otherworldly hot-spring 'hells', Aso's vast caldera, Kagoshima's permanently smoking Sakurajima: the geology is spectacular. The food — tonkotsu ramen, mentaiko, karaage — may be Japan's most beloved regional cuisine.",
    prefectures: ['Fukuoka', 'Saga', 'Nagasaki', 'Kumamoto', 'Oita', 'Miyazaki', 'Kagoshima'],
    cityLabels: [{ name: 'Fukuoka', x: 92, y: 440 }],
  },
  okinawa: {
    label: 'Okinawa',
    color: '#c026d3',
    hoverColor: '#a21caf',
    cities: ['Naha', 'Ishigaki'],
    tagline: "A subtropical archipelago stretching 600 km south toward Taiwan, with its own language, cuisine, and Ryukyu history quite separate from mainland Japan. The coral reefs are the richest in the country; the ancient castle ruins are UNESCO-listed; and the beaches around Kerama and Ishigaki rival anywhere in Southeast Asia.",
    prefectures: ['Okinawa'],
    cityLabels: [{ name: 'Naha', x: 72, y: 548 }],
  },
};

export const REGION_IDS = Object.keys(REGION_META) as RegionId[];

// Derived lookup: prefecture name → region id
export const PREFECTURE_TO_REGION: Record<string, RegionId> = Object.fromEntries(
  REGION_IDS.flatMap((id) => REGION_META[id].prefectures.map((pref) => [pref, id])),
);

// Normalise names from TopoJSON (e.g. "Kyoto Fu" → "Kyoto", "Tokyo To" → "Tokyo")
// Special case: Hokkaido is stored as "Hokkai Do" in the TopoJSON
export function normalizePrefectureName(nam: string): string {
  if (nam === 'Hokkai Do') return 'Hokkaido';
  return nam.replace(/ (To|Fu|Ken|Do)$/, '').trim();
}
