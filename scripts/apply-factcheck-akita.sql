-- apply-factcheck-akita.sql
-- ファクトチェック結果に基づく修正

-- akita-kanto-festival: 桟敷料金・開演時間・tips を修正
UPDATE spots SET
  admission = 'Free (street viewing); grandstand seats S ¥4,500 / A ¥4,000 / B ¥3,500',
  opening_hours = 'Evening performances: 19:15–21:00 (3–6 August); daytime event: 10:00–15:30 (4–5 August)',
  tips = 'Arrive by 18:30 to secure a good street-side viewing spot. Grandstand seats (S ¥4,500 / A ¥4,000 / B ¥3,500) offer an elevated view and should be booked well in advance. The daytime workshop on 4–5 August lets you try balancing the pole — highly recommended.'
WHERE id = 'akita-kanto-festival';

-- shirakami-sanchi: アクセス・入場料を修正
UPDATE spots SET
  admission = 'Free',
  access = 'From Akita Station, take the JR Gono Line to Juniko Station (approx. 2 hours). From Juniko Station, take a local bus (approx. 15 minutes) then walk 10 minutes to the Juniko trailhead. A rental car from Akita is recommended for accessing remote trail areas.'
WHERE id = 'shirakami-sanchi';

-- inaniwa-udon: アクセス所要時間・営業時間を修正
UPDATE spots SET
  access = 'From Akita Station, take the JR Ou Line to Yuzawa Station (approx. 1.5–1.75 hours), then a local bus or taxi to Inaniwa (approx. 30 minutes). Alternatively, drive from Akita (approx. 1.5 hours via the Akita Expressway).',
  opening_hours = '11:00–17:00 (Sato Yosuke main restaurant; other restaurants vary)'
WHERE id = 'inaniwa-udon';

-- kubota-castle-ruins: 入場料・highlights（平山郁夫→藤田嗣治）を修正
UPDATE spots SET
  admission = 'Free (park); Osumi-yagura turret ¥150 (free for high school students and under)',
  highlights = ARRAY[
    'Seat of the Satake clan for 260+ years — one of Japan''s few castles built without a stone keep.',
    'Reconstructed Osumi-yagura turret with panoramic views over Akita city.',
    'Senshu Park is one of Japan''s top 100 cherry blossom viewing spots.',
    'Adjacent Akita Museum of Art (Foujita Museum) houses major works by Tsuguharu Foujita.'
  ]
WHERE id = 'kubota-castle-ruins';

-- fact_checked_at を更新
UPDATE spots SET fact_checked_at = NOW()
WHERE id IN (
  'akita-kanto-festival',
  'shirakami-sanchi',
  'akita-kiritanpo',
  'inaniwa-udon',
  'kubota-castle-ruins'
);
