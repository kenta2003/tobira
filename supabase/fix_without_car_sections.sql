-- 直島: 誤って変更した section_link を /guides/kagawa に戻す
update blog_posts
set sections = jsonb_set(
  sections,
  '{2,section_link}',
  '{"text": "Explore Kagawa", "href": "/guides/kagawa"}'::jsonb
)
where slug = 'best-places-japan-without-car';

-- 直島: spot_ids で naoshima-island を明示指定（spot_query で取れないため）
update blog_posts
set sections = jsonb_set(
  sections,
  '{2,spot_ids}',
  '["naoshima-island"]'::jsonb
)
where slug = 'best-places-japan-without-car';

-- 広島: address_contains を外して広島県全体の history スポットを取得
--        → 厳島神社・宮島・原爆ドームが Hiroshima prefecture でヒットするようになる
update blog_posts
set sections = jsonb_set(
  sections,
  '{3,spot_query}',
  '{"prefecture": "Hiroshima", "categories": ["history"], "limit": 3}'::jsonb
)
where slug = 'best-places-japan-without-car';

-- 鹿児島: address_contains を "Sakurajima" に変更して桜島のスポットを優先表示
update blog_posts
set sections = jsonb_set(
  sections,
  '{4,spot_query}',
  '{"address_contains": "Sakurajima", "prefecture": "Kagoshima", "categories": ["nature"], "limit": 3}'::jsonb
)
where slug = 'best-places-japan-without-car';
