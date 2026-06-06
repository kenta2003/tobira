-- 広島: spot_ids で厳島神社・原爆ドーム・平和記念資料館を直接指定
update blog_posts
set sections = jsonb_set(
  sections,
  '{3,spot_ids}',
  '["itsukushima-shrine", "hiroshima-peace-memorial", "hiroshima-peace-museum"]'::jsonb
)
where slug = 'best-places-japan-without-car';
