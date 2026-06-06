# Tobira — 日本観光スポット ガイドサービス

地域・季節・カテゴリで日本各地の観光スポットを探せる、地図ベースの観光ガイド Web アプリケーション。

**3行サマリ**
- 個人開発で**構想 → 設計 → 実装 → 決済・SNS・SEO 運用まで一気通貫**で構築した、Next.js + Supabase + Stripe ベースの観光ガイドサービス
- 集客の運用負荷を抑えるため、**Instagram カルーセル投稿の半自動生成パイプライン**（テーマ定義 → スポット選出 → 動的画像生成 → ドラフト → 承認 → 投稿API）を独自実装
- スポット情報（入場料・営業時間・アクセス）の信頼性担保のため、**一次情報ベースのファクトチェック運用フロー**を半自動化

> 本プロジェクトは個人開発のポートフォリオです。サービス自体は現在停止しています。ローカル環境（`npm run dev`）での動作確認が可能です。

## デモ動画


https://github.com/kenta2003/tobira/raw/main/docs/demo.mp4


([`docs/demo.mp4`](docs/demo.mp4) からダウンロード再生も可能)

---

## 1. 作成物の説明（目的・背景）

### 個人的な動機
長期インターンでサイト実装・LP 制作・SEO 対策などのプロジェクトを任せていただく中で、**今後より主導的にプロジェクトを動かしていく上で、各工程の解像度を上げたい**という思いがあった。インターンでは分業されている領域（プロダクト設計 / バックエンド / 決済 / SNS 運用 / SEO / 情報の継続的な品質担保）を、サービス構想 → 設計 → 実装 → 集客・運用まで一人で一気通貫でやり切ることで統合的に経験するため、自発的に個人プロジェクトを立ち上げた。

### 取り組んだ市場課題
日本の既存観光メディアは「ランキング順の羅列」や「行ったことのある人だけが知っている情報」に偏っており、旅行者が自分の関心（季節・カテゴリ・移動可能エリア）に合うスポットへ辿り着くまでのコストが高い、という課題があった。

### 目的
「地図 × 多軸フィルタ × 一次情報ベースの情報品質」を軸に、旅行者が短時間で行きたいスポットを発見できる体験を構築する。閲覧体験だけでなく、運営側（情報の継続更新、SNS による集客、SEO 対応）まで含めて設計する。

### 主な機能
- **マップ検索**: 日本地図上で地域・都道府県をクリックしてスポット一覧へ
- **多軸フィルタ**: 地域 × カテゴリ（自然 / 歴史 / 温泉 / 食 / アクティビティ / スピリチュアル）× 季節
- **スポット詳細**: 入場料・営業時間・アクセス・所要時間・現地での Tips を一次情報ベースで掲載
- **ブログ記事**: 都道府県横断のリスト記事 + 都道府県深掘りガイド
- **プレミアム プラン**: Stripe Checkout / Customer Portal によるサブスクリプション
- **Instagram 半自動投稿**: テーマ定義 → スポット自動選出 → 画像生成 → ドラフト保存 → 管理画面で承認 → 投稿API、までを一連のパイプラインで提供
- **写真収集パイプライン**: Pexels / Wikimedia Commons API からの候補取得・CLI 承認・Storage アップロード
- **ファクトチェック運用**: スポット情報の一次情報検証 → SQL 自動生成 → DB 反映、までを半自動化

---

## 2. 自身が担当した役割

個人開発のため、要件定義から運用設計まで全工程を担当。主な実装範囲は以下。

### 設計
- ドメインモデル設計（Spot / Region / Category / BlogPost / InstagramDraft）
- データベース スキーマ設計（PostgreSQL / Supabase）+ Row Level Security ポリシー設計
- ディレクトリ構成（機能/ドメイン単位での分割）
- API ルート設計（Server Actions と Route Handler の使い分け）

### 実装
- **フロントエンド**: 全ページ（トップ / 地図 / スポット一覧・詳細 / ブログ / 管理画面 / 決済導線）
- **地図 UI**: react-simple-maps + TopoJSON によるインタラクティブ日本地図
- **バックエンド**: Supabase クライアント実装（SSR / Client / Admin の3層分離）、Stripe Webhook 処理
- **Instagram 自動投稿システム**: テーマ定義、スポット選出ロジック、`@vercel/og` による 1080×1440 画像動的生成、Graph API クライアント、管理画面
- **写真パイプライン**: Pexels / Wikimedia API クライアント、CLI による承認 UI、Supabase Storage アップロード
- **ファクトチェック ワークフロー**: 未検証スポット抽出、検証レポートから UPDATE 文を生成するパーサ
- **インフラ**: Vercel デプロイ、Supabase プロビジョニング、CSP / 各種セキュリティヘッダ設定

### 運用設計
- スポット情報の継続更新フロー（一次情報検証 → DB 反映）
- 写真の権利クリアランス フロー（Pexels / Wikimedia / Pixta のソース別運用）
- Instagram 投稿の半自動化フロー

---

## 3. 直面した課題と解決方法

### 課題1: Instagram 運用工数の肥大化

**課題**: 集客のため定期的なカルーセル投稿を行う必要があったが、1投稿あたり「テーマ選定 → スポット5件抽出 → 画像5枚作成 → キャプション → ハッシュタグ」を手作業で行うと30分以上かかっていた。スケールしない。

**解決アプローチ**:
- 「テーマ」を静的データとして定義し、各テーマに `region` / `category` / `season` / `requireCategories` / `excludeCategories` などのフィルタ条件と、`subtitle` / `coverHeadline` などの表示メタを持たせる
- スポット選出を「**ハードフィルター** → **スコアリング** → **slice**」の純粋関数として分離
  - フィルター: 地域 / カテゴリ / 季節 / 必須カテゴリ / 除外カテゴリ / アクセスキーワード
  - スコア: `instagram_priority`（0/1/2）× 3 を主スコア、必須カテゴリ全一致で +2 ボーナス
- 画像生成は `@vercel/og` でサーバーサイドに 1080×1440 のカルーセル画像（表紙 + スポット5枚）を組み立てる動的 OG エンドポイントを実装
- DB にドラフトとして保存 → 管理画面でプレビュー → 承認 → Instagram Graph API へ POST、というフローを構築
- 画像・キャプション生成は、**出力の再現性とランニングコスト**を優先してルールベース（テンプレートエンジン）を採用。LLM API を呼ぶ設計と比較検討した上で、テーマ × スポットの構造が定型化できる本ユースケースではルールベースが品質・コストともに優位と判断した

**結果**: 1投稿の制作時間を 30分 → 約2分 に短縮。

### 課題2: スポット情報の信頼性担保

**課題**: 入場料 / 営業時間 / アクセス情報は季節やリニューアルで変動しやすく、誤情報はサービス信頼を直接損なう。一方で全件を毎月人手で確認するのは現実的でない。

**解決アプローチ**:
- DB に `fact_checked_at` カラムを追加し、未検証スポットを SQL で抽出するスクリプトを用意
- 検証担当者（自分）に未検証スポットの JSON を渡す → 一次情報（公式サイト・観光協会）で `admission` / `access` / `opening_hours` / `tips` の4項目をまとめて検証 → Markdown 形式のレポートに「## SQL更新候補」表（`id | field | 値`）として出力するワークフローを定義
- そのレポートから UPDATE 文を自動生成するパーサを実装し、末尾に `fact_checked_at = NOW()` を追加して Supabase で実行
- 「検証 → 生成 → 適用」を分離することで、属人化を防ぎ将来的に他者へ委譲可能な設計とした

### 課題3: 日本地図 TopoJSON の不規則命名

**課題**: react-simple-maps + TopoJSON で日本地図を描画する際、TopoJSON 内の都道府県名プロパティが「`Kyoto Fu`」「`Tokyo To`」のように `<名前> <接尾辞>` 形式で統一されているのに対し、**北海道だけが `Hokkai Do`**（北海 + 道）と分割されていた。汎用的な接尾辞除去だけでは `Hokkai` という存在しない名前になってしまい、地図とアプリ内のデータが結合できない。

**解決アプローチ**:
- `normalizePrefectureName(nam: string)` を実装し、北海道を**個別ケースとして最初に処理**してから、それ以外を `(To|Fu|Ken|Do)$` の正規表現で接尾辞除去
- 沖縄が背景の海色（`#bfdbfe`）と区別しづらかったため `#c026d3`（fuchsia）に変更
- プロジェクション中心（`[136.5, 34.8]`）とスケール（`1100`）を実測調整し、本州中心の表示に最適化

### 課題4: Server Components から動的 import すると SSR エラー

**課題**: Leaflet / react-simple-maps は `window` 依存があり、Next.js App Router の Server Components から `dynamic(() => import(...), { ssr: false })` を直接呼ぶとビルドが失敗した。

**解決アプローチ**:
- 「Server Component → `'use client'` ラッパー → dynamic import コンポーネント」の3層構造に統一
- 例: `JapanRegionMapWrapper`（`'use client'`）内で `dynamic(() => import('./JapanRegionMap'), { ssr: false })` を呼ぶことで、SSR を完全にスキップしつつサーバーから利用可能とする
- このパターンをプロジェクト規約として文書化

---

## 4. 技術情報

### アーキテクチャ概要

```
[ Browser ]
    │
    ├── Next.js App Router (Vercel)
    │     ├── Server Components (デフォルト)
    │     ├── Client Components ('use client' / 地図・管理画面)
    │     ├── Route Handlers (Stripe Webhook / Instagram API)
    │     └── @vercel/og (OG画像 + Instagram カルーセル動的生成)
    │
    ├── Supabase
    │     ├── PostgreSQL (spots / blog_posts / instagram_drafts)
    │     ├── Auth (RLS ベース)
    │     └── Storage (spot-images / blog images)
    │
    ├── Stripe (Checkout / Customer Portal / Webhook)
    └── Instagram Graph API (Carousel publishing / Insights)
```

### 技術スタック

| レイヤ | 技術 |
|---|---|
| フレームワーク | Next.js 16（App Router, Turbopack） |
| UI ライブラリ | React 19, Tailwind CSS 4, lucide-react |
| 言語 | TypeScript 5 |
| 地図 | react-simple-maps (TopoJSON), Leaflet (詳細ページ) |
| データベース | Supabase (PostgreSQL, RLS, Storage) |
| 認証 | Supabase Auth (`@supabase/ssr`) |
| 決済 | Stripe (Checkout, Customer Portal, Webhook) |
| 動的画像生成 | `@vercel/og` |
| 外部 API | Instagram Graph API, Pexels API, Wikimedia Commons API |
| メール | Resend |
| レート制限 | Upstash Redis |
| テスト | Vitest |
| デプロイ | Vercel (auto deploy from `main`) |

### Instagram カルーセル投稿パイプライン

```
themes.ts (テーマ定義)
    │
    ▼
selectSpots.ts  ── DB から該当スポット取得 → フィルタ → スコアリング → 5件選出
    │
    ▼
generateSlides.ts  ── 表紙1枚 + スポット5枚分の OG エンドポイント URL を組み立て
    │
    ▼
/api/og/instagram-cover, /api/og/instagram-spot
    └── @vercel/og で 1080×1440 PNG を動的生成
    │
    ▼
draftBuilder.ts  ── 画像を Supabase Storage に保存 → instagram_drafts へ INSERT
    │
    ▼
/admin/instagram  ── プレビュー → 承認 → publish エンドポイント
    │
    ▼
Instagram Graph API (Carousel container → publish)
```

### スポット選出ロジック（純粋関数として実装）

| フェーズ | 内容 |
|---|---|
| ハードフィルター | `region` / `category` / `requireCategories` / `excludeCategories` / `season` / `months` / `accessKeywords` |
| スコアリング | `instagram_priority` (0/1/2) × 3 を主スコア、`requireCategories` 全一致で +2 ボーナス |
| 出力 | スコア降順で sort → 上位 N 件を slice |

### セキュリティ設計

- Row Level Security による DB アクセス制御
- 環境変数の厳密な分離（クライアント露出は `NEXT_PUBLIC_` 接頭辞のみ）
- Stripe Webhook の署名検証
- Content-Security-Policy / X-Frame-Options / Referrer-Policy / Permissions-Policy をミドルウェアで一括設定
- Instagram 管理画面は専用シークレットでのアクセス制限
- Upstash Redis によるエンドポイント別レート制限

### コーディング規約

- TypeScript で `any` 禁止、外部データは `unknown` で受けて narrowing
- イミュータビリティ（既存オブジェクトの直接変更を避ける、スプレッドで新オブジェクトを返す）
- React コンポーネントの props は named `interface` / `type`、`React.FC` 不使用
- 1ファイル 200〜400 行を目安に機能/ドメイン単位で分割

---

## 5. ローカル環境での起動

### 前提
- Node.js 20 以上
- npm
- Supabase プロジェクト（無料枠で可）

### 手順
```bash
# 依存関係のインストール（peer deps 競合回避のため legacy フラグ必須）
npm install --legacy-peer-deps

# 環境変数ファイルの作成
cp .env.example .env.local
# .env.local の NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY を設定

# DB スキーマ・seed 投入
# supabase/ 配下の SQL を Supabase SQL Editor で実行

# 開発サーバー起動
npm run dev
# http://localhost:3000
```

最低限の閲覧（マップ / スポット一覧・詳細 / ブログ）は Supabase 設定のみで動作する。Stripe / Instagram は対応する環境変数を設定したときのみ有効化される。

---

## 6. ディレクトリ構成

```
.
├── src/
│   ├── app/                     # Next.js App Router (pages, layouts, API routes)
│   │   ├── api/                 # Route Handlers (Stripe / Instagram / Contact)
│   │   ├── admin/instagram/     # Instagram 管理画面
│   │   ├── spots/               # スポット一覧・詳細
│   │   └── guides/, blog/, trip/, etc.
│   ├── components/              # UI コンポーネント
│   ├── lib/
│   │   ├── supabase/            # SSR / Client / Admin の3層
│   │   ├── instagram/           # Instagram 投稿パイプライン
│   │   ├── regions.ts, utils.ts # ドメイン ユーティリティ
│   │   └── rate-limit.ts
│   ├── types/                   # 型定義
│   └── middleware.ts
├── scripts/                     # 運用スクリプト (seed / 写真 / ファクトチェック)
├── supabase/                    # SQL マイグレーション / 記事 seed
├── public/                      # 静的アセット (japan.topojson 等)
├── docs/                        # マニュアル / デモ動画
└── strategy/                    # 事業戦略・GTM 設計ドキュメント
```

---

## 7. ライセンス

[MIT](./LICENSE)
