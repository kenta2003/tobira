# ファクトチェックレポート — 岩手県スポット5件

**チェック実施日:** 2026-03-22
**対象ファイル:** `scripts/seed-iwate-extra.sql`
**チェック対象フィールド:** admission, access, opening_hours, tips

---

## 1. morioka-castle-ruins（Morioka Castle Ruins）

### 判定: OK（軽微な補足あり）

| フィールド | 記載内容 | 検証結果 |
|---|---|---|
| admission | `'Free'` | 公園自体は入場無料。確認済み。 |
| opening_hours | `'Open 24 hours (park grounds)'` | 公園は24時間開放。確認済み（駐車場のみ7:00〜22:00）。 |
| access | `'15-minute walk from Morioka Station (JR Tohoku/Akita Shinkansen).'` | 公式サイト（moriokashiroato.jp）に「JR盛岡駅より、徒歩15分」と明記。確認済み。 |
| tips | `'Visit in late April for cherry blossoms — the castle walls framed by pink blooms are stunning. Combine with a stroll along the Nakatsu River wanko soba area nearby.'` | 「中津川（Nakatsu River）沿いのわんこそばエリア」という記述は地理的に不正確。中津川は城跡公園に隣接して流れているが、わんこそば店が集まる「中の橋通り」は中津川の南側。"Nakatsu River wanko soba area" という表現は誤解を招く可能性があるが、誇張の程度は軽微。 |

**総合判定:** 事実として誤りのある項目はなし。tips の地理的表現は要注意レベル。

---

## 2. morioka-wanko-soba（Morioka Wanko Soba Experience）

### 判定: 要修正

| フィールド | 記載内容 | 検証結果 |
|---|---|---|
| admission | `'¥2,500–¥3,500 per person (all-you-can-eat)'` | **誤り。** 公式サイト（wankosoba.jp）の英語版に「¥4,500」と明記。最も代表的な東家（あずまや）は公式で4,500円（税込）。記載の¥2,500〜¥3,500は現行料金より大幅に低い旧価格帯。 |
| opening_hours | `'11:00–20:00 (last entry 19:00; varies by restaurant)'` | **誤り。** 東家（公式）の営業時間は「11:00〜15:00・17:00〜19:00 L.O.」。20:00閉店という情報は不正確で、実際は19:00ラストオーダー、途中14:00〜17:00は休憩時間あり。分割営業形式であることが抜けている。 |
| access | `'15-minute walk from Morioka Station. Main restaurants are located in the Nakano-koji and Saien areas of central Morioka.'` | 東家本店は「中ノ橋通1丁目」（Nakanohashi-dori）、駅前店は「盛岡駅前通」に所在。Nakano-kojiという表記は中ノ橋通りのことと思われるが正確な表記ではない。Saien（肴町）は不正確（東家の店舗は肴町エリアではない）。アクセス所要時間15分は概ね妥当。 |
| tips | `'Reserve in advance on weekends. Pace yourself early — many people slow down around bowl 30. Wearing stretchy clothing is genuinely recommended by locals.'` | 公式サイトによれば土日祝日は原則予約不可・当日来店順。「Reserve in advance on weekends」は誤り。平日の一部席のみ予約受付。 |

**出典:**
- 公式サイト: https://wankosoba.jp/en/wankosoba/ （料金 ¥4,500 確認）
- 店舗情報: https://wankosoba.jp/contact/ （営業時間確認）

---

## 3. hiraizumi-motsuji（Motsuji Temple）

### 判定: OK（1項目要注意）

| フィールド | 記載内容 | 検証結果 |
|---|---|---|
| admission | `'¥700 (adults), ¥400 (high school students), ¥200 (children)'` | 公式サイト（motsuji.or.jp）で確認済み。大人700円・高校生400円・小中学生200円。正確。 |
| opening_hours | `'8:30–17:00 (Mar–Nov), 8:30–16:30 (Dec–Feb)'` | **要注意。** 公式サイトでは通常期（3月5日〜11月4日）8:30〜17:00、冬季（11月5日〜3月4日）8:30〜16:30。大枠は正しいが、切り替え日が「3月/11月の月初」と記載されている一方、公式は「3月5日/11月5日」を境界とする。一般的な用途では誤差の範囲内だが、3月初旬訪問者には影響がある。 |
| access | `'5-minute walk from Hiraizumi Station (JR Tohoku Main Line). Hiraizumi is 40 minutes from Morioka by Shinkansen to Ichinoseki, then local train.'` | 平泉駅からの徒歩は公式では「7分（0.7km）」。5分は短すぎる。盛岡〜平泉のアクセスについて「Shinkansen to Ichinoseki (40 minutes), then local train」は概ね正しい（盛岡〜一ノ関は新幹線で約43分、一ノ関〜平泉は東北本線で約8分）。合計約50分。「40 minutes」はやや短い表現。 |

**出典:**
- 公式サイト: https://motsuji.or.jp/seeing/index.html

---

## 4. iwate-san-volcano（Iwate-san Volcano）

### 判定: 要修正（重大）

| フィールド | 記載内容 | 検証結果 |
|---|---|---|
| admission | `'Free'` | 確認済み。無料。 |
| opening_hours | `'Open year-round; summer hiking season July–September recommended'` | **誤り（重大）。** 2024年10月2日に噴火警戒レベルが1→2に引き上げられ、全登山道が入山規制中。2026年3月現在も西側は規制継続。東側4ルートは2026年7月1日の山開きに合わせて規制緩和予定（岩手県火山防災協議会の正式決定による）。「Open year-round」は現状と大きく乖離している。 |
| access | `'Take a bus from Morioka Station to the Umoregi-no-yu trailhead (approx. 90 minutes).'` | **要注意。** 「Umoregi-no-yu（埋木の湯）」トレイルヘッドへのバスは確認できない。滝沢市公式では馬返し登山口へのアクセスはタクシー利用を案内（バス便なし）。別の登山口（網張温泉・松川温泉）へのバスは存在するが所要時間が異なる。「Umoregi-no-yu」という表記の登山口が現存するかも不明。さらに現在は全入山規制中のためアクセス情報の実用性自体がない。 |
| tips | `'Start no later than 6:00 am to summit safely and descend before afternoon clouds gather. Carry rain gear — weather changes rapidly above 1,500 m. Check volcanic activity alerts before departure at the Japan Meteorological Agency site.'` | 現在は入山規制中のため、通常の登山tips として記載することは不適切。少なくとも規制状況への言及が必要。 |

**出典:**
- 滝沢市公式: https://www.city.takizawa.iwate.jp/mtiwate
- いわての旅（入山規制情報）: https://iwatetabi.jp/topic/127796/
- 岩手日報: https://www.iwate-np.co.jp/article/2025/9/24/186875（2026年7月東側規制緩和予定を報道）
- 山と溪谷オンライン: https://www.yamakei-online.com/journal/detail.php?id=8237

---

## 5. morioka-reimen（Morioka Cold Noodles / Reimen）

### 判定: OK（tips に軽微な要注意あり）

| フィールド | 記載内容 | 検証結果 |
|---|---|---|
| admission | `'¥900–¥1,300 per bowl'` | 複数店舗の確認範囲（食道園・寿々苑で950円〜1,200円前後）と概ね一致。妥当な価格帯。 |
| opening_hours | `'11:00–22:00 (varies by restaurant)'` | 代表店舗（寿々苑: 10:00〜22:00、大同苑: 各店舗異なる）と大きな齟齬なし。「varies by restaurant」と明記されており許容範囲。 |
| access | `'10-minute walk from Morioka Station. Most reimen restaurants are concentrated in the Saien and Ekimae areas of central Morioka.'` | 肴町（Saien）・駅前（Ekimae）エリアに冷麺店が集中しているとの記述は概ね正確。駅からの徒歩10分も妥当。 |
| tips | `'The kimchi spice level is usually adjustable — ask for "kara-sa hikae-me" if you prefer mild. Pairing reimen with yakiniku (grilled meat) at the same restaurant is the classic Morioka way to enjoy it.'` | 内容として正確。辛さ調整の文化は広く知られており問題なし。 |

**description の補足:** SQLの description では「Introduced by a Korean immigrant chef in the 1950s」と記載。実際は1954年（昭和29年）に朝鮮半島・咸興出身の青木輝人（楊龍哲）が食道園を開業したのが起源で、「in the 1950s」は正確（1954年は1950年代）。ただし、出身地は「Korean」とだけ記述されているが、北朝鮮の咸興（現在の北朝鮮領）出身である点は description フィールドのチェック対象外のため参考情報として記載。

---

## ファクトチェック結果サマリー

### OK（正確）
- morioka-castle-ruins — admission, opening_hours, access
- hiraizumi-motsuji — admission
- morioka-reimen — admission, opening_hours, access, tips

### 要注意（古い・不明確）
- hiraizumi-motsuji — `opening_hours`: 冬季切替日の境界（「Mar–Nov」と記載されているが公式は3月5日〜11月4日）
  出典: https://motsuji.or.jp/seeing/index.html
- hiraizumi-motsuji — `access`: 平泉駅から徒歩「5分」は短すぎる（公式: 7分）
- morioka-castle-ruins — `tips`: 「Nakatsu River wanko soba area」という地理的表現が不明確
- iwate-san-volcano — `access`: 「Umoregi-no-yu trailhead」へのバスが確認できない（馬返し登山口はバス便なし・タクシー利用）

### 誤り（要修正）
- morioka-wanko-soba — `admission`: ¥2,500〜¥3,500 → 正しくは ¥4,500（東家公式）
- morioka-wanko-soba — `opening_hours`: 「11:00–20:00 (last entry 19:00)」→ 正しくは「11:00–15:00, 17:00–19:00 L.O.（途中休憩あり・varies by restaurant）」
- morioka-wanko-soba — `tips`: 「Reserve in advance on weekends」→ 土日祝は原則予約不可（当日来店順）
- iwate-san-volcano — `opening_hours`: 「Open year-round」→ 2024年10月以降、全登山道入山規制中（2026年7月に東側4ルートの規制緩和予定）

---

## SQL更新候補

| id | field | 修正後の値 |
|---|---|---|
| `morioka-wanko-soba` | `admission` | `'¥4,500 per person (all-you-can-eat, Azumaya; prices vary by restaurant)'` |
| `morioka-wanko-soba` | `opening_hours` | `'11:00–15:00, 17:00–19:00 L.O. (Azumaya Honten; split service with afternoon break; closed 1st Wed of month except May/Aug; varies by restaurant)'` |
| `morioka-wanko-soba` | `tips` | `'Weekday reservations accepted at some seats; weekends and holidays are walk-in only (served in order of arrival). Pace yourself early — many people slow down around bowl 30. Wearing stretchy clothing is genuinely recommended by locals.'` |
| `iwate-san-volcano` | `opening_hours` | `'All trails closed due to volcanic activity alert (Level 2) since October 2024. Eastern trails (Umageashi, Yakehashiri etc.) are expected to reopen July 2026; western trails remain restricted. Check the Japan Meteorological Agency for current status before planning.'` |
| `iwate-san-volcano` | `access` | `'Main trailheads (Umageashi, Yakehashiri) are accessible by taxi from Takizawa Station (IGR Iwate Galaxy Railway), approx. 20 min. No direct bus service to Umageashi trailhead; car or taxi recommended. Note: all trailheads are currently under entry restrictions as of March 2026.'` |
| `iwate-san-volcano` | `tips` | `'IMPORTANT: All trails are under entry restrictions due to volcanic alert Level 2 (since October 2024). Eastern trails are scheduled to reopen July 1, 2026 — verify current status with the Japan Meteorological Agency (jma.go.jp) and Iwate Prefecture before planning a hike. When open, start no later than 6:00 am and carry rain gear as weather changes rapidly above 1,500 m.'` |
| `hiraizumi-motsuji` | `access` | `'7-minute walk (0.7 km) from Hiraizumi Station (JR Tohoku Main Line). From Morioka: take the Tohoku Shinkansen to Ichinoseki (approx. 43 min), then local train to Hiraizumi (approx. 8 min).'` |

---

## 総評

5件中、**morioka-wanko-soba** と **iwate-san-volcano** に要修正項目が集中している。

**最優先対応:** iwate-san-volcano の `opening_hours` は「Open year-round」という記述が2024年10月以降の入山規制と真っ向から矛盾しており、訪問者の安全に関わる誤情報となっている。早急な修正が必要。

**次点:** morioka-wanko-soba の `admission`（¥2,500〜¥3,500 vs. 実際の¥4,500）は旅行予算に直接影響する価格誤りであり、合わせて修正を推奨する。`opening_hours` の分割営業表記と `tips` の予約情報も連動して修正すること。

**hiraizumi-motsuji** の平泉駅からの徒歩時間（5分→7分）は軽微だが、公式情報に合わせて修正することが望ましい。

**morioka-castle-ruins** と **morioka-reimen** は実質的な誤りなし。
