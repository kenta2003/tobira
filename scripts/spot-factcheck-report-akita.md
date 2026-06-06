# ファクトチェックレポート — 秋田県スポット5件

検証日: 2026-03-22
対象ファイル: `scripts/seed-akita-extra.sql`
検証フィールド: admission / access / opening_hours / tips

---

## 1. akita-kanto-festival（Akita Kanto Festival）

### 検証結果: 要修正（3項目）

#### admission
- **記載値**: `'Free (street viewing); grandstand seats ¥600'`
- **正しい値**: `'Free (street viewing); grandstand seats from ¥3,500 (B-tier) to ¥4,500 (S-tier)'`
- **判定**: ❌ 誤り
- **根拠**: 公式サイト（www.kantou.gr.jp/kanran/）によると、観覧席の料金はS席 ¥4,500 / A席 ¥4,000 / B席 ¥3,500。¥600 という金額は現在の公式料金と一致しない。過去の旧料金か根拠不明の数字。
- **出典**: https://www.kantou.gr.jp/kanran/

#### opening_hours
- **記載値**: `'Evening performances: 19:05–21:00 (3–6 August); daytime event: 10:00–16:00 (4–5 August)'`
- **正しい値**: `'Evening performances: 19:15–21:00 (3–6 Aug); daytime Myogi-kai: 9:00–15:40 (4–5 Aug, preliminary rounds), 9:20–15:00 (6 Aug, final)'`
- **判定**: ⚠️ 要注意（部分的に不正確）
- **根拠**: 公式サイト（www.akita-yulala.jp/en/festival/kanto-festival）は夜本番の演技開始を 19:15 と明示。記載の「19:05」は確認できない。昼竿燈（妙技大会）の時間は 9:00〜15:40（予選）であり、記載の「10:00–16:00」と異なる。また、昼竿燈の開催日は 4–5 日（予選）および 6 日（決勝）の3日間で、記載の「4–5 August」のみは不完全。
- **出典**: https://www.akita-yulala.jp/en/festival/kanto-festival / https://www.kantou.gr.jp/eventa/

#### tips
- **記載値**: `'The grandstand seats (¥600) offer an elevated view and are worth booking in advance.'`
- **判定**: ❌ 誤り（tips内に admission の誤り金額が波及）
- **根拠**: tips 内の「¥600」は上記の admission 誤りの波及。正しい料金（¥3,500–¥4,500）に修正が必要。
- **出典**: https://www.kantou.gr.jp/kanran/

---

## 2. shirakami-sanchi（Shirakami-Sanchi World Heritage Forest）

### 検証結果: 要修正（2項目）

#### access
- **記載値**: `'From Akita Station, take the JR Gono Line to Juniko Station (approx. 2.5 hours).'`
- **正しい値**: `'From Akita Station, take the JR Gono Line (Resort Shirakami or local) to Juniko Station (approx. 2 hours, with a direction-change stop at Higashi-Noshiro). From Juniko Station, take a local bus (approx. 15 minutes) to the Oku-Juniko trailhead, then walk approx. 10 minutes to Aoike.'`
- **判定**: ⚠️ 要注意
- **根拠**: 複数の信頼できる情報源（japan-guide.com、asocialnomad.com、JR東日本資料）によると、秋田駅から十二湖駅までの所要時間は約2時間。「2.5 hours」という記載は過大。東能代駅（Higashi-Noshiro）での方向転換（スイッチバック）があるため、実際には奥羽本線（約50分）＋五能線（約70分）のルート。また、「20-minute walk from the station」と記載されているが、正確には十二湖駅からバスで約15分＋徒歩10分が一般的なアクセス経路であり、「駅から徒歩20分」は不正確。
- **出典**: https://www.japan-guide.com/e/e3790.html / https://asocialnomad.com/japan/juniko-lakes/ / https://visitshirakami.com/things_to_do/juniko-lakes/

#### admission
- **記載値**: `'Free (some trail areas require a forest management fee of ¥500)'`
- **判定**: ❓ 未確認
- **根拠**: 公式情報源（深浦町観光公式サイト、青森県観光情報サイト等）において「森林管理費 ¥500」という入場・協力金の徴収は現時点で確認できなかった。入場料不要である点は複数情報源が一致。ただし、将来的に環境協力金が導入される可能性があるため、断言はできない。現状の情報としては「Free」の記述に括弧書きを加える根拠が確認されていない。「¥500 forest management fee」は削除またはリスク注記に変更することを推奨。
- **出典**: https://www.fukaurajyuniko.com/ / https://aomori-tourism.com/spot/detail_73.html

---

## 3. akita-kiritanpo（Kiritanpo — Akita's Hearth Dish）

### 検証結果: 概ね問題なし（1項目 要注意）

#### access
- **記載値**: `'5–10 minute walk from Akita Station. Several dedicated kiritanpo restaurants are clustered in the Omachi and Naka-dori areas of central Akita.'`
- **判定**: ⚠️ 要注意
- **根拠**: 個々の店舗位置によって所要時間は大きく異なる。代表的な店舗である「秋田きりたんぽ屋 秋田駅前本店」は秋田駅西口から徒歩約2分（住所: 中通2-7-6）。「5–10分」は実態より遠く感じさせる表現。一方で大町エリアの店舗は確かに徒歩10分程度かかる。複数店舗の総称として「5–10 minutes」は許容範囲内だが、やや不正確。
- **出典**: https://marutomisuisan.jpn.com/kiritanpoya/

#### admission / opening_hours / tips
- **判定**: ✅ 確認済み（問題なし）
- **根拠**: フードスポットとしての admission（¥1,500–¥3,000）、opening_hours（11:30–14:00, 17:00–22:00）は代表的な店舗の営業形態と整合。tips の内容（鍋セットを注文、事前予約推奨、味噌だれの串も美味しい）は一般的に正確。

---

## 4. inaniwa-udon（Inaniwa Udon — Silken Noodles of Akita）

### 検証結果: 要修正（2項目）

#### access
- **記載値**: `'From Akita Station, take the JR Ou Line to Yuzawa Station (approx. 1 hour), then a local bus or taxi to Inaniwa (approx. 30 minutes).'`
- **正しい値**: `'From Akita Station, take the JR Ou Line (Ousen Line) to Yuzawa Station (approx. 1.5–1.75 hours). From Yuzawa Station, take a local bus or taxi to Inaniwa (approx. 20–30 minutes). Alternatively, drive from Akita (approx. 1.5 hours via the Akita Expressway).'`
- **判定**: ⚠️ 要注意
- **根拠**: 複数の時刻表サイト（NAVITIME、駅探）によると、秋田駅から湯沢駅までの所要時間は約93〜106分（約1.5〜1.75時間）。記載の「approx. 1 hour」は過小評価。じゃらんや公式サイトでは「大曲駅から車で約20分」という案内もあり、最寄り駅が「湯沢」単独とは限らない。
- **出典**: https://www.navitime.co.jp/diagram/ / https://www.jalan.net/kankou/spt_05461fc3560062615/

#### opening_hours
- **記載値**: `'11:00–15:00 (main restaurants; check individual hours)'`
- **正しい値**: `'Dining: 11:00–17:00; souvenir shop: 9:00–17:00; factory observation: 9:00–16:00 (Sato Yosuke flagship store; hours vary by restaurant)'`
- **判定**: ⚠️ 要注意
- **根拠**: 佐藤養助総本店公式サイト（www.sato-yoske.co.jp）によると、食事の営業時間は 11:00–17:00。記載の「11:00–15:00」は閉店時間が2時間早い。
- **出典**: https://www.sato-yoske.co.jp/en/shop/sato-yosuke-shoten-flagship-store/

---

## 5. kubota-castle-ruins（Kubota Castle Ruins / Senshu Park）

### 検証結果: 要修正（2項目）

#### admission
- **記載値**: `'Free (park); Osumi-yagura turret ¥100'`
- **正しい値**: `'Free (park); Osumi-yagura (御隅櫓) ¥150 (adults); high school students and under free'`
- **判定**: ❌ 誤り
- **根拠**: 秋田市公式サイト（www.akita-yulala.jp/see/200010242）によると、御隅櫓の入場料は一般 **¥150**（団体20名以上は¥120）。高校生以下は無料。記載の「¥100」は現在の料金と一致しない。
- **出典**: https://www.akita-yulala.jp/see/200010242

#### highlights（tips との整合性）
- **記載値（highlights）**: `'Adjacent Akita Museum of Art houses the world's largest canvas painting by Ikuo Hirayama.'`
- **判定**: ❌ 誤り（2点の事実誤り）
- **根拠**:
  1. 作者の誤り: 「Ikuo Hirayama（平山郁夫）」は誤り。正しくは **藤田嗣治（Tsuguharu Foujita / Leonard Foujita）** が描いた《秋田の行事》（1937年）。平山郁夫は別の日本画家で、秋田県立美術館との関係はない。
  2. 「世界最大のキャンバス画」の表現: 公式情報源は「世界最大級の大壁画」と表現しており、「世界最大のキャンバス画 (world's largest canvas painting)」という断定的な表現は過大な可能性がある。実際には縦3.65m × 横20.50m の油彩・テンペラ画。
  3. 美術館名: 正式名称は「秋田県立美術館」（Akita Museum of Art）であり、記載の「Akita Museum of Art」自体は問題ないが、作者・内容の誤りが重大。
- **出典**: https://www.akita-yulala.jp/see/341 / https://www.artagenda.jp/museum/detail/117

#### opening_hours
- **記載値**: `'Park: open 24 hours; Osumi-yagura: 9:00–16:30 (closed in winter)'`
- **正しい値**: `'Park: open 24 hours; Osumi-yagura (御隅櫓): 9:00–16:30 (extended to 19:00 during city school summer vacation); closed 1 December – 31 March'`
- **判定**: ✅ 確認済み（冬季閉鎖期間の詳細を補足）
- **根拠**: 公式情報（www.akita-yulala.jp/see/200010242）によると 9:00–16:30 は正確。夏期（市立小中学校夏季休業日）は 19:00 まで延長。閉鎖期間は 12月1日〜翌年3月31日。記載の「closed in winter」は内容的に正しいが、具体的な閉鎖期間の追記が望ましい。
- **出典**: https://www.akita-yulala.jp/see/200010242

---

## 総評

5スポット中、全スポットに何らかの修正点が確認された。特に優先度の高い修正は以下の通り。

**最優先（明確な数値誤り）:**
1. `akita-kanto-festival` — 観覧席料金 ¥600 は大幅な過小表示（正: ¥3,500–¥4,500）
2. `kubota-castle-ruins` — 御隅櫓入場料 ¥100 は誤り（正: ¥150）
3. `kubota-castle-ruins` — highlights の作者名「Ikuo Hirayama」は誤り（正: 藤田嗣治 / Tsuguharu Foujita）

**準優先（所要時間・スケジュールの不正確さ）:**
4. `inaniwa-udon` — 秋田→湯沢の所要時間「1 hour」は過小（正: 約1.5–1.75時間）
5. `inaniwa-udon` — 佐藤養助の食事営業「11:00–15:00」は短すぎ（正: 11:00–17:00）
6. `shirakami-sanchi` — 秋田駅→十二湖駅の所要時間「2.5 hours」は過大（正: 約2時間）、かつ「駅から徒歩20分」はバス利用の実態と不一致

**要確認（情報源で確認できず）:**
7. `shirakami-sanchi` — 「forest management fee of ¥500」は現時点で一次情報源による確認ができていない。記載を削除または「Free (environmental cooperation fee may be requested)」程度の表現に和らげることを推奨。

---

## SQL更新候補

| id | field | 修正後の値 |
|----|-------|-----------|
| akita-kanto-festival | admission | `'Free (street viewing); grandstand seats ¥3,500–¥4,500 (B to S tier; reservation required)'` |
| akita-kanto-festival | opening_hours | `'Evening performances: 19:15–21:00 (3–6 Aug); daytime Myogi-kai: 9:00–15:40 (4 & 5 Aug preliminary), 9:20–15:00 (6 Aug final)'` |
| akita-kanto-festival | tips | `'Arrive by 18:30 to secure a good street-side viewing spot. Grandstand seats (¥3,500–¥4,500) offer an elevated view and are worth booking well in advance — individual reservations open in mid-May. The daytime Myogi-kai workshop on 4–5 August lets you try balancing the pole — highly recommended.'` |
| shirakami-sanchi | admission | `'Free'` |
| shirakami-sanchi | access | `'From Akita Station, take the JR Gono Line (Resort Shirakami rapid or local service) to Juniko Station (approx. 2 hours; note a direction-change stop at Higashi-Noshiro). From Juniko Station, take a local bus (approx. 15 minutes) to the Oku-Juniko trailhead, then walk about 10 minutes to Aoike. A rental car from Akita (approx. 2 hours via Route 7) is recommended for accessing remote trail areas.'` |
| inaniwa-udon | access | `'From Akita Station, take the JR Ou Line to Yuzawa Station (approx. 1.5 hours), then a local bus or taxi to Inaniwa (approx. 20–30 minutes). Alternatively, drive from Akita (approx. 1.5 hours via the Akita Expressway).'` |
| inaniwa-udon | opening_hours | `'Dining: 11:00–17:00; souvenir shop: 9:00–17:00; factory observation: 9:00–16:00 (Sato Yosuke flagship store; hours vary by restaurant — confirm individually)'` |
| kubota-castle-ruins | admission | `'Free (park); Osumi-yagura turret ¥150 (adults); high school students and under free'` |
| kubota-castle-ruins | opening_hours | `'Park: open 24 hours; Osumi-yagura: 9:00–16:30 (extended to 19:00 during summer school vacation); closed 1 Dec – 31 Mar'` |

### highlights の修正（kubota-castle-ruins）

highlights 配列の4番目の要素を以下に修正:

**現在**: `'Adjacent Akita Museum of Art houses the world''s largest canvas painting by Ikuo Hirayama.'`

**修正後**: `'Adjacent Akita Prefectural Museum of Art houses Tsuguharu Foujita''s monumental 1937 mural Akita no Gyoji (3.65 m × 20.5 m), one of the largest oil-on-canvas works in East Asia.'`

---

*検証に使用した主な情報源:*
- *秋田竿燈まつり公式サイト: https://www.kantou.gr.jp/kanran/*
- *秋田市観光情報 アキタッチ+: https://www.akita-yulala.jp/see/200010242*
- *白神山地・十二湖の森公式: https://www.fukaurajyuniko.com/access*
- *青森県観光情報サイト: https://aomori-tourism.com/spot/detail_73.html*
- *佐藤養助商店公式: https://www.sato-yoske.co.jp/en/shop/sato-yosuke-shoten-flagship-store/*
- *じゃらんnet（稲庭うどん佐藤養助総本店）: https://www.jalan.net/kankou/spt_05461fc3560062615/*
- *japan-guide.com（Shirakami-Sanchi）: https://www.japan-guide.com/e/e3790.html*
- *秋田県立美術館 アキタッチ+: https://www.akita-yulala.jp/see/341*
