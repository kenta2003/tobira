# ファクトチェックレポート — 山形県スポット5件

検証日: 2026-03-22
対象ファイル: `scripts/seed-yamagata-extra.sql`
検証フィールド: admission / access / opening_hours / tips

一次情報源は、日本語の公式サイト・一次情報源を優先して確認した。主な参照先:

- 山形市公式「霞城公園(国指定史跡山形城跡)について」: https://www.city.yamagata-yamagata.lg.jp/kurashi/koen/1006541/1006545/1015528.html
- 山形市公式「山形城跡二ノ丸東大手門櫓」: https://www.city.yamagata-yamagata.lg.jp/bunkasports/bunkazai/1006708/1003674.html
- やまがたへの旅「山形城跡・霞城公園」: https://yamagatakanko.com/attractions/detail_2304.html
- やまがたへの旅「山形県郷土館『文翔館』」: https://yamagatakanko.com/attractions/detail_2515.html
- 日本一の芋煮会フェスティバル公式「開催概要」: https://imoni-fes.jp/event_guide/
- 日本一の芋煮会フェスティバル公式「会場案内／アクセス」: https://imoni-fes.jp/event_guide/place_access/
- やまがたへの旅「さくらんぼ観光果樹園にでかけよう」: https://yamagatakanko.com/topics/detail_124.html
- やまがたへの旅「木村観光果樹園」: https://yamagatakanko.com/attractions/detail_3636.html
- やまがたへの旅「滝口観光果樹園」: https://yamagatakanko.com/attractions/detail_9611.html
- やまがたへの旅「蔵王の樹氷」: https://yamagatakanko.com/attractions/detail_2721.html
- やまがたへの旅「樹氷ライトアップ」: https://yamagatakanko.com/attractions/detail_2960.html
- 蔵王ロープウェイ公式「料金・営業案内」: https://zaoropeway.co.jp/winter/guide.php
- 蔵王ロープウェイ公式「樹氷・ライトアップ」: https://zaoropeway.co.jp/winter/juhyo.php

---

## 1. yamagata-kajo-park（Kajo Park & Yamagata Castle Ruins）

### 検証結果: 要修正（3項目）

#### admission
- **記載値**: `'Free'`
- **判定**: ✅ 概ね正確
- **根拠**: 山形市公式では「入園料 無料（ただし園内施設で料金が必要な場合あり）」。
- **出典**: https://www.city.yamagata-yamagata.lg.jp/kurashi/koen/1006541/1006545/1015528.html

#### access
- **記載値**: `'15-minute walk or 5-minute bus ride from Yamagata Station (JR Yamagata Shinkansen).'`
- **正しい値**: `'JR Yamagata Station: about 10 minutes on foot (tourism site) / about 15 minutes on foot from the east exit to the East Great Gate; Benichan Bus to "Kajo Koen-mae" is also available.'`
- **判定**: ⚠️ 要修正
- **根拠**: やまがたへの旅は「JR山形駅より徒歩10分程度」。山形市公式は「山形駅東口から東大手門まで15分」「ベニちゃんバス『霞城公園前』下車」と案内。現行値の「5-minute bus ride」は一次情報で確認できず、徒歩所要も表記ゆれがあるため、公式表現ベースに寄せたほうが安全。
- **出典**: https://yamagatakanko.com/attractions/detail_2304.html / https://www.city.yamagata-yamagata.lg.jp/kurashi/koen/1006541/1006545/1015528.html

#### opening_hours
- **記載値**: `'Open 24 hours (park grounds); East Great Gate interior: 9:00–17:00 (closed Mondays)'`
- **正しい値**: `'Park: 5:00–22:00 (Apr 1–Oct 31), 5:30–22:00 (Nov 1–Mar 31); East Great Gate turret: seasonal public opening only (FY2025: Apr 5–Nov 3, 9:30–16:00; Jul–Aug until 17:00).'`
- **判定**: ❌ 誤り
- **根拠**: 山形市公式の公園開園時間は通年24時間ではなく季節別に5:00/5:30～22:00。東大手門櫓も常時公開ではなく、年度ごとの季節公開。2025年度は4月5日～11月3日、4～6月・9～11月は9:30～16:00、7～8月は9:30～17:00。
- **出典**: https://www.city.yamagata-yamagata.lg.jp/kurashi/koen/1006541/1006545/1015528.html / https://www.city.yamagata-yamagata.lg.jp/bunkasports/bunkazai/1006708/1003674.html

#### tips
- **記載値**: `'Visit in late April for cherry blossoms — arrive early on weekends as the park gets very busy. Combine with Bunshokan (10-minute walk) for a full Yamagata city morning.'`
- **正しい値**: `'For cherry blossoms, aim for early to mid-April rather than late April. If you want to enter the East Great Gate turret, check the current seasonal opening schedule before visiting. Bunshokan also pairs well nearby.'`
- **判定**: ⚠️ 要修正
- **根拠**: 山形市公式は桜の見頃を「4月上旬～中旬頃」と案内しており、「late April」は遅い。東大手門櫓は季節公開なので、その注記もあると実態に合う。
- **出典**: https://www.city.yamagata-yamagata.lg.jp/kurashi/koen/1006541/1006545/1015528.html / https://www.city.yamagata-yamagata.lg.jp/bunkasports/bunkazai/1006708/1003674.html

---

## 2. yamagata-bunshokan（Bunshokan）

### 検証結果: 要修正（4項目）

#### admission
- **記載値**: `'Free (exterior and grounds); exhibition admission varies'`
- **正しい値**: `'Free'`
- **判定**: ❌ 誤り
- **根拠**: やまがたへの旅は文翔館を「無料公開」と明記し、基本情報の料金欄も「無料」。現行値の「exhibition admission varies」は一次情報では確認できなかった。
- **出典**: https://yamagatakanko.com/attractions/detail_2515.html

#### access
- **記載値**: `'10-minute walk from Yamagata Station, or adjacent to Kajo Park.'`
- **正しい値**: `'From JR Yamagata Station, take a route bus via City Hall and get off at "Shiyakusho-mae", then walk 1 minute; about 10 minutes by car from Yamagata-Zao IC.'`
- **判定**: ⚠️ 要修正
- **根拠**: やまがたへの旅の基本情報は、JR山形駅からは「市役所経由路線バスで市役所前下車、徒歩1分」と案内。徒歩10分という断定は一次情報で確認できなかった。
- **出典**: https://yamagatakanko.com/attractions/detail_2515.html

#### opening_hours
- **記載値**: `'Exterior viewing: open 24 hours; interior exhibitions: 9:00–17:00 (closed Mondays)'`
- **正しい値**: `'9:00–16:30; closed on the 1st and 3rd Monday of each month (or the following day if Monday is a holiday), and 29 Dec – 3 Jan.'`
- **判定**: ❌ 誤り
- **根拠**: やまがたへの旅の基本情報は営業時間「9:00～16:30」、休業日「第1・第3月曜日（祝祭日の場合は翌日）、12月29日～1月3日」。現行値の「24 hours」「17:00」「closed Mondays」はいずれも不一致。
- **出典**: https://yamagatakanko.com/attractions/detail_2515.html

#### tips
- **記載値**: `'The exterior and clocktower are the main draw and fully free to visit. Combine with Kajo Park next door for a convenient half-day Yamagata city itinerary.'`
- **正しい値**: `'Admission is free, and free volunteer guides are available. Visit during opening hours if you want to see the interior details rather than only the exterior; Bunshokan combines well with nearby Kajo Park.'`
- **判定**: ⚠️ 要修正
- **根拠**: 無料ボランティアガイドの案内が一次情報にある一方、「外観中心」「24時間見学できる」印象になる現行 tips は実態とずれる。内部見学は開館時間内に限られる。
- **出典**: https://yamagatakanko.com/attractions/detail_2515.html

---

## 3. yamagata-imoni-festival（Yamagata Imoni Festival）

### 検証結果: 要修正（4項目）

#### admission
- **記載値**: `'Free to attend; imoni bowl ¥500–¥800'`
- **正しい値**: `'Free to enter; giant-pot imoni requires a sponsorship ticket (2025: advance-reservation tickets from ¥600, same-day tickets from ¥700). Paid reserved seating is separate.'`
- **判定**: ⚠️ 要修正
- **根拠**: 公式「開催概要」では、大鍋芋煮は2025年実績で「事前受付チケット 600円以上のご協賛」「当日受付整理券 700円以上のご協賛」。有料座席「芋煮茶屋」は別料金。現行の「¥500–¥800」は現在の公式料金体系と一致しない。
- **出典**: https://imoni-fes.jp/event_guide/ / https://imoni-fes.jp/event_guide/imonichaya/

#### access
- **記載値**: `'20-minute walk or 10-minute bus from Yamagata Station. The festival site is along the Mamigasaki River on the east side of the city.'`
- **正しい値**: `'Festival site: Mamigasaki riverbed near Sogetsu Bridge. From JR Yamagata Station East Exit, take a Yamakobus bound for Numanobe and get off at "Yamagata Shobosho-mae". Private cars must use designated parking lots and shuttle buses; there is no parking at the venue.'`
- **判定**: ⚠️ 要修正
- **根拠**: 公式アクセス案内は、JR利用者には山形駅東口からの路線バス利用を案内し、会場付近には駐車場がないと明記。現行値の徒歩20分は一次情報で確認できず、車利用時の制約も抜けている。
- **出典**: https://imoni-fes.jp/event_guide/place_access/

#### opening_hours
- **記載値**: `'Festival: first Sunday of September, approximately 10:00–15:00; restaurants: September–November, lunch and dinner'`
- **正しい値**: `'Held once a year in September; date and schedule vary by year. Official 2025 schedule: ticket distribution from 8:30, serving from 9:20 until sold out.'`
- **判定**: ❌ 誤り
- **根拠**: 現行値の「first Sunday of September」は固定化しすぎ。2025年の公式開催日は9月14日（日）で第2日曜だった。時間も公式は整理券配布8:30、配食開始9:20。レストラン営業は本イベントの opening_hours としては一次情報で裏づけられない。
- **出典**: https://imoni-fes.jp/event_guide/ / https://yamagatakanko.com/topics/detail_79.html

#### tips
- **記載値**: `'Arrive early — queues for the giant pot form quickly after 10am. If you miss the festival, imoni is available at restaurants and riverside self-cooking spots (imoni-kai) throughout the autumn. Locals gather at the river with portable gas stoves on weekends to cook their own — a relaxed and welcoming scene to join.'`
- **正しい値**: `'Check the official festival site for the exact annual date and ticketing rules before publishing fixed wording. Arrive early if using same-day tickets, and do not plan to drive directly to the venue because on-site parking is unavailable.'`
- **判定**: ⚠️ 要修正
- **根拠**: 早着推奨自体は妥当だが、現行 tips は一次情報で裏づけにくい一般論が多い。公式情報として確実なのは、年ごとに日程・受付方法が変わること、当日整理券があること、会場駐車場がないこと。
- **出典**: https://imoni-fes.jp/event_guide/ / https://imoni-fes.jp/event_guide/place_access/

---

## 4. yamagata-cherry-picking（Yamagata Cherry Picking Experience）

### 検証結果: 要修正（4項目）

#### admission
- **記載値**: `'¥1,500–¥2,500 per person (all-you-can-eat, 30–40 minutes)'`
- **正しい値**: `'Varies by orchard and season. Official 2025 examples range from about ¥1,800 to ¥2,500 for adults for 30-minute all-you-can-eat cherry picking.'`
- **判定**: ⚠️ 要修正
- **根拠**: 県公式の果樹園個別ページでは、木村観光果樹園は30分食べ放題で中学生以上2,500円、滝口観光果樹園は30分で中学生以上1,800円〜。価格帯の大筋は近いが、一般化しすぎており「30–40 minutes」も一次情報で裏づけが弱い。
- **出典**: https://yamagatakanko.com/attractions/detail_3636.html / https://yamagatakanko.com/attractions/detail_9611.html

#### access
- **記載値**: `'Higashine Station or Tendo Station on the JR Ou Line (30–40 minutes from Yamagata Station). Many farms offer free shuttle pickup from nearby stations — check with individual farms when booking.'`
- **正しい値**: `'Access varies by orchard. Official Yamagata tourism listings show orchards across Kaminoyama, Tendo, Higashine, Sagae and other areas, usually reached by car from the nearest station; confirm the orchard-specific access when booking.'`
- **判定**: ❌ 誤り寄り
- **根拠**: 本スポットは単一施設ではなく県内各地の観光果樹園の総称。県公式特集でも上山・天童・東根・寒河江など複数エリアに分布しており、最寄駅も所要も一律ではない。無料送迎の一般化も一次情報で確認できなかった。
- **出典**: https://yamagatakanko.com/topics/detail_124.html / https://yamagatakanko.com/attractions/detail_3636.html / https://yamagatakanko.com/attractions/detail_9611.html

#### opening_hours
- **記載値**: `'June–July: 9:00–16:00 (most farms; reservation recommended)'`
- **正しい値**: `'Varies by orchard and crop conditions. Official 2025 examples include 8:00–17:00 and 9:00–16:00 / 17:00; many orchards open from early June to early July.'`
- **判定**: ⚠️ 要修正
- **根拠**: 木村観光果樹園は8:00～17:00、滝口観光果樹園は9:00～16:00。県公式特集も開園日・営業時間は生育状況で変わるため直接確認するよう案内している。「most farms 9:00–16:00」は固定しすぎ。
- **出典**: https://yamagatakanko.com/attractions/detail_3636.html / https://yamagatakanko.com/attractions/detail_9611.html / https://yamagatakanko.com/topics/detail_124.html

#### tips
- **記載値**: `'Book directly with farms at least a few days ahead in peak season (mid-June to early July). Bring a small cooler bag if you want to take cherries home. The Higashine area has the highest concentration of farms and is easiest to access by train.'`
- **正しい値**: `'Advance reservation or prior contact may be required. Opening dates, hours and prices can change depending on growing conditions, so contact the orchard directly before visiting.'`
- **判定**: ⚠️ 要修正
- **根拠**: 県公式特集の注意書きは「事前予約または事前連絡が必要な場合」「開園日・営業時間・料金等が変わる可能性があるため、詳細は直接お問い合わせください」。現行 tips の「数日前予約」「東根が最もアクセスしやすい」などは一般化が強い。
- **出典**: https://yamagatakanko.com/topics/detail_124.html

---

## 5. zao-snow-monsters（Zao Snow Monsters / Juhyo）

### 検証結果: 要修正（4項目）

#### admission
- **記載値**: `'Zao Ropeway round trip ¥2,500 (adults)'`
- **正しい値**: `'Zao Ropeway to Jizo Sancho: adults ¥4,400 round trip / ¥2,200 one way; children ¥2,200 round trip / ¥1,100 one way.'`
- **判定**: ❌ 誤り
- **根拠**: 蔵王ロープウェイ公式の料金表では、地蔵山頂駅まで大人往復4,400円。現行の2,500円は現在の公式料金と一致しない。
- **出典**: https://zaoropeway.co.jp/winter/guide.php

#### access
- **記載値**: `'Take a bus from Yamagata Station to Zao Onsen (approx. 40 minutes), then the Zao Ropeway to the Monster Zone. Direct buses run frequently in winter from Yamagata Station.'`
- **正しい値**: `'From JR Yamagata Station East Exit, take a bus bound for Zao Onsen (about 40 minutes), get off at Zao Onsen Bus Terminal, walk about 15 minutes to Zao Ropeway Sanroku Station, then take the ropeway to Juhyo Kogen and Jizo Sancho.'`
- **判定**: ⚠️ 要修正
- **根拠**: やまがたへの旅は、バスターミナル下車後にロープウェイ山麓駅まで徒歩約15分と明記。現行値はこの徒歩区間が抜けており、「frequently」は一次情報で裏づけていない。
- **出典**: https://yamagatakanko.com/attractions/detail_2721.html

#### opening_hours
- **記載値**: `'Ropeway: 8:30–17:00 (winter season; weather dependent); night illumination: 17:00–21:00 on select dates'`
- **正しい値**: `'Snow monster season: typically late December to late February (best viewing around late December to mid-February, depending on conditions). Ropeway hours: Sanroku Line 8:30–17:00, Sancho Line 8:45–16:45; last uphill round-trip departure to Jizo Sancho is 16:00. Light-up events are typically held on selected dates, 17:00–21:00, with last uphill departure 19:50.'`
- **判定**: ⚠️ 要修正
- **根拠**: ロープウェイ公式は山麓線8:30～17:00、山頂線8:45～16:45、地蔵山頂駅行き往復の上り最終16:00。やまがたへの旅は樹氷ライトアップ17:00～21:00、上り最終19:50、開催期間は例年12月下旬～2月下旬の特定日。現行値は山頂線の終業・最終上りが欠落している。
- **出典**: https://zaoropeway.co.jp/winter/guide.php / https://yamagatakanko.com/attractions/detail_2960.html / https://yamagatakanko.com/attractions/detail_2721.html

#### tips
- **記載値**: `'Check the Zao Ropeway website the evening before for conditions — fog can obscure the monsters entirely. The night illumination (Juhyo Fantasy) runs on set dates in January and February and is worth planning around. Dress for -10°C or colder at the summit.'`
- **正しい値**: `'Check ropeway operation and weather conditions before visiting. Visibility and growth vary with the weather, and temperatures can fall below -10°C. Light-up dates are limited and should be confirmed on the official site before planning.'`
- **判定**: ⚠️ 要修正
- **根拠**: 公式情報として確実なのは、樹氷やライトアップは気象条件に左右されること、防寒が必要なこと、開催日が限定的なこと。現行 tips の「the evening before」「January and February only」は一次情報の言い切りとしてはやや強い。
- **出典**: https://zaoropeway.co.jp/winter/juhyo.php / https://yamagatakanko.com/attractions/detail_2960.html / https://yamagatakanko.com/attractions/detail_2721.html

---

## 総評

5件すべてに修正候補が見つかった。特に優先度が高いのは、営業時間を24時間扱いしている `yamagata-kajo-park` と `yamagata-bunshokan`、料金が大きくずれている `zao-snow-monsters`、年ごとに固定できない日程を固定表現にしている `yamagata-imoni-festival`、単一施設ではないのに一律条件で書いている `yamagata-cherry-picking`。

特に `yamagata-cherry-picking` と `yamagata-imoni-festival` は、単一施設・恒常営業ではないため、「代表値」を書くより「年次・施設ごとに変動する」前提を残した値のほうが保守しやすい。

## SQL更新候補
| id | field | 修正後の値 |
|---|---|---|
| yamagata-kajo-park | access | `'JR Yamagata Station: about 10 minutes on foot / about 15 minutes on foot from the east exit to the East Great Gate; Benichan Bus to \"Kajo Koen-mae\" is also available.'` |
| yamagata-kajo-park | opening_hours | `'Park: 5:00–22:00 (Apr 1–Oct 31), 5:30–22:00 (Nov 1–Mar 31); East Great Gate turret: seasonal public opening only (FY2025: Apr 5–Nov 3, 9:30–16:00; Jul–Aug until 17:00)'` |
| yamagata-kajo-park | tips | `'For cherry blossoms, aim for early to mid-April rather than late April. If you want to enter the East Great Gate turret, check the current seasonal opening schedule before visiting. Bunshokan also pairs well nearby.'` |
| yamagata-bunshokan | admission | `'Free'` |
| yamagata-bunshokan | access | `'From JR Yamagata Station, take a route bus via City Hall and get off at \"Shiyakusho-mae\", then walk 1 minute; about 10 minutes by car from Yamagata-Zao IC.'` |
| yamagata-bunshokan | opening_hours | `'9:00–16:30; closed on the 1st and 3rd Monday of each month (or the following day if Monday is a holiday), and 29 Dec – 3 Jan'` |
| yamagata-bunshokan | tips | `'Admission is free, and free volunteer guides are available. Visit during opening hours if you want to see the interior details rather than only the exterior; Bunshokan combines well with nearby Kajo Park.'` |
| yamagata-imoni-festival | admission | `'Free to enter; giant-pot imoni requires a sponsorship ticket (2025: advance-reservation tickets from ¥600, same-day tickets from ¥700). Paid reserved seating is separate.'` |
| yamagata-imoni-festival | access | `'Festival site: Mamigasaki riverbed near Sogetsu Bridge. From JR Yamagata Station East Exit, take a Yamakobus bound for Numanobe and get off at \"Yamagata Shobosho-mae\". Private cars must use designated parking lots and shuttle buses; there is no parking at the venue.'` |
| yamagata-imoni-festival | opening_hours | `'Held once a year in September; date and schedule vary by year. Official 2025 schedule: ticket distribution from 8:30, serving from 9:20 until sold out.'` |
| yamagata-imoni-festival | tips | `'Check the official festival site for the exact annual date and ticketing rules before publishing fixed wording. Arrive early if using same-day tickets, and do not plan to drive directly to the venue because on-site parking is unavailable.'` |
| yamagata-cherry-picking | admission | `'Varies by orchard and season. Official 2025 examples range from about ¥1,800 to ¥2,500 for adults for 30-minute all-you-can-eat cherry picking.'` |
| yamagata-cherry-picking | access | `'Access varies by orchard. Official Yamagata tourism listings show orchards across Kaminoyama, Tendo, Higashine, Sagae and other areas, usually reached by car from the nearest station; confirm the orchard-specific access when booking.'` |
| yamagata-cherry-picking | opening_hours | `'Varies by orchard and crop conditions. Official 2025 examples include 8:00–17:00 and 9:00–16:00 / 17:00; many orchards open from early June to early July.'` |
| yamagata-cherry-picking | tips | `'Advance reservation or prior contact may be required. Opening dates, hours and prices can change depending on growing conditions, so contact the orchard directly before visiting.'` |
| zao-snow-monsters | admission | `'Zao Ropeway to Jizo Sancho: adults ¥4,400 round trip / ¥2,200 one way; children ¥2,200 round trip / ¥1,100 one way.'` |
| zao-snow-monsters | access | `'From JR Yamagata Station East Exit, take a bus bound for Zao Onsen (about 40 minutes), get off at Zao Onsen Bus Terminal, walk about 15 minutes to Zao Ropeway Sanroku Station, then take the ropeway to Juhyo Kogen and Jizo Sancho.'` |
| zao-snow-monsters | opening_hours | `'Snow monster season: typically late December to late February (best viewing around late December to mid-February, depending on conditions). Ropeway hours: Sanroku Line 8:30–17:00, Sancho Line 8:45–16:45; last uphill round-trip departure to Jizo Sancho is 16:00. Light-up events are typically held on selected dates, 17:00–21:00, with last uphill departure 19:50.'` |
| zao-snow-monsters | tips | `'Check ropeway operation and weather conditions before visiting. Visibility and growth vary with the weather, and temperatures can fall below -10°C. Light-up dates are limited and should be confirmed on the official site before planning.'` |
