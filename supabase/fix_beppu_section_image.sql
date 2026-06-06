-- 別府セクションから手動指定の image を削除
-- → spot_query で見つかったスポットの画像が自動で使われるようになる
-- Run in Supabase SQL Editor

update blog_posts
set sections = (
  select jsonb_agg(
    case
      when s->>'heading' ilike '%beppu%'
      then s - 'image'   -- image フィールドを削除
      else s
    end
  )
  from jsonb_array_elements(sections) as s
)
where slug = 'best-places-in-japan-beyond-tokyo';
