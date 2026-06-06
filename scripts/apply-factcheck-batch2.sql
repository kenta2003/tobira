-- ファクトチェック結果に基づく spots 修正（栃木・東京 後半20件）
-- 参照: scripts/spot-factcheck-report-batch2.md

-- 1. 華厳の滝: エレベーター料金・アクセス所要時間
UPDATE spots SET
  admission = '¥600 (elevator, adult)',
  access = 'Bus from Nikko Station (about 50 min to Chuzenji/Kegon Falls)'
WHERE id = 'nikko-kegon-falls';

-- 2. 益子陶芸美術館: 一般600円、アクセス約60分
UPDATE spots SET
  admission = 'Museum ¥600',
  access = 'Bus from Utsunomiya Station (about 60 min), get off at Mashiko Togei Bijutsukan Iriguchi'
WHERE id = 'mashiko-pottery';

-- 3. 那須ハイランド: 本スポットは「那須高原」の自然・温泉エリアを指しており、遊園地「那須ハイランドパーク」とは別。
--    入園料は Free (hiking) のまま。※遊園地の場合は大人1,600円
-- UPDATE spots SET admission = '...' WHERE id = 'nasu-highland';  -- 対象が高原エリアのため変更なし

-- 4. 日光東照宮: 2024年4月改定後の拝観料
UPDATE spots SET
  admission = '¥1,600 (adult), ¥550 (child)'
WHERE id = 'nikko-toshogu';

-- 5. 佐野プレミアムアウトレット: シャトル表記を修正（都心直通バス約90分、佐野駅からは市内バス約15分）
UPDATE spots SET
  access = 'Direct bus from Shinjuku/Tokyo Station (about 90 min); or Sano Station (Tobu Sano Line) then local bus about 15 min'
WHERE id = 'sano-outlet';

-- 6. 栃木市蔵の街: 舟遊び料金・浅草からの所要時間（東武で約2時間35分）
UPDATE spots SET
  admission = 'Free (boat ride adult ¥1,000, child ¥700)',
  access = 'Tochigi Station on Tobu Nikko Line (about 2hr 35min from Asakusa)'
WHERE id = 'tochigi-city-canal';

-- 7. 足利フラワーパーク: 料金幅・アクセス所要時間
UPDATE spots SET
  admission = '¥500–2,300 (adult, seasonal)',
  access = 'Ashikaga Flower Park Station on JR Ryomo Line (about 1hr 30min–2hr from Shinjuku)'
WHERE id = 'ashikaga-flower-park';

-- 8. 根津神社: つつじ苑は祭り期間中のみ有料（300円の情報あり）
UPDATE spots SET
  admission = 'Free (azalea garden ¥300 during Tsutsuji Festival)'
WHERE id = 'nezu-shrine';

-- 9. 築地場外市場: 築地駅から徒歩1分
UPDATE spots SET
  access = '1 min walk from Tsukiji Station (Hibiya Line)'
WHERE id = 'tsukiji-outer-market';
