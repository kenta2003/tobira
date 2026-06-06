-- 東京エリア4県（神奈川・埼玉・栃木・東京）のファクトチェック完了後に実行
-- 修正適用後、全40件の検証が完了した時点で実行すること

UPDATE spots
SET fact_checked_at = NOW()
WHERE prefecture IN ('Kanagawa', 'Saitama', 'Tochigi', 'Tokyo')
  AND fact_checked_at IS NULL;
