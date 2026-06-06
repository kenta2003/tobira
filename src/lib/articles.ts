import { createAdminClient } from '@/lib/supabase/admin';

export interface SpotQuery {
  address_contains?: string;  // address に含まれる文字列（例: "Beppu"）
  prefecture?: string;        // 都道府県（例: "Oita"）
  categories?: string[];      // カテゴリ（例: ["onsen"]）
  limit?: number;             // 最大件数（デフォルト: 3）
}

export interface ArticleSection {
  heading: string;
  body: string;
  image?: string;         // セクション内画像URL（任意）
  spot_ids?: string[];    // spots テーブルの ID（手動指定・任意）
  spot_query?: SpotQuery; // DB クエリで自動取得（任意）
  section_link?: {        // セクション末尾のリンクボタン（任意）
    text: string;         // 例: "Explore Beppu spots"
    href: string;         // 例: "/spots/beppu-hells" or "/guides/oita"
  };
  travel_time?: string;   // 主要都市からの移動時間（例: "2.5 hrs from Tokyo"）
  best_season?: string;   // ベストシーズン上書き（例: "Jul for lavender / Feb for skiing"）
}

export interface QuickFacts {
  access?: string;
  best_season?: string;
  vibe_tags?: string[];
}

export interface Article {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  readMinutes: number;
  coverImage?: string;
  intro: string;
  sections: ArticleSection[];
  ctaHeading: string;
  ctaBody: string;
  relatedRegion?: string;
  articleType: 'generic' | 'prefecture';
  character?: string;
  quickFacts?: QuickFacts;
  howToGetThere?: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function rowToArticle(row: any): Article {
  return {
    slug: row.slug,
    title: row.title,
    description: row.description,
    publishedAt: row.published_at ? row.published_at.slice(0, 10) : '',
    readMinutes: row.read_minutes,
    coverImage: row.cover_image || undefined,
    intro: row.intro,
    sections: Array.isArray(row.sections) ? (row.sections as ArticleSection[]) : [],
    ctaHeading: row.cta_heading,
    ctaBody: row.cta_body,
    relatedRegion: row.related_region ?? undefined,
    articleType: row.article_type === 'prefecture' ? 'prefecture' : 'generic',
    character: row.character ?? undefined,
    quickFacts: row.quick_facts ?? undefined,
    howToGetThere: row.how_to_get_there ?? undefined,
  };
}

export async function getAllArticles(): Promise<Article[]> {
  const supabase = createAdminClient();
  const { data } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('status', 'published')
    .order('published_at', { ascending: false });
  return (data ?? []).map(rowToArticle);
}

export async function getArticle(slug: string): Promise<Article | undefined> {
  const supabase = createAdminClient();
  const { data } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single();
  return data ? rowToArticle(data) : undefined;
}

export async function getPrefectureArticles(excludeSlug?: string): Promise<Article[]> {
  const supabase = createAdminClient();
  let query = supabase
    .from('blog_posts')
    .select('*')
    .eq('status', 'published')
    .eq('article_type', 'prefecture')
    .order('published_at', { ascending: false });
  if (excludeSlug) query = query.neq('slug', excludeSlug);
  const { data } = await query;
  return (data ?? []).map(rowToArticle);
}

export async function getRelatedArticles(currentSlug: string, count = 2): Promise<Article[]> {
  const supabase = createAdminClient();
  const { data } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('status', 'published')
    .neq('slug', currentSlug)
    .order('published_at', { ascending: false })
    .limit(count);
  return (data ?? []).map(rowToArticle);
}

type AdminSupabase = ReturnType<typeof createAdminClient>;

/**
 * cover_image 未設定時のサムネイル／ヒーロー用。
 * セクションを先頭から走査し、記事ページの sectionSpots と同じ優先度で
 * 最初に得られる「そのセクションの先頭スポット」の image_url を返す。
 * （spot_ids は配列順の先頭から存在する行を、spot_query は [slug]/page.tsx の resolveQuery と同じ）
 */
export async function getFallbackCoverImageUrlFromSections(
  sections: ArticleSection[],
  supabase: AdminSupabase,
): Promise<string | undefined> {
  for (const s of sections) {
    if (s.spot_ids?.length) {
      for (const id of s.spot_ids) {
        const { data } = await supabase.from('spots').select('image_url').eq('id', id).maybeSingle();
        if (data?.image_url) return data.image_url;
      }
    } else if (s.spot_query) {
      const q = s.spot_query;
      let builder = supabase.from('spots').select('image_url');
      if (q.address_contains) builder = builder.ilike('address', `%${q.address_contains}%`);
      if (q.prefecture) builder = builder.eq('prefecture', q.prefecture);
      if (q.categories?.length) builder = builder.contains('categories', q.categories);
      builder = builder.order('image_url', { ascending: false, nullsFirst: false }).limit(q.limit ?? 3);
      const { data } = await builder;
      if (data?.[0]?.image_url) return data[0].image_url;
    }
  }
  return undefined;
}
