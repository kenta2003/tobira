-- apply-factcheck-iwate.sql
-- ファクトチェック結果に基づく修正

-- morioka-wanko-soba: 料金・営業時間・tips を修正
UPDATE spots SET
  admission = '¥4,500 per person (all-you-can-eat, tax included)',
  opening_hours = '11:00–15:00, 17:00–19:00 L.O. (varies by restaurant; closed irregular days)',
  tips = 'Walk-in only on weekends and public holidays — reservations are not accepted. Weekday bookings are recommended. Pace yourself early — many people slow down around bowl 30. Wearing stretchy clothing is genuinely recommended by locals.'
WHERE id = 'morioka-wanko-soba';

-- hiraizumi-motsuji: access の徒歩時間を修正 (5分 → 7分)
UPDATE spots SET
  access = '7-minute walk from Hiraizumi Station (JR Tohoku Main Line, 0.7 km). Hiraizumi is 40 minutes from Morioka by Shinkansen to Ichinoseki, then local train.'
WHERE id = 'hiraizumi-motsuji';

-- iwate-san-volcano: 入山規制情報・access を修正
UPDATE spots SET
  opening_hours = 'Volcanic alert Level 2 issued October 2024 — all trails currently restricted (as of March 2026). Eastern-side routes partially lifting from 1 July 2026. Check the Japan Meteorological Agency and Iwate Prefecture website for the latest status before planning.',
  access = 'Drive or take a taxi from Morioka to Amihari Onsen trailhead (approx. 50 minutes by car). No scheduled bus service to the main trailheads. Check trail access status before departure due to ongoing volcanic activity restrictions.'
WHERE id = 'iwate-san-volcano';

-- fact_checked_at を更新
UPDATE spots SET fact_checked_at = NOW()
WHERE id IN (
  'morioka-castle-ruins',
  'morioka-wanko-soba',
  'hiraizumi-motsuji',
  'iwate-san-volcano',
  'morioka-reimen'
);
