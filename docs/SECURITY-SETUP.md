# セキュリティ設定チェックリスト

このドキュメントは、Tobira プロジェクトをセキュアな状態で運用するためのセットアップガイドです。

## デプロイ前に確認すること

### 1. クレデンシャルのローテーション（初回デプロイまたは脆弱性発覚時）

以下のサービスのクレデンシャルが公開または漏洩した場合は、**直ちに以下をローテーション**してください。

| サービス | キー | 更新場所 |
|----------|------|---------|
| Google Gemini | `GEMINI_API_KEY` | [Google AI Studio](https://aistudio.google.com/app/apikey) |
| Supabase | `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` | Supabase ダッシュボード → Settings → API |
| Stripe | `STRIPE_SECRET_KEY` | [Stripe Dashboard](https://dashboard.stripe.com/apikeys) |
| Stripe Webhook | `STRIPE_WEBHOOK_SECRET` | Stripe Dashboard → Webhooks |
| Resend | `RESEND_API_KEY` | [Resend Dashboard](https://resend.com/api-keys) |
| Instagram | `INSTAGRAM_ACCESS_TOKEN` | Meta App Dashboard → Instagram Basics |
| Pexels | `PEXELS_API_KEY` | [Pexels API](https://www.pexels.com/api/) |

### 2. 環境変数の設定（Vercel）

Vercel ダッシュボード → Project Settings → Environment Variables で以下を設定してください：

```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
STRIPE_SECRET_KEY
STRIPE_WEBHOOK_SECRET
STRIPE_PRICE_ID
GEMINI_API_KEY
RESEND_API_KEY
INSTAGRAM_ACCESS_TOKEN
INSTAGRAM_BUSINESS_ACCOUNT_ID
ADMIN_USER_IDS（カンマ区切りのSupabase user IDs）
CRON_SECRET
UPSTASH_REDIS_REST_URL（レート制限用）
UPSTASH_REDIS_REST_TOKEN（レート制限用）
NEXT_PUBLIC_SITE_URL
NEXT_PUBLIC_GA_ID
NEXT_PUBLIC_ADSENSE_CLIENT
NEXT_PUBLIC_ADSENSE_SLOT
PEXELS_API_KEY
```

**重要:** `SUPABASE_SERVICE_ROLE_KEY` と `STRIPE_SECRET_KEY` は **Production 環境のみ**に設定し、Preview/Development には設定しないでください。

### 3. Cron ジョブの認証設定

Instagram 自動投稿の cron `/api/instagram/cron` を保護しています：

1. Vercel ダッシュボードで `CRON_SECRET` を設定してください（強力なランダム文字列推奨）。
2. `vercel.json` の `crons` セクションで `/api/instagram/cron` が定義されていることを確認してください。
3. デプロイ後、設定した `CRON_SECRET` で Authorization ヘッダー `Bearer {CRON_SECRET}` が送信されることを確認してください。

### 4. Admin 機能へのアクセス制御

`/admin/instagram` ページは Supabase 認証でアクセスが制限されています：

1. `ADMIN_USER_IDS` 環境変数に admin ユーザーの Supabase user ID を設定してください（カンマ区切り）。
   - Supabase ダッシュボード → Authentication → Users から user ID を確認できます。
2. Supabase auth provider （メール/パスワード、OAuth等）で admin ユーザーでログインしてからアクセスしてください。

### 5. API 認証・レート制限

レート制限は `@upstash/ratelimit` を使用して実装されています。本番環境では以下の環境変数を設定してください：

```
UPSTASH_REDIS_REST_URL     # Upstash Redis REST API URL
UPSTASH_REDIS_REST_TOKEN   # Upstash Redis REST API トークン
```

#### レート制限の設定値

| エンドポイント | 制限 | 理由 |
|--|--|--|
| `POST /api/user/favorites` | 5 req/min/user | お気に入り操作 |
| `POST /api/user/trips` | 3 req/hour/user | トリップ保存（リソース集約的） |
| `POST /api/leads` | 1 req/5min/IP | リード送信（スパム対策） |
| `POST /api/plan` | 10 req/hour/user | AI プランナー（Gemini API 利用） |
| `POST /api/instagram/*` | 10 req/hour/IP | Instagram API 連携 |

**設定方法:**
1. [Upstash コンソール](https://console.upstash.com) で Redis データベースを作成
2. `UPSTASH_REDIS_REST_URL` と `UPSTASH_REDIS_REST_TOKEN` をコピー
3. Vercel Environment Variables に登録
4. デプロイ後、`curl -I https://tobira-travel.com` でレート制限が動作していることを確認

**開発環境:** 環境変数が設定されていない場合、レート制限はスキップされます（fail open）

### 5.5 入力検証とオープンリダイレクト対策

以下のエンドポイントに入力検証が実装されています：

| エンドポイント | 検証内容 |
|--|--|
| `GET /spots/[id]` | `back` パラメータが相対 URL（`/` 始まり）のみ許可、プロトコル相対 URL（`//` 始まり）は拒否 |
| `POST /api/user/trips` | title（1-200文字）、overview（最大1000文字）、days 配列（1-30）、各dayのオブジェクト構造を検証 |

これらの検証により、オープンリダイレクト攻撃と入力ベースのインジェクション攻撃を防止します。

### 6. セキュリティヘッダー設定

`next.config.ts` にセキュリティヘッダーが実装されています。以下のヘッダーがすべての応答に含まれます：

| ヘッダー | 値 | 目的 |
|---|---|---|
| Content-Security-Policy | `default-src 'self'; script-src 'self' 'wasm-unsafe-eval'; ...` | XSS 対策 |
| X-Frame-Options | SAMEORIGIN | クリックジャッキング対策 |
| X-Content-Type-Options | nosniff | MIME type スニッフィング対策 |
| Referrer-Policy | strict-origin-when-cross-origin | 情報漏洩対策 |
| Permissions-Policy | `geolocation=(), microphone=(), camera=()` | ブラウザ機能の悪用防止 |

**検証方法:**
```bash
curl -I https://tobira-travel.com | grep -E "Content-Security-Policy|X-Frame-Options|X-Content-Type-Options"
```

### 7. ローカル開発での注意

- `.env.local` はクレデンシャルを含むため、**決してコミット、共有、または zip ファイルに含めないでください**。
- `.gitignore` が `.env*` を除外していることを確認してください（現在は正しく設定済み）。
- 開発チームメンバーに `.env.local.example` をコピーして使用するよう指示してください。

## 既知の脆弱性と対応状況

| CVE | パッケージ | 重要度 | 状態 | 対応 |
|-----|-----------|--------|------|------|
| GHSA-mq59-m269-xvcx | next | 高 | ✅ 修正済み | next@16.2.2 へアップグレード |
| GHSA-36jr-mh4h-2g58 | d3-color v2.x | 中 | ⏳ 追跡中 | v3.x で解決、react-simple-maps の更新待ち |

**CVE トラッキング:** d3-color v2.x に ReDoS（Regular Expression Denial of Service）脆弱性が存在します。react-simple-maps が d3-color v3.x にアップグレードされるまで、本フレームワークは影響を受けます。月次で `npm audit` を実行し、アップグレード機会を検証してください。

```bash
# 脆弱性確認
npm audit | grep d3-color

# アップグレード（d3-color v3がリリースされたら）
npm install react-simple-maps@latest
```

## インシデント対応フロー

クレデンシャルが漏洩したと判明した場合：

1. **直ちに該当するキーをローテーション**（上記テーブルを参照）
2. `.env.local` の古いキーを削除
3. Vercel 環境変数を新しいキーで更新
4. デプロイをテスト環境で検証
5. 本番環境にデプロイ

## 定期セキュリティレビュー

毎月以下を実施してください：

- `npm audit` を実行し、脆弱性を確認
- `.env.local.example` が最新のキー一覧を含んでいるか確認
- API ログで異常なアクセスパターンを確認
- Admin 機能へのアクセスログを確認

---

質問や問題がある場合は、CLAUDE.md の「利用可能なエージェント」セクションで `security-reviewer` を使用してください。
