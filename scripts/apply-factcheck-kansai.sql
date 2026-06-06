-- 関西6県（大阪・京都・兵庫・奈良・滋賀・和歌山）ファクトチェック結果 一括適用
-- 参照: spot-factcheck-report-kansai-batch1.md, spot-factcheck-report-kansai-batch2.md

-- ========== 京都府 ==========
UPDATE spots SET access = 'About 50–60 min by City Bus #205 from Kyoto Station to Daitokuji-mae, then 5–10 min walk' WHERE id = 'daitokuji-temple';
UPDATE spots SET access = '3 min walk from Chushojima Station (Keihan Main Line)' WHERE id = 'fushimi-sake-district';
UPDATE spots SET access = '1 min off the Philosopher''s Path; nearest bus stops: Eikando-michi or Jodoji (City Bus)' WHERE id = 'honen-in';
UPDATE spots SET admission = '¥300–1,000 (garden admission, varies by season; see jonangu.com). Free for shrine precinct only' WHERE id = 'jonangu-shrine';
UPDATE spots SET access = 'Tofukuji Station on JR Nara Line or Keihan Line (JR from Kyoto Station about 3 min), then about 10 min walk to the temple' WHERE id = 'tofukuji-garden';

-- ========== 大阪府 ==========
UPDATE spots SET access = 'About 3–4 min walk from Nipponbashi Station (Sennichimae or Sakaisuji Line)' WHERE id = 'kuromon-ichiba';
UPDATE spots SET access = 'Mozu Station or Mikunigaoka Station on JR Hanwa Line (approx. 30 min from Namba via Nankai + JR); Mozu is closer to the tomb park' WHERE id = 'sakai-mounded-tombs';
UPDATE spots SET admission = 'Free to explore district; Tsutenkaku observation deck ¥1,200 (adult), ¥600 (child) as of 2025; ¥1,500/¥800 from Apr 2026' WHERE id = 'shinsekai-district';
UPDATE spots SET admission = '¥500 (center precinct; free on 21st and 22nd of each month and during spring/autumn equinox services); garden ¥300' WHERE id = 'shitennoji-temple';
UPDATE spots SET access = 'Tsuruhashi Station (JR Loop Line, Kintetsu, or Sennichimae Line; about 10 min from Namba)' WHERE id = 'tsuruhashi-koreatown';

-- ========== 兵庫県 ==========
UPDATE spots SET access = 'Bus from Sannomiya, Kobe: about 37 min to Awaji IC; about 1h 30min to Sumoto Bus Center. Check destination for exact time' WHERE id = 'awaji-island';
UPDATE spots SET admission = 'Rokko Cable round-trip ¥1,550 (adult), ¥780 (child); one-way also available. As of 2025' WHERE id = 'rokko-mountain';
UPDATE spots SET admission = '¥500 (adult). Collected Mar 1–Jan 3; closed Jan 4–end Feb', access = 'JR Takeda Station (Bantan Line), then about 40 min walk via station-side path, or take Tengu Bus to mid-slope (about 20 min) then about 20 min walk to the ruins' WHERE id = 'takeda-castle-ruins';

-- ========== 奈良県 ==========
UPDATE spots SET admission = '¥700 (inner precinct / special visit; as of Oct 2024). Free for outer precinct' WHERE id = 'kasuga-taisha';
UPDATE spots SET access = 'About 14 min by bus from Muroguchi-Ono Station (Kintetsu Osaka Line) to Muroji, then about 5 min walk' WHERE id = 'muro-ji-temple';

-- ========== 滋賀県 ==========
UPDATE spots SET access = 'About 25 min walk from Azuchi Station (JR Biwako Line). Uphill; comfortable shoes recommended' WHERE id = 'azuchi-castle-ruins';
UPDATE spots SET admission = 'Boat round-trip from about ¥2,590 (adult, from Imazu) to ¥3,600 (from Nagahama); island shrine/temple admission about ¥400–600. Free to land only' WHERE id = 'chikubu-island';
UPDATE spots SET admission = '¥500 (adult), ¥300 (junior high & high school), free for elementary and below', access = 'About 10 min walk from Keihan Sakamoto-Hieizanguchi Station; or about 20–25 min walk from JR Hieizan-Sakamoto Station (Biwako Line / Kosei Line)' WHERE id = 'hiyoshi-taisha';
UPDATE spots SET access = 'Makino Station on JR Kosei Line; about 25 min by bicycle or 30 min on foot to the avenue entrance (Makino Pickland area)' WHERE id = 'metasequoia-avenue';
UPDATE spots SET access = 'Bus from Ishiyama Station (JR, about 50 min to museum); or Shigaraki Station on Shigaraki Kogen Railway (from Kibukawa, JR Kusatsu Line), then bus about 20 min (during opening seasons only). Check calendar for bus operation' WHERE id = 'miho-museum';
UPDATE spots SET access = 'About 6–10 min by bus from Omi-Hachiman Station (JR Biwako Line) to Hachimanbori / Hachiman-yama Ropeway stop' WHERE id = 'omi-hachiman';

-- ========== 和歌山県 ==========
UPDATE spots SET admission = 'Day bath from ¥800 (public bath Ryujin Onsen Motoyu); some inns ¥800–1,000' WHERE id = 'ryujin-onsen';

-- ========== チェック済みフラグ（1行で実行してツールの誤検知を防ぐ） ==========
UPDATE spots SET fact_checked_at = NOW() WHERE prefecture IN ('Osaka', 'Kyoto', 'Hyogo', 'Nara', 'Shiga', 'Wakayama') AND fact_checked_at IS NULL;
