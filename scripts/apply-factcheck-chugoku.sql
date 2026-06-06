-- 中国5県（広島・岡山・鳥取・島根・山口）ファクトチェック結果 一括適用
-- 参照: spot-factcheck-report-chugoku-batch1.md, spot-factcheck-report-chugoku-batch2.md

-- ========== 広島県 ==========
UPDATE spots SET access = 'Tram Line 2 or 6 from Hiroshima Station to Genbaku Dome-mae (approx. 25 min per official); then short walk to the dome' WHERE id = 'hiroshima-peace-memorial';
UPDATE spots SET access = 'Tram to Genbaku Dome-mae or Honkawa-cho; about 10 min walk from Genbaku Dome-mae tram stop to the museum (about 5 min from the A-Bomb Dome structure)' WHERE id = 'hiroshima-peace-museum';
UPDATE spots SET admission = 'Free (park); ropeway round-trip ¥2,000 (adult)' WHERE id = 'miyajima-momijidani';

-- ========== 岡山県 ==========
UPDATE spots SET access = 'Train from Niimi to Chugoku-Katsuyama, then community bus to Hiruzen Highlands (bus approx. 1.5 h); or use car. Check bus timetables in advance' WHERE id = 'hiruzen-highlands';
UPDATE spots SET admission = '¥500 (adult); high school and below free; senior (65+) ¥200', access = 'About 10–15 min by bus from JR Okayama Station to Korakuen-guchi, or about 25 min on foot' WHERE id = 'korakuen-garden';
UPDATE spots SET admission = 'Free (area); Ohara Museum of Art ¥2,000 (adult)' WHERE id = 'kurashiki-bikan';
UPDATE spots SET access = 'From JR Uno Station, bus to Tamano beaches approx. 20–30 min, or taxi; ferry to Naoshima departs from Uno Port (near Uno Station)' WHERE id = 'ohama-beach-tamano';
UPDATE spots SET admission = '¥400 (adult); ¥320 for groups of 20 or more. From Apr 2026: ¥500 (adult), students free', access = 'About 25 min walk from JR Okayama Station; or streetcar to Shiroshita (approx. 5 min) then about 10 min walk' WHERE id = 'okayama-castle';
UPDATE spots SET access = 'From JR Ogura Station (or Nishidaiji Station), take bus to Ushimado area (bus approx. 20–25 min to bus stop, then walk); or by car from Okayama. Not directly accessible by bus from Bizen Imbe Station' WHERE id = 'ushimado-coast';

-- ========== 鳥取県 ==========
UPDATE spots SET admission = '¥800 (adult) for Nageire-do climbing visit (includes rental sandals); ¥400 for main hall only', access = 'About 10 min drive from Misasa Onsen; or about 38 min by bus from Kurayoshi Station to Mitokusan entrance, then 5 min walk. Rental car recommended for flexibility' WHERE id = 'sanbutsuji-nageire';
UPDATE spots SET admission = '¥800 (adult), ¥400 (elementary to high school). Group rates available' WHERE id = 'sand-museum-tottori';
UPDATE spots SET access = 'About 30 min on foot from Tottori Station; or about 8 min by 100-yen loop bus (Kururi) to Nippōkaku / Prefectural Museum stop, then short walk' WHERE id = 'tottori-castle-ruins';

-- ========== 島根県 ==========
UPDATE spots SET access = 'Free shuttle from Yasugi Station (JR), about 20 min to the museum' WHERE id = 'adachi-museum';
UPDATE spots SET access = 'About 45 min by bus from Izumo Taisha bus terminal (Ichibata Bus Hinomisaki line). From Izumo-shi Station to Hinomisaki about 45 min by same line' WHERE id = 'hinomisaki-shrine';
UPDATE spots SET admission = 'Town free; Ryūgenji tunnel (mine) ¥500 (adult), ¥250 (junior high & elementary). As of Apr 2024', access = 'Bus from Oda-shi Station (JR), about 30 min to Omori area; limited service. Park-and-ride from World Heritage Center recommended' WHERE id = 'iwami-ginzan';
UPDATE spots SET admission = 'Free for precinct; treasure hall (Shinkoden) ¥300 (adult), ¥200 (university & high school), ¥100 (junior high & elementary)' WHERE id = 'izumo-taisha';
UPDATE spots SET admission = '¥800 (adult), ¥400 (elementary & junior high). As of Apr 2025', access = 'About 25 min walk from Matsue Station; or about 10 min by Lake Line bus to Otemae stop' WHERE id = 'matsue-castle';
UPDATE spots SET admission = 'Free', access = 'About 10 min by car from Izumo-Minari Station (JR Kisuki Line); or about 30 min or more by car from Yasugi. Rental car recommended' WHERE id = 'oni-no-shitaburui';
UPDATE spots SET access = 'From Tamatsukuri-onsen Station (JR San''in Line): about 3 min walk to bus stop, then about 6 min by bus to Tamatsukuri Onsen. Or request pickup from your lodgings' WHERE id = 'tamatsukuri-onsen';

-- ========== 山口県 ==========
UPDATE spots SET admission = '¥1,600 (adult & high school), ¥1,300 (junior high), ¥850 (elementary). As of Oct 2024', access = 'Bus from Shin-Yamaguchi Station (Shinkansen / JR), about 40–50 min to Akiyoshido Bus Center; then about 10 min walk to cave entrance' WHERE id = 'akiyoshido-cave';
UPDATE spots SET access = 'JR Chomonkyo Station (Yamaguchi Line), then about 5 min walk. From Yamaguchi Station by JR to Chomonkyo Station; bus from Yamaguchi city is not the main route' WHERE id = 'chomonkyo-gorge';
UPDATE spots SET access = 'Bus from Iwakuni Station (JR), about 20 min to Kintaikyo; or from Shin-Iwakuni Station (Shinkansen), about 15 min by bus. Not within walking distance from either station' WHERE id = 'kintaikyo-bridge';
UPDATE spots SET access = 'About 10–15 min by community bus (Ouchi route) from Yamaguchi Station to Kozan Park Goju-no-to-mae stop. On foot from station about 30 min or more' WHERE id = 'rurikoji-temple';
UPDATE spots SET access = 'About 1 hour by car from Shimonoseki. By public transport (train + bus) about 2.5 hours from Shimonoseki Station' WHERE id = 'tsunoshima-bridge';
UPDATE spots SET admission = 'Foot baths free; day-use baths from about ¥600 (varies by facility)', access = 'About 10–15 min walk from Yuda-Onsen Station (JR Yamaguchi Line) to the main hot-spring street' WHERE id = 'yuda-onsen';

-- ========== チェック済みフラグ（1行で実行してツールの誤検知を防ぐ） ==========
UPDATE spots SET fact_checked_at = NOW() WHERE prefecture IN ('Hiroshima', 'Okayama', 'Tottori', 'Shimane', 'Yamaguchi') AND fact_checked_at IS NULL;
