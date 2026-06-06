# 徳島県スポット ファクトチェック報告

対象: `otsuka-museum-of-art`, `oasahiko-shrine`, `udatsu-townscape`, `awa-jurobe-yashiki`, `tairyuji-temple`  
検証項目: `admission`, `access`, `opening_hours`, `tips`  
確認日: 2026-03-29  
方針: 日本語の公式サイト、自治体サイト、観光協会・観光ビューロー等の一次情報を優先し、`tips` は一次情報で裏づけできる内容と未検証の一般論を分けて判定。

---

## 1. otsuka-museum-of-art（大塚国際美術館）

| 項目 | 現状の値 | 判定 | 検証結果 |
|------|----------|------|----------|
| admission | ¥3,300 (adults) | ✅ 確認済み | 公式の入館料は一般3,300円。 |
| access | Direct highway buses to Otsuka Kokusai Bijutsukan-mae stop. From JR Naruto Station, take Naruto City Bus to Naruto Kameura-guchi and walk. About 3 minutes by car from Naruto-kita IC. | ⚠️ 一部要修正 | 公式では直通高速バスの案内あり。鳴門市公式観光サイトは「JR鳴門駅より路線バス（鳴門公園行き）→『大塚国際美術館前』下車すぐ」「神戸鳴門自動車道『鳴門北』ICより車で約3分→専用駐車場より無料シャトルバス運行」と案内しており、`Naruto Kameura-guchi` 経由の記載と不一致。 |
| opening_hours | 9:00–17:00 (closed Mondays) | ❌ 誤り | 公式は「9時30分～17時」「月曜日(祝日の場合は翌日)」「1月は連続休館あり、その他特別休館あり、8月無休」。開館時刻が `9:00` ではない。 |
| tips | One of Tokushima's most recognizable cultural attractions and well worth the time. Plan at least 2.5 hours for a comprehensive tour of the main galleries. | ⚠️ 一部未検証 | 主観的な評価や `2.5時間` の所要時間目安は一次情報で確認できない。一方、公式では「鑑賞ルートは約4キロ」「歩きやすい靴でお越しください」と明記されている。 |

**根拠URL**
- https://o-museum.or.jp/pages/16/
- https://o-museum.or.jp/pages/824/
- https://o-museum.or.jp/pages/424/
- https://naruto-tourism.jp/jp/spot/15461

**修正提案**
- `access`: 直通高速バスあり。JR鳴門駅からは路線バス「鳴門公園行」で「大塚国際美術館前」下車すぐ。神戸鳴門自動車道「鳴門北」ICから車で約3分
- `opening_hours`: 9:30～17:00（入館券の販売は16:00まで）。月曜休館（祝日の場合は翌日）。1月は連続休館あり、8月無休、その他特別休館あり
- `tips`: 鑑賞ルートは約4キロあり、館内は広い。公式も歩きやすい靴での来館を案内

---

## 2. oasahiko-shrine（大麻比古神社）

| 項目 | 現状の値 | 判定 | 検証結果 |
|------|----------|------|----------|
| admission | Free | ✅ 確認済み | 拝観料の案内はなく、参拝自由。 |
| access | About 25 minutes on foot from JR Bando Station. About 10–15 minutes by car from Itano IC or Aizumi IC. | ✅ 概ね正確 | 鳴門市公式観光サイトは「JR板東駅から北へ徒歩25分 板野ICから車で10分」、神社公式は「藍住ICから車で15分」「板野ICから車で10分」と案内。 |
| opening_hours | Open year-round | ⚠️ 要修正 | 公式は通年開門ではあるが、単に `Open year-round` では不十分。鳴門市公式観光サイトは「開門時間 3月～11月 6:00～17:00、12月～2月 6:30～16:30」、神社公式は授与所・祈祷受付時間も明記。 |
| tips | One of Tokushima's most important spiritual landmarks. Wear comfortable walking shoes for the long lantern-lined approach to the main hall. | ⚠️ 一部未検証 | 県下一の格式、徳島県の総鎮守級の神社である点は一次情報で確認できる。一方、`歩きやすい靴推奨` は一次情報で確認できない。公式・鳴門市観光案内では大鳥居、石灯籠が並ぶ参道、ドイツ橋、大楠が見どころ。 |

**根拠URL**
- https://www.ooasahikojinja.jp/access/
- https://www.ooasahikojinja.jp/kitou/
- https://naruto-tourism.jp/jp/spot/15837
- https://www.awanavi.jp/archives/spot/2762

**修正提案**
- `opening_hours`: 開門時間 3月～11月 6:00～17:00、12月～2月 6:30～16:30
- `tips`: 徳島県の総鎮守として信仰を集める神社。大鳥居、石灯籠が並ぶ参道、ドイツ橋、樹齢約千年の大楠が見どころ

---

## 3. udatsu-townscape（うだつの町並み）

| 項目 | 現状の値 | 判定 | 検証結果 |
|------|----------|------|----------|
| admission | Free | ✅ 概ね正確 | 町並み散策自体に入場料は確認されない。一方、町並み内の主要公開施設「吉田家住宅」は大人510円。 |
| access | About 10 minutes by car from Wakimachi IC. By public transport: Tokushima Seibu Kotsu bus from JR Anabuki Station to Wakimachi Michi-no-eki, then walk about 10 minutes. | ⚠️ 一部要修正 | 美馬市公式・美馬観光ビューロー・阿波ナビでは「脇町ICから約10分」は一致。一方、公共交通は `Tokushima Seibu Kotsu` ではなく、美馬市営路線バス「道の駅藍ランドうだつ」下車すぐ、またはJR穴吹駅から車・タクシー約10分の案内が確認できた。 |
| opening_hours | Open year-round (daytime) | ⚠️ 要修正 | 町並みそのものの明確な開放時間は一次情報で確認しづらいが、主要施設は時間設定あり。吉田家住宅は9:00～17:00（最終入館16:30、12/27～1/1休館）、美来工房は9:00～17:00（年末年始休）。`Open year-round` だけでは実用情報として不十分。 |
| tips | Walk slowly through the merchant district to appreciate the architectural details and indigo dye history. Several small shops and cafes are scattered throughout the town. | ✅ 概ね正確 | 美馬市公式・観光ビューローで、藍の集散地として発展した歴史、うだつ・鬼瓦・白壁の町並みが見どころと確認できる。観光ビューローの周辺図では複数のカフェ・飲食店・体験施設も案内されている。 |

**根拠URL**
- https://www.city.mima.lg.jp/kanko/udatsu/
- https://www.city.mima.lg.jp/kanko/map/list/11507.html
- https://www.city.mima.lg.jp/kanko/map/list/11492.html
- https://mimakankou.or.jp/event/udatsunomachinami/
- https://mimakankou.or.jp/event/udatsunomachinamitenpo/
- https://www.awanavi.jp/archives/spot/19082

**修正提案**
- `access`: 脇町ICから車で約10分。公共交通はJR穴吹駅から車・タクシーで約10分、または美馬市営路線バス「道の駅藍ランドうだつ」下車すぐ
- `opening_hours`: 町並み散策自体に明確な開放時間設定は見当たらない。主要公開施設は吉田家住宅 9:00～17:00（最終入館16:30、12/27～1/1休館）、美来工房 9:00～17:00（年末年始休）

---

## 4. awa-jurobe-yashiki（阿波十郎兵衛屋敷）

| 項目 | 現状の値 | 判定 | 検証結果 |
|------|----------|------|----------|
| admission | ¥410 (adults) | ✅ 確認済み | 公式は一般410円。 |
| access | From JR Tokushima Station, take Kawauchi Loop or Tokushima City Bus (terminals B7 or B14) for 20–25 minutes to Awajurobe Yashiki-mae. About 5 minutes by car from Tokushima IC. | ⚠️ 一部要修正 | 公式は「JR徳島駅前バスターミナル7番のりば『川内循環バス』乗車→『十郎兵衛屋敷』下車すぐ」「徳島インターより5分」。`B14` や stop 名 `Awajurobe Yashiki-mae` は公式と一致しない。 |
| opening_hours | 9:30–17:00 (closed Mondays) | ❌ 誤り | 公式は「9:30～17:00（7月1日～8月31日は18:00まで）」「12月31日～1月3日休館」。`closed Mondays` ではない。 |
| tips | Awa ningyo joruri performances are held daily. Check the official schedule before visiting to see performance times and combined-ticket options with nearby attractions. | ⚠️ 一部要修正 | 公式で阿波人形浄瑠璃の毎日上演と定期公演時刻は確認できる。一方、`combined-ticket options with nearby attractions` は一次情報で確認できなかった。 |

**根拠URL**
- https://joruri.info/jurobe/
- https://joruri.info/jurobe/guide.html
- https://joruri.info/jurobe/access.html
- https://joruri.info/jurobe/program.html
- https://www.pref.tokushima.lg.jp/FAQ/docs/00026826/

**修正提案**
- `access`: JR徳島駅前バスターミナル7番のりば「川内循環バス」で「十郎兵衛屋敷」下車すぐ。徳島自動車道「徳島IC」から車で約5分
- `opening_hours`: 9:30～17:00（7月1日～8月31日は18:00まで、最終入館は閉館30分前）。休館日は12月31日～1月3日
- `tips`: 国の重要無形民俗文化財「阿波人形浄瑠璃」を毎日上演。来館前に公式の定期公演スケジュール確認が必要

---

## 5. tairyuji-temple（太龍寺）

| 項目 | 現状の値 | 判定 | 検証結果 |
|------|----------|------|----------|
| admission | Free for temple grounds; Tairyuji Ropeway round trip ¥2,470 (adults) | ❌ 一部誤り | 太龍寺の拝観料は確認できない一方、太龍寺ロープウェイ公式の現行往復運賃は大人2,600円。`¥2,470` は現行公式と不一致。 |
| access | Take Tokushima Bus from JR Tokushima Station to Wajikihigashi, walk about 15 minutes to Tairyuji Ropeway base, then ride about 10 minutes to upper station. Driving from Tokushima City takes 50–60 minutes to the ropeway base. | ❌ 誤り | 太龍寺ロープウェイ公式は「徳島駅から徳島バス(丹生谷線)を利用し1時間30分、那賀町和食東下車徒歩10分」。阿波ナビも「徳島バス丹生谷線『和食東』下車→徒歩10分→太龍寺ロープウェイ」「徳島市内→車で約50分」。`Wajikihigashi` と `徒歩15分` は一致しない。 |
| opening_hours | 9:00–17:00 (ropeway hours) | ❌ 誤り | 太龍寺ロープウェイ公式は毎日「8:00～16:40（上り最終）」、20分ごと運行。`9:00–17:00` ではない。 |
| tips | The ropeway ride and mountain walk are integral to the Tairyuji experience. Bring comfortable walking shoes and check weather conditions before visiting, especially in mountain fog season. | ⚠️ 一部未検証 | ロープウェイで太龍寺にアクセスできる点、西日本最長2,775m・約10分の大パノラマという魅力は一次情報で確認できる。一方、`mountain fog season` や `歩きやすい靴` の注意喚起は一次情報では確認できなかった。 |

**根拠URL**
- https://www.shikoku-cable.co.jp/tairyuji/
- https://www.shikoku-cable.co.jp/tairyuji/price/
- https://www.shikoku-cable.co.jp/tairyuji/timetable/
- https://www.shikoku-cable.co.jp/tairyuji/access/
- https://www.awanavi.jp/archives/spot/2802
- https://www.awanavi.jp/archives/spot/1896

**修正提案**
- `admission`: 太龍寺ロープウェイ往復 大人2,600円、片道1,300円。太龍寺の拝観料は要案内なし
- `access`: 徳島駅から徳島バス丹生谷線で約1時間30分、「那賀町和食東」下車徒歩10分で太龍寺ロープウェイ。車は徳島ICから約1時間、徳島市内から約50分
- `opening_hours`: 太龍寺ロープウェイ 8:00～16:40（上り最終）、20分ごと運行
- `tips`: 西日本最長2,775mのロープウェイで太龍寺へ向かう。約10分の乗車中に那賀川や山並み、紀伊水道・橘湾の景観を楽しめる

---

## 総括

- 明確な誤りは `otsuka-museum-of-art.opening_hours`, `awa-jurobe-yashiki.opening_hours`, `tairyuji-temple.admission`, `tairyuji-temple.access`, `tairyuji-temple.opening_hours`
- `access` は `otsuka-museum-of-art`, `udatsu-townscape`, `awa-jurobe-yashiki` で停留所名・交通手段・案内内容にズレがあった
- `opening_hours` は `oasahiko-shrine`, `udatsu-townscape` で現状値が粗く、実用上は公式の詳細時間や主要施設時間に寄せたほうが安全
- `tips` は全件で一般論が混ざっており、一次情報で確認できる見どころ・注意点ベースへの修正が望ましい

## SQL更新候補

| id | field | 修正後の値 |
|----|-------|------------|
| otsuka-museum-of-art | access | 直通高速バスあり。JR鳴門駅からは路線バス「鳴門公園行」で「大塚国際美術館前」下車すぐ。神戸鳴門自動車道「鳴門北」ICから車で約3分 |
| otsuka-museum-of-art | opening_hours | 9:30～17:00（入館券の販売は16:00まで）。月曜休館（祝日の場合は翌日）。1月は連続休館あり、8月無休、その他特別休館あり |
| otsuka-museum-of-art | tips | 鑑賞ルートは約4キロあり、館内は広い。公式も歩きやすい靴での来館を案内 |
| oasahiko-shrine | opening_hours | 開門時間 3月～11月 6:00～17:00、12月～2月 6:30～16:30 |
| oasahiko-shrine | tips | 徳島県の総鎮守として信仰を集める神社。大鳥居、石灯籠が並ぶ参道、ドイツ橋、樹齢約千年の大楠が見どころ |
| udatsu-townscape | access | 脇町ICから車で約10分。公共交通はJR穴吹駅から車・タクシーで約10分、または美馬市営路線バス「道の駅藍ランドうだつ」下車すぐ |
| udatsu-townscape | opening_hours | 町並み散策自体に明確な開放時間設定は見当たらない。主要公開施設は吉田家住宅 9:00～17:00（最終入館16:30、12/27～1/1休館）、美来工房 9:00～17:00（年末年始休） |
| awa-jurobe-yashiki | access | JR徳島駅前バスターミナル7番のりば「川内循環バス」で「十郎兵衛屋敷」下車すぐ。徳島自動車道「徳島IC」から車で約5分 |
| awa-jurobe-yashiki | opening_hours | 9:30～17:00（7月1日～8月31日は18:00まで、最終入館は閉館30分前）。休館日は12月31日～1月3日 |
| awa-jurobe-yashiki | tips | 国の重要無形民俗文化財「阿波人形浄瑠璃」を毎日上演。来館前に公式の定期公演スケジュール確認が必要 |
| tairyuji-temple | admission | 太龍寺ロープウェイ往復 大人2,600円、片道1,300円。太龍寺の拝観料は要案内なし |
| tairyuji-temple | access | 徳島駅から徳島バス丹生谷線で約1時間30分、「那賀町和食東」下車徒歩10分で太龍寺ロープウェイ。車は徳島ICから約1時間、徳島市内から約50分 |
| tairyuji-temple | opening_hours | 太龍寺ロープウェイ 8:00～16:40（上り最終）、20分ごと運行 |
| tairyuji-temple | tips | 西日本最長2,775mのロープウェイで太龍寺へ向かう。約10分の乗車中に那賀川や山並み、紀伊水道・橘湾の景観を楽しめる |
