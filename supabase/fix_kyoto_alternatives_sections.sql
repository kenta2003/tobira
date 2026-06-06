-- Fix kyoto-alternatives article section spot_queries
-- 1. Nara: add prefecture + categories:["history"] to prioritise temples/shrines
-- 2. Aizu: fix address_contains "Aizu-Wakamatsu" → "Aizu" (DB match), add prefecture
-- 3. Ise: address_contains "Ise" caused false matches (Daisen etc.) → use prefecture only

-- 1. Nara section (index 1)
update blog_posts
set sections = jsonb_set(
  sections,
  '{1,spot_query}',
  '{"address_contains": "Nara", "prefecture": "Nara", "categories": ["history"], "limit": 3}'::jsonb
)
where slug = '10-alternatives-to-kyoto-without-the-crowds';

-- 2. Aizu section (index 4)
update blog_posts
set sections = jsonb_set(
  sections,
  '{4,spot_query}',
  '{"address_contains": "Aizu", "prefecture": "Fukushima", "limit": 3}'::jsonb
)
where slug = '10-alternatives-to-kyoto-without-the-crowds';

-- 3. Ise section (index 7)
update blog_posts
set sections = jsonb_set(
  sections,
  '{7,spot_query}',
  '{"prefecture": "Mie", "limit": 3}'::jsonb
)
where slug = '10-alternatives-to-kyoto-without-the-crowds';
