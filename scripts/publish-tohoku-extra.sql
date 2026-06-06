-- seed-tohoku-extra.sql で追加した青森5件を一覧に表示する
UPDATE spots
SET is_published = true
WHERE id IN (
  'aomori-museum-of-art',
  'aomori-furukawa-fish-market',
  'towada-art-center',
  'hakkoda-ropeway-sukayu',
  'asamushi-onsen'
);
