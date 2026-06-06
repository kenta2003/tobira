-- 山梨県 ファクトチェック結果 一括適用
-- 参照: spot-factcheck-report-yamanashi.md

-- ========== 山梨県 ==========
UPDATE spots SET access = 'Kawaguchiko Station on Fujikyuko Line (direct limited express from Shinjuku, approx. 2 hrs; check timetable).' WHERE id = 'kawaguchiko-fuji';
UPDATE spots SET access = 'Minobu Station on JR Minobu Line (from Kofu by limited express, approx. 1 hr), then bus to temple area (approx. 15 min).' WHERE id = 'minobu-mountain';
UPDATE spots SET admission = '¥4,000 (passage fee as of 2025; mandatory for Yoshida route). Check official climbing site for latest rules and booking.' WHERE id = 'fujisan-world-heritage';
UPDATE spots SET access = 'Fuji Subaru Line 5th Station by bus from Kawaguchiko (Fujikyū Bus, approx. 50 min); check timetable and road opening.' WHERE id = 'fujisan-world-heritage';
UPDATE spots SET admission = 'Free for the eight ponds. One pond (Sokonuke-ike) is inside a paid museum: adults ¥300, children ¥150.' WHERE id = 'oshino-hakkai';
UPDATE spots SET access = 'Bus from Kawaguchiko Station (Fujikyū Bus to Oshino Hakkai, approx. 25–30 min).' WHERE id = 'oshino-hakkai';
UPDATE spots SET access = 'Bus from Kawaguchiko Station to Fuketsu or Hyoketsu stop (approx. 30 min). Fujikyū Bus; check timetable.' WHERE id = 'aokigahara-forest';
UPDATE spots SET access = 'Kofu Station on JR Chuo Line (approx. 1 hr 40 min from Shinjuku by limited express), then about 3 min on foot.' WHERE id = 'kofu-castle';
UPDATE spots SET access = 'Kiyosato Station on JR Koumi Line (from Kobuchizawa; Shinjuku to Kobuchizawa approx. 2 hrs by limited express, then Koumi Line to Kiyosato approx. 30 min; total from Shinjuku to Kiyosato approx. 2.5–3 hrs).' WHERE id = 'yatsugatake-highlands';

-- ========== チェック済みフラグ（1行で実行してツールの誤検知を防ぐ） ==========
UPDATE spots SET fact_checked_at = NOW() WHERE prefecture = 'Yamanashi' AND fact_checked_at IS NULL;
