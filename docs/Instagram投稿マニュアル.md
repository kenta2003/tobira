# Instagram 投稿マニュアル

Tobira の Instagram 半自動投稿システムの操作手順。

---

## 概要

テーマ（例:「北海道の絶景5選」）を選ぶと、DBから最適なスポットを自動選出してカルーセル投稿用のドラフトを作成。承認後に Instagram に投稿する。

**フロー:**
```
テーマ選択 → プレビュー（スポット確認）→ 生成 → 承認 → 投稿
```

---

## 管理UIへのアクセス

```
https://tobira.travel/admin/instagram?secret=INSTAGRAM_ADMIN_SECRET
```

`INSTAGRAM_ADMIN_SECRET` は Vercel 環境変数に設定した値。

---

## 投稿手順

### 1. テーマを選ぶ

画面右上のドロップダウンからテーマを選択。

| テーマ種別 | 例 |
|---|---|
| 地域 | 北海道の絶景5選、東北の自然5選、関西の歴史5選 など |
| 季節 | 春の絶景5選、冬の秘湯5選 など |
| カテゴリ | 日本の名湯5選、秘境パワースポット5選 など |
| アクセス | 車なしで行ける絶景5選 |

### 2. プレビューで確認

「プレビュー」ボタンを押すと、選出されるスポット一覧が表示される（ドラフトはまだ作成されない）。

- スポット名・都道府県・カテゴリを確認
- 不満があればテーマを変えて再プレビュー
- OKなら「✓ 生成」を押す

### 3. 生成

「✓ 生成」を押すと:
1. スポットスライド画像（1080×1440）を生成
2. Supabase Storage にアップロード
3. キャプション・ハッシュタグを自動生成
4. DB に `status: draft` で保存

完了するとドラフト一覧に表示される。

### 4. 承認

左のリストからドラフトを選択。

- **Carousel Preview** でスライドを確認
- **Caption** テキストを必要に応じて編集 → 「保存」
- 問題なければ「**承認**」ボタンを押す → `status: approved` になる

### 5. 投稿

「**Instagram に投稿 ↑**」ボタンを押す。確認ダイアログが出るので OK を押す。

成功すると `status: published` になり、投稿URLが表示される。

---

## エラー時の対処

### failed になった場合

ドラフトを選択すると「**再試行 ↑**」（オレンジ）ボタンが表示される。押すだけで再投稿できる（DBから削除不要）。

### 主なエラーと原因

| エラー | 原因 | 対処 |
|---|---|---|
| `API access blocked (code 200)` | アクセストークン期限切れ | トークンを更新（後述） |
| `An unexpected error has occurred (is_transient: true)` | Instagram サーバー一時障害 | 数分待って再試行 |
| `Only photo or video can be accepted` | 画像URLが Instagram から取得できない | Supabase Storage の URL を確認 |
| `Media not ready` | コンテナ作成直後に publish した | 自動で5秒待つ処理あり、再試行で解消 |
| `Draft must be approved` | approved でないドラフトを投稿しようとした | 承認してから投稿 |

---

## アクセストークンの更新

トークンは **60日で失効**する。失効すると `API access blocked` エラーが出る。

### 手順

1. [Meta for Developers — Graph API Explorer](https://developers.facebook.com/tools/explorer/) を開く
2. アプリを選択し、以下の権限をチェック:
   - `instagram_basic`
   - `instagram_content_publish`
   - `pages_read_engagement`
3. **Generate Access Token** で短期トークンを取得

4. ターミナルで長期トークン（60日）に変換:
```bash
curl "https://graph.instagram.com/access_token?grant_type=ig_exchange_token&client_id=YOUR_APP_ID&client_secret=YOUR_APP_SECRET&access_token=SHORT_TOKEN"
```

5. Vercel ダッシュボード → Settings → Environment Variables → `INSTAGRAM_ACCESS_TOKEN` を更新
6. **Redeploy**（変数変更はデプロイが必要）

---

## テーマ一覧

`src/lib/instagram/themes.ts` で管理。

| theme_key | タイトル | 種別 | フィルター |
|---|---|---|---|
| hokkaido-best | 北海道の絶景スポット5選 | 地域 | region=hokkaido, nature |
| tohoku-nature | 東北の自然スポット5選 | 地域 | region=tohoku, nature |
| kanto-hidden | 関東の穴場スポット5選 | 地域 | region=kanto |
| kansai-history | 関西の歴史スポット5選 | 地域 | region=kinki, history |
| kyushu-best | 九州の絶景スポット5選 | 地域 | region=kyushu, nature |
| okinawa-beaches | 沖縄の絶景ビーチ5選 | 地域 | region=okinawa, nature |
| chugoku-gems | 中国地方の隠れた名所5選 | 地域 | region=chugoku |
| shikoku-spiritual | 四国のパワースポット5選 | 地域 | region=shikoku, spiritual |
| spring-nature | 春に行きたい絶景スポット5選 | 季節 | season=spring, nature |
| summer-nature | 夏に行きたい絶景スポット5選 | 季節 | season=summer, nature |
| autumn-foliage | 秋の紅葉スポット5選 | 季節 | season=autumn, nature |
| winter-onsen | 冬の秘湯5選 | 季節 | season=winter, onsen |
| best-onsen | 日本の名湯5選 | カテゴリ | category=onsen |
| spiritual-gems | 日本の秘境パワースポット5選 | カテゴリ | category=spiritual |
| food-adventures | 食で旅する日本5選 | カテゴリ | category=food |
| history-journey | 日本の歴史スポット5選 | カテゴリ | category=history |
| car-free-spots | 車なしで行ける絶景5選 | アクセス | JR/電車/バス/徒歩キーワード |

---

## スポット選出アルゴリズム

### フェーズ1: ハードフィルター（順番に適用）

1. `region` — 地域が一致するスポットのみ
2. `category` — カテゴリ完全一致のみ
3. `requireCategories` — リストのいずれか1つのカテゴリを持つスポットのみ（例: nature → 動物園・活動施設を除外）
4. `excludeCategories` — 指定カテゴリを持つスポットを除外
5. `season` — `best_season` が指定シーズンに合うスポットのみ
6. `accessKeywords` — access フィールドにキーワードが含まれるスポットのみ

### フェーズ2: スコアリング

```
スコア = instagram_priority × 3 + 完全一致ボーナス(0 or 2)
```

- **`instagram_priority`**: Spotテーブルのカラム（0/1/2）
  - `2` = SNS映え最高（絶景、滝、火山など）
  - `1` = 良いスポット（城、温泉街、文化施設など）
  - `0` = SNS不向き（食市場、港など）
- **完全一致ボーナス**: スポットの全カテゴリが `requireCategories` 内に収まる場合 +2点

スコア降順でソートして上位 `maxCount`（通常5）件を選出。

### instagram_priority の更新方法

スポットに対して priority を変更したい場合は Supabase で直接 UPDATE:

```sql
UPDATE spots SET instagram_priority = 2 WHERE id = 'spot-id';
```

---

## スライド構成

```
[1] 表紙: テーマタイトル + tagline（背景: スポット1の写真）
[2] スポット1: 写真 + 地域・名前・説明
[3] スポット2
[4] スポット3
[5] スポット4
[6] スポット5
```

画像サイズ: **1080×1440px（3:4比率）**

Supabase Storage に保存されるパス:
```
instagram-assets/{theme_key}/{timestamp}-cover.png
instagram-assets/{theme_key}/{timestamp}-{spot_id}.png
```

---

## 重複投稿の防止

同じ `theme_key` が DB に存在する場合、`generate` API は重複インサートをブロックする（`theme_key UNIQUE` 制約）。

同テーマを再生成したい場合は Supabase で手動削除:
```sql
DELETE FROM instagram_drafts WHERE theme_key = 'hokkaido-best';
```

または管理UIの Supabase から直接削除する。

---

## 環境変数（Vercel）

| 変数名 | 説明 |
|---|---|
| `INSTAGRAM_ACCESS_TOKEN` | 長期アクセストークン（60日有効） |
| `INSTAGRAM_BUSINESS_ACCOUNT_ID` | Instagram Business Account ID |
| `INSTAGRAM_ADMIN_SECRET` | 管理UI・API認証用シークレット |
