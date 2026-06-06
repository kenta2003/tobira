# スポット ファクトチェック運用フロー

**検証項目（4項目まとめて実施）:** `admission`（入場料）・`access`（アクセス）・`opening_hours`（営業時間）・`tips`（アドバイス）

---

## 1. 未チェックスポットの取得

```bash
cd tobira
node scripts/fetch-unchecked-spots.mjs <region>   # 例: hokkaido, kanto, chubu, kansai, ...
```

- 地域ごとに `factcheck-<region>.json` が保存され、標準出力にも JSON が流れる。
- 取得カラム: `id, name, prefecture, address, access, admission, opening_hours, tips, best_season, website_url, description`

Supabase で直接SQLする場合:

```sql
SELECT id, name, prefecture, address, access, admission, opening_hours, tips, best_season, website_url, description
FROM spots
WHERE prefecture IN ('Kanagawa', 'Saitama', 'Tochigi', 'Tokyo')  -- 対象県に変更
  AND fact_checked_at IS NULL
ORDER BY prefecture, name;
```

---

## 2. エージェントに渡す

- 上記で出力された JSON（または `factcheck-<region>.json`）を japan-tourism-fact-checker に渡す。
- 件数が多い地域はバッチ分割（例: batch1 / batch2）して実行可。

**検証手順（必須）:**

1. **admission** … 入場料・料金を公式・観光協会で検証
2. **access** … 最寄り駅・バス・所要時間を公式・一次情報で検証
3. **opening_hours** … 営業時間・休館日を公式で検証
4. **tips** … 内容が現状と矛盾していないか確認（必要なら公式で補足）

WebSearch → WebFetch で公式URLを取得。取れない場合は ❓ 未確認 として報告。

**出力フォーマット:**

- スポットごとに **admission / access / opening_hours / tips** の4項目を表で記載
- 判定: ✅ 確認済み / ❌ 誤り / ⚠️ 要注意 / ❓ 未確認
- 報告書末尾に **## SQL更新候補** を設け、修正が必要なものだけ次の表形式で列挙:

```markdown
| id | field | 修正後の値（英文） |
|----|--------|---------------------|
| spot-id | admission | ... |
| spot-id | opening_hours | ... |
```

- `field` は `admission` / `access` / `opening_hours` / `tips` のいずれか。4項目どれでも修正があれば行を追加する。

エージェント: **japan-tourism-fact-checker**

---

## 3. 修正をDBに反映

- 報告書の「## SQL更新候補」表から `apply-factcheck-<region>.sql` を生成する:
  ```bash
  echo "-- 参照: spot-factcheck-report-<region>.md" > scripts/apply-factcheck-<region>.sql
  node scripts/extract-factcheck-sql.mjs scripts/spot-factcheck-report-<region>.md >> scripts/apply-factcheck-<region>.sql
  ```
- `extract-factcheck-sql.mjs` は `admission` / `access` / `opening_hours` / `tips` の4項目を表からパースし、UPDATE 文を出力する（引用符は自動エスケープ）。
- 生成した SQL の**末尾に**チェック済みフラグを手動で追加する:

```sql
UPDATE spots SET fact_checked_at = NOW()
WHERE prefecture IN ('対象県...') AND fact_checked_at IS NULL;
```

**SQL の実行方法** は **docs/SQL-RUN-SETUP.md** を参照（Supabase MCP またはローカル `run-sql.mjs`）。

---

## 4. チェック済みフラグ

その地域の修正をすべて反映したら、上記の `UPDATE spots SET fact_checked_at = NOW() ...` を実行する。

---

## 進捗確認クエリ

```sql
SELECT prefecture, COUNT(*) AS total,
  COUNT(fact_checked_at) AS checked,
  COUNT(*) - COUNT(fact_checked_at) AS remaining
FROM spots
GROUP BY prefecture
ORDER BY prefecture;
```

---

## 補足

- 既存の `apply-factcheck-*.sql`（admission/access のみ）や `apply-factcheck-hours-tips.sql`（営業時間・tips 一括）は、過去の別回実施用。**次回以降の新規ファクトチェックは、上記のとおり4項目まとめて取得・検証・適用**する。
- 報告書のファイル名は `spot-factcheck-report-<region>.md`（または batch 付き）を推奨。
