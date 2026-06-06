import type { ThemeSpec } from '@/types/instagram'

const MAX_HASHTAGS = 30

const BASE_TAGS = ['#tobira', '#japan', '#visitjapan', '#japantravel', '#discoverjapan']

const REGION_TAGS: Record<string, string[]> = {
  hokkaido: ['#hokkaido', '#北海道'],
  tohoku: ['#tohoku', '#東北'],
  kanto: ['#kanto', '#関東'],
  hokuriku: ['#hokuriku', '#北陸'],
  chubu: ['#chubu', '#中部'],
  kinki: ['#kansai', '#関西', '#近畿'],
  chugoku: ['#chugoku', '#中国地方'],
  shikoku: ['#shikoku', '#四国'],
  kyushu: ['#kyushu', '#九州'],
  okinawa: ['#okinawa', '#沖縄'],
}

const CATEGORY_TAGS: Record<string, string[]> = {
  nature: ['#nature', '#naturejapan', '#自然'],
  history: ['#history', '#historicjapan', '#歴史'],
  onsen: ['#onsen', '#hotspring', '#温泉'],
  food: ['#foodiejapan', '#japanesefood', '#グルメ'],
  activity: ['#activity', '#adventure', '#アクティビティ'],
  spiritual: ['#spiritual', '#shrine', '#temple', '#パワースポット'],
}

const SEASON_TAGS: Record<string, string[]> = {
  spring: ['#spring', '#springjapan', '#桜', '#sakura'],
  summer: ['#summer', '#summerjapan', '#夏'],
  autumn: ['#autumn', '#fall', '#autumnjapan', '#紅葉'],
  winter: ['#winter', '#winterjapan', '#冬'],
}

export function generateHashtags(theme: ThemeSpec): string[] {
  const tags = new Set<string>(BASE_TAGS)

  if (theme.region) {
    for (const t of REGION_TAGS[theme.region] ?? []) tags.add(t)
  }

  if (theme.category) {
    for (const t of CATEGORY_TAGS[theme.category] ?? []) tags.add(t)
  }

  if (theme.season) {
    for (const t of SEASON_TAGS[theme.season] ?? []) tags.add(t)
  }

  return [...tags].slice(0, MAX_HASHTAGS)
}
