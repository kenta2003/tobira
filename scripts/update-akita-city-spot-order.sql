-- Akita City section: show Kanto Festival before Kubota Castle in spot cards.
-- Run in Supabase SQL Editor after akita-travel-guide is published.

update blog_posts
set sections = jsonb_set(
  sections,
  '{0,spot_ids}',
  '["akita-kanto-festival", "kubota-castle-ruins", "akita-kiritanpo"]'::jsonb
)
where slug = 'akita-travel-guide';
