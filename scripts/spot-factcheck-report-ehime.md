# 愛媛県スポット ファクトチェック報告

対象: `tobe-zoo`, `minetopia-besshi`, `yawatahama-minatto`, `uwajima-kisaiya-hiroba`, `nibukawa-seseragi-koryukan`  
検証項目: `admission`, `access`, `opening_hours`, `tips`  
確認日: 2026-03-29  
方針: 公式サイト、自治体・観光協会などの日本語一次情報を優先し、不足分のみ周辺一次情報で補完。

---

## 1. tobe-zoo（とべ動物園）

| 項目 | 現状の値 | 判定 | 検証結果 |
|------|----------|------|----------|
| admission | ¥600 (adults), ¥300 (children), preschool children free | ❌ 誤り | 公式は「大人600円」「高齢者300円」「高校生200円」「小中学生100円」「幼児無料」。`children ¥300` は誤り。 |
| access | About 10 minutes by car from Matsuyama IC. By public transport: about 36 minutes by Iyotetsu bus from Matsuyama City Station to Tobe Dobutsuen-mae, then a short walk. | ✅ 概ね正確 | 公式は「松山ICから約10分」「松山市駅3番のりばから伊予鉄バスでとべ動物園前」。松山市観光情報では「36分、下車後徒歩5分」。 |
| opening_hours | 9:00–17:00 (closed Mondays); extended hours during holidays | ❌ 誤り | 公式は「9:00～17:00（入園16:30まで）」「毎週月曜、祝日の場合は翌平日」「12/29～1/1休園」。通常の「祝日期間の延長営業」は確認できない。 |
| tips | Wear comfortable shoes for walking the expansive grounds. Animal feeding times vary by species; check the official schedule. Peak season can be crowded, especially weekends. | ⚠️ 一部未検証 | 公式で確認できる実用情報は「15:30頃から動物にエサを与えるため見られない動物がある」「今日の予定ページあり」。`週末混雑` や `歩きやすい靴推奨` は一般論としては自然だが、一次情報では断定しにくい。 |

**根拠URL**
- https://www.tobezoo.com/info/admission.html
- https://www.tobezoo.com/info/access.html
- https://www.tobezoo.com/info/guidance.html
- https://matsuyama-sightseeing.com/spot/127-2/

**修正提案**
- `admission`: 大人600円、高齢者300円、高校生200円、小中学生100円、幼児無料
- `opening_hours`: 9:00～17:00（入園は16:30まで）。休園日は月曜（祝日の場合は翌平日）と12/29～1/1
- `tips`: 15:30頃から給餌のため見られない動物がある。来園前に公式「今日の予定」を確認

---

## 2. minetopia-besshi（マイントピア別子）

| 項目 | 現状の値 | 判定 | 検証結果 |
|------|----------|------|----------|
| admission | Free entry to roadside station; mine sightseeing from ¥1,300 (varies by tour type) | ❌ 誤り | 端出場エリア自体は無料で妥当。ただし鉱山観光は現行料金表で「一般 大人1,500円・中高生1,100円・3歳以上～小学生900円」。`from ¥1,300` は旧料金。 |
| access | About 15 minutes by car from Niihama IC. By public transport: take the Setouchi Bus Yamane/Minetopia Line toward Minetopia Besshi. | ⚠️ 要修正 | 公式は「新居浜ICから約12分」「JR新居浜駅から瀬戸内運輸せとうちバスで“マイントピア別子”終点へ」。`15分` はやや長めで、路線名 `Yamane/Minetopia Line` は公式表記では確認できない。 |
| opening_hours | 8:30–17:00 (closed Wednesdays; open during holiday periods) | ❌ 誤り | 公式では施設ごとに異なる。鉱山観光は `9:00～17:00`、列車は概ね `9:00～16:45` の範囲で運行。水曜定休の一律ルールは確認できない。 |
| tips | The mine tour involves descent into cool underground passages; bring a light jacket. Tours have weight and health restrictions; check in advance. Early arrival recommended during peak season. | ⚠️ 一部未検証 | 公式で確認できるのは「観光坑道内は天然のクーラーで夏場はひんやり快適」「土日祝や長期休暇は東平観光バスツアー利用推奨」。`体重・健康制限` は確認できない。 |

**根拠URL**
- https://besshi.com/price/
- https://besshi.com/yougaku-kozankanko/
- https://besshi.com/enjoy/
- https://besshi.com/access/
- https://besshi.com/sangyoisan-bus/

**修正提案**
- `admission`: 道の駅エリア入場無料。鉱山観光は大人1,500円、中高生1,100円、3歳以上～小学生900円
- `access`: 新居浜ICから約12分。公共交通はJR新居浜駅から瀬戸内運輸せとうちバスで「マイントピア別子」終点下車
- `opening_hours`: 鉱山観光 9:00～17:00。施設ごとに営業時間・休業日が異なるため公式営業カレンダー確認
- `tips`: 観光坑道内は涼しい。混雑期は東平観光バスツアー利用を検討

---

## 3. yawatahama-minatto（八幡浜みなっと）

| 項目 | 現状の値 | 判定 | 検証結果 |
|------|----------|------|----------|
| admission | Free entry; food prices vary by vendor | ✅ 確認済み | 入場無料の複合施設で妥当。飲食・物販は各店舗ごと。 |
| access | About 5 minutes by car from JR Yawatahama Station. About 25 minutes from Ozu IC. About 3 minutes on foot from Yawatahama Ferry Terminal. | ✅ 確認済み | 公式アクセスと一致。 |
| opening_hours | 9:00–18:00 (varies by vendor and season) | ❌ 不正確 | 施設全体を `9:00～18:00` とすると粗すぎる。公式FAQでは、みなと交流館 `9:00～21:30`、アゴラマルシェ `8:30～18:00`、どーや市場 `8:00～16:00`、どーや食堂 `7:00～14:00`。 |
| tips | Arrive early for the freshest seafood selection. Many vendors use cash only. The market is liveliest in early morning. Parking can fill during peak season, especially weekends. | ⚠️ 一部未検証 | 公式では、どーや市場は「その日の朝水揚げされた魚介類」を扱い、卸売市場見学は「朝早めがおすすめ」。一方で `cash only` は確認できず、施設側にはクレジット・PayPay利用案内あり。週末駐車混雑も一次情報で断定できない。 |

**根拠URL**
- https://www.minatto.net/traffic
- https://www.minatto.net/archives/faq
- https://www.minatto.net/to_company
- https://www.minatto.net/archives/5768
- https://www.minatto.net/archives/5600

**修正提案**
- `opening_hours`: 施設により異なる。例: みなと交流館 9:00～21:30、アゴラマルシェ 8:30～18:00、どーや市場 8:00～16:00、どーや食堂 7:00～14:00
- `tips`: 魚介は当日水揚げ品が中心。どーや市場は不定休で、卸売市場見学は朝早めが向く。支払い方法は店舗ごとに確認

---

## 4. uwajima-kisaiya-hiroba（きさいや広場）

| 項目 | 現状の値 | 判定 | 検証結果 |
|------|----------|------|----------|
| admission | Free entry; meal and product prices vary | ✅ 確認済み | 道の駅・物販飲食複合施設として妥当。 |
| access | Right off the Uwajima-Asahi IC area by car. About 12 minutes on foot from JR Uwajima Station. | ❌ 誤り | 公式は「宇和島朝日ICをおりてすぐ」「JR宇和島駅から約1km、徒歩約15分」「JR宇和島駅との連絡バスあり」。`12分` ではなく `約15分`。 |
| opening_hours | 9:00–18:00 (varies by vendor) | ⚠️ 不十分 | 地域特産品販売所・郷土文化展示棟は `9:00～18:00` で正しいが、レストランは `10:30～16:30（16:00LO）`。さらに休館日は `1月1日`。 |
| tips | Taimeshi bowls sell out quickly during lunch hours; arrive early or reserve ahead. The signature jakoten is a must-try local product. Parking available; note that peak season weekends attract crowds. | ❌ 一部誤り | 公式フードコート案内では「券売機で購入」「お食事及び席の確保のご予約は承っておりません」。`reserve ahead` は誤り。支払いはクレジットカード・PayPay利用可、駐車場は228台。 |

**根拠URL**
- https://www.kisaiyahiroba.com/
- https://www.kisaiyahiroba.com/access/
- https://www.kisaiyahiroba.com/kisaiyahiroba/
- https://www.kisaiyahiroba.com/eat/

**修正提案**
- `access`: 宇和島朝日ICを降りてすぐ。JR宇和島駅から約1km、徒歩約15分。連絡バスあり
- `opening_hours`: 地域特産品販売所・郷土文化展示棟 9:00～18:00、レストラン 10:30～16:30（16:00LO）、休館日は1月1日
- `tips`: フードコートは券売機制で予約不可。クレジットカード・PayPay利用可。駐車場228台

---

## 5. nibukawa-seseragi-koryukan（鈍川せせらぎ交流館）

| 項目 | 現状の値 | 判定 | 検証結果 |
|------|----------|------|----------|
| admission | ¥560 (adults), ¥280 (children) | ✅ 確認済み | 公式は「大人560円、小人280円」。 |
| access | About 30 minutes by bus from JR Imabari Station; take the bus via Nibukawa Onsen to Seseragi Koryukan. About 20 minutes by car from Imabari IC. | ⚠️ 概ね正確 | 公式施設サイトは「今治ICから約17分」「JR今治駅から約20分（一般道）」を案内。周辺観光情報では「今治駅前から市内バス約30分、せせらぎ交流館前下車」。公共交通の行先表現は `神子森行き` `せせらぎ交流館前下車` の方が一次情報に近い。 |
| opening_hours | 10:00–20:00 (closed second and fourth Thursdays) | ❌ 誤り | 公式は「入浴 10:30～21:00（20:30札止め）」「第2・第4月曜日休館、祝日の場合は翌日以降の最も近い平日」「12/31、1/1休館」。 |
| tips | The alkaline waters are gentle on skin; stay hydrated. The facility is popular with locals; weekday mornings are quieter. Winter visits offer the best valley scenery and comfort. | ⚠️ 一部未検証 | 公式で確認できるのは「pH9.9 のアルカリ性単純泉」「美人の湯」「軽食コーナーは11:00～14:30」。`地元客に人気` `平日朝が静か` `冬が最適` は一次情報で確認不可。 |

**根拠URL**
- https://seseragi-onsen.com/spa/
- https://seseragi-onsen.com/location/
- https://seseragi-onsen.com/about/
- https://www.matsuyama-airport.co.jp/sightseeing/imabari/seseragikouryukan.html

**修正提案**
- `access`: 今治ICから約17分。公共交通は今治駅前からバスで約30分、「せせらぎ交流館前」下車
- `opening_hours`: 入浴 10:30～21:00（20:30札止め）。休館日は第2・第4月曜、12/31、1/1
- `tips`: pH9.9のアルカリ性単純泉。軽食コーナー営業は11:00～14:30

---

## 総括

- 明確な誤りがあったのは `tobe-zoo.admission`, `tobe-zoo.opening_hours`, `minetopia-besshi.admission`, `minetopia-besshi.opening_hours`, `yawatahama-minatto.opening_hours`, `uwajima-kisaiya-hiroba.access`, `uwajima-kisaiya-hiroba.tips`, `nibukawa-seseragi-koryukan.opening_hours`
- `tips` は5件とも、元データに一般論や推測が混じっており、一次情報で裏づけられる内容へ寄せたほうが安全
- `opening_hours` は複合施設で一括記述すると誤差が出やすく、主要施設ごとに分けるべき

## SQL更新候補

| id | field | 修正後の値 |
|----|-------|------------|
| tobe-zoo | admission | 大人600円、高齢者300円、高校生200円、小中学生100円、幼児無料 |
| tobe-zoo | opening_hours | 9:00～17:00（入園は16:30まで）。休園日は月曜（祝日の場合は翌平日）と12/29～1/1 |
| tobe-zoo | tips | 15:30頃から給餌のため見られない動物がある。来園前に公式「今日の予定」を確認 |
| minetopia-besshi | admission | 道の駅エリア入場無料。鉱山観光は大人1,500円、中高生1,100円、3歳以上～小学生900円 |
| minetopia-besshi | access | 新居浜ICから約12分。公共交通はJR新居浜駅から瀬戸内運輸せとうちバスで「マイントピア別子」終点下車 |
| minetopia-besshi | opening_hours | 鉱山観光 9:00～17:00。施設ごとに営業時間・休業日が異なるため公式営業カレンダー確認 |
| minetopia-besshi | tips | 観光坑道内は涼しい。混雑期は東平観光バスツアー利用を検討 |
| yawatahama-minatto | opening_hours | 施設により異なる。例: みなと交流館 9:00～21:30、アゴラマルシェ 8:30～18:00、どーや市場 8:00～16:00、どーや食堂 7:00～14:00 |
| yawatahama-minatto | tips | 魚介は当日水揚げ品が中心。どーや市場は不定休で、卸売市場見学は朝早めが向く。支払い方法は店舗ごとに確認 |
| uwajima-kisaiya-hiroba | access | 宇和島朝日ICを降りてすぐ。JR宇和島駅から約1km、徒歩約15分。連絡バスあり |
| uwajima-kisaiya-hiroba | opening_hours | 地域特産品販売所・郷土文化展示棟 9:00～18:00、レストラン 10:30～16:30（16:00LO）、休館日は1月1日 |
| uwajima-kisaiya-hiroba | tips | フードコートは券売機制で予約不可。クレジットカード・PayPay利用可。駐車場228台 |
| nibukawa-seseragi-koryukan | access | 今治ICから約17分。公共交通は今治駅前からバスで約30分、「せせらぎ交流館前」下車 |
| nibukawa-seseragi-koryukan | opening_hours | 入浴 10:30～21:00（20:30札止め）。休館日は第2・第4月曜、12/31、1/1 |
| nibukawa-seseragi-koryukan | tips | pH9.9のアルカリ性単純泉。軽食コーナー営業は11:00～14:30 |
