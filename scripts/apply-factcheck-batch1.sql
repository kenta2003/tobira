-- ファクトチェック結果に基づく spots 修正（神奈川・埼玉 前半20件）
-- 実行前: 必要に応じてバックアップを取得してください
-- 参照: scripts/spot-factcheck-report.md
-- ※ ❌要修正 に加え ⚠️要注意 も反映済み

-- ----- 要注意（⚠️）の修正 -----
-- 江の島: 新宿〜約60〜70分のため表記を修正
UPDATE spots SET
  access = 'Enoshima Station on Odakyu Enoshima Line (about 60–70 min from Shinjuku)'
WHERE id = 'enoshima-island';

-- 箱根温泉: ロマンスカー約75分 + フリーパス料金は発駅で異なる旨を明記（要注意＋要修正）
UPDATE spots SET
  admission = 'Free Pass ¥5,000–6,100 (2 days, dep. Odawara/Shinjuku)',
  access = 'Romance Car from Shinjuku (about 75 min) or Shinkansen to Odawara (35 min)'
WHERE id = 'hakone-ryokan';

-- 小田原城: 2026年3月から改定予定の注記（要注意）
UPDATE spots SET
  admission = '¥510 (from Mar 2026: ¥1,000)'
WHERE id = 'odawara-castle';

-- 大宮盆栽: 徒歩10分は「駅から美術館まで」と明記（要注意）。料金は要修正で下で更新
UPDATE spots SET
  access = 'Omiya-Koen Station (Tobu Noda Line), 10 min walk to museum'
WHERE id = 'omiya-bonsai-village';

-- ----- 要修正（❌）の修正 -----
-- 1. 箱根彫刻の森美術館: 入場料・アクセス所要時間を修正
UPDATE spots SET
  admission = '¥2,000 (WEB ¥1,800)',
  access = 'Chokoku no Mori Station on Hakone Tozan Railway (about 2hr from Shinjuku)'
WHERE id = 'hakone-open-air-museum';

-- 3. 鎌倉大仏・長谷寺: 長谷寺料金追記、アクセス誤記修正（鎌倉駅から約5分）
UPDATE spots SET
  admission = '¥200 (Great Buddha), Hase-dera ¥400',
  access = 'Hase Station on Enoden Line (about 5 min from Kamakura Station)'
WHERE id = 'kamakura-great-buddha';

-- 4. 三溪園: 大人料金を900円に修正（2023年10月〜）
UPDATE spots SET
  admission = '¥900'
WHERE id = 'sankeien-garden';

-- 5. 国営武蔵丘陵森林公園: 最寄りは森林公園駅
UPDATE spots SET
  access = 'Shinrin-koen Station (Tobu Tojo Line), then bus to south/west gate (60–70 min from Ikebukuro)'
WHERE id = 'higashi-matsuyama-hike';

-- 6. 長瀞: 舟下り料金を正しい値に（3km 大人¥2,000〜）
UPDATE spots SET
  admission = 'Free (boat from ¥2,000 for 3km course)'
WHERE id = 'nagatoro-gorge';

-- 7. 大宮盆栽美術館: 一般310円に修正（access は要注意で上記の UPDATE 済み）
UPDATE spots SET
  admission = 'Museum ¥310'
WHERE id = 'omiya-bonsai-village';

-- 8. 鉄道博物館: 2024年4月改定後の料金
UPDATE spots SET
  admission = '¥1,600'
WHERE id = 'saitama-railway-museum';

-- 前半20件（神奈川・埼玉）をチェック済みにする
-- ※ 後半20件の検証・修正が終わってから一括で実行する場合は、下記をコメントアウトして後で実行
-- UPDATE spots SET fact_checked_at = NOW()
-- WHERE prefecture IN ('Kanagawa', 'Saitama')
--   AND id IN (
--     'enoshima-island','hakone-ryokan','hakone-open-air-museum','kamakura-great-buddha',
--     'kamakura-temples-trail','miura-peninsula','odawara-castle','sankeien-garden',
--     'yokohama-chinatown','yokohama-minatomirai',
--     'chichibu-shrine','kawagoe-little-edo','hanno-tenran-mountain','higashi-matsuyama-hike',
--     'nagatoro-gorge','omiya-bonsai-village','ranzan-gorge','saitama-railway-museum',
--     'washinomiya-shrine','yoshimi-caves'
--   );
