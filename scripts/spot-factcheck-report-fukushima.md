# Fukushima Spot Fact Check

対象ファイル: `scripts/seed-fukushima-extra.sql`  
確認日: 2026-03-22  
確認対象: `admission`, `access`, `opening_hours`, `tips`

一次情報は日本語の公式・準公式ソース（公式サイト、自治体、観光協会）を使用。  
判定は `OK` / `要修正` / `要注意` で記載。

## shiramizu-amidado

| field | 現在値の要旨 | 確認結果 | 判定 | 根拠 |
|---|---|---|---|---|
| admission | 大人¥300 / 子ども¥150 | 大人500円、小人300円、未就学児無料 | 要修正 | Fukushima Seaside「願成寺 国宝白水阿弥陀堂」 https://www.fukushimaseaside.jp/spot/shiramizu-amidado/ |
| access | いわき駅からバスまたはタクシー約20分 | 車: いわき湯本ICから約15分。公共交通: JRいわき駅から川平行きバスで「あみだ堂」下車、徒歩5分 | 要修正 | https://www.fukushimaseaside.jp/spot/shiramizu-amidado/ |
| opening_hours | 4-9月 8:30-17:00 / 10-3月 8:30-16:30 | 4-10月 8:30-16:00、11-3月 8:30-15:30。第4水曜ほか宗教行事日など休みあり | 要修正 | https://www.fukushimaseaside.jp/spot/shiramizu-amidado/ |
| tips | ハスの見頃と紅葉時期の記述 | 夏のハス、秋の紅葉は妥当。ただし宗教行事や天候による休寺に注意を入れた方がよい | 要修正 | https://www.fukushimaseaside.jp/spot/shiramizu-amidado/ |

## aquamarine-fukushima

| field | 現在値の要旨 | 確認結果 | 判定 | 根拠 |
|---|---|---|---|---|
| admission | 大人¥1,850 / 小学生¥930 | 大人1,850円、小〜高校生900円、未就学児無料 | 要修正 | アクアマリンふくしま「入館料・開館案内」 https://www.aquamarine.or.jp/guide/info/ |
| access | いわき駅からバス約30分 / いわきICから車10分 | 車: いわき湯本IC約20分、いわき小名浜IC経由いわき泉ICから約10分。公共交通: JR泉駅から路線バス約15分、「イオンモールいわき小名浜」下車徒歩約5分 | 要修正 | アクアマリンふくしま「アクセス」 https://www.aquamarine.or.jp/guide/access/ |
| opening_hours | 9:00-17:30、冬季水曜休館 | 通常期 3/21-11/30 9:00-17:30、冬季 12/1-3/20 9:00-17:00、最終入館は閉館1時間前、年中無休 | 要修正 | https://www.aquamarine.or.jp/guide/info/ |
| tips | 体験予約推奨、周辺施設との周遊提案 | 公式ではGW・夏季の駐車場混雑が明記。体験予約の一般論より、混雑時は公共交通推奨の方が一次情報に沿う | 要修正 | https://www.aquamarine.or.jp/guide/access/ |

## abukuma-cave

| field | 現在値の要旨 | 確認結果 | 判定 | 根拠 |
|---|---|---|---|---|
| admission | 大人¥1,200 / 子ども¥600 / 探検+¥500 | 大人1,200円、中学生800円、小学生600円、探検コース追加300円 | 要修正 | あぶくま洞「入場料」 https://abukumado.com/abukuma_about |
| access | 郡山ICまたはTamura ICから車約30分、Abiko Stationからタクシー | 車: 田村スマートICから約15分。公共交通: JR福島駅→JR郡山駅→磐越東線「神俣駅」下車、タクシー約5分 | 要修正 | あぶくま洞「アクセス」 https://abukumado.com/abukuma-access |
| opening_hours | 3-11月 8:30-17:30 / 12-2月 8:30-16:30 | 4/1-6/22 8:30-17:00、6/23-9/30 8:30-17:30、10/1-11/15 8:30-17:00、11/16-3/6 8:30-16:30、3/7-3/31 8:30-17:00。探検コース受付は営業終了1時間30分前まで | 要修正 | https://abukumado.com/abukuma-access |
| tips | 探検コース要事前予約、泥汚れ対策、年中15℃ | 公式では事前予約よりも、歩きやすい靴・階段約300段・ベビーカー/車いす不可・体調条件への注意が明確 | 要修正 | あぶくま洞「入場料」 https://abukumado.com/abukuma_about |

## bandai-azuma-skyline

| field | 現在値の要旨 | 確認結果 | 判定 | 根拠 |
|---|---|---|---|---|
| admission | 無料（toll road） | 通行料無料。`toll road` 表現は不正確 | 要修正 | 福島市公式「磐梯吾妻スカイライン」 https://www.city.fukushima.fukushima.jp/kankounavi/contents/enjoy/1_1/11340.html |
| access | 福島市側から車、公共交通なし、11月-4月閉鎖 | 主なアクセスは車。福島西IC→高湯温泉→浄土平は約40分という市公式案内あり。公共交通なしと断定するより、主なアクセスは車とする方が安全 | 要修正 | 福島市公式「星と自然の浄土平まつり2025」 https://www.city.fukushima.fukushima.jp/kanko-bunka-sports/kanko/1/14418.html |
| opening_hours | 4月下旬-11月上旬 | 最新の県発表では 2025-11-11 から冬期通行止め、解除予定は 2026年4月下旬以降。恒常データは「例年 late April to mid-November、天候で変動」に留めるのが妥当 | 要修正 | 福島県「磐梯吾妻スカイラインの冬期通行止めについて」 https://www.pref.fukushima.lg.jp/sec/41310a/bandaiazumaskyline.html ・ 福島県「磐梯吾妻スカイラインの再開通について」 https://www.pref.fukushima.lg.jp/sec/41035c/bandaiaduma-skyline-re-r6.html |
| tips | 開通日変動、紅葉ピーク10/5-15、浄土平散策推奨 | 「急きょ通行止めあり」「道路規制情報の確認」が公式に明記。紅葉ピーク日の断定より、通行規制確認を優先した方がよい | 要修正 | https://www.city.fukushima.fukushima.jp/kankounavi/contents/enjoy/1_1/11340.html |

## fukushima-fruits-line

| field | 現在値の要旨 | 確認結果 | 判定 | 根拠 |
|---|---|---|---|---|
| admission | 農園ごとに¥800-¥2,000程度 | 「フルーツライン」自体に入場料はない。果物狩り料金は農園・果物・曜日で大きく変動 | 要修正 | 福島市公式「フルーツを食す」 https://www.city.fukushima.fukushima.jp/soshiki/6/1026/2/364.html ・ 福島市観光ノート「まるげん果樹園」 https://www.f-kankou.jp/experience/15155 |
| access | 福島駅から飯坂温泉方面バス約30分、またはタクシー | フルーツラインは広域。主なアクセスは車で、福島飯坂IC・福島大笹生IC周辺に農園が点在。公共交通は農園ごとに異なり、福島駅から路線バスで行ける農園もある | 要修正 | 福島市観光ノート「くだもの王国ふくしま！観光果樹園ガイド」 https://www.f-kankou.jp/experience/32030 ・ 「まるげん果樹園」 https://www.f-kankou.jp/experience/15155 |
| opening_hours | 6-11月、農園ごとに概ね9:00-16:00 | 農園ごとに異なる。市観光ノートでは営業期間が例年6月上旬-12月中旬、果物狩り受付は8:30-16:00の農園例あり | 要修正 | https://www.f-kankou.jp/experience/15155 |
| tips | 桃シーズン人気、あかつき推奨、保冷バッグ推奨 | 6月のさくらんぼからりんごまで季節が続く点は妥当。実務的には、農園ごとに予約要否・受入状況が違うため事前確認を促す方が一次情報に沿う | 要修正 | 福島市公式「フルーツを食す」 https://www.city.fukushima.fukushima.jp/soshiki/6/1026/2/364.html ・ 福島市観光ノート https://www.f-kankou.jp/experience/32030 |

## SQL更新候補

| id | field | 修正後の値 |
|---|---|---|
| shiramizu-amidado | admission | `¥500 (adults), ¥300 (elementary school children); preschool children free` |
| shiramizu-amidado | access | `By car: approximately 15 minutes from Iwaki Yumoto IC. By public transport: from JR Iwaki Station, take a bus bound for Kawahira, get off at Amidado, then walk 5 minutes.` |
| shiramizu-amidado | opening_hours | `8:30–16:00 (Apr–Oct), 8:30–15:30 (Nov–Mar); closed on the 4th Wednesday and selected religious observance days` |
| shiramizu-amidado | tips | `Summer lotus blooms and autumn foliage are the key seasonal highlights. Opening days can change due to religious observances or weather, so checking ahead is recommended.` |
| aquamarine-fukushima | admission | `¥1,850 (adults), ¥900 (elementary to high school students); preschool children free` |
| aquamarine-fukushima | access | `By car: approximately 20 minutes from Iwaki Yumoto IC, or about 10 minutes from Iwaki Izumi IC via Onahama Road. By public transport: from JR Izumi Station, take a local bus to Aeon Mall Iwaki-Onahama (about 15 minutes), then walk about 5 minutes.` |
| aquamarine-fukushima | opening_hours | `9:00–17:30 (Mar 21–Nov 30), 9:00–17:00 (Dec 1–Mar 20); last entry 1 hour before closing; open year-round` |
| aquamarine-fukushima | tips | `Parking is shared with nearby commercial facilities and can become very crowded during Golden Week and summer, so public transport is recommended at peak times.` |
| abukuma-cave | admission | `¥1,200 (adults/high school and above), ¥800 (junior high students), ¥600 (elementary school children); adventure course +¥300` |
| abukuma-cave | access | `By car: approximately 15 minutes from Tamura Smart IC. By public transport: travel via Koriyama to JR Banetsu East Line Kamimata Station, then take a taxi for about 5 minutes.` |
| abukuma-cave | opening_hours | `8:30–17:00 (Apr 1–Jun 22), 8:30–17:30 (Jun 23–Sep 30), 8:30–17:00 (Oct 1–Nov 15), 8:30–16:30 (Nov 16–Mar 6), 8:30–17:00 (Mar 7–Mar 31); adventure course entry until 1.5 hours before closing` |
| abukuma-cave | tips | `Wear shoes with good grip. The cave route includes many stairs (about 300 steps), and strollers and wheelchairs are not permitted.` |
| bandai-azuma-skyline | admission | `Free` |
| bandai-azuma-skyline | access | `Best accessed by car. From Fukushima Nishi IC, the Jododaira area is about 40 minutes via Takayu Onsen and the Bandai-Azuma Skyline.` |
| bandai-azuma-skyline | opening_hours | `Seasonal mountain road; typically open from late April to mid-November, but exact dates vary and temporary closures can occur due to snow, ice, volcanic gas, or weather conditions` |
| bandai-azuma-skyline | tips | `Road closures can happen at short notice, so check official Fukushima Prefecture road information before visiting. If you stop at Jododaira, parking requires an environmental maintenance fee.` |
| fukushima-fruits-line | admission | `Free to visit the route itself; fruit-picking and tasting fees vary by orchard, fruit, and season` |
| fukushima-fruits-line | access | `In western Fukushima City, with orchards spread across the Fruit Line area. The easiest access is by car via Fukushima-Iizaka IC or Fukushima-Osaso IC; public transport availability varies by orchard, and some farms are reachable by local bus from Fukushima Station.` |
| fukushima-fruits-line | opening_hours | `Varies by orchard; many orchards and farm shops operate roughly from June to December, with fruit-picking reception commonly around 8:30–16:00` |
| fukushima-fruits-line | tips | `Fruit availability, opening days, and reservation rules vary by orchard, so check each farm in advance. The season typically runs from cherries in June through apples in late autumn.` |
