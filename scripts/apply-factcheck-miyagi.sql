-- apply-factcheck-miyagi.sql
-- ファクトチェック結果に基づく修正（Codex by GPT-5.4）

UPDATE spots SET
  access = '5-minute walk from JR Sendai Station West Exit; 1-minute walk from Sendai Subway Station West-1 Exit.',
  opening_hours = 'Hours vary by shop; check the official site for monthly closing days. Many shops close on Sundays and public holidays, though some may open.',
  tips = 'Check the official monthly closing-day notice and individual shop pages before visiting, as business days and hours vary by store.'
WHERE id = 'sendai-asaichi-market';

UPDATE spots SET
  access = 'From Sendai Station, take the JR Senseki Line to Higashi-Shiogama Station, then walk 15 minutes to the market.',
  opening_hours = 'Tue, Thu, Fri 6:00–13:00; Sat, Sun, Mon and public holidays 6:00–14:00; closed Wednesdays.',
  tips = 'Visit early in the day for the fullest market activity. The market officially offers My Kaisendon and other on-site dining options.'
WHERE id = 'shiogama-seafood-market';

UPDATE spots SET
  admission = 'Free to enter; workshop fees vary by studio and activity.',
  access = 'From Sendai Station bus stop 63, take the Kawasakimachi-bound bus (about 40 minutes) and get off at Akiu Kogei no Sato; the stop is directly in front of the site.',
  opening_hours = 'No overall closing day, but each studio has its own schedule and some workshops operate only on selected days.',
  tips = 'Contact each studio directly for workshop details, fees, available dates, and reservations.'
WHERE id = 'akiu-crafts-village';

UPDATE spots SET
  admission = '¥2,400 (adults), ¥1,700 (middle/high school students), ¥1,200 (elementary school students), ¥700 (ages 4+), free for children under 4; seniors 65+ ¥1,800.',
  access = 'From Sendai Station, take the JR Senseki Line to Nakanosakae Station (about 18 minutes), then walk about 15 minutes or take the Miyako Bus to the aquarium.',
  opening_hours = 'Hours vary by season; for example, 11/4–3/19 the aquarium is open 10:00–17:00 (last entry 16:30). Check the official calendar for the visit date.',
  tips = 'Buying tickets online in advance lets you skip the ticket counter and enter directly.'
WHERE id = 'sendai-umino-mori-aquarium';

UPDATE spots SET
  admission = 'Free for the castle ruins grounds. Sendai Castle Kenbunkan is free; the nearby Aoba Castle Museum charges ¥770 for adults.',
  access = 'From Sendai Station, take the Loople Sendai bus to Sendai Castle Ruins (about 23 minutes), or take the Tozai Subway Line to International Center Station and walk about 20 minutes to the main enclosure.',
  opening_hours = 'Castle ruins grounds are accessible 24 hours. Sendai Castle Kenbunkan is open 9:00–17:00 year-round.',
  tips = 'The 100 Famous Castles stamp is available at Sendai Castle Kenbunkan (9:00–17:00, free). Expect traffic around the site during New Year holidays, Golden Week, and on August 15.'
WHERE id = 'sendai-castle-ruins';

UPDATE spots SET fact_checked_at = NOW()
WHERE id IN (
  'sendai-asaichi-market',
  'shiogama-seafood-market',
  'akiu-crafts-village',
  'sendai-umino-mori-aquarium',
  'sendai-castle-ruins'
);
