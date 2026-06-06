-- 九州7県（福岡・佐賀・長崎・熊本・大分・宮崎・鹿児島）ファクトチェック結果 一括適用
-- 参照: spot-factcheck-report-kyushu-batch1.md, spot-factcheck-report-kyushu-batch2.md

-- ========== 福岡県 ==========
UPDATE spots SET admission = 'Free (parking ¥300 for first 3 hours, then ¥100/hour)' WHERE id = 'aburayama-forest-park';
UPDATE spots SET access = 'Bus from Amagi Station (Amatetsu Railway) ~20 min to Kyodo-kan-mae; from Fukuoka (Hakata) via JR Kiyama + Amatetsu or Nishi-Tetsu about 90 min total' WHERE id = 'akizuki-castle-ruins';
UPDATE spots SET admission = 'Grounds free; museum (Fukuoka Castle History Museum) free' WHERE id = 'fukuoka-castle-ruins';
UPDATE spots SET access = 'JR to Mojiko Station (Kagoshima Main Line; from Hakata about 1 hr direct or via Kokura ~15 min from Kokura). Walk from station to retro district' WHERE id = 'mojiko-retro';
UPDATE spots SET access = 'Nishitetsu Bus from Tenjin to Munakata Taisha-mae (~62 min); or JR to Togo/Akama Station then bus ~12 min to Munakata Taisha-mae' WHERE id = 'munakata-taisha';
UPDATE spots SET access = 'About 15 min walk from Hakata Station; or 5 min walk from Gion subway station' WHERE id = 'shofukuji-zen';
UPDATE spots SET access = 'Watanabe-dori subway station, about 3–5 min walk' WHERE id = 'yanagibashi-market';

-- ========== 佐賀県 ==========
UPDATE spots SET access = 'JR to Karatsu Station (Chikuhi/Karatsu Line from Hakata ~1.5 hr), then 10 min by bus (Kara-One Line to Karatsujo-iriguchi) or about 25 min walk' WHERE id = 'karatsu-castle';
UPDATE spots SET admission = '¥500 adults (daytime); night illumination/event fees vary (e.g. ¥1,200–1,400, check official site)' WHERE id = 'mifuneyama-rakuen';
UPDATE spots SET admission = 'Boat tour from ¥1,000 (Sachi-maru) or ¥1,600 (Ika-maru) per adult; viewing from land free', access = 'Bus from Karatsu (Oteguchi Bus Center) to Nanatsugama-iriguchi (~34 min), then about 30 min walk to boat pier; or by car/taxi from Karatsu Station ~20 min' WHERE id = 'nanatsugama-caves';
UPDATE spots SET access = 'JR Nijinomatsubara Station, 1 min walk; or from Karatsu Station by bus (e.g. to Seaside-mae) or about 20 min drive' WHERE id = 'karatsu-niji-matsubara';
UPDATE spots SET admission = 'Free (castle grounds and Saga Castle Honmaru History Museum)', access = 'About 25 min walk or 10 min by bus (Saga City Bus to Hakubutsukan-mae) from Saga Station' WHERE id = 'saga-castle-ruins';
UPDATE spots SET admission = 'Public baths from ¥500 (e.g. Genso, Horai; Saginoyu ¥740)' WHERE id = 'takeo-onsen';
UPDATE spots SET admission = '¥460 adults (65+ ¥200; junior high and under free). Free on designated days only (e.g. 3 May, 5 May, some autumn Sundays); check official site' WHERE id = 'yoshinogari-park';

-- ========== 長崎県 ==========
UPDATE spots SET admission = '¥520 adults (as of 2025); ¥1,100 from Apr 2026 (see official site)' WHERE id = 'dejima';
UPDATE spots SET admission = '1DAY passport ¥7,600 adults (as of Feb 2025); other ticket types available (see official site)' WHERE id = 'huis-ten-bosch';

-- ========== 熊本県 ==========
UPDATE spots SET access = 'About 10–20 min by car from Takamori Station (Minami-Aso Railway) or Minami-Aso area' WHERE id = 'kamishikimi-shrine';
UPDATE spots SET access = 'Tram from Kumamoto Station to Kumamotojo-Shiyakusho-mae (~17 min), then about 10 min walk; or Shiro-megurin bus to Sakura-no-baba' WHERE id = 'kumamoto-castle';
UPDATE spots SET admission = '¥1,500 for nyuto tegata (3-bath pass; as of Oct 2023)' WHERE id = 'kurokawa-onsen';
UPDATE spots SET admission = 'Free; parking ¥500 (cars, as of Jul 2024)' WHERE id = 'kusasenri-meadow';
UPDATE spots SET admission = 'Caldera area access free where permitted; Aso Mountain Park Road toll ¥1,000 (car) or shuttle bus to crater ~¥700 one way (ropeway discontinued)' WHERE id = 'aso-caldera';
UPDATE spots SET admission = '¥300 (high school and above), ¥150 (elementary/junior high); advance reservation required (e.g. Webket)' WHERE id = 'nabegataki-falls';
UPDATE spots SET admission = '¥300 adults, ¥200 high school, ¥100 child', access = 'About 30–40 min by bus from Kumamoto (Sakura-machi BT) to Iwaoto-Kannon-iriguchi, then about 20 min walk uphill; or by car/taxi' WHERE id = 'reigando-cave';

-- ========== 鹿児島県 ==========
UPDATE spots SET access = 'Flight from Kagoshima Airport about 1 hr; ferry from Kagoshima port about 11 hrs' WHERE id = 'amami-oshima';
UPDATE spots SET access = 'Bus from Kagoshima-Chuo Station to Chiran (about 1 hr 20 min), then 3–5 min walk to museum' WHERE id = 'chiran-peace-museum';
UPDATE spots SET admission = '¥1,500 adults (sand bath, includes rental yukata); ¥2,000 during peak periods (e.g. GW, Aug 10–15, year-end). As of Oct 2024', access = 'Limited express Ibusuki-no-Tamatebako from Kagoshima-Chuo (about 50 min) to Ibusuki Station, then about 20 min walk or about 5 min by bus to Saraku' WHERE id = 'ibusuki-sand-bath';
UPDATE spots SET access = '15 min ferry from Kagoshima port (adult ¥250 one-way as of Jul 2024; runs about every 15–20 min)' WHERE id = 'sakurajima';
UPDATE spots SET admission = '¥1,600 adults (garden, main residence, Shoko Shuseikan museum). As of Oct 2024' WHERE id = 'sengan-en-garden';

-- ========== 宮崎県 ==========
UPDATE spots SET admission = '¥500 (adult / high school and over), ¥350 (elementary & junior high). As of Apr 2024', access = 'About 60 min by car from Miyazaki City; or bus from Nanko / Miyazaki to Aya then about 20 min by car to bridge' WHERE id = 'aya-suspension-bridge';
UPDATE spots SET admission = 'Cooperative fee at gate: car ¥400–500, motorcycle ¥100–200 (sources vary). Lighthouse visit extra ¥300 (junior high and over)', access = 'About 2 hrs by car from Miyazaki Station; or community bus from JR Kushima Station about 40 min (limited services)' WHERE id = 'cape-toi-horses';
UPDATE spots SET admission = '¥800 adults (common ticket for castle and historic buildings, 6–7 facilities). As of current official info' WHERE id = 'obi-castle-town';
UPDATE spots SET access = 'Bus from Miyazaki Station about 1 hr 20–30 min to Sun Messe Nichinan stop, then about 15 min walk; or about 50 min by car from Miyazaki Station' WHERE id = 'sun-messe-nichinan';
UPDATE spots SET admission = 'Free to walk the gorge; boat rental ¥4,100 per boat (Tue–Thu) or ¥5,100 (Fri–Mon and holidays) for 30 min. As of 2022' WHERE id = 'takachiho-gorge';
UPDATE spots SET admission = 'About ¥700–1,000 (sources differ); confirm on Takachiho Town or shrine website' WHERE id = 'takachiho-shrine-kagura';
UPDATE spots SET admission = 'Free. Viewing deck and glass-floor area are free' WHERE id = 'hyuga-cape';
UPDATE spots SET admission = 'One-way fare adult ¥2,320, child ¥1,160 (train + limited-express reserved seat). Reservation required. Check JR Kyushu for round-trip and packages' WHERE id = 'miyazaki-sightseeing-train';

-- ========== 大分県 ==========
UPDATE spots SET admission = '¥2,400 adults (common ticket for 7 hells; valid 2 days). As of Feb 2025', access = 'About 20–30 min by bus from Beppu Station (Kameoi Bus to Kannawa / Umi Jigoku stop)' WHERE id = 'beppu-hells';
UPDATE spots SET access = 'About 90 min by car from Oita Station; from Bungo-Taketa Station about 5 min by car or about 30 min on foot' WHERE id = 'oka-castle';
UPDATE spots SET admission = '¥500 (adult), ¥250 (high school). As of Oct 2025', access = 'About 20 min by bus from Oita Station to Takasakiyama Natural Zoological Park stop' WHERE id = 'takasakiyama-monkeys';
UPDATE spots SET access = 'About 40 min by JR limited express from Oita Station to Usa Station (Nippo Line), then about 10 min by bus to Usa Jingu' WHERE id = 'usa-shrine';

-- ========== チェック済みフラグ（1行で実行してツールの誤検知を防ぐ） ==========
UPDATE spots SET fact_checked_at = NOW() WHERE prefecture IN ('Fukuoka', 'Saga', 'Nagasaki', 'Kumamoto', 'Oita', 'Miyazaki', 'Kagoshima') AND fact_checked_at IS NULL;
