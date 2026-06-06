-- 北陸4県（新潟・富山・石川・福井）ファクトチェック結果 一括適用
-- 参照: spot-factcheck-report-hokuriku-batch1.md, spot-factcheck-report-hokuriku-batch2.md

-- ========== 新潟県 ==========
UPDATE spots SET admission = '¥4,500 (passport in-season; advance ¥3,500)' WHERE id = 'echigo-tsumari-art';
UPDATE spots SET admission = 'Museum ¥700 (children ¥300)' WHERE id = 'joetsu-dinosaur-museum';
UPDATE spots SET admission = 'Ski pass from ¥5,800 (early bird) / ¥8,000 (standard 1-day)' WHERE id = 'myoko-kogen';
UPDATE spots SET admission = 'Ski pass from ¥7,800 (Naeba 1-day), ¥9,800 (Naeba–Kagura common)' WHERE id = 'naeba-ski';
UPDATE spots SET access = 'Niigata Station (Joetsu Shinkansen, about 90 min from Tokyo, fastest 1h 29m)' WHERE id = 'niigata-city-canal';
UPDATE spots SET admission = 'Tasting ¥500 (5 coins + cup at Ponshukan, Niigata Station)' WHERE id = 'niigata-sake-breweries';
UPDATE spots SET admission = 'Museum ¥550 (from Apr 2026), ¥520 until then' WHERE id = 'ojiya-koi-city';
UPDATE spots SET admission = 'Ferry from ¥2,890 (2nd class one-way); jetfoil ~1h, car ferry ~2.5h' WHERE id = 'sado-island';
UPDATE spots SET admission = 'Free (ropeway round-trip ¥1,500, one-way ¥800)' WHERE id = 'yahiko-shrine';

-- ========== 富山県 ==========
UPDATE spots SET admission = 'Free entry; parking ¥500 (car), ¥100 (motorcycle)' WHERE id = 'gokayama-village';
UPDATE spots SET admission = 'Museum ¥820 (Mar 20–May 31), ¥620 (Jun 1–Mar 19)' WHERE id = 'hotaruika-firefly-squid';
UPDATE spots SET admission = '¥10,940 one-way adult (Tateyama–Ogisawa), child ¥5,480' WHERE id = 'kurobe-dam';
UPDATE spots SET admission = 'Torokko round-trip ¥2,820 (Unazuki–Nekomata), ¥1,660 (Unazuki–Kuronagi)' WHERE id = 'unarizuki-onsen';

-- ========== 石川県 ==========
UPDATE spots SET admission = 'Shima ¥500 (adults), ¥300 (children)', access = 'Bus from Kanazawa Station (approx. 15 min) to Higashi Chaya area' WHERE id = 'higashi-chaya-district';
UPDATE spots SET access = 'Bus from Kanazawa Station (approx. 15 min) to Kenrokuen-shita, then short walk' WHERE id = 'kenroku-en-garden';
UPDATE spots SET admission = 'Day baths from ¥460 (public) or from ¥800 (ryokan)' WHERE id = 'kaga-onsen';
UPDATE spots SET admission = 'Free (community zone). Exhibition fees vary (collection approx. ¥450, special approx. ¥1,200)' WHERE id = 'kanazawa-21-museum';
UPDATE spots SET access = 'Train to Tsurugi (Hokuriku Railway Ishikawa Line from Kanazawa), then bus to shrine (approx. 7 min)' WHERE id = 'shirayama-hime-shrine';

-- ========== 福井県 ==========
UPDATE spots SET admission = 'Day bath from ¥500 (e.g. Sentopia Awara)', access = 'Awara-Onsen Station on Hokuriku Shinkansen (from Tokyo via Kanazawa, approx. 3h)' WHERE id = 'awara-onsen';
UPDATE spots SET admission = 'Museum ¥200 (or ¥300 during special exhibitions)', access = 'Takeji/Fukui Station (JR), then bus to Washi no Sato (approx. 30 min)' WHERE id = 'echizen-washi-paper';
UPDATE spots SET admission = 'Adults ¥700, children (elementary/junior high) ¥300' WHERE id = 'eiheiji-temple';
UPDATE spots SET admission = 'Reconstructed town: adults ¥330, children ¥100' WHERE id = 'ichijodani-ruins';
UPDATE spots SET admission = 'Clifftop free. Boat: adults ¥1,800, children ¥900', access = 'Bus from Awara-Onsen Station (approx. 40 min)' WHERE id = 'tojinbo-cliffs';

-- ========== チェック済みフラグ ==========
UPDATE spots SET fact_checked_at = NOW()
WHERE prefecture IN ('Niigata', 'Toyama', 'Ishikawa', 'Fukui')
  AND fact_checked_at IS NULL;
