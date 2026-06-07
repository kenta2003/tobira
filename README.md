# Tobira — 訪日外国人向け 日本観光ガイドサービス

地域・季節・カテゴリから日本各地の観光スポットを探せる、訪日外国人向けの観光ガイド Web アプリケーション。「春に行きたい場所」「自然を楽しめる場所」「歴史・文化を感じられる場所」など、旅行の目的や時期に応じてスポットを絞り込める。地図上での位置確認に加え、Gemini API を用いて複数の観光スポットを組み合わせたおすすめモデルコースを生成する機能も実装している。

**概要**
- 個人開発で構想 → 設計 → 実装 → 集客・運用まで一気通貫で構築した、Next.js + Supabase + Stripe + Gemini API ベースの観光ガイド Web サービス
- 集客の運用負荷を抑えるため、Instagram カルーセル投稿の半自動生成パイプライン（テーマ定義 → スポット選出 → 動的画像生成 → ドラフト → 承認 → 投稿 API）を独自実装
- AI によるスポット情報生成の品質担保として、「生成 AI による作成 → 確認 AI による一次情報照合 → 人手補完」のファクトチェック フローを構築

> 本プロジェクトは個人開発のポートフォリオです。サービス自体は現在停止しています。ローカル環境（`npm run dev`）での動作確認が可能です。

## デモ動画


https://github.com/kenta2003/tobira/raw/main/docs/demo.mp4


([`docs/demo.mp4`](docs/demo.mp4) からダウンロード再生も可能)

---

## 1. 作成物の説明（目的・背景）

### 目的・背景
長期インターンで旅行領域の LP 制作プロジェクトを主導することになり、Web サイト制作、検索流入の設計、ユーザー導線、コンテンツ改善、運用改善に関する理解をより深めたいと考えた。そこで、LP 単体ではなく、**観光スポット検索・記事コンテンツ・SNS 流入・管理画面・AI によるモデルコース生成までを含む Web サービス**を個人で開発した。実務で得た知識を受け身で学ぶだけでなく、自分で企画から実装、運用改善まで行うことで、ユーザー獲得やサービス改善の全体像を理解することを目的とした。

### 主な機能
- **スポット検索**: 地域 × カテゴリ（自然 / 歴史 / 温泉 / 食 / アクティビティ / スピリチュアル）× 季節の多軸フィルタ
- **地図表示**: 日本地図上で地域・都道府県を選択し、対応スポットへ遷移
- **スポット詳細**: 入場料・営業時間・アクセス・所要時間・現地での Tips を一次情報ベースで掲載
- **AI モデルコース生成**: 条件入力に応じて Gemini API がデータベース内スポットを組み合わせて旅程案を生成
- **ブログ記事**: 都道府県横断のリスト記事 + 都道府県深掘りガイド
- **管理画面**: スポット情報、ブログ記事、Instagram 投稿ドラフトの編集
- **Instagram 半自動投稿**: テーマ定義 → スポット選出 → 動的画像生成 → ドラフト保存 → 承認 → 投稿 API
- **決済**: Stripe Checkout / Customer Portal / Webhook によるサブスクリプション

---

## 2. 自身が担当した役割

個人開発のため、要件定義から運用設計まで全工程を担当。

### 設計
- ドメインモデル設計（Spot / Region / Category / BlogPost / InstagramDraft / Subscription）
- データベース スキーマ設計（PostgreSQL / Supabase）
- API ルート設計（Server Actions と Route Handler の使い分け）
- 検索流入を意識した URL / ページ構造の設計（スポット・記事ごとに独立した SEO ページ）

### 実装
- **フロントエンド**: 全ページ（トップ / 地図 / スポット一覧・詳細 / ブログ / 管理画面 / 決済導線 / AI プランナー UI）。コンポーネント単位での分割と保守性を意識
- **バックエンド**: Supabase クライアント実装（SSR / Client / Admin の3層分離）
- **AI モデルコース生成**: Gemini API クライアント、構造化スポットデータをプロンプトに渡してモデルコース案を生成するロジック、認証 / レート制限 / 月次上限の制御
- **Instagram 自動投稿システム**: テーマ定義、スポット選出ロジック、`@vercel/og` による 1080×1440 画像動的生成、Graph API クライアント、管理画面
- **決済**: Stripe Checkout / Customer Portal / Webhook 処理、Subscription 状態の DB 同期
- **インフラ**: Vercel デプロイ、Supabase プロビジョニング、CSP / 各種セキュリティヘッダ、レート制限（Upstash Redis）

### 運用設計
- スポット情報の継続更新フロー（AI 生成 → AI 検証 → 人手補完）
- 写真の権利クリアランス フロー（Pexels / Wikimedia / Pixta のソース別運用）
- Instagram 投稿の半自動化フロー
- Google Search Console / Instagram Insights による流入分析と改善

---

## 3. 直面した課題と解決方法

### 課題1: 個人開発における運用工数の肥大化
**課題**: 開発、コンテンツ作成、SNS 運用、情報更新、数値確認をすべて一人で行う必要があり、運用工数が大きくなる点が課題であった。

**解決アプローチ**:
- 観光スポット情報をデータベース上で構造化し、Web ページ・地図表示・Instagram 投稿・モデルコース生成のすべてに**再利用可能なデータ構造**として設計
- 一度登録したスポット情報を複数の機能に展開できるようにし、運用負荷を下げた
- 管理画面から各種データを一元的に更新できる構成にした

### 課題2: 流入源の多角化
**課題**: サイトへの流入源をどのように作るかが課題であった。検索流入だけに依存せず、Instagram からの流入経路も必要だった。

**解決アプローチ**:
- 登録済みスポット情報をもとに **Instagram カルーセル投稿のドラフトを半自動生成する機能**を実装
- 投稿テーマの設定 → スポット抽出 → 投稿文生成 → 画像作成 → 管理画面での確認、という流れを構築し、投稿作成にかかる工数を削減
- 画像・キャプション生成は、**出力の再現性とランニングコスト**を優先してルールベース（テンプレートエンジン）を採用。LLM API を呼ぶ設計と比較検討した上で、テーマ × スポットの構造が定型化できる本ユースケースではルールベースが品質・コストともに優位と判断
- Google Search Console / Instagram Insights のインプレッション・クリック数・利用者数の変化を確認し、どのコンテンツや導線が流入に貢献しているかを見ながら改善できるようにした

**結果**: 1投稿の制作時間を 30分 → 約2分 に短縮。

### 課題3: AI 生成情報の品質担保
**課題**: AI で観光スポット情報を作成する際、営業時間・料金・アクセス情報などに誤りが含まれるリスクがあった。

**解決アプローチ**:
- **生成用 AI** でスポット説明文や基本情報を作成
- **確認用 AI** で公式サイト・観光協会などの一次情報と照合し、内容の不一致や不足項目を検出
- 確認結果をもとに修正候補を Markdown レポート（`id | field | 修正後の値` 表）として出力
- そのレポートから UPDATE 文を自動生成するパーサを実装し、`fact_checked_at = NOW()` を付与して Supabase に反映
- 情報が十分に取得できない場合のみ人が確認・補完する設計とし、**個人開発でありながら情報作成の工数削減と公開情報の品質担保を両立**

---

## 4. 技術情報

### アーキテクチャ概要

```
[ Browser ]
    │
    ├── Next.js App Router (Vercel)
    │     ├── Server Components (デフォルト)
    │     ├── Client Components ('use client' / 地図・管理画面)
    │     ├── Route Handlers (Stripe Webhook / Instagram API / AI Planner)
    │     └── @vercel/og (OG画像 + Instagram カルーセル動的生成)
    │
    ├── Supabase
    │     ├── PostgreSQL (spots / blog_posts / instagram_drafts / subscriptions)
    │     ├── Auth
    │     └── Storage (spot-images / blog images)
    │
    ├── Google Gemini API (AI モデルコース生成)
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
| データベース | Supabase (PostgreSQL, Storage) |
| 認証 | Supabase Auth (`@supabase/ssr`) |
| AI（モデルコース生成） | Google Gemini API (`@google/generative-ai`) |
| 決済 | Stripe (Checkout, Customer Portal, Webhook) |
| 動的画像生成 | `@vercel/og` |
| 外部 API | Instagram Graph API, Pexels API, Wikimedia Commons API |
| メール | Resend |
| レート制限 | Upstash Redis |
| テスト | Vitest |
| デプロイ | Vercel (auto deploy from `main`) |

### フロントエンド設計
- 観光スポット一覧・詳細ページ、ブログ記事、管理画面をコンポーネント単位で分割し、保守性を意識
- 検索流入を意識し、観光スポット・記事ごとに独立したページを持たせる構成（SEO 最適化）
- Server Components をデフォルトとし、`window` 依存のある地図 UI は `'use client'` ラッパー経由で `dynamic import` する3層構造に統一

### データベース設計
- 観光スポット・地域・カテゴリ・ブログ記事・Instagram 投稿ドラフト・モデルコース生成に必要な情報をテーブルとして管理
- 各データを外部キーで関連付け、複数機能から同一データを再利用できる構成
- 管理画面から観光スポットや投稿ドラフトを更新できるようにし、Web ページ / Instagram 投稿 / AI モデルコース生成に同じデータを再利用

### AI モデルコース生成（Gemini API）
- ユーザーの条件入力（地域 / 日数 / 興味カテゴリ等）をもとにデータベースから候補スポットを抽出
- スポット名・地域・カテゴリ・説明文などの構造化データをプロンプトに渡し、複数スポットを組み合わせたモデルコース案を生成
- 認証必須 + Upstash Redis でユーザー単位のレート制限（10 req/hour）+ 無料ユーザー向けの月次上限を実装

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

### 決済（Stripe）
- 将来的に有料ガイド・有料コンテンツを提供することを想定し、Stripe Checkout への遷移 / 決済完了後の状態管理 / Webhook による決済結果の受け取りを実装
- Webhook 署名検証を実装し、Subscription 状態を DB に同期
- Customer Portal によりユーザー自身がサブスク管理できる導線を確保

### セキュリティ設計
- 環境変数の厳密な分離（クライアント露出は `NEXT_PUBLIC_` 接頭辞のみ）
- Stripe Webhook の署名検証
- Content-Security-Policy / X-Frame-Options / Referrer-Policy / Permissions-Policy をミドルウェアで一括設定
- Instagram 管理画面・Admin エンドポイントは Supabase 認証 + 管理者 allowlist で保護
- Upstash Redis によるエンドポイント別レート制限

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

最低限の閲覧（マップ / スポット一覧・詳細 / ブログ）は Supabase 設定のみで動作する。Gemini / Stripe / Instagram は対応する環境変数を設定したときのみ有効化される。

---

## 6. ディレクトリ構成

```
.
├── src/
│   ├── app/                     # Next.js App Router (pages, layouts, API routes)
│   │   ├── api/                 # Route Handlers
│   │   │   ├── plan/            # Gemini API モデルコース生成
│   │   │   ├── instagram/       # Instagram 投稿 / Insights
│   │   │   ├── webhooks/stripe/ # Stripe Webhook
│   │   │   └── checkout/        # Stripe Checkout
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
