-- 中部5県（愛知・静岡・長野・岐阜・三重）ファクトチェック結果 一括適用
-- 参照: spot-factcheck-report-chubu-batch1.md, spot-factcheck-report-chubu-batch2.md

-- ========== 愛知県 ==========
UPDATE spots SET access = '7 min walk from Jingu-Nishi Station (Meijo Line)' WHERE id = 'atsuta-jingu';
UPDATE spots SET admission = '¥1,000 (adults), ¥200 (elementary/junior high)', access = 'About 20 min walk from Inuyama Station (Meitetsu Line)' WHERE id = 'inuyama-castle';
UPDATE spots SET admission = '¥2,500 (adults), ¥1,500 (high school), ¥700 (elementary/junior high)' WHERE id = 'meiji-mura';
UPDATE spots SET access = '5 min walk from Nagoya-jo Station (Meijo Line), 7th exit' WHERE id = 'nagoya-castle';
UPDATE spots SET admission = '¥300 (adults), ¥150 (age 5+)', access = '15 min walk from Higashi-Okazaki Station (Meitetsu Line)' WHERE id = 'okazaki-castle';
UPDATE spots SET admission = 'Free (streets); Seto Gura Museum ¥520 (adults)' WHERE id = 'seto-city-ceramics';
UPDATE spots SET access = 'About 35–40 min from Nagoya by Meitetsu Airport Line (rapid/limited express)' WHERE id = 'tokoname-pottery-town';

-- ========== 静岡県 ==========
UPDATE spots SET admission = 'Boat tour ¥1,500 (adults), ¥750 (children)' WHERE id = 'dogashima-caves';
UPDATE spots SET access = 'About 10 min walk from Fujinomiya Station (JR Minobu Line)' WHERE id = 'fujinomiya-sengen';
UPDATE spots SET access = 'About 20 min walk or 10 min by bus from Hamamatsu Station (JR Tokaido Line)' WHERE id = 'hamamatsu-castle';
UPDATE spots SET access = 'About 2h 25m from Tokyo (Odoriko limited express to Kawazu)' WHERE id = 'kawazu-cherry';
UPDATE spots SET access = 'About 25 min by bus from Shimizu Station to Mihono-Matsubara entrance, then about 13–15 min on foot' WHERE id = 'miho-no-matsubara';
UPDATE spots SET access = 'About 25–30 min on foot, or about 8–15 min by bus, from Numazu Station (JR Tokaido Line)' WHERE id = 'numazu-port';
UPDATE spots SET access = 'Kanaya Station from Shizuoka Station (JR Tokaido Line, about 32 min)' WHERE id = 'ooigawa-railway';
UPDATE spots SET access = 'About 35–45 min from Mishima Station by train (Izuhakone Railway Sunzu Line)' WHERE id = 'shuzenji-onsen';

-- ========== 長野県 ==========
UPDATE spots SET admission = 'Public baths ¥250–300 (adult; ticket machine ¥250 from Apr 2024)' WHERE id = 'bessho-onsen';
UPDATE spots SET access = 'Bus from Yudanaka Station to Snow Monkey Park (15 min), then 35 min walk' WHERE id = 'jigokudani-monkey-park';
UPDATE spots SET admission = 'Free (shuttle bus round trip from Sawando/Hirayu approx. ¥2,800)', access = 'From Matsumoto: train to Shin-Shimashima (approx. 30 min), then reserved bus to Kamikochi (approx. 1 hr); or direct bus from Matsumoto Bus Terminal (approx. 1 hr 30 min, 2/day, reservation required)' WHERE id = 'kamikochi-valley';
UPDATE spots SET admission = 'Adults ¥1,200 (e-ticket) / ¥1,300 (paper); children ¥400' WHERE id = 'matsumoto-castle';
UPDATE spots SET access = 'Bus from Iiyama Station (Hokuriku Shinkansen), about 25 min, ¥600' WHERE id = 'nozawa-onsen';
UPDATE spots SET admission = 'Park free; museum & keep set ¥500, or each ¥300' WHERE id = 'ueda-castle';
UPDATE spots SET admission = 'Kaidan-meguri (inner hall + underground corridor) ¥600 (adult)' WHERE id = 'zenko-ji';

-- ========== 岐阜県 ==========
UPDATE spots SET access = 'No direct bus from Gero. From Nagoya by highway bus approx. 1 hr 15 min; or by train via Mino-Ota approx. 2 hr 36 min from Gero' WHERE id = 'gujo-hachiman';
UPDATE spots SET access = 'Nagaragawa Railway from Gifu to Mino-shi Station, then bus or shared taxi to washi district (allow 40+ min total from Gifu)' WHERE id = 'mino-washi-town';
UPDATE spots SET admission = 'Museum ¥500 (adult)', access = 'Sekigahara Station on JR Tokaido Line (from Nagoya, approx. 45 min)' WHERE id = 'sekigahara-battlefield';
UPDATE spots SET access = 'Bus from Nagoya (approx. 2 hr 30 min) or Kanazawa (approx. 1 hr 20 min); reservation recommended' WHERE id = 'shirakawa-go';

-- ========== 三重県 ==========
UPDATE spots SET admission = 'Mikimoto Pearl Island ¥1,650 (adult), ¥820 (child)' WHERE id = 'ago-bay';
UPDATE spots SET admission = '¥1,000 (adult), ¥500 (child); valley conservation fee', access = 'Bus from Akameguchi Station (Kintetsu), approx. 10 min to Akame-no-taki' WHERE id = 'akame-waterfalls';
UPDATE spots SET access = 'Bus from Iseshi Station (Kintetsu/JR) to Naiku, approx. 20–30 min' WHERE id = 'ise-grand-shrine';
UPDATE spots SET access = 'Bus from Toba Station (Kintetsu), approx. 35–45 min to Osatsu (Oosatsu / Ishigan-sama-mae)' WHERE id = 'osatsu-ama-divers';
UPDATE spots SET admission = 'Adults ¥2,800, school children ¥1,600, ages 3+ ¥800' WHERE id = 'toba-aquarium';

-- ========== チェック済みフラグ（1行で実行してツールの誤検知を防ぐ） ==========
UPDATE spots SET fact_checked_at = NOW() WHERE prefecture IN ('Aichi', 'Shizuoka', 'Nagano', 'Gifu', 'Mie') AND fact_checked_at IS NULL;
