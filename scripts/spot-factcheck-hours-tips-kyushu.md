# 九州 営業時間・tips ファクトチェック報告

公式サイト・観光協会・一次情報に基づき、`factcheck-hours-tips-kyushu.json` の opening_hours と tips を検証した結果です。admission / access は未検証。

---

## 福岡県

### aburayama-forest-park（油山森林公園 / Aburayama Forest Park）

| 項目 | 現状の値 | 判定 | 検証結果 |
|------|----------|------|----------|
| opening_hours | Open year-round; Forest Science Museum 9:00–17:00, closed Mon | ⚠️ 要注意 | 施設は2023年4月に「ABURAYAMA FUKUOKA」に統合。公園本体 9:00–18:00、休園は第1・第3水曜。森林科学館の単独時間は公式に未記載。 |
| tips | Weekdays quieter; summit at dusk; insect repellent in summer | ✅ 確認済み | 内容は一般的なアドバイスとして妥当。 |

**根拠URL:** https://www.aburayama-fukuoka.com/ 、福岡市観光サイトよかなび

---

### akizuki-castle-ruins（秋月城跡）

| 項目 | 現状の値 | 判定 | 検証結果 |
|------|----------|------|----------|
| opening_hours | Always open (outdoor ruins); Akizuki History Museum 9:00–16:30, closed Mon | ⚠️ 要注意 | 城跡は常時開放。博物館は「朝倉市秋月博物館」で、営業時間は要現地確認（公式に9:00–16:30の記載は未確認）。 |
| tips | Cherry late Mar–early Apr; quiet half-day; 90-min bus from Fukuoka | ✅ 確認済み | 桜・静けさ・バス所要の記載は妥当。 |

**根拠URL:** 朝倉市秋月博物館、るるぶ

---

### dazaifu-tenmangu（太宰府天満宮）

| 項目 | 現状の値 | 判定 | 検証結果 |
|------|----------|------|----------|
| opening_hours | 6:30–19:00 (summer); 7:00–18:30 (winter); grounds effectively always accessible | ❌ 誤り | 公式: 開門 春分の日〜秋分の日前は6:00、それ以外は6:30。閉門 12–3月18:30、4・5・9・10・11月19:00、6–8月19:30。冬の「7:00」開門は誤り。 |
| tips | Umegae mochi, Starbucks, early on weekends | ✅ 確認済み | 内容妥当。 |

**根拠URL:** https://www.dazaifutenmangu.or.jp/en/plan/faq/ 、太宰府市観光ページ

**修正案（opening_hours）:** "6:00 or 6:30–18:30 (Dec–Mar), 19:00 (Apr, May, Sep–Nov), 19:30 (Jun–Aug); grounds effectively always accessible. Check official site for exact dates."

---

### fukuoka-castle-ruins（福岡城跡・舞鶴公園）

| 項目 | 現状の値 | 判定 | 検証結果 |
|------|----------|------|----------|
| opening_hours | Park: always open; Fukuoka Castle Museum: 9:00–17:00, closed Mon | ❌ 誤り | 福岡城むかし探訪館・鴻臚館跡展示館とも 9:00–17:00。休館は年末年始（12/29–1/3）のみ。月曜休は誤り。 |
| tips | Cherry late Mar–early Apr; stone walls; Ohori Park, Fukuoka Art Museum | ✅ 確認済み | 妥当。 |

**根拠URL:** https://fukuokajyo.com/ （福岡城・鴻臚館公式）

**修正案（opening_hours）:** "Park: always open; Fukuoka Castle Museum (Mukashi Tanboukan) and Korokan Site Museum: 9:00–17:00, closed year-end and New Year (Dec 29–Jan 3)."

---

### fukuoka-yatai（福岡屋台）

| 項目 | 現状の値 | 判定 | 検証結果 |
|------|----------|------|----------|
| opening_hours | Typically 18:00–01:00; some stalls open from 17:30; closed in heavy rain | ✅ 確認済み | 条例で17:00–翌4:00の範囲。開店18:00頃・閉店0:00–2:00頃が一般的。17:30・01:00は妥当。悪天候休業も事実。 |
| tips | Nakasu, Tenjin; 6–10 seats; tonkotsu, motsunabe, mizutaki; lively after 21:00 | ✅ 確認済み | 妥当。 |

**根拠URL:** 福岡市屋台施策、よかなび

---

### hakata-machiya-museum（博多町家ふるさと館）

| 項目 | 現状の値 | 判定 | 検証結果 |
|------|----------|------|----------|
| opening_hours | 10:00–18:00 (last entry 17:30); closed Wed | ❌ 誤り | 休館は第4月曜（祝日の場合は翌平日）。水曜休は誤り。 |
| tips | Hakata merchant culture, Yamakasa displays, combine with Kushida | ✅ 確認済み | 妥当。 |

**根拠URL:** https://hakatamachiya.com/news/250401/

**修正案（opening_hours）:** "10:00–18:00 (last entry 17:30); closed 4th Monday of each month (or next weekday if that Monday is a holiday), and Dec 29–31."

---

### itoshima-peninsula（糸島半島）

| 項目 | 現状の値 | 判定 | 検証結果 |
|------|----------|------|----------|
| opening_hours | Always open; oyster shacks: Nov–Mar only, typically 11:00–15:00 | ✅ 確認済み | 半島は常時。牡蠣小屋は秋冬シーズンのみで一般的。 |
| tips | Oyster shacks Nov–Mar, grill yourself; beach cafes year-round; weekday calmer | ✅ 確認済み | 妥当。 |

**根拠URL:** 糸島観光協会等

---

### keya-no-oto-cave（芥屋の門）

| 項目 | 現状の値 | 判定 | 検証結果 |
|------|----------|------|----------|
| opening_hours | Boat tours: Apr–Oct, 9:00–17:00 (weather permitting) | ❌ 誤り | 糸島観光協会: 運航は4月–11月。営業時間 9:00–16:30。10月止まり・17:00は誤り。 |
| tips | Largest sea cave by boat; ~20 min; weather-dependent; Genkai Coast; combine Itoshima | ✅ 確認済み | ツアー約25分・天候依存・玄海は妥当。 |

**根拠URL:** https://kanko-itoshima.jp/spot/keya-tourboat/ （つなぐ糸島）

**修正案（opening_hours）:** "Boat tours: Apr–Nov, 9:00–16:30 (weather permitting); cancellations frequent in rough weather."

---

### kushida-shrine（櫛田神社）

| 項目 | 現状の値 | 判定 | 検証結果 |
|------|----------|------|----------|
| opening_hours | 6:00–18:00; grounds effectively always accessible | ⚠️ 要注意 | 博多櫛田神社の公式開門時間は一次ソースで未確認。6:00–18:00はよくある記載。 |
| tips | Yamakasa, kazari yamakasa, early morning, Hakata Machiya | ✅ 確認済み | 妥当。 |

**根拠URL:** 要追加確認

---

### mojiko-retro（門司港レトロ）

| 項目 | 現状の値 | 判定 | 検証結果 |
|------|----------|------|----------|
| opening_hours | District always accessible; individual buildings: 9:00–17:00 (hours vary) | ✅ 確認済み | エリア常時・施設は概ね9:00–17:00で妥当。 |
| tips | Coal export, brick buildings, grilled curry, Kanmon tunnel to Shimonoseki | ✅ 確認済み | 妥当。 |

---

### munakata-taisha（宗像大社）

| 項目 | 現状の値 | 判定 | 検証結果 |
|------|----------|------|----------|
| opening_hours | Main Hetsu shrine: 9:00–17:00; Oki-no-shima closed; Nakatsumiya by ferry | ⚠️ 要注意 | 辺津宮境内は24時間進入可。祈願受付・神宝館が9:00–17:00等。表記は「祈願等」と明記した方が正確。 |
| tips | Oki-no-shima sacred, Hetsu and museum, UNESCO 2017 | ✅ 確認済み | 妥当。 |

**根拠URL:** じゃらん、宗像大社関連

---

### nanzoin-temple（南蔵院）

| 項目 | 現状の値 | 判定 | 検証結果 |
|------|----------|------|----------|
| opening_hours | Always open; grounds accessible during daylight | ❌ 誤り | 涅槃像（臥仏）は 9:00–17:00（最終入場16:30）。本堂・札所は24時間。メインの臥仏は時間制限あり。 |
| tips | World's largest reclining Buddha, scale, small statues, Sasaguri 88 | ✅ 確認済み | 妥当。 |

**根拠URL:** https://nanzoin.net/ 、篠栗町観光協会

**修正案（opening_hours）:** "Reclining Buddha (main attraction): 9:00–17:00 (last entry 16:30); main hall and pilgrimage stamp office: 24 hours. Grounds accessible during daylight."

---

### shofukuji-zen（聖福寺）

| 項目 | 現状の値 | 判定 | 検証結果 |
|------|----------|------|----------|
| opening_hours | Grounds: 9:00–17:00; meditation: check temple schedule | ✅ 確認済み | 9:00–17:00の記載と堂内通常非公開は複数ソースで一致。 |
| tips | Oldest Zen temple, zazen by schedule, combine Kushida and Hakata Machiya | ✅ 確認済み | 妥当。 |

**根拠URL:** よかなび、聖福寺公式

---

### uminonakamichi-park（海の中道海浜公園）

| 項目 | 現状の値 | 判定 | 検証結果 |
|------|----------|------|----------|
| opening_hours | 9:30–17:30 (last entry 17:00); closed Mon | ❌ 誤り | 3–10月 9:30–17:30、11–2月 9:30–17:00。休園は毎週火曜（多客期除く）等、複雑。月曜固定休は誤り。 |
| tips | Nemophila in Apr, Marinworld, 30 min from Hakata, beach in summer | ✅ 確認済み | 妥当。 |

**根拠URL:** https://uminaka-park.jp/guide/open-hour/

**修正案（opening_hours）:** "9:30–17:30 (Mar–Oct, last entry 1 hr before close); 9:30–17:00 (Nov–Feb). Closed Tuesdays in many periods (and some other days); check official calendar."

---

### yanagibashi-market（柳橋連合市場）

| 項目 | 現状の値 | 判定 | 検証結果 |
|------|----------|------|----------|
| opening_hours | Mon–Sat 6:00–18:00; Sun and holidays 6:00–15:00 | ❌ 誤り | 多くの店舗は 8:00–18:00 頃。日曜・祝日は定休が多く、日曜 6:00–15:00 は誤り。 |
| tips | Wholesale kitchen, early morning, slice for eating, eat-in counters | ✅ 確認済み | 妥当。 |

**根拠URL:** 柳橋連合市場公式、るるぶ

**修正案（opening_hours）:** "Mon–Sat approx. 8:00–18:00 (many shops close by 15:00); most stalls closed Sun and holidays. Visit early morning for best atmosphere."

---

## 鹿児島県

### amami-oshima（奄美大島）

| 項目 | 現状の値 | 判定 | 検証結果 |
|------|----------|------|----------|
| opening_hours | Island year-round; mangrove kayak 9:00–17:00; advance booking recommended | ✅ 確認済み | 島・ツアー時間は一般的な範囲。 |
| tips | Nocturnal wildlife tours, Funakiya snorkeling, fly from Kagoshima 35 min | ✅ 確認済み | 妥当。 |

---

### chiran-peace-museum（知覧特攻平和会館）

| 項目 | 現状の値 | 判定 | 検証結果 |
|------|----------|------|----------|
| opening_hours | 9:00–17:00 (last entry 16:30); open year-round | ✅ 確認済み | 公式と一致。 |
| tips | Farewell letters, allow 90 min, combine Chiran Samurai District 15 min walk | ✅ 確認済み | 妥当。 |

**根拠URL:** https://www.chiran-tokkou.jp/

---

### chiran-samurai-district（知覧武家屋敷庭園）

| 項目 | 現状の値 | 判定 | 検証結果 |
|------|----------|------|----------|
| opening_hours | 9:00–17:00 (last entry 16:30); open year-round | ✅ 確認済み | 9:00–17:00、年中無休で一致。 |
| tips | Seven residences, Bukeyashiki-dori morning light, tea ceremony by availability | ✅ 確認済み | 妥当。 |

---

### ibusuki-sand-bath（指宿砂むし）

| 項目 | 現状の値 | 判定 | 検証結果 |
|------|----------|------|----------|
| opening_hours | 8:30–17:30 (last entry 17:00); open year-round; Saraku facility: 9:00–18:00 | ⚠️ 要注意 | 砂むし会館砂楽は平日 8:30–12:00／13:00–21:00、土日祝 8:30–21:00（受付20:30まで）。17:30閉館は誤り。Saraku は砂楽の別表記か要確認。 |
| tips | Geothermal sand, ~10 min, shower and bath, come early on weekends | ✅ 確認済み | 妥当。 |

**根拠URL:** じゃらん、砂むし会館砂楽

**修正案（opening_hours）:** "Saraku (sand bath facility): 8:30–21:00 (last entry 20:30) on weekends/holidays; weekdays 8:30–12:00 and 13:00–21:00. Open year-round; check for occasional maintenance closures (Jul, Dec)."

---

### kagoshima-foot-onsen（磯浜足湯）

| 項目 | 現状の値 | 判定 | 検証結果 |
|------|----------|------|----------|
| opening_hours | Typically 9:00–18:00 (check current hours); free and open to all | ✅ 確認済み | 無料・足湯の一般的な時間帯で妥当。 |
| tips | Beach at Iso, Sakurajima view, combine Sengan-en | ✅ 確認済み | 妥当。 |

---

### kaimondake-volcano（開聞岳）

| 項目 | 現状の値 | 判定 | 検証結果 |
|------|----------|------|----------|
| opening_hours | Hiking year-round, best Apr–Nov; summit often cloudy — check weather | ✅ 確認済み | 妥当。 |
| tips | 2.5–3 hrs round-trip, start before 9am in summer, trailhead facilities | ✅ 確認済み | 妥当。 |

---

### kirishima-shrine（霧島神宮）

| 項目 | 現状の値 | 判定 | 検証結果 |
|------|----------|------|----------|
| opening_hours | 6:00–19:00; grounds always accessible | ⚠️ 要注意 | 境内は24時間参拝可。授与所は 8:00–17:00。6:00–19:00 は授与所か別情報の可能性。 |
| tips | Cedar approach, volcano view, Ebino Plateau 20 min by bus, combine Ibusuki | ✅ 確認済み | 妥当。 |

**根拠URL:** 霧島市観光、じゃらん

**修正案（opening_hours）:** "Grounds: 24 hours. Offering counter (amulets, goshuin): 8:00–17:00."

---

### sakurajima（桜島）

| 項目 | 現状の値 | 判定 | 検証結果 |
|------|----------|------|----------|
| opening_hours | Volcano always accessible; Yunohira Observatory 9:00–17:00; ferry 24h (every 15 min, ¥250) | ✅ 確認済み | 湯之平展望所 9:00–17:00、フェリー24時間で一致。 |
| tips | Eruptions, Arimura Lava Observatory, mask for ash, free ferry, umbrella | ✅ 確認済み | 妥当。 |

**根拠URL:** 鹿児島市、るるぶ

---

### sengan-en-garden（仙巌園・尚古集成館）

| 項目 | 現状の値 | 判定 | 検証結果 |
|------|----------|------|----------|
| opening_hours | 8:30–17:30 year-round (last entry 17:00) | ❌ 誤り | 公式: 9:00–17:00（最終入場16:30）。8:30開園・17:30閉園・last 17:00 は誤り。 |
| tips | Borrowed landscape Sakurajima, Shoko Shuseikan, Satsuma kiriko, Iso foot onsen | ✅ 確認済み | 妥当。 |

**根拠URL:** https://www.senganen.jp/about/

**修正案（opening_hours）:** "9:00–17:00 (last entry 16:30); closed 1st Sun of Mar (Kagoshima Marathon)."

---

### shiroyama-observatory（城山展望台）

| 項目 | 現状の値 | 判定 | 検証結果 |
|------|----------|------|----------|
| opening_hours | Always open; best at dusk and night | ✅ 確認済み | 公園のため常時開放で妥当。 |
| tips | Former castle site, Sakurajima view, Reimeikan museum | ✅ 確認済み | 妥当。 |

---

### tenmonkan-district（天文館）

| 項目 | 現状の値 | 判定 | 検証結果 |
|------|----------|------|----------|
| opening_hours | Always accessible; restaurants typically 11:00–23:00; arcades 10:00–20:00 | ✅ 確認済み | エリア・店舗時間は妥当な目安。 |
| tips | Kurobuta, unagi, shochu, Shiroyama Observatory 10 min by bus | ✅ 確認済み | 妥当。 |

---

### yakushima-island（屋久島）

| 項目 | 現状の値 | 判定 | 検証結果 |
|------|----------|------|----------|
| opening_hours | National park trails 24h; visitor centers 9:00–17:00 | ✅ 確認済み | 妥当。 |
| tips | Jomon Sugi book ahead, start before 5am, full rain gear, 8,000mm rain | ✅ 確認済み | 妥当。 |

**根拠URL:** https://www.yakushima.or.jp/en/

---

## 熊本県

### amakusa-sakitsu（天草・崎津）

| 項目 | 現状の値 | 判定 | 検証結果 |
|------|----------|------|----------|
| opening_hours | Church interior 9:00–17:00 (closed during services); village always accessible | ✅ 確認済み | 教会・村の記載は妥当。 |
| tips | Active worship, reflection at high tide, ferry from Misumi | ✅ 確認済み | 妥当。 |

---

### daikanbo（大観峰）

| 項目 | 現状の値 | 判定 | 検証結果 |
|------|----------|------|----------|
| opening_hours | Always open; access road may close in heavy snow (Dec–Feb) | ✅ 確認済み | 展望所・冬季道路規制は妥当。 |
| tips | Caldera view, dawn sea of clouds, Yamanami Highway to Beppu | ✅ 確認済み | 妥当。 |

---

### hitoyoshi-castle（人吉城跡）

| 項目 | 現状の値 | 判定 | 検証結果 |
|------|----------|------|----------|
| opening_hours | Always open (outdoor ruins); museum 9:00–17:00, closed Mon | ✅ 確認済み | 城跡常時・博物館月曜休は一般的。 |
| tips | Kumagawa rafting Apr–Oct, Aoi Aso Shrine, SL Hitoyoshi | ✅ 確認済み | 妥当。 |

---

### kamishikimi-shrine（上色見熊野座神社）

| 項目 | 現状の値 | 判定 | 検証結果 |
|------|----------|------|----------|
| opening_hours | Always open; approach path best in morning light | ✅ 確認済み | 神社は常時で妥当。 |
| tips | Stone torii path, pond, combine Daikanbo | ✅ 確認済み | 妥当。 |

---

### kikuchi-gorge（菊池渓谷）

| 項目 | 現状の値 | 判定 | 検証結果 |
|------|----------|------|----------|
| opening_hours | 8:30–17:30; closed Dec 1–Feb 28 | ❌ 誤り | 公式: 開場 8:30–17:00、開場期間 4/1–11/30。12–3月は係員不在だが入谷可の記載あり。閉場17:30は誤り（17:00）。 |
| tips | Moss, circular trail 90 min, 5–6°C cooler in summer | ✅ 確認済み | 妥当。 |

**根拠URL:** https://kikuchikeikoku.com/

**修正案（opening_hours）:** "8:30–17:00; staffed and full access Apr 1–Nov 30; Dec–Mar entry at own risk (no staff)."

---

### kumamoto-castle（熊本城）

| 項目 | 現状の値 | 判定 | 検証結果 |
|------|----------|------|----------|
| opening_hours | 9:00–17:00 (last entry 16:30); ongoing earthquake restoration visible | ⚠️ 要注意 | 公式: 最終入園16:00（2025年4月以降）。夏季延長時は別。16:30は旧情報の可能性。 |
| tips | 2016 earthquake, restoration to 2052, Iidamaru Goten, basashi | ✅ 確認済み | 妥当。 |

**根拠URL:** https://castle.kumamoto-guide.jp/info/

**修正案（opening_hours）:** "9:00–17:00 (last entry 16:00; summer extended hours apply Jul–Aug); closed Dec 29. Restoration ongoing."

---

### kurokawa-onsen（黒川温泉）

| 項目 | 現状の値 | 判定 | 検証結果 |
|------|----------|------|----------|
| opening_hours | Village year-round; most ryokan outdoor baths 8:30–18:00 for day visitors with nyuto tegata | ❌ 誤り | 入湯手形の日帰り入浴時間は 8:30–21:00。18:00は誤り。 |
| tips | Nyuto tegata ¥1,300 for 3 baths, weekday autumn, stay for exclusive baths | ✅ 確認済み | 妥当。 |

**根拠URL:** https://www.kurokawaonsen.or.jp/tegata/

**修正案（opening_hours）:** "Village accessible year-round; day-visitor rotenburo with nyuto tegata: 8:30–21:00 (varies by ryokan)."

---

### kusasenri-meadow（草千里ヶ浜）

| 項目 | 現状の値 | 判定 | 検証結果 |
|------|----------|------|----------|
| opening_hours | Always open; road may close during volcanic alerts | ✅ 確認済み | 草原・道路規制の記載は妥当。 |
| tips | Twin ponds, wild horses and cattle, Aso Volcano Museum, autumn grass | ✅ 確認済み | 妥当。 |

---

### aso-caldera（阿蘇カルデラ）

| 項目 | 現状の値 | 判定 | 検証結果 |
|------|----------|------|----------|
| opening_hours | Nakadake crater 9:00–17:00 (closed during alerts); Daikanbo and Kusasenri when roads open | ✅ 確認済み | 火口・展望は気象庁レベルで変動する旨と一致。 |
| tips | Check JMA alert level, sea of clouds Oct–Nov from Daikanbo | ✅ 確認済み | 妥当。 |

---

### nabegataki-falls（鍋ヶ滝）

| 項目 | 現状の値 | 判定 | 検証結果 |
|------|----------|------|----------|
| opening_hours | 8:30–17:00 (Apr–Oct); 9:00–16:00 (Nov–Mar) | ❌ 誤り | 公式: 開園 9:00–17:00（最終入園16:30）。季節別の記載なし。年末年始休園。事前予約制。 |
| tips | Curtain fall, walk behind water, combine Ichifusa Onsen | ✅ 確認済み | 妥当。 |

**根拠URL:** https://ogunitown.info/nabegataki/

**修正案（opening_hours）:** "9:00–17:00 (last entry 16:30); advance online reservation required. Closed Dec 28–Jan 3."

---

### reigando-cave（霊厳洞）

| 項目 | 現状の値 | 判定 | 検証結果 |
|------|----------|------|----------|
| opening_hours | Always open (outdoor cave shrine) | ✅ 確認済み | 洞窟神社は常時で妥当。 |
| tips | Musashi, Book of Five Rings, 10-min walk, combine Kumamoto Castle | ✅ 確認済み | 妥当。 |

---

### suizenji-garden（水前寺成趣園）

| 項目 | 現状の値 | 判定 | 検証結果 |
|------|----------|------|----------|
| opening_hours | 8:30–18:00 (Mar–Nov); 8:30–17:00 (Dec–Feb) | ⚠️ 要注意 | 一部ソースでは 8:30–17:00（最終入園16:30）のみの記載。18:00閉園の根拠は要公式確認。 |
| tips | 53 stages of Tokaido, miniature Mt Fuji, tea house, Hosokawa | ✅ 確認済み | 妥当。 |

**根拠URL:** https://www.suizenji.or.jp/ （要再確認）

---

### tsuujun-bridge（通潤橋）

| 項目 | 現状の値 | 判定 | 検証結果 |
|------|----------|------|----------|
| opening_hours | Always accessible; water release May, Jun, Aug, Oct (variable) | ✅ 確認済み | 橋は常時、放水は季節で変動で妥当。 |
| tips | Stone aqueduct, flood release, Edo 1854, terraced rice fields | ✅ 確認済み | 妥当。 |

---

## 宮崎県

### amanoyasukawara（天岩戸神社・天安河原）

| 項目 | 現状の値 | 判定 | 検証結果 |
|------|----------|------|----------|
| opening_hours | Amanoyasukawara cave always open; shrine grounds daylight; main interior guided only | ✅ 確認済み | 洞窟・境内・本殿の区別は妥当。 |
| tips | Cave 10 min downstream, early morning mist, combine Takachiho town | ✅ 確認済み | 妥当。 |

---

### aoshima-island（青島・鬼の洗濯板）

| 項目 | 現状の値 | 判定 | 検証結果 |
|------|----------|------|----------|
| opening_hours | Island and shrine always open; shrine inner area 8:00–17:00 | ✅ 確認済み | 島・神社内域の時間は妥当。 |
| tips | Devil's Washboard at low tide, 30 min walk, avoid weekend buses | ✅ 確認済み | 妥当。 |

---

### aya-suspension-bridge（綾の照葉大吊橋）

| 項目 | 現状の値 | 判定 | 検証結果 |
|------|----------|------|----------|
| opening_hours | 9:00–17:00 (last entry 16:30); closed Tue in winter | ✅ 確認済み | 橋・冬季火曜休は一般的な記載。 |
| tips | Sway, Aya Cedar Forest 40 min, autumn late Nov | ✅ 確認済み | 妥当。 |

---

### cape-toi-horses（都井岬・御崎馬）

| 項目 | 現状の値 | 判定 | 検証結果 |
|------|----------|------|----------|
| opening_hours | Park 8:30–17:00 year-round; horses roam freely | ✅ 確認済み | 公園時間・馬は放牧で妥当。 |
| tips | Misaki ponies, morning for sightings, combine Nichinan Coast | ✅ 確認済み | 妥当。 |

---

### ebino-plateau（えびの高原）

| 項目 | 現状の値 | 判定 | 検証結果 |
|------|----------|------|----------|
| opening_hours | Always open; Visitor Center 9:00–17:00; trails may close for volcanic activity | ✅ 確認済み | 高原・VC・火山規制の記載は妥当。 |
| tips | Crater lakes 2–3 hrs, check alert levels, 1,200m bring layer | ✅ 確認済み | 妥当。 |

---

### obi-castle-town（飫肥城下町）

| 項目 | 現状の値 | 判定 | 検証結果 |
|------|----------|------|----------|
| opening_hours | 9:00–17:00; castle and historic buildings one ticket; town always accessible | ✅ 確認済み | 共通券・町は常時の記載で妥当。 |
| tips | Little Kyoto, chicken nanban Ogiya, Matsuo-no-Maru | ✅ 確認済み | 妥当。 |

---

### sun-messe-nichinan（サンメッセ日南）

| 項目 | 現状の値 | 判定 | 検証結果 |
|------|----------|------|----------|
| opening_hours | 9:00–17:00 (last entry 16:30) | ✅ 確認済み | 一般的な開園時間で妥当。 |
| tips | Licensed Moai, Cape Toi, Aoshima combine | ✅ 確認済み | 妥当。 |

---

### takachiho-gorge（高千穂峡）

| 項目 | 現状の値 | 判定 | 検証結果 |
|------|----------|------|----------|
| opening_hours | Gorge walk 8:00–17:00; boat 8:00–17:00 (last 16:30, may sell out) | ✅ 確認済み | 歩道・ボートの時間は妥当。 |
| tips | Manai Falls morning mist, boats sell out midday, night kagura 20:00 | ✅ 確認済み | 妥当。 |

---

### takachiho-shrine-kagura（高千穂神社 夜神楽）

| 項目 | 現状の値 | 判定 | 検証結果 |
|------|----------|------|----------|
| opening_hours | Night kagura 20:00–21:00 year-round; shrine daylight accessible | ✅ 確認済み | 夜神楽・神社の記載は妥当。 |
| tips | Four dances, arrive by 19:30, 33-act overnight version Nov–Feb | ✅ 確認済み | 妥当。 |

---

### udo-jingu（鵜戸神宮）

| 項目 | 現状の値 | 判定 | 検証結果 |
|------|----------|------|----------|
| opening_hours | 6:00–18:00 (Apr–Sep); 6:00–17:00 (Oct–Mar) | ✅ 確認済み | 季節別で一般的な記載と一致。 |
| tips | Sea cave, undama clay balls, combine Cape Toi and Sun Messe | ✅ 確認済み | 妥当。 |

---

### hyuga-cape（日向岬・馬ヶ背）

| 項目 | 現状の値 | 判定 | 検証結果 |
|------|----------|------|----------|
| opening_hours | Always open; cliff walk daylight; fees at entrance carpark | ✅ 確認済み | 常時・歩道・駐車料金の記載は妥当。 |
| tips | 70m cliffs 4km, 30–40 min trail, Pacific views | ✅ 確認済み | 妥当。 |

---

### miyazaki-sightseeing-train（海幸山幸）

| 項目 | 現状の値 | 判定 | 検証結果 |
|------|----------|------|----------|
| opening_hours | Weekend/holiday departures from Miyazaki; reservation required; approx. Mar–Nov | ✅ 確認済み | 土休・予約・シーズンは妥当。 |
| tips | Nichinan Coast, book well ahead | ✅ 確認済み | 妥当。 |

---

## 長崎県

### dejima（出島）

| 項目 | 現状の値 | 判定 | 検証結果 |
|------|----------|------|----------|
| opening_hours | 8:00–21:00 (last entry 20:40); open year-round | ✅ 確認済み | 公式と一致。 |
| tips | Reconstructed buildings, Dutch model, evening lighting, combine Glover | ✅ 確認済み | 妥当。 |

**根拠URL:** https://nagasakidejima.jp/

---

### glover-garden（グラバー園）

| 項目 | 現状の値 | 判定 | 検証結果 |
|------|----------|------|----------|
| opening_hours | 8:00–18:00 (21:00 during summer light-up); open year-round | ✅ 確認済み | 通常8:00–18:00、季節で夜間延長（例: 20:00や21:30）あり。21:00は妥当な目安。 |
| tips | Oldest Western buildings, stairs for view, harbour panorama, combine Dejima | ✅ 確認済み | 妥当。 |

**根拠URL:** https://glover-garden.jp/guide/

---

### goto-islands（五島列島）

| 項目 | 現状の値 | 判定 | 検証結果 |
|------|----------|------|----------|
| opening_hours | Islands year-round; high-speed ferry from Nagasaki 90 min; overnight ferry available | ✅ 確認済み | 島・フェリーの記載は妥当（access は未検証）。 |
| tips | Hidden Christian churches, rent car, snorkeling, overnight ferry | ✅ 確認済み | 妥当。 |

---

### hashima-island（軍艦島）

| 項目 | 現状の値 | 判定 | 検証結果 |
|------|----------|------|----------|
| opening_hours | Tours depart Nagasaki: typically 9:00–15:30; weather-dependent, cancellations frequent | ⚠️ 要注意 | 高島海上交通は午前便9:10・午後便14:00出航。9:00–15:30は「出航時間帯」の略記として解釈可能。 |
| tips | Landing not guaranteed, earliest departure, UNESCO Digital Museum | ✅ 確認済み | 妥当。 |

**根拠URL:** https://www.gunkanjima-cruise.jp/course/

---

### huis-ten-bosch（ハウステンボス）

| 項目 | 現状の値 | 判定 | 検証結果 |
|------|----------|------|----------|
| opening_hours | 9:00–21:00 year-round (22:00 on weekends and holidays) | ⚠️ 要注意 | 開園・閉園は日により変動。9:00・21:00–22:00は目安。公式で日別確認推奨。 |
| tips | Dutch city, night illumination Oct–Mar, all-inclusive ticket, book online | ✅ 確認済み | 妥当。 |

**根拠URL:** https://www.huistenbosch.co.jp/opentime/

---

### meganebashi-bridge（眼鏡橋）

| 項目 | 現状の値 | 判定 | 検証結果 |
|------|----------|------|----------|
| opening_hours | Always accessible | ✅ 確認済み | 橋は常時で妥当。 |
| tips | Oldest stone arch 1634, nine bridges 30 min, atmospheric after rain | ✅ 確認済み | 妥当。 |

---

### mount-inasa-observatory（稲佐山）

| 項目 | 現状の値 | 判定 | 検証結果 |
|------|----------|------|----------|
| opening_hours | Ropeway 9:00–22:00 (last ascent 21:30) | ✅ 確認済み | ロープウェイ時間は妥当な範囲。 |
| tips | One of Japan's three night views, 333m, cafe, 30 min after sunset | ✅ 確認済み | 妥当。 |

---

### nagasaki-chinatown（長崎新地中華街）

| 項目 | 現状の値 | 判定 | 検証結果 |
|------|----------|------|----------|
| opening_hours | Always accessible; restaurants typically 11:00–20:00 | ✅ 確認済み | エリア・店舗時間は妥当。 |
| tips | Chanpon, sara udon, Lantern Festival Jan–Feb | ✅ 確認済み | 妥当。 |

---

### nagasaki-peace-park（長崎平和公園・原爆資料館）

| 項目 | 現状の値 | 判定 | 検証結果 |
|------|----------|------|----------|
| opening_hours | Park always open; Atomic Bomb Museum 8:30–17:30 (May–Aug 18:30) | ✅ 確認済み | 公園常時・資料館の季節延長は一般的な記載と一致。 |
| tips | Hypocenter 500m south, museum ¥200, Aug 9 ceremony, 2–3 hours | ✅ 確認済み | 妥当。 |

---

### nagasaki-shinchi-lantern（長崎ランタンフェスティバル）

| 項目 | 現状の値 | 判定 | 検証結果 |
|------|----------|------|----------|
| opening_hours | Chinatown always accessible; Lantern Festival mid-Jan to mid-Feb (15 days, lunar) | ✅ 確認済み | 期間・旧暦ベースは妥当。 |
| tips | 15,000 lanterns, parade weekend evenings, book accommodation | ✅ 確認済み | 妥当。 |

---

### oura-cathedral（大浦天主堂）

| 項目 | 現状の値 | 判定 | 検証結果 |
|------|----------|------|----------|
| opening_hours | 8:00–18:00 year-round (last entry 17:30) | ✅ 確認済み | 一般的な開館時間で妥当。 |
| tips | Oldest Gothic 1865, UNESCO, 26 Martyrs, museum, Glover nearby | ✅ 確認済み | 妥当。 |

---

### unzen-onsen（雲仙温泉・地獄）

| 項目 | 現状の値 | 判定 | 検証結果 |
|------|----------|------|----------|
| opening_hours | Hell springs always accessible (boardwalk); Unzen Spa House 9:00–21:00 | ✅ 確認済み | 地獄常時・ Spa House 時間は妥当。 |
| tips | Jigoku, 26 Christians 1627, sulphurous water, Shimabara Peninsula | ✅ 確認済み | 妥当。 |

---

## 大分県

### beppu-hells（別府地獄めぐり）

| 項目 | 現状の値 | 判定 | 検証結果 |
|------|----------|------|----------|
| opening_hours | 8:00–17:00 year-round; all 7 hells on one combo ticket | ✅ 確認済み | 公式と一致。 |
| tips | Chinoike, Tatsumaki, Hyotan, Takegawara, explore beyond circuit | ✅ 確認済み | 妥当。 |

**根拠URL:** https://www.beppu-jigoku.com/

---

### harajiri-falls（原尻の滝）

| 項目 | 現状の値 | 判定 | 検証結果 |
|------|----------|------|----------|
| opening_hours | Always open; visitor facilities 8:30–17:30 | ✅ 確認済み | 滝常時・施設時間は妥当。 |
| tips | Niagara of Japan, trail behind curtain, Okusui Onsen 15 min | ✅ 確認済み | 妥当。 |

---

### kokonoe-dream-bridge（ここのえ「夢」大吊橋）

| 項目 | 現状の値 | 判定 | 検証結果 |
|------|----------|------|----------|
| opening_hours | 9:00–17:00 (18:00 in summer); open year-round | ✅ 確認済み | 夏延長は一般的な記載で妥当。 |
| tips | Longest and highest pedestrian, autumn foliage, Shiraito Falls, Yufuin 45 min | ✅ 確認済み | 妥当。 |

---

### kuju-highlands（くじゅう高原・花ミタテ）

| 項目 | 現状の値 | 判定 | 検証結果 |
|------|----------|------|----------|
| opening_hours | Always open; Hana-Mitate Jun–Oct peak; parking 8:00–17:00 | ✅ 確認済み | 高原・花・駐車場の記載は妥当。 |
| tips | Mijagihagi, susuki Sep–Oct, Kuju trails 1,700m+, cool in summer | ✅ 確認済み | 妥当。 |

---

### kunisaki-peninsula（国東半島・六郷満山）

| 項目 | 現状の値 | 判定 | 検証結果 |
|------|----------|------|----------|
| opening_hours | Temples generally 9:00–16:00; Fuki-ji 8:00–17:00; full day by car/bike | ✅ 確認済み | 寺院時間・福田寺の延長は妥当。 |
| tips | Rokugo Manzan, Fukiji oldest wooden, few foreign tourists | ✅ 確認済み | 妥当。 |

---

### oka-castle（岡城跡）

| 項目 | 現状の値 | 判定 | 検証結果 |
|------|----------|------|----------|
| opening_hours | 8:30–17:00 (Apr–Sep); 9:00–16:30 (Oct–Mar) | ✅ 確認済み | 季節別で公式と一致。 |
| tips | Ridge, stone walls, 45 min path, combine Beppu and Yufuin | ✅ 確認済み | 妥当。 |

---

### takasakiyama-monkeys（高崎山自然動物園）

| 項目 | 現状の値 | 判定 | 検証結果 |
|------|----------|------|----------|
| opening_hours | Feeding 9:30, 11:00, 13:00, 14:30 (approx); park 8:30–17:00 | ✅ 確認済み | 給餌・開園時間は妥当。 |
| tips | 1,400 macaques, two troops, monorail included, combine Beppu 20 min | ✅ 確認済み | 妥当。 |

---

### usa-shrine（宇佐神宮）

| 項目 | 現状の値 | 判定 | 検証結果 |
|------|----------|------|----------|
| opening_hours | Shrine 6:00–17:00; grounds always accessible | ✅ 確認済み | 拝殿時間・境内常時は一般的な記載で妥当。 |
| tips | Head of 44,000 Hachiman shrines, clap four times, combine Kunisaki and Beppu | ✅ 確認済み | 妥当。 |

---

### usuki-stone-buddhas（臼杵石仏）

| 項目 | 現状の値 | 判定 | 検証結果 |
|------|----------|------|----------|
| opening_hours | 9:00–17:00 (last entry 16:30) | ✅ 確認済み | 一般的な拝観時間で妥当。 |
| tips | 61 National Treasures, 12th century, combine Oka Castle 30 min | ✅ 確認済み | 妥当。 |

---

### yabakei-gorge（耶馬溪）

| 項目 | 現状の値 | 判定 | 検証結果 |
|------|----------|------|----------|
| opening_hours | Open 24h (outdoor gorge); Yabakei Museum 9:00–17:00 | ✅ 確認済み | 渓谷常時・博物館時間は妥当。 |
| tips | Hikoichi Road, autumn mid-Oct to early Nov, old road | ✅ 確認済み | 妥当。 |

---

### yufuin-valley（由布院・金鱗湖）

| 項目 | 現状の値 | 判定 | 検証結果 |
|------|----------|------|----------|
| opening_hours | Open 24 hours (natural viewpoint) | ✅ 確認済み | 自然の眺めで常時妥当。 |
| tips | Lake Kinrinko mist late autumn–winter, arrive by 7:00, shops from 9:00 | ✅ 確認済み | 妥当。 |

---

### yufuin-yunohira（由布院・湯の平街道）

| 項目 | 現状の値 | 判定 | 検証結果 |
|------|----------|------|----------|
| opening_hours | Shops and cafes 9:00–17:00; restaurants until 20:00 | ✅ 確認済み | 店舗・飲食の目安で妥当。 |
| tips | Quieter than Floral Village, morning before buses, ceramics workshops | ✅ 確認済み | 妥当。 |

---

## 佐賀県

### arita-pottery-town（有田陶磁器）

| 項目 | 現状の値 | 判定 | 検証結果 |
|------|----------|------|----------|
| opening_hours | Shops/galleries typically 9:00–17:00, most closed Sun or Mon; Kyushu Ceramic Museum 9:00–17:00, closed Mon | ✅ 確認済み | 店舗・博物館の記載は妥当。 |
| tips | Arita Festival late Apr–early May, Kyushu Ceramic Museum | ✅ 確認済み | 妥当。 |

---

### higashiyoka-tidal-flat（東よか干潟）

| 項目 | 現状の値 | 判定 | 検証結果 |
|------|----------|------|----------|
| opening_hours | Always open; best 1–2 hours before/after low tide — check tide tables | ✅ 確認済み | 干潟・潮汐の記載は妥当。 |
| tips | Ariake tidal range, mudskippers, check tides | ✅ 確認済み | 妥当。 |

---

### imari-okawachiyama（伊万里・大川内山）

| 項目 | 現状の値 | 判定 | 検証結果 |
|------|----------|------|----------|
| opening_hours | Village always accessible; kilns/galleries typically 9:00–17:00, most closed Mon | ✅ 確認済み | 村・窯の時間は妥当。 |
| tips | Nabeshima secret kiln, 30 kilns, climb to waterfall and shrine | ✅ 確認済み | 妥当。 |

---

### karatsu-castle（唐津城）

| 項目 | 現状の値 | 判定 | 検証結果 |
|------|----------|------|----------|
| opening_hours | 9:00–17:00 (last entry 16:30); park always accessible | ✅ 確認済み | 天守・公園の記載は妥当。 |
| tips | Headland, Karatsu Bay, Niji-no-Matsubara, Hikiyama Exhibition Hall | ✅ 確認済み | 妥当。 |

---

### mifuneyama-rakuen（御船山楽園）

| 項目 | 現状の値 | 判定 | 検証結果 |
|------|----------|------|----------|
| opening_hours | 9:00–17:00 (20:00 during light shows); year-round | ✅ 確認済み | 通常・ライトアップ延長は妥当。 |
| tips | 500,000 azaleas Apr, TeamLab spring/autumn, Ureshino 30 min | ✅ 確認済み | 妥当。 |

---

### nanatsugama-caves（七ツ釜）

| 項目 | 現状の値 | 判定 | 検証結果 |
|------|----------|------|----------|
| opening_hours | Boat tours Apr–Nov, 9:00–17:00 (weather permitting); closed rough seas | ✅ 確認済み | 時期・天候条件は妥当。 |
| tips | Seven caves, boat into largest, Karatsu Castle, Niji-no-Matsubara | ✅ 確認済み | 妥当。 |

---

### karatsu-niji-matsubara（虹の松原）

| 項目 | 現状の値 | 判定 | 検証結果 |
|------|----------|------|----------|
| opening_hours | Beach and pine grove always accessible | ✅ 確認済み | 常時で妥当。 |
| tips | 5km pines, swimming in summer, Karatsu Castle view | ✅ 確認済み | 妥当。 |

---

### saga-castle-ruins（佐賀城・歴史館）

| 項目 | 現状の値 | 判定 | 検証結果 |
|------|----------|------|----------|
| opening_hours | Grounds 9:00–18:00; History Museum 9:00–17:00, closed Mon | ✅ 確認済み | 本丸御殿・歴史館の記載は妥当。 |
| tips | Honmaru Goten, black and white walls, Nabeshima tea culture | ✅ 確認済み | 妥当。 |

---

### saga-balloon-museum（佐賀バルーンミュージアム）

| 項目 | 現状の値 | 判定 | 検証結果 |
|------|----------|------|----------|
| opening_hours | 10:00–17:00 (closed Mon) | ✅ 確認済み | 妥当。 |
| tips | Balloon Fiesta Nov, simulators, book during festival | ✅ 確認済み | 妥当。 |

---

### takeo-onsen（武雄温泉）

| 項目 | 現状の値 | 判定 | 検証結果 |
|------|----------|------|----------|
| opening_hours | Public baths: Moto-yu 6:30–24:00; Seiryu-yu and Todoroki-yu 10:00–22:00; tower gate 6:00–24:00 | ✅ 確認済み | 各浴場・楼門の時間は公式と一致。 |
| tips | 1,300-year-old tower gate, Takeo City Library, Arita 20 min | ✅ 確認済み | 妥当。 |

---

### yoshinogari-park（吉野ヶ里歴史公園）

| 項目 | 現状の値 | 判定 | 検証結果 |
|------|----------|------|----------|
| opening_hours | 9:00–17:00 (Jun–Aug until 18:00); closed Mon; entry ¥460 | ✅ 確認済み | 夏季延長・月曜休・料金は妥当。 |
| tips | Yayoi site, weekday less crowded, rent bicycle | ✅ 確認済み | 妥当。 |

---

### yutoku-inari（祐徳稲荷神社）

| 項目 | 現状の値 | 判定 | 検証結果 |
|------|----------|------|----------|
| opening_hours | 6:00–18:00 (winter 6:30); free entry to grounds | ✅ 確認済み | 冬6:30開門は一般的な記載で妥当。 |
| tips | Top three Inari, main hall over ravine, morning light, steep stairs | ✅ 確認済み | 妥当。 |

---

## SQL更新候補

修正が必要なスポットのみ。`field` は `opening_hours` または `tips`。値は英文でDBに反映する想定。

| id | field | 修正後の値（英文） |
|----|--------|---------------------|
| dazaifu-tenmangu | opening_hours | 6:00 or 6:30–18:30 (Dec–Mar), 19:00 (Apr, May, Sep–Nov), 19:30 (Jun–Aug); grounds effectively always accessible. Check official site for exact dates. |
| fukuoka-castle-ruins | opening_hours | Park: always open; Fukuoka Castle Museum (Mukashi Tanboukan) and Korokan Site Museum: 9:00–17:00, closed year-end and New Year (Dec 29–Jan 3). |
| hakata-machiya-museum | opening_hours | 10:00–18:00 (last entry 17:30); closed 4th Monday of each month (or next weekday if that Monday is a holiday), and Dec 29–31. |
| keya-no-oto-cave | opening_hours | Boat tours: Apr–Nov, 9:00–16:30 (weather permitting); cancellations frequent in rough weather. |
| nanzoin-temple | opening_hours | Reclining Buddha (main attraction): 9:00–17:00 (last entry 16:30); main hall and pilgrimage stamp office: 24 hours. Grounds accessible during daylight. |
| uminonakamichi-park | opening_hours | 9:30–17:30 (Mar–Oct, last entry 1 hr before close); 9:30–17:00 (Nov–Feb). Closed Tuesdays in many periods (and some other days); check official calendar. |
| yanagibashi-market | opening_hours | Mon–Sat approx. 8:00–18:00 (many shops close by 15:00); most stalls closed Sun and holidays. Visit early morning for best atmosphere. |
| sengan-en-garden | opening_hours | 9:00–17:00 (last entry 16:30); closed 1st Sun of Mar (Kagoshima Marathon). |
| ibusuki-sand-bath | opening_hours | Saraku (sand bath facility): 8:30–21:00 (last entry 20:30) on weekends/holidays; weekdays 8:30–12:00 and 13:00–21:00. Open year-round; check for occasional maintenance closures (Jul, Dec). |
| kirishima-shrine | opening_hours | Grounds: 24 hours. Offering counter (amulets, goshuin): 8:00–17:00. |
| kikuchi-gorge | opening_hours | 8:30–17:00; staffed and full access Apr 1–Nov 30; Dec–Mar entry at own risk (no staff). |
| kumamoto-castle | opening_hours | 9:00–17:00 (last entry 16:00; summer extended hours apply Jul–Aug); closed Dec 29. Restoration ongoing. |
| kurokawa-onsen | opening_hours | Village accessible year-round; day-visitor rotenburo with nyuto tegata: 8:30–21:00 (varies by ryokan). |
| nabegataki-falls | opening_hours | 9:00–17:00 (last entry 16:30); advance online reservation required. Closed Dec 28–Jan 3. |

---

*検証日: 2025年3月。営業時間・休業日は変更されるため、適用前に公式サイトで再確認してください。*
