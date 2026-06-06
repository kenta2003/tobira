# SQL 実行の設定

Supabase に対して SQL を実行する方法は次の3通りです。**MCP でなくても、プラグイン（拡張）やターミナルで問題ありません。**

---

## 方法1: Supabase MCP（Cursor から SQL 実行）

Cursor の AI が「Supabase に SQL を投げる」ようにするには、**Supabase MCP を有効化**します。

### 手順

1. **MCP 設定の確認**  
   プロジェクトの `.mcp.json` にすでに次の設定があります。
   ```json
   {
     "mcpServers": {
       "supabase": {
         "type": "http",
         "url": "https://mcp.supabase.com/mcp?project_ref=YOUR_PROJECT_REF"
       }
     }
   }
   ```

2. **Cursor で Supabase MCP を有効にする**  
   - **Cursor Settings** → **MCP** を開く  
   - 一覧に **Supabase** が出ている場合は ON にする  
   - 出ていない場合は「Add new MCP server」などで、上記 `url`（`project_ref` 付き）を登録

3. **認証（必要な場合）**  
   Supabase MCP によっては、初回実行時にブラウザでログイン（Supabase アカウント連携）を求められます。  
   その場合は指示に従ってログインすると、以降は Cursor から「〇〇のテーブルを取得」「この SQL を実行」などと依頼できます。

4. **実行の仕方**  
   MCP が有効になっていれば、チャットで  
   「`apply-factcheck-batch1.sql` の内容を Supabase で実行して」  
   のように依頼すると、MCP 経由で SQL が実行されます。

---

## 方法2: プラグイン（VS Code / Cursor 拡張）

**Supabase 公式の VS Code 拡張** が使えます。Cursor は VS Code 互換なので、同じ拡張を入れて問題ありません。

### 手順

1. **拡張をインストール**  
   - Cursor で **Extensions**（`Cmd+Shift+X`）を開く  
   - 「Supabase」で検索 → **Supabase**（公式、`Supabase.vscode-supabase-extension`）をインストール

2. **Supabase CLI とリンク（推奨）**  
   拡張は **Supabase CLI** と **ローカル or クラウドのリンク** が前提です。  
   - [Supabase CLI のインストール](https://supabase.com/docs/guides/cli/getting-started)  
   - プロジェクトで `supabase init` → `supabase link --project-ref YOUR_PROJECT_REF` でクラウドにリンク  
   - SQL をマイグレーションとして扱う場合は `supabase migration new ...` で作成し、`supabase db push` で反映

3. **このリポの SQL を流す場合**  
   - リンク済みなら、`apply-factcheck-batch1.sql` などを **マイグレーションとして保存** して `supabase db push` する  
   - または **Supabase Dashboard** の **SQL Editor** に貼り付けて実行（拡張なしでも可）

**拡張のメリット**: スキーマ参照・マイグレーション履歴・Copilot 連携（`@supabase`）が使える。  
**単発で「このファイルを今すぐ実行」** だけしたい場合は、方法3（ローカル実行）や Dashboard の SQL Editor が手軽です。

---

## 方法3: ローカルで SQL ファイルを実行（ターミナル）

MCP も拡張も使わず、**ターミナルから SQL ファイルをそのまま実行**する方法です。

### 前提

- Supabase の **データベース接続文字列（URI）** が必要です。

### 接続文字列の取得

1. [Supabase Dashboard](https://supabase.com/dashboard) でプロジェクト `YOUR_PROJECT_REF` を開く  
2. **Project Settings** → **Database**  
3. **Connection string** の **URI** をコピー  
4. プレースホルダー `[YOUR-PASSWORD]` を、**Database のパスワード**（プロジェクト作成時に設定したもの）に置き換える  

   例:  
   `postgresql://postgres.[ref]:[YOUR-PASSWORD]@aws-0-[region].pooler.supabase.com:6543/postgres`

### 環境変数

`.env.local` に次のどちらかを追加します（**本番のパスワードはコミットしないでください**）。

```bash
# 方法A: 接続 URI をそのまま
SUPABASE_DB_URL="postgresql://postgres.YOUR_PROJECT_REF:あなたのDBパスワード@aws-0-ap-northeast-1.pooler.supabase.com:6543/postgres"

# 方法B: パスワードだけ別（スクリプトで URI を組み立てる場合）
# SUPABASE_DB_PASSWORD=あなたのDBパスワード
```

### 実行コマンド

`pg` を入れたうえで、スクリプトに SQL ファイルを渡します。

```bash
cd tobira
pnpm add -D pg
node scripts/run-sql.mjs scripts/apply-factcheck-batch1.sql
node scripts/run-sql.mjs scripts/apply-factcheck-batch2.sql
node scripts/run-sql.mjs scripts/mark-factchecked-kanto.sql
```

初回は `SUPABASE_DB_URL` が未設定だとエラーになり、設定方法を案内します。

---

## まとめ

| 方法 | 必要な設定 | 用途 |
|------|------------|------|
| **Supabase MCP** | Cursor の MCP で Supabase を有効化（＋必要ならログイン） | チャットから「この SQL 実行して」と依頼したいとき |
| **プラグイン（拡張）** | Supabase 拡張をインストール ＋ CLI で `supabase link`（任意） | スキーマ参照・マイグレーション・Copilot 連携。SQL はマイグレーション or Dashboard で実行 |
| **ローカル実行** | `SUPABASE_DB_URL` を `.env.local` に追加 + `pnpm add -D pg` | ターミナルで `apply-factcheck-*.sql` を確実に流したいとき |

**MCP じゃなくてプラグイン（拡張）でよい？** → はい。Cursor で Supabase 拡張を入れれば、マイグレーションや Dashboard と組み合わせて SQL 実行できます。どれか一つでも、複数組み合わせても構いません。
