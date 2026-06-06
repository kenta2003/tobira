# 高知県スポット ファクトチェック報告

対象: `chikurin-ji-temple`, `makino-botanical-garden`, `noichi-zoo`, `anpanman-museum`, `sakamoto-ryoma-museum`  
検証項目: `admission`, `access`, `opening_hours`, `tips`  
確認日: 2026-03-29  
方針: 日本語の公式サイト、自治体・観光協会などの一次情報を優先し、`tips` は一次情報で裏づけできる内容と未検証の一般論を分けて判定。

---

## 1. chikurin-ji-temple（竹林寺）

| 項目 | 現状の値 | 判定 | 検証結果 |
|------|----------|------|----------|
| admission | Free for temple grounds; ¥800 (adults) for garden, treasure hall, and study hall access | ⚠️ 一部要修正 | 参拝自体は無料で問題ない。一方、観光協会の現行案内は「名勝庭園・宝物館共通 大人800円」「名勝庭園のみ500円」「宝物館のみ400円」。`study hall access` を含む料金表記は一次情報で確認できなかった。 |
| access | About 20 minutes by car from Kochi IC. By public transport: take the MY-YU Bus from Kochi Station and get off at Chikurinji Temple. | ✅ 概ね正確 | 高知県観光情報Webサイト「こうち旅ネット」は「高知ICから車で約20分」「高知駅前こうち旅広場からMY遊バス『竹林寺』停留所下車、徒歩約2分」と案内。 |
| opening_hours | 9:00–17:00 (varies seasonally) | ❌ 誤り | 現行案内は「ご参拝時間 8:00～17:00」「名勝庭園・宝物館拝観 8:30～17:00（最終入館16:30）」で、`9:00開始` でも `seasonally varies` でもない。 |
| tips | The temple is especially beautiful in autumn foliage season. Wear comfortable shoes for walking the grounds. The garden and treasure hall offer excellent views of the pagoda. | ⚠️ 一部未検証 | 公式観光情報で竹林寺は「紅葉の名所」と確認できる。一方、`歩きやすい靴推奨` と `庭園・宝物館から五重塔の眺望が良い` という断定は一次情報では確認できなかった。 |

**根拠URL**
- https://kochi-tabi.jp/search_spot.html?id=872
- https://kochi-tabi.jp/lp/88/detail.html?id=31
- https://www.city.kochi.kochi.jp/soshiki/90/cas-pref-2100100.html

**修正提案**
- `admission`: 参拝無料。名勝庭園・宝物館共通は大人800円、名勝庭園のみ500円、宝物館のみ400円
- `opening_hours`: ご参拝 8:00～17:00。名勝庭園・宝物館 8:30～17:00（最終入館16:30）
- `tips`: 紅葉の名所。国名勝の庭園、五重塔、重要文化財の仏像群が見どころ

---

## 2. makino-botanical-garden（高知県立牧野植物園）

| 項目 | 現状の値 | 判定 | 検証結果 |
|------|----------|------|----------|
| admission | ¥850 (adults); discount for seniors and students | ❌ 誤り | 公式は「一般850円」「高校生以下無料」「団体750円」。一般的な `seniors and students discount` ではなく、無料対象は障害者手帳所持者等と「高知市・高知県長寿手帳所持者」。 |
| access | About 20 minutes by car from central Kochi. By public transport: about 30 minutes from Kochi Station by MY-YU Bus. | ✅ 概ね正確 | 公式は「はりまや橋から車で約20分」「高知ICから約20分」「JR高知駅南口とさてらす発MY遊バスで約30分」。 |
| opening_hours | 9:00–17:00 (closed on Mondays unless Monday is a national holiday) | ❌ 誤り | 公式は `月曜定休` ではない。現行案内は「9:00～17:00（最終入園16:30）」で、休園日は `12/27～1/1` と月1回程度のメンテナンス休園日。 |
| tips | The garden features different seasonal highlights throughout the year. Spring offers cherry blossoms and fresh greenery; autumn brings vibrant foliage. Allow extra time to explore the greenhouse. | ⚠️ 一部未検証 | 公式の「見ごろの植物」「年間花見ごろカレンダー」から、季節ごとに見どころが変わる点は確認できる。温室も「一年を通して楽しめる」と案内されている。一方、`温室に extra time を確保` は一次情報の明示ではない。 |

**根拠URL**
- https://www.makino.or.jp/guide/
- https://www.makino.or.jp/faq/
- https://www.makino.or.jp/stroll/calendar.php
- https://www.makino.or.jp/spot/detail.php?id=2

**修正提案**
- `admission`: 一般850円、高校生以下無料。団体750円（20名以上）。高知市・高知県長寿手帳所持者などは無料
- `opening_hours`: 9:00～17:00（最終入園16:30）。休園日は12/27～1/1とメンテナンス休園日
- `tips`: 季節ごとに見ごろの植物が変わるため、来園前に公式の「見ごろの植物」「年間花見ごろカレンダー」を確認。温室は一年を通して観賞可能

---

## 3. noichi-zoo（高知県立のいち動物公園）

| 項目 | 現状の値 | 判定 | 検証結果 |
|------|----------|------|----------|
| admission | ¥470 (adults); free for high school students and younger | ✅ 確認済み | 公式は「大人470円」「18歳未満／高校生以下無料」。 |
| access | About 20 minutes by car from Nankoku IC. By public transport: about 20 minutes on foot from Noichi Station on the Gomen-Nahari Line. | ✅ 概ね正確 | 公式・観光協会とも「南国ICから車で約20分」「のいち駅から徒歩20分」。加えて、公式では土日祝のみ香南市営バス「のいち動物公園線」の案内あり。 |
| opening_hours | 9:00–17:00 (closed Mondays unless a national holiday) | ❌ 誤り | 公式は「9:30～17:00（入園16:00まで）」「月曜（祝日の場合は翌日）」「12/29～1/1休園」。開園時刻が `9:00` ではない。 |
| tips | The zoo features space-efficient habitat designs that let visitors observe animals in near-natural settings. Bring comfortable walking shoes and sun protection. Lunch facilities are available on-site. | ⚠️ 一部未検証 | 公式は「動物たちの生息地を再現した檻や柵のない環境」「飲食物の持ち込み可」「レストランあり」を案内しており、展示方針と昼食環境は確認できる。一方、`日よけ対策推奨` は一次情報で確認できない。 |

**根拠URL**
- https://noichizoo.or.jp/guide/
- https://noichizoo.or.jp/about/
- https://noichizoo.or.jp/faq/
- https://kochi-tabi.jp/search_spot.html?id=65

**修正提案**
- `access`: 南国ICから車で約20分。土佐くろしお鉄道ごめん・なはり線のいち駅から徒歩20分。土日祝は香南市営バス「のいち動物公園線」利用可
- `opening_hours`: 9:30～17:00（入園16:00まで）。休園日は月曜（祝日の場合は翌日）と12/29～1/1
- `tips`: 生息地を再現した檻や柵の少ない展示が特徴。飲食物の持ち込み可で、園内レストランも利用可能

---

## 4. anpanman-museum（香美市立やなせたかし記念館 アンパンマンミュージアム）

| 項目 | 現状の値 | 判定 | 検証結果 |
|------|----------|------|----------|
| admission | ¥1,200 (adults) for the combined memorial hall ticket | ✅ 概ね正確 | 公式は「やなせたかし記念館共通券」大人1,200円。アンパンマンミュージアムと詩とメルヘン絵本館の両館に入館できる。 |
| access | About 35 minutes by car from Nankoku IC. By public transport: JR Dosan Line to Tosa-Yamada Station, then transfer to the JR Bus Odochi Line for about 25 minutes to Anpanman Museum Mae stop. | ⚠️ 一部要修正 | 車で約35分は香美市公式と一致。公共交通は公式サイトで「JR土佐山田駅からJRバス大栃線で約25分、『美良布（アンパンマンミュージアム）』下車、徒歩5分」と案内。`Anpanman Museum Mae stop` 表記は現行公式と不一致。 |
| opening_hours | 9:30–17:00 (closed Tuesdays) | ⚠️ 一部要修正 | 基本営業時間は正しいが、公式は「最終入館16:30」「火曜休館（祝日の場合は翌日）」に加え、3/25～4/6、4/29～5/5、7/20～8/31、12/24～1/7は無休、一部休館日あり。 |
| tips | Anpanman fans of all ages will find dedicated exhibits. The museum includes interactive displays and a café. Merchandise and character goods are available in the gift shop. | ❌ 一部誤り | 公式で、順路のない展示、仕掛けの多い「アンパンマンワールド」、ミュージアムショップは確認できる。一方、`café` は公式案内で確認できなかった。 |

**根拠URL**
- https://anpanman-museum.net/access/
- https://anpanman-museum.net/about/
- https://anpanman-museum.net/faq/
- https://anpanman-museum.net/guide/adetail10.html
- https://anpanman-museum.net/shop/
- https://www.city.kami.lg.jp/map/anpanman.html

**修正提案**
- `access`: 南国ICから車で約35分。JR土佐山田駅からJRバス大栃線で約25分、「美良布（アンパンマンミュージアム）」下車、徒歩5分
- `opening_hours`: 9:30～17:00（最終入館16:30）。火曜休館（祝日の場合は翌日）。ただし繁忙期は無休期間あり
- `tips`: 順路のない館内を自由に歩いて楽しめる。仕掛けの多い「アンパンマンワールド」やミュージアムショップの限定グッズが見どころ

---

## 5. sakamoto-ryoma-museum（高知県立坂本龍馬記念館）

| 項目 | 現状の値 | 判定 | 検証結果 |
|------|----------|------|----------|
| admission | ¥500 (adults, regular periods); ¥900 (adults, during planned exhibitions) | ✅ 概ね正確 | 公式は「その他の期間 500円」「企画展開催時 900円」。高校生以下無料。 |
| access | About 2 minutes on foot from Ryoma Kinenkan Mae bus stop on Tosaden Kotsu Bus or MY-YU Bus. About 30 minutes by car from Kochi IC. | ⚠️ 一部要修正 | バス停から徒歩約2分は公式と一致。MY遊バス利用も館側で案内あり。一方、車は公式で「高知ICから約25分（五台山道路経由）」またはルートにより約40分。`30分` 固定は不正確。 |
| opening_hours | 9:00–17:00 (closed Mondays) | ❌ 誤り | 公式は「9:00～17:00（入館は16:30まで）」で、休館日は「なし」。展示替えで一部休室する場合はあるが、`closed Mondays` ではない。 |
| tips | The museum provides comprehensive coverage of Ryoma''s life from childhood through his role in Japan''s modernization. Combine with a visit to nearby Katsurahama Beach for a fuller experience of the area. | ⚠️ 一部要修正 | 公式は「龍馬の生涯や人となりを紹介」「本館では映像や体験型展示で龍馬や幕末を楽しく知ることができる」と案内。桂浜との周遊自体は立地上自然だが、公式アクセスでは桂浜から遊歩道で `約10分以上・石段や急坂あり` と注意喚起がある。 |

**根拠URL**
- https://ryoma-kinenkan.jp/visit/
- https://ryoma-kinenkan.jp/visit/access.html
- https://ryoma-kinenkan.jp/faq/
- https://www.ryoma-kinenkan.jp/collection/exhibition.html

**修正提案**
- `access`: とさでん交通バスまたはMY遊バス「龍馬記念館前」下車、徒歩約2分。車は高知ICから約25分（五台山道路経由）
- `opening_hours`: 9:00～17:00（入館は16:30まで）。休館日なし。ただし展示替えによる休室の場合あり
- `tips`: 常設展示室では手紙などを通して龍馬の生涯と人柄を紹介。本館は映像・体験型展示あり。桂浜ともあわせて回れるが、遊歩道は石段と坂道を約10分以上歩く

---

## 総括

- 明確な誤りは `chikurin-ji-temple.opening_hours`, `makino-botanical-garden.admission`, `makino-botanical-garden.opening_hours`, `noichi-zoo.opening_hours`, `anpanman-museum.tips`, `sakamoto-ryoma-museum.opening_hours`
- `access` は5件中4件で概ね大筋は合っていたが、停留所名や車の所要時間、追加交通手段の欠落があった
- `tips` は全件で一般論が混ざっており、一次情報で確認できる見どころ・注意点に寄せたほうが安全

## SQL更新候補

| id | field | 修正後の値 |
|----|-------|------------|
| chikurin-ji-temple | admission | 参拝無料。名勝庭園・宝物館共通は大人800円、名勝庭園のみ500円、宝物館のみ400円 |
| chikurin-ji-temple | opening_hours | ご参拝 8:00～17:00。名勝庭園・宝物館 8:30～17:00（最終入館16:30） |
| chikurin-ji-temple | tips | 紅葉の名所。国名勝の庭園、五重塔、重要文化財の仏像群が見どころ |
| makino-botanical-garden | admission | 一般850円、高校生以下無料。団体750円（20名以上）。高知市・高知県長寿手帳所持者などは無料 |
| makino-botanical-garden | opening_hours | 9:00～17:00（最終入園16:30）。休園日は12/27～1/1とメンテナンス休園日 |
| makino-botanical-garden | tips | 季節ごとに見ごろの植物が変わるため、来園前に公式の「見ごろの植物」「年間花見ごろカレンダー」を確認。温室は一年を通して観賞可能 |
| noichi-zoo | access | 南国ICから車で約20分。土佐くろしお鉄道ごめん・なはり線のいち駅から徒歩20分。土日祝は香南市営バス「のいち動物公園線」利用可 |
| noichi-zoo | opening_hours | 9:30～17:00（入園16:00まで）。休園日は月曜（祝日の場合は翌日）と12/29～1/1 |
| noichi-zoo | tips | 生息地を再現した檻や柵の少ない展示が特徴。飲食物の持ち込み可で、園内レストランも利用可能 |
| anpanman-museum | access | 南国ICから車で約35分。JR土佐山田駅からJRバス大栃線で約25分、「美良布（アンパンマンミュージアム）」下車、徒歩5分 |
| anpanman-museum | opening_hours | 9:30～17:00（最終入館16:30）。火曜休館（祝日の場合は翌日）。ただし繁忙期は無休期間あり |
| anpanman-museum | tips | 順路のない館内を自由に歩いて楽しめる。仕掛けの多い「アンパンマンワールド」やミュージアムショップの限定グッズが見どころ |
| sakamoto-ryoma-museum | access | とさでん交通バスまたはMY遊バス「龍馬記念館前」下車、徒歩約2分。車は高知ICから約25分（五台山道路経由） |
| sakamoto-ryoma-museum | opening_hours | 9:00～17:00（入館は16:30まで）。休館日なし。ただし展示替えによる休室の場合あり |
| sakamoto-ryoma-museum | tips | 常設展示室では手紙などを通して龍馬の生涯と人柄を紹介。本館は映像・体験型展示あり。桂浜ともあわせて回れるが、遊歩道は石段と坂道を約10分以上歩く |
