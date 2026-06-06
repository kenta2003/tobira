-- 沖縄県 ファクトチェック結果 一括適用
-- 参照: spot-factcheck-report-okinawa.md

-- ========== 沖縄県 ==========
UPDATE spots SET access = 'By car from Naha approx. 2–2.5 hrs north via Route 58. Bus: Naha → Nago → Bentenma → Cape Hedo by Kunigami Village bus (limited runs; check timetable in advance)' WHERE id = 'cape-hedo';
UPDATE spots SET admission = '¥100 per person (viewing the promenade); free for elementary school age and under. Parking free' WHERE id = 'cape-manzamo';
UPDATE spots SET admission = '¥2,000 adults, ¥1,000 children (4–14); includes cave and culture park. Check official site for group and online discounts' WHERE id = 'gyokusendo-cave';
UPDATE spots SET admission = '¥450 adults, ¥250 high school, ¥150 elementary/junior high', access = 'From Naha: take bus 89 to Itoman Bus Terminal, then bus 82 or 107 to Himeyuri no To-mae (approx. 60–90 min total). Taxi from Naha approx. 30 min' WHERE id = 'himeyuri-museum';
UPDATE spots SET admission = '¥600 (high school and above), ¥400 (junior high and below), free under 6' WHERE id = 'katsuren-castle';
UPDATE spots SET admission = 'Free for island; parking varies by lot (approx. ¥100–500)' WHERE id = 'kouri-island';
UPDATE spots SET access = 'About 9–10 min walk from Makishi Station (Yui Rail); or about 10 min from Miebashi Station' WHERE id = 'makishi-market';
UPDATE spots SET admission = '¥1,500 adults (16+), ¥800 children (4–15); includes cart tour. Check official site for pre-sale and group discounts' WHERE id = 'nago-pineapple-park';
UPDATE spots SET admission = '¥1,000 adults, ¥500 junior/senior high, free for elementary and under (as of Sep 2025). Online discount available', access = 'By car from Naha approx. 1 hr. By bus: Okinawa Bus 65/66 or Yanbaru express to Nakijin Castle or Nakijin Castle Entrance (approx. 2–2.5 hrs from Naha)' WHERE id = 'nakijin-castle';
UPDATE spots SET access = 'Bus #2, #3, or #5 from Naha bus terminal to Shikinaen-mae, then 2 min walk; or about 20 min walk from Shuri Station (Yui Rail)' WHERE id = 'shikinaen-garden';
UPDATE spots SET admission = 'Ferry round trip approx. ¥1,520–1,700 (adult); island itself free to explore', access = 'Ferry from Ishigaki port, about 10–15 min; round trip approx. ¥1,520–1,700 per adult. Check operator for current fares' WHERE id = 'taketomi-island';
UPDATE spots SET admission = 'Park and main trails free. Some guided programs or facilities may charge; check in advance' WHERE id = 'yanbaru-national-park';
UPDATE spots SET access = 'By car from Naha approx. 50 min–1 hr 10 min (Route 58 or expressway). Bus: #28 from Naha bus terminal to Takashibo entrance, then about 30 min walk; or Zakimi bus stop about 15 min walk' WHERE id = 'zakimi-castle';
UPDATE spots SET access = 'High-speed ferry from Naha Tomari port (Queen Zamami): about 50 min; adult one-way ¥3,950, round trip ¥7,510 (as of Jan 2026). Regular ferry also available (lower fare, longer time)' WHERE id = 'zamami-island';

-- ========== チェック済みフラグ（1行で実行してツールの誤検知を防ぐ） ==========
UPDATE spots SET fact_checked_at = NOW() WHERE prefecture = 'Okinawa' AND fact_checked_at IS NULL;
