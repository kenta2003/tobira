-- 北海道 ファクトチェック結果 一括適用
-- 参照: spot-factcheck-report-hokkaido.md

-- ========== 北海道 ==========
UPDATE spots SET admission = 'Aurora icebreaker (large ship): Jan & Mar ¥5,000 adult, ¥2,500 elementary; Feb ¥6,000 adult, ¥3,000 elementary. Junior high and above adult fare; preschool free. Advance booking strongly recommended.' WHERE id = 'abashiri-drift-ice';
UPDATE spots SET access = 'From Abashiri Station, about 10 min by taxi to Abashiri Port (Aurora terminal). From Memanbetsu Airport: bus to Abashiri Station approx. 26 min, or to drift-ice pier approx. 40 min (flight-linked schedule).' WHERE id = 'abashiri-drift-ice';
UPDATE spots SET access = 'About 45 min by bus from Asahikawa Station (Asahikawa Denkikido bus no. 41 or 47 to Asahiyama Zoo, departs from North Exit bus stop 6; runs about every 30 min).' WHERE id = 'asahiyama-zoo';
UPDATE spots SET admission = 'Free (park); Sounkyo Ropeway round-trip ¥3,000 adult, ¥1,500 elementary.' WHERE id = 'daisetsuzan-national-park';
UPDATE spots SET access = 'Hosooka Observatory: JR Senmo Line to Kushiro Shitsugen Station, then about 10 min on foot. For Kushiro Shitsugen Observatory (west side): Akan Bus from Kushiro Station approx. 40 min. Rental car recommended for full access.' WHERE id = 'kushiro-wetlands';
UPDATE spots SET admission = 'Parking fee per vehicle (e.g. ¥500 at first observatory, Apr–Nov); walk-in free. Check on-site for current rate.' WHERE id = 'lake-mashu';
UPDATE spots SET admission = '1-day lift pass from approx. ¥7,000 (single resort) to ¥10,500 (all-mountain) adult; varies by resort and season. Check official site for current prices.' WHERE id = 'niseko-ski-resort';
UPDATE spots SET admission = 'Free (park); TV Tower observation deck ¥1,200 adult (¥800 for Sapporo residents with ID).' WHERE id = 'sapporo-odori-park';
UPDATE spots SET admission = 'Ferry fare (Heart Land Ferry) adult one-way 2nd class ¥3,950 (Oct 2024–Dec 2025); check operator for latest fares.' WHERE id = 'rebun-island';
UPDATE spots SET access = 'Ferry from Wakkanai Port approx. 2 hours (Heart Land Ferry; adult one-way 2nd class ¥3,950 as of 2024–2025). Wakkanai by JR Super Soya Ltd. Express from Sapporo approx. 5 hours.' WHERE id = 'rebun-island';
UPDATE spots SET admission = 'Museum free. Genghis Khan BBQ from approx. ¥3,800 per person (course and time limit vary by hall); check official site for current courses and prices.' WHERE id = 'sapporo-beer-garden';

-- ========== チェック済みフラグ（1行で実行してツールの誤検知を防ぐ） ==========
UPDATE spots SET fact_checked_at = NOW() WHERE prefecture = 'Hokkaido' AND fact_checked_at IS NULL;
