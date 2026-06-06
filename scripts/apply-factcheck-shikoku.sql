-- 四国4県（香川・愛媛・高知・徳島）ファクトチェック結果 一括適用
-- 参照: spot-factcheck-report-shikoku-batch1.md, spot-factcheck-report-shikoku-batch2.md

-- ========== 愛媛県 ==========
UPDATE spots SET admission = 'Free (cape and lighthouse; no monorail)', access = 'About 90 min–2 h drive from Matsuyama (via Ozu IC); or JR Yahatahama Station then bus to Misaki about 1 h 5 min, then car/taxi about 35 min to cape. Parking free; about 20–30 min walk from parking to lighthouse' WHERE id = 'cape-sada';
UPDATE spots SET admission = '¥450 (Tsubaki-no-Yu) – ¥700–2,000 (main building: Kami-no-Yu from ¥700, Rei-no-Yu from ¥2,000). See dogo.jp for details', access = 'Iyotetsu tram to Dogo Onsen: about 25 min from JR Matsuyama Station, about 20 min from Matsuyama-shi Station' WHERE id = 'dogo-onsen';
UPDATE spots SET access = 'Passenger boat from Imabari to Omishima (Omishima Oyamazumi Shrine) about 35 min; or car ferry about 55 min. Or cycle Shimanami Kaido' WHERE id = 'omishima-island';
UPDATE spots SET access = 'About 27 min walk from JR Iyo-Ozu Station (JR Yodo Line), or about 15 min by bicycle (rental at station)' WHERE id = 'ozu-castle';
UPDATE spots SET access = 'About 1 h 45 min–2 h drive from Matsuyama (two routes: approx. 75 km or 85 km); no direct public transport to the plateau' WHERE id = 'shikoku-karst';
UPDATE spots SET admission = 'Bike rental from about ¥2,000/day (electric assist about ¥2,500). Bridge tolls for cyclists: free until 31 Mar 2026 (campaign); otherwise ¥500 total for all bridges' WHERE id = 'shimanami-kaido-ehime';
UPDATE spots SET access = 'About 10–15 min walk from JR Uwajima Station to castle entrance, then about 15 min to the keep (about 25–30 min total to the keep)' WHERE id = 'uwajima-castle';

-- ========== 香川県 ==========
UPDATE spots SET admission = 'Free (grounds and main hall). Treasure hall, etc. ¥800 each' WHERE id = 'kotohiragu-shrine';
UPDATE spots SET admission = '¥400 (keep; junior high and below free)' WHERE id = 'marugame-castle';
UPDATE spots SET admission = 'Chichu Museum ¥2,500–¥3,000 (varies by day and online/walk-in); Art House Project ¥600–¥700 per house (or common ticket ¥1,200–¥1,400). Benesse House Museum etc. see benesse-artsite.jp' WHERE id = 'naoshima-island';
UPDATE spots SET admission = '¥500 (adult), ¥170 (elementary/junior high); from 1 Jun 2025' WHERE id = 'ritsurin-garden';
UPDATE spots SET admission = 'Free on islands; ferry from Marugame to Honjima ¥550 one way (¥1,050 round trip)' WHERE id = 'shiwaku-islands';
UPDATE spots SET admission = 'Free to explore island; ferry from Takamatsu ¥700 one way (approx. 60 min)' WHERE id = 'shodoshima-island';
UPDATE spots SET admission = 'No cable car. Yashima Driveway parking fee (e.g. ¥300 per car per visit). Plateau and temple area free or separate facility fees', access = 'By car via Yashima Driveway to summit parking (then short walk); or about 60 min hike from foot of Yashima. Cable car was discontinued in 2005' WHERE id = 'yashima-plateau';
UPDATE spots SET access = 'About 20 min walk from JR Zentsuji Station (JR Dosan Line), or taxi about 3 min, or local bus to Kyodokan-mae then 3 min walk' WHERE id = 'zentsuji-temple';

-- ========== 高知県 ==========
UPDATE spots SET access = 'Train from Kochi Station to Nakamura Station (about 110 min), then bus to Cape Ashizuri (about 105 min). Total about 3h 35min. By car about 2h from Kochi IC' WHERE id = 'cape-ashizuri';
UPDATE spots SET access = 'Train from Kochi Station to Nahari Station (about 1h 30min), then bus to Muroto area (about 60 min). No direct bus from Kochi Station. Limited bus service; check timetable' WHERE id = 'cape-muroto';
UPDATE spots SET admission = 'Beach free. Museum (Ryoma Memorial): ¥900 (adult, when special exhibition); ¥500 when only permanent exhibition or during changeover. As of Apr 2025', access = 'About 37–40 min by bus (Tosa Den Katsurahama line) from Kochi Station north exit to Katsurahama / Ryoma Memorial Hall stop' WHERE id = 'katsurahama-beach';
UPDATE spots SET admission = '¥500 (adult 18+). As of Apr 2025. Free for under 18' WHERE id = 'kochi-castle';
UPDATE spots SET admission = 'Whale watching tour prices vary by operator and port: from about ¥4,500–8,000 (adult). Confirm with operator or local tourism office', access = 'Varies by port. Example: from Kochi Station by bus to Usa about 60 min; from JR Asakura Station about 30 min by bus. For Nakatosa / Kubotsu area, check bus from Nakamura or Tosa stations; limited service' WHERE id = 'nakatosa-whale-watching';
UPDATE spots SET admission = '¥1,200 (adult, as of 2024). From Jan 2025: ¥1,500 (adult). Adventure course separate fee', access = 'About 20 min by bus from Tosa-Yamada Station (JR Dosan Line) to Ryugado stop (Tosa Den bus). Check timetable; limited service' WHERE id = 'ryugado-cave';

-- ========== 徳島県 ==========
UPDATE spots SET admission = 'Day performance (resident troupe) ¥1,300 (adult), ¥700 (child); evening performance (resident) ¥800, (guest troupe) ¥1,000 (adult). Museum separate. Check official site for current prices' WHERE id = 'awa-odori-hall';
UPDATE spots SET admission = 'Tsurugi sightseeing lift round-trip ¥2,300 (adult), ¥1,100 (child). One-way available. As of 2024', access = 'Bus to Minokoshi (lift base): from JR Tsurugi Station (Tsurugi town) by Gurutto Tsurugisan bus (weekends/holidays, 2 departures/day, about 1h); or from Awa-Ikeda / Oboke area by bus with transfer. No Mishima station in Shikoku' WHERE id = 'mount-tsurugi';
UPDATE spots SET admission = '¥400 (adult), ¥100 (junior high & elementary). Combined ticket with Uzunomichi available (e.g. adult ¥730)' WHERE id = 'naruto-german-house';
UPDATE spots SET admission = 'Boat tour about ¥1,200–1,500 (adult). Check operator for current price', access = 'About 5–10 min walk from Oboke Station (JR Dosan Line) to gorge / boat pier. Taxi about 5 min' WHERE id = 'oboke-gorge';
UPDATE spots SET access = 'About 10–15 min walk from Tokushima Station (JR). City bus Tokushima Koen Washinomonguchi stop, then about 5 min walk' WHERE id = 'tokushima-castle-ruins';

-- ========== チェック済みフラグ（1行で実行してツールの誤検知を防ぐ） ==========
UPDATE spots SET fact_checked_at = NOW() WHERE prefecture IN ('Kagawa', 'Ehime', 'Kochi', 'Tokushima') AND fact_checked_at IS NULL;
