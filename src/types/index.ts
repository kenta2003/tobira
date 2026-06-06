export type Prefecture = 'Kumamoto' | 'Oita' | 'Miyazaki' | 'Fukuoka' | 'Saga' | 'Nagasaki' | 'Kagoshima' | 'Okinawa' | 'Hiroshima' | 'Yamaguchi' | 'Okayama' | 'Tottori' | 'Shimane' | 'Ehime' | 'Kochi' | 'Tokushima' | 'Kagawa' | 'Hokkaido' | 'Aomori' | 'Iwate' | 'Miyagi' | 'Akita' | 'Yamagata' | 'Fukushima' | 'Osaka' | 'Kyoto' | 'Nara' | 'Hyogo' | 'Shiga' | 'Wakayama' | 'Mie' | 'Aichi' | 'Shizuoka' | 'Nagano' | 'Ishikawa' | 'Gifu' | 'Tokyo' | 'Kanagawa' | 'Saitama' | 'Chiba' | 'Ibaraki' | 'Tochigi' | 'Gunma' | 'Yamanashi' | 'Niigata' | 'Toyama' | 'Fukui';

export type Category =
  | 'nature'
  | 'history'
  | 'onsen'
  | 'food'
  | 'activity'
  | 'spiritual';

export type Region =
  | 'hokkaido' | 'tohoku' | 'kanto' | 'hokuriku' | 'chubu'
  | 'kinki' | 'chugoku' | 'shikoku' | 'kyushu' | 'okinawa';

export type Spot = {
  id: string;
  name: string;
  prefecture: Prefecture;
  region: Region;
  categories: Category[];
  description: string;
  address: string;
  lat: number;
  lng: number;
  image_url: string;
  tags: string[];
  is_premium: boolean;
  instagram_priority?: number;
  highlights: string[];
  best_season: string;
  access: string;
  admission?: string;
  duration?: string;
  website_url?: string;
  google_maps_embed_url?: string;
  opening_hours?: string;
  tips?: string;
  photo_credit?: string;
};

export type TripDay = {
  date?: string;
  spots: Spot[];
  notes?: string;
};
