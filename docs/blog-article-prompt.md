# Tobira Blog Article Generator

## プロジェクト概要
tobira.app は日本旅行ガイドサイト。Supabase の `blog_posts` テーブルに記事を保存し、
Next.js で表示する。記事は Supabase SQL Editor に直接 INSERT して公開する。

---

## 作成する記事

- タイトル: `Best Places in Japan Without a Car`
- スラッグ: `best-places-japan-without-car`
- Brief: `ターゲット: 免許なし・レンタカー不要で旅したい訪日旅行者（バックパッカー・ソロ旅行者）。独自視点: 「電車・バス・徒歩だけで完結できる」ことを各セクションのtravel_timeで具体的に示す（例: 「鉄道のみでアクセス可」「バス1本」など）。必須情報: travel_time に必ず交通手段（Shinkansen / local train / bus / ferry など）を明記。車不要の理由を本文に1文入れる。テーマ: エリアを全国から選ぶ。都市だけでなく自然・離島なども含め多様性を出す。`

---

## 作業手順（必ずこの順番で行うこと）

**STEP 1 — 場所リストを提案してユーザーに確認を取る**

SQL を書く前に、まず以下の形式で候補リストを提示し、ユーザーの確認を得ること:

```
以下の場所でよいですか？確認後にSQL を生成します。

1. [場所名] — [都道府県] — [一言説明]
2. ...
```

確認時のチェックポイント:
- 同じ都道府県の場所が2つ以上ないか（1記事1県まで）
- 既存記事と全く同じ組み合わせになっていないか
- セクション数が8以下か（closing除く）

**ユーザーの確認・修正が入ってから STEP 2 に進むこと。**

**STEP 2 — SQL INSERT 文を生成する**

---

## ライティングスタイル（必ず守ること）

- 自信を持った編集スタイル。リスト記事のような書き方はしない
- 具体的：実際の地名・詳細・正直な評価
- British English (travelling, colour, favour)
- 禁止ワード: "nestled", "breathtaking", "must-visit", "hidden gem"
- セクション見出しは場所名だけでなく視点・角度を込める
  - 例: "Kanazawa — The Kyoto Nobody Told You About"
  - 例: "Beppu — Where the Earth Is Still Boiling"
  - 例: "Hokkaido — Where Japan Finally Has Room to Breathe"
- **Brief に特別な指示がある場合（例: 「2回目訪日者向けに」「アクセスを必ず含める」など）はそれを最優先で反映する**

---

## BRIEF の書き方ガイド

BRIEF には以下を含めると出力が安定する:

| 項目 | 例 |
|---|---|
| ターゲット読者 | 「2回目・3回目の訪日旅行者。東京・京都・大阪は経験済み」 |
| 独自視点・フック | 「なぜその場所が2回目向きかを各セクション末尾に1文含める」 |
| 必須情報 | 「travel_time・ベストシーズン・滞在日数を各セクションに含める」 |
| テーマ・角度 | 「自然 / 食 / 歴史 / アートで行き先を選ぶ視点で構成する」 |

---

## 既存記事との重複確認

**このリストは記事を追加するたびに更新すること。**
全く同じ場所の組み合わせにしないこと（一部被りはOK）:

| 記事タイトル | スラッグ | カバーしている主な場所 |
|---|---|---|
| Best Places in Japan Beyond Tokyo | best-places-in-japan-beyond-tokyo | Kanazawa, Yakushima, Matsumoto, Beppu, Aomori, Noto, Naoshima |
| Where to Go in Japan for a Second Trip | where-to-go-in-japan-second-trip | Hokkaido, Hiroshima, Takayama, Kanazawa, Fukuoka, Nikko, Okinawa |
| 10 Alternatives to Kyoto Without the Crowds | kyoto-alternatives-without-crowds | Kanazawa, Nara, Kurashiki, Matsue, Aizu-Wakamatsu, Hikone, Kakunodate, Ise, Hagi, Kamakura |
| Best Hidden Gems in Kyushu | hidden-gems-kyushu | Nagasaki, Yufuin, Takachiho, Arita, Amakusa, Kirishima, Yanagawa |
| Best Hidden Gems in Tohoku | hidden-gems-tohoku | Hiraizumi, Matsushima, Ginzan Onsen, Nyuto Onsen, Towada, Kitakata |
| Best Places in Japan Without a Car | best-places-japan-without-car | Hakone, Kinosaki Onsen, Naoshima, Hiroshima, Kagoshima, Morioka |
| Fukuoka: Where Japan Eats, Breathes, and Gets On With It | fukuoka-travel-guide | Fukuoka/Hakata, Dazaifu, Itoshima, Kitakyushu/Mojiko, Munakata, Sasaguri/Nanzoin, Akizuki, Uminonakamichi |
| Oita: Where the Earth Still Boils | oita-travel-guide | Beppu, Yufuin, Kokonoe/Kuju, Taketa/Oka Castle, Kunisaki/Usa, Usuki, Nakatsu/Yabakei |
| Nagasaki: Where Every Century Left Something Behind | nagasaki-travel-guide | Nagasaki City, Peace Park, Shinchi/Chinatown, Hashima/Gunkanjima, Unzen, Goto Islands, Sasebo/Huis Ten Bosch |
| Saga: Older Than You Think, Quieter Than Most | saga-travel-guide | Karatsu, Arita/Imari, Yoshinogari, Takeo, Saga City, Kashima/Ariake Coast |
| Kumamoto: Where the Volcano Is the Point | kumamoto-travel-guide | Kumamoto City, Mt. Aso, Minami-Aso/Kamishikimi, Kurokawa Onsen, Kikuchi Gorge, Amakusa, Hitoyoshi/Kuma River |
| Miyazaki: Where the Sun God Hid and the Horses Run Wild | miyazaki-travel-guide | Takachiho, Miyazaki City/Aoshima, Nichinan, Ebino/Aya, Cape Toi/Hyuga |
| Kagoshima: Where the Mainland Finally Runs Out of Land | kagoshima-travel-guide | Kagoshima City, Sakurajima, Ibusuki, Chiran, Kirishima, Yakushima, Amami Oshima |
| Aomori: Where Winter Invented Its Own Festival | aomori-travel-guide | Aomori City, Hirosaki, Towada/Oirase, Juniko, Hakkoda, Shimokita, Asamushi/Museum |
| Iwate: Where the Mountains Lean Against the Pacific | iwate-travel-guide | Morioka/Koiwai, Hiraizumi, Sanriku coast, Geibikei, Hanamaki, Tono, Hachimantai/Iwate-san, Ryusendo |
| Miyagi: The Coast, the Castle, and Sendai Between Them | miyagi-travel-guide | Sendai, Akiu Onsen, Matsushima, Shiogama, Kinkasan, Naruko, Shiroishi |
| Yamagata: Cherries, Sacred Mountains, and Snow That Eats the Trees | yamagata-travel-guide | Yamagata City, Yamadera, Zao/Kaminoyama, Ginzan, Dewa Sanzan, Mogami Gorge, Sakata, Tendo |
| Akita: Snow Country, Rice Country, and Monsters on New Year's Eve | akita-travel-guide | Akita City, Kakunodate/Tazawa/Inaniwa, Nyuto/Dakigaeri, Towada/Hachimantai, Moriyoshi, Shirakami, Oga, Yokote |
| Fukushima: Three Regions, One Prefecture, No Simple Story | fukushima-travel-guide | Fukushima City/Iizaka, Bandai/Goshikinuma, Aizu-Wakamatsu, Ouchi-juku, Kitakata, Iwaki, Abukuma Cave, Miharu |
| Ehime: Islands, Castles, and the Road That Goes Between | ehime-travel-guide | Matsuyama/Dogo, Shimanami Kaido, Uchiko, Ozu, Uwajima, Besshi/Niihama, Shikoku Karst, Cape Sada/Omishima |
| Kochi: The Wild Coast That Japan Forgot to Tame | kochi-travel-guide | Kochi City, Godaisan, Niyodo River, Ryugado/Anpanman, Nakatosa, Shimanto, Cape Ashizuri/Muroto, Noichi Zoo |
| Tokushima: Whirlpools, the Valley That Time Missed, and Japan's Loudest Dance | tokushima-travel-guide | Tokushima City, Naruto, Iya Valley, Oboke, Ochiai, Udatsu, Tairyuji, Ryozenji |

---

## blog_posts テーブルスキーマ

| カラム | 型 | 内容・生成ルール |
|---|---|---|
| slug | text | URLスラッグ（例: best-ryokan-tohoku） |
| title | text | 記事タイトル |
| description | text | **SEOメタ説明文。BRIEF とタイトルから生成。140–160文字。検索意図を意識した具体的な文言** |
| read_minutes | int | **本文全体の文字数から推定。目安: 5〜15分。15を超えないこと** |
| cover_image | text | **INSERT時は必ず `null` にする。画像アップロード後に UPDATE で設定すること。URLを仮置きすると壊れた画像が表示される** |
| intro | text | **リード文。2〜3文。記事の問いかけ・価値を端的に示す。禁止ワード不使用** |
| sections | jsonb | セクション配列（下記参照） |
| cta_heading | text | **CTA見出し。15語以内。読者に次のアクションを促す短いフレーズ** |
| cta_body | text | **CTA本文。1〜2文。tobira のスポット検索・プランナーへ誘導** |
| related_region | text | 関連リージョン（null可） |
| status | text | 'published' |
| published_at | timestamptz | now() |

---

## sections JSONB構造（上限8セクション + closing 1セクション）

**制約:**
- 場所セクションは最大8つ（closing除く）
- 同じ都道府県の場所を2つ以上入れない（1記事1県まで）
- `spot_query` はDBに存在しない可能性がある小さな町では画像・スポットカードが表示されないことがある

```json
[
  {
    "heading": "セクション見出し（場所名だけでなく視点を込める）",
    "travel_time": "2.5 hrs from Tokyo by Shinkansen",
    "best_season": "Apr–May for cherry blossoms · Oct–Nov for autumn colour",
    "body": "段落1\n\n段落2\n\n段落3（各段落200〜300文字）",
    "spot_query": { "address_contains": "都市名（部分一致・短すぎる名前は誤マッチに注意）", "prefecture": "都道府県名（必須・誤マッチ防止）", "categories": ["記事テーマに合うカテゴリ"], "limit": 3 },
    "section_link": { "text": "Explore XX", "href": "/guides/prefecture-lowercase" }
  },
  {
    "heading": "How to Choose",
    "body": "締めの文章（spot_queryとsection_linkは不要）"
  }
]
```

**フィールド補足:**
- `travel_time`: 主要都市からのアクセス時間。Brief に指示がある場合は必須、なければ省略可
- `best_season`: ベストシーズン。複数シーズンある場合は `·` 区切りで記述。省略するとDBのspot値が自動表示される
- `spot_query`: 特定の都市・エリアを扱うセクションに追加。締めセクションには不要
  - **`address_contains` は部分一致（ilike）なので短い地名は誤マッチしやすい。`prefecture` を必ず併用すること**（例: "Ise" → "Daisen" にもマッチする。`prefecture: "Mie"` で防ぐ）
  - 例: `{"address_contains": "Kanazawa", "prefecture": "Ishikawa", "limit": 3}`
  - 例: `{"address_contains": "Ise", "prefecture": "Mie", "limit": 3}`
  - **注意: 「会津若松」は `address_contains: "Aizu"` を使うこと（"Aizu-Wakamatsu" はDBにマッチしない場合がある）**
  - `categories` を追加すると、そのカテゴリのスポットだけに絞り込まれる（例: 歴史的な街なら `"categories": ["history"]`、温泉なら `"categories": ["onsen"]`）。記事テーマに合わせて全セクション統一すること
  - 例: `{"address_contains": "Nara", "prefecture": "Nara", "categories": ["history"], "limit": 3}`
  - 利用可能なカテゴリ: `nature`, `history`, `onsen`, `food`, `activity`, `spiritual`
  - 都道府県名の英語表記: Hokkaido, Aomori, Akita, Iwate, Miyagi, Yamagata, Fukushima, Ibaraki, Tochigi, Gunma, Saitama, Chiba, Tokyo, Kanagawa, Niigata, Toyama, Ishikawa, Fukui, Yamanashi, Nagano, Shizuoka, Aichi, Mie, Shiga, Kyoto, Osaka, Hyogo, Nara, Wakayama, Tottori, Shimane, Okayama, Hiroshima, Yamaguchi, Tokushima, Kagawa, Ehime, Kochi, Fukuoka, Saga, Nagasaki, Kumamoto, Oita, Miyazaki, Kagoshima, Okinawa
- `section_link`: `spot_query` と同じタイミングで追加

**closing セクションの見出し例:**（記事の内容に応じて選ぶ）
- "How to Choose"（行き先選びの締め）
- "How to Plan Your Route"（ルート・移動の締め）
- "When to Go"（シーズン全体まとめ）
- "Practical Notes"（アクセス・費用などまとめ）

`section_link` の `href` に使える prefecture 値:

```
hokkaido, aomori, iwate, miyagi, akita, yamagata, fukushima,
ibaraki, tochigi, gunma, saitama, chiba, tokyo, kanagawa,
niigata, toyama, ishikawa, fukui, yamanashi, nagano, shizuoka,
aichi, mie, shiga, kyoto, osaka, hyogo, nara, wakayama,
tottori, shimane, okayama, hiroshima, yamaguchi,
tokushima, kagawa, ehime, kochi,
fukuoka, saga, nagasaki, kumamoto, oita, miyazaki, kagoshima, okinawa
```

---

## SQL 出力時の注意（必ずチェック）

- 文中の `'`（シングルクォート）は `''`（2個）にエスケープする
- body の改行は `\n` で表現する
- sections は末尾に `::jsonb` キャストをつける

**出力前チェックリスト:**
- [ ] 禁止ワード（nestled / breathtaking / must-visit / hidden gem）未使用
- [ ] British English（travelling, colour 等）
- [ ] Brief の指示をすべて反映済み
- [ ] 既存記事との完全重複なし
- [ ] 全セクションに spot_query + section_link あり（closing除く）
- [ ] spot_query に address_contains・prefecture・categories がすべて入っているか
- [ ] シングルクォートを `''` でエスケープ済み
- [ ] sections に `::jsonb` 付き

---

## 出力形式

以下の SQL INSERT 文を出力すること:

```sql
insert into blog_posts (
  slug, title, description, read_minutes, cover_image,
  intro, sections, cta_heading, cta_body, related_region, status, published_at
)
values (
  '{SLUG}',
  '{TITLE}',
  '{DESCRIPTION}',
  {READ_MINUTES},
  null,
  '{INTRO}',
  '[...sections JSON...]'::jsonb,
  '{CTA_HEADING}',
  '{CTA_BODY}',
  null,
  'published',
  now()
);
```

---

## 公開手順

1. **SQL Editor で INSERT 実行**
   Supabase Dashboard → SQL Editor に上記 INSERT 文を貼り付けて実行

2. **カバー画像をアップロード**
   Supabase Dashboard → Storage → `spot-images/blog/` にファイルをアップロード
   URL 形式:
   ```
   https://YOUR_PROJECT_REF.supabase.co/storage/v1/object/public/spot-images/blog/{ファイル名}
   ```

3. **カバー画像 URL を UPDATE**
   ```sql
   update blog_posts
   set cover_image = '{画像URL}'
   where slug = '{SLUG}';
   ```

4. **本番で確認**
   `https://tobira-travel.com/blog/{SLUG}`

5. **このファイルの既存記事リストに追加**
   上記「既存記事との重複確認」テーブルに今回の記事を1行追記する

---

## 使い方

このファイルを丸ごと AI に渡し、以下を書き換えるだけ:

| 変数 | 例 |
|---|---|
| `{TITLE}` | Best Ryokan in Tohoku |
| `{SLUG}` | best-ryokan-tohoku |
| `{BRIEF}` | ターゲット: 2回目訪日者。東北の隠れた温泉旅館を紹介。アクセス・価格帯・ベストシーズンを各セクションに含める。 |
| `{COVER_IMAGE_URL}` | INSERT時は常に `null`。画像アップロード後に UPDATE で設定 |
