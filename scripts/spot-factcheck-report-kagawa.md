# 香川県スポット ファクトチェック報告

対象: `shikoku-aquarium`, `new-reoma-world`, `sanuki-manno-park`, `shikoku-mura-museum`, `zenigata-sand-coin`  
検証項目: `admission`, `access`, `opening_hours`, `tips`  
確認日: 2026-03-29  
方針: 日本語の公式サイト、自治体、観光協会などの一次情報を優先し、`tips` は一次情報で裏づけできる内容に限定して判定。

---

## 1. shikoku-aquarium（四国水族館）

| 項目 | 現状の値 | 判定 | 検証結果 |
|------|----------|------|----------|
| admission | ¥2,600 (adults) | ✅ 確認済み | 公式料金案内は「大人（高校生・16歳以上）2,600円」。 |
| access | About 12 minutes on foot from JR Utazu Station. About 10 minutes by car from Sakaide IC. About 40 minutes by car from Takamatsu Airport. | ⚠️ 一部要修正 | 公式Q&Aは「JR宇多津駅から徒歩約12分」、公式アクセスは「坂出ICより車で10分」で一致。一方、高松空港からの所要時間は今回確認できた一次情報では明示が見当たらなかったため、`About 40 minutes by car from Takamatsu Airport` は未確認。公式には坂出北IC約5分も記載あり。 |
| opening_hours | 9:00–17:00 (last entry 16:00) | ❌ 誤り | 2026-03-29時点の公式スケジュールは通常「9:00 - 18:00（年中無休） 最終入館17:30」。延長営業や貸切日の短縮営業もあるが、通常値として `17:00 / last entry 16:00` は誤り。 |
| tips | The sunset deck over the dolphin pool offers the best views in late afternoon. Plan to arrive early during peak season weekends and holidays. | ⚠️ 一部要修正 | 公式展示案内は「夕暮れの景」で、瀬戸内海に沈む夕日とイルカを楽しめる点を明記しており、夕方の景観推しは裏づけあり。一方、`arrive early` という一般論は公式の直接表現ではない。公式アクセスは「土日祝日は大変混雑が想定されますので、電車等の公共交通機関のご利用をお勧め」と案内。 |

**根拠URL**
- https://shikoku-aquarium.jp/ticket/
- https://shikoku-aquarium.jp/access/
- https://shikoku-aquarium.jp/schedule/
- https://shikoku-aquarium.jp/qa/
- https://shikoku-aquarium.jp/information/dolphinlive.html
- https://shikoku-aquarium.jp/kannai/exhibition/dolphin/000042/

**修正提案**
- `access`: JR宇多津駅から徒歩約12分。坂出ICから車で10分、坂出北ICから約5分
- `opening_hours`: 9:00～18:00（通常時、最終入館17:30）。延長営業日・短縮営業日あり
- `tips`: 「夕暮れの景」では瀬戸内海に沈む夕日とイルカを楽しめる。土日祝は混雑が想定されるため公共交通機関の利用推奨

---

## 2. new-reoma-world（NEWレオマワールド）

| 項目 | 現状の値 | 判定 | 検証結果 |
|------|----------|------|----------|
| admission | From ¥2,000 (adults) for park admission | ✅ 確認済み | 公式料金案内は「入園券 2,000円（大人・中学生以上）」で一致。 |
| access | About 25 minutes by car from Sakaide IC or Zentsuji IC. About 15 minutes from Fuchu Lake Smart IC. Free shuttle and local bus from JR Sakaide, JR Utazu, JR Kotohira stations, and Kotoden Okada Station. | ✅ 概ね正確 | 公式アクセスは「坂出・善通寺各ICから一般道で約25分」「府中湖スマートICから一般道で約15分」。無料シャトルはJR坂出・宇多津・琴平、ことでん岡田から運行。加えて公式は最寄り駅を「ことでん岡田駅」とし、JR坂出駅からタクシー約30分、岡田駅からタクシー約5分とも案内。 |
| opening_hours | 9:00–18:00 (hours vary seasonally and by attraction) | ❌ 誤り | 公式は固定 `9:00–18:00` ではなく、日付ごとに営業カレンダーで案内。2026-03-29時点の公式トップはパーク・オリエンタルトリップとも「10:00—20:00」。別日 2026-03-28 の公式スケジュールも「10:00—20:00」。 |
| tips | Peak season weekends and Golden Week periods draw large crowds. Check the official website for seasonal event schedules and special illumination dates. | ⚠️ 一部要修正 | `混雑する` 自体は自然だが、今回の一次情報では直接確認できない。一方、公式は営業カレンダー・イベント情報・イルミネーション営業案内を個別掲出しており、日程確認推奨は妥当。 |

**根拠URL**
- https://www.newreomaworld.com/guide_of_charge/
- https://www.newreomaworld.com/access/
- https://www.newreomaworld.com/information/67246-2/
- https://www.newreomaworld.com/
- https://www.newreomaworld.com/show-schedules/?date=260328
- https://www.newreomaworld.com/winter_illumination_2025/info/

**修正提案**
- `opening_hours`: 営業時間は日付・季節で変動するため公式営業カレンダー確認。2026-03-29時点はパーク・オリエンタルトリップとも10:00～20:00
- `tips`: 営業時間、イベント、イルミネーション開催日は公式営業カレンダー・イベント情報で事前確認。無料シャトル利用時は直前に時刻表確認

---

## 3. sanuki-manno-park（国営讃岐まんのう公園）

| 項目 | 現状の値 | 判定 | 検証結果 |
|------|----------|------|----------|
| admission | ¥450 (ages 15 and over) | ✅ 確認済み | 公式利用料金は「おとな（15歳以上）450円」。 |
| access | About 35 minutes by car from Sakaide IC. About 25 minutes from Zentsuji IC. About 15 minutes by taxi from JR Kotohira Station, Kotoden Kotohira Station, or Kotoden Okada Station. Bus to Manno-Koen-Guchi plus a walk. | ✅ 確認済み | 公式アクセスと一致。坂出IC約35分、善通寺IC約25分、JR/琴電琴平駅・ことでん岡田駅からタクシー約15分、琴参バス美合線「まんのう公園口」下車後徒歩約30分。さらに管理センターへ事前連絡で送迎案内あり。 |
| opening_hours | 9:30–17:00 (closes earlier in winter; illumination runs until 20:00 during special periods) | ⚠️ 一部要修正 | 公式開園時間は季節別で、3/1～7/19と9/1～10/31は9:30～17:00、7/20～8/31は9:30～18:00、11/1～2月末は9:30～16:30。休園日は毎週火曜、12/29～1/1、1月第4水～金。ただし3/20～5/31、7/20～8/31、9/11～10/31は無休。`illumination runs until 20:00` は通常案内ページの現行常設情報ではなく、イベント時の特別延長として扱うほうが正確。 |
| tips | Spring brings vibrant cherry blossoms and tulips across the expansive grounds. Autumn features brilliant red kochia (burning bush). Bicycle rentals are available for exploring the park's extensive paths. | ✅ 概ね正確 | 公式花ごよみでサクラ、チューリップ、コキアを確認。公式施設案内でレンタサイクルあり。春秋の行楽シーズンの日祝はレンタサイクルが11時前後に全貸出中となることがある。 |

**根拠URL**
- https://sanukimannopark.jp/guide/fee
- https://sanukimannopark.jp/guide
- https://sanukimannopark.jp/access
- https://sanukimannopark.jp/flower/spring/cherry-blossom
- https://sanukimannopark.jp/flower/spring/turip
- https://sanukimannopark.jp/flower/summer/kochia
- https://sanukimannopark.jp/facility/bicycle

**修正提案**
- `opening_hours`: 開園時間は季節で変動。3/1～7/19・9/1～10/31は9:30～17:00、7/20～8/31は9:30～18:00、11/1～2月末は9:30～16:30。休園日は火曜、12/29～1/1、1月第4水～金。ただし一部期間は無休
- `tips`: 春はサクラとチューリップ、秋はコキアが見どころ。レンタサイクルあり。春秋の日祝は自転車が早めに出払う場合あり

---

## 4. shikoku-mura-museum（四国村ミウゼアム）

| 項目 | 現状の値 | 判定 | 検証結果 |
|------|----------|------|----------|
| admission | ¥1,600 (adults) | ✅ 確認済み | 公式入村案内は大人1,600円。 |
| access | About 5 minutes on foot from Kotoden Yashima Station. About 10 minutes on foot from JR Yashima Station. About 15 minutes by car from Takamatsu-chuo IC. | ✅ 確認済み | 公式アクセスと一致。ことでん志度線「琴電屋島」駅徒歩5分、JR高徳線「屋島」駅徒歩10分、高松自動車道「高松中央IC」約15分。 |
| opening_hours | 9:00–17:00 (closed Mondays) | ❌ 誤り | 公式入村案内は「9時30分～17時00分（入村受付と四国村ギャラリーは16時30分まで）」。定休日は「火曜日（祝休日の場合は翌日）」で、`9:00開始` と `closed Mondays` は誤り。 |
| tips | The museum offers a comprehensive collection of folk architecture spanning Shikoku's regions. The Tadao Ando-designed contemporary gallery contrasts beautifully with the traditional buildings. Wear comfortable shoes for walking the extensive grounds. | ⚠️ 一部要修正 | 公式・高松市観光情報から、四国各地から移築復原した民家・建造物、安藤忠雄設計の四国村ギャラリーは確認できる。一方、`Wear comfortable shoes` は一次情報で未確認。 |

**根拠URL**
- https://www.shikokumura.or.jp/information/
- https://www.shikokumura.or.jp/access/
- https://www.shikokumura.or.jp/
- https://www.art-takamatsu.com/jp/spot/entry-674.html

**修正提案**
- `opening_hours`: 9:30～17:00（入村受付と四国村ギャラリーは16:30まで）。定休日は火曜（祝休日の場合は翌日）
- `tips`: 四国各地から移築復原した民家・建造物が見どころ。安藤忠雄設計の四国村ギャラリーも併設

---

## 5. zenigata-sand-coin（銭形砂絵「寛永通宝」）

| 項目 | 現状の値 | 判定 | 検証結果 |
|------|----------|------|----------|
| admission | Free | ✅ 確認済み | 観音寺市公式は「24時間いつでも無料で見学できます」。 |
| access | About 12 minutes by car from Onohara IC. About 15 minutes from Sanuki Toyonaka IC. About 5 minutes by taxi from JR Kanonji Station. Local shared bus to Kotohiki Park. | ⚠️ 一部要修正 | 観音寺市公式は「大野原ICから車で12分」「さぬき豊中ICから車で15分」「JR観音寺駅からタクシーで5分」。一方、のりあいバスは「琴弾公園（森内科）」と案内されており、`Kotohiki Park` 表記より具体的な降車案内へ直したほうが正確。香川県観光協会はJR観音寺駅から徒歩20分とも案内。 |
| opening_hours | Open year-round (best viewed at sunset or during evening illumination) | ⚠️ 一部要修正 | 年中見学可は正しい。観音寺市公式は「毎日、日没から午後10時まで点灯」「24時間いつでも無料で見学できます」。ただし `best viewed at sunset` は一次情報の推奨表現ではなく、公式は「銭形展望台から見るのもおすすめ」「地上から見るとさらにその大きさが体感できる」と案内。 |
| tips | The sand coin is best appreciated from the elevated viewing platform. Night illumination runs year-round and creates a striking photo opportunity. The adjacent Kotohiki Park offers walking paths and seasonal flower displays. | ⚠️ 一部要修正 | 観音寺市公式は「琴弾山山頂にある銭形展望台から見るのもおすすめ」、ライトアップは「毎日日没から午後10時まで点灯」で確認可。一方、`seasonal flower displays` は今回の一次情報では確認できなかった。年末年始やGWは混雑が予想され、展望台駐車場を使わず徒歩で上がる案内あり。 |

**根拠URL**
- https://www.city.kanonji.kagawa.jp/soshiki/21/333.html
- https://www.my-kagawa.jp/point/59/

**修正提案**
- `access`: 大野原ICから車で12分、さぬき豊中ICから車で15分、JR観音寺駅からタクシーで5分。のりあいバスは「琴弾公園（森内科）」利用
- `opening_hours`: 24時間見学可。ライトアップは毎日日没～22:00
- `tips`: 琴弾山山頂の銭形展望台からの鑑賞がおすすめ。ライトアップは毎日日没～22:00。年末年始やGWは混雑時に展望台駐車場を避け、周辺駐車場から徒歩利用推奨

---

## 総括

- 明確な誤りは `shikoku-aquarium.opening_hours`, `new-reoma-world.opening_hours`, `shikoku-mura-museum.opening_hours`
- `sanuki-manno-park.opening_hours` は夏季18:00営業と休園日・無休期間の欠落があり、不十分
- `tips` は5件中4件で一般論や未確認表現が混じっており、公式が直接案内している見どころ・注意事項に寄せるのが安全
- `zenigata-sand-coin` は入場無料・ライトアップ自体は正しいが、公共交通と推奨鑑賞タイミングの表現に補正余地がある

## SQL更新候補

| id | field | 修正後の値 |
|----|-------|------------|
| shikoku-aquarium | access | JR宇多津駅から徒歩約12分。坂出ICから車で10分、坂出北ICから約5分 |
| shikoku-aquarium | opening_hours | 9:00～18:00（通常時、最終入館17:30）。延長営業日・短縮営業日あり |
| shikoku-aquarium | tips | 「夕暮れの景」では瀬戸内海に沈む夕日とイルカを楽しめる。土日祝は混雑が想定されるため公共交通機関の利用推奨 |
| new-reoma-world | opening_hours | 営業時間は日付・季節で変動するため公式営業カレンダー確認。2026-03-29時点はパーク・オリエンタルトリップとも10:00～20:00 |
| new-reoma-world | tips | 営業時間、イベント、イルミネーション開催日は公式営業カレンダー・イベント情報で事前確認。無料シャトル利用時は直前に時刻表確認 |
| sanuki-manno-park | opening_hours | 開園時間は季節で変動。3/1～7/19・9/1～10/31は9:30～17:00、7/20～8/31は9:30～18:00、11/1～2月末は9:30～16:30。休園日は火曜、12/29～1/1、1月第4水～金。ただし一部期間は無休 |
| sanuki-manno-park | tips | 春はサクラとチューリップ、秋はコキアが見どころ。レンタサイクルあり。春秋の日祝は自転車が早めに出払う場合あり |
| shikoku-mura-museum | opening_hours | 9:30～17:00（入村受付と四国村ギャラリーは16:30まで）。定休日は火曜（祝休日の場合は翌日） |
| shikoku-mura-museum | tips | 四国各地から移築復原した民家・建造物が見どころ。安藤忠雄設計の四国村ギャラリーも併設 |
| zenigata-sand-coin | access | 大野原ICから車で12分、さぬき豊中ICから車で15分、JR観音寺駅からタクシーで5分。のりあいバスは「琴弾公園（森内科）」利用 |
| zenigata-sand-coin | opening_hours | 24時間見学可。ライトアップは毎日日没～22:00 |
| zenigata-sand-coin | tips | 琴弾山山頂の銭形展望台からの鑑賞がおすすめ。ライトアップは毎日日没～22:00。年末年始やGWは混雑時に展望台駐車場を避け、周辺駐車場から徒歩利用推奨 |
