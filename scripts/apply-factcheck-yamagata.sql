-- apply-factcheck-yamagata.sql
-- ファクトチェック結果に基づく修正（Codex by GPT-5.4）

-- yamagata-kajo-park: アクセス・営業時間・tips を修正
UPDATE spots SET
  access = 'JR Yamagata Station: about 10 minutes on foot / about 15 minutes on foot from the east exit to the East Great Gate; Benichan Bus to "Kajo Koen-mae" is also available.',
  opening_hours = 'Park: 5:00–22:00 (Apr 1–Oct 31), 5:30–22:00 (Nov 1–Mar 31); East Great Gate turret: seasonal public opening only (FY2025: Apr 5–Nov 3, 9:30–16:00; Jul–Aug until 17:00)',
  tips = 'For cherry blossoms, aim for early to mid-April rather than late April. If you want to enter the East Great Gate turret, check the current seasonal opening schedule before visiting. Bunshokan also pairs well nearby.'
WHERE id = 'yamagata-kajo-park';

-- yamagata-bunshokan: 入場料・アクセス・営業時間・tips を修正
UPDATE spots SET
  admission = 'Free',
  access = 'From JR Yamagata Station, take a route bus via City Hall and get off at "Shiyakusho-mae", then walk 1 minute; about 10 minutes by car from Yamagata-Zao IC.',
  opening_hours = '9:00–16:30; closed on the 1st and 3rd Monday of each month (or the following day if Monday is a holiday), and 29 Dec–3 Jan',
  tips = 'Admission is free, and free volunteer guides are available. Visit during opening hours if you want to see the interior details rather than only the exterior; Bunshokan combines well with nearby Kajo Park.'
WHERE id = 'yamagata-bunshokan';

-- yamagata-imoni-festival: 入場料・アクセス・営業時間・tips を修正
UPDATE spots SET
  admission = 'Free to enter; giant-pot imoni requires a sponsorship ticket (2025: advance-reservation tickets from ¥600, same-day tickets from ¥700). Paid reserved seating is separate.',
  access = 'Festival site: Mamigasaki riverbed near Sogetsu Bridge. From JR Yamagata Station East Exit, take a Yamakobus bound for Numanobe and get off at "Yamagata Shobosho-mae". Private cars must use designated parking lots and shuttle buses; there is no parking at the venue.',
  opening_hours = 'Held once a year in September; date and schedule vary by year. Official 2025 schedule: ticket distribution from 8:30, serving from 9:20 until sold out.',
  tips = 'Check the official festival site for the exact annual date and ticketing rules before visiting. Arrive early if using same-day tickets, and do not plan to drive directly to the venue — on-site parking is unavailable.'
WHERE id = 'yamagata-imoni-festival';

-- yamagata-cherry-picking: 入場料・アクセス・営業時間・tips を修正
UPDATE spots SET
  admission = 'Varies by orchard and season. Official 2025 examples range from about ¥1,800 to ¥2,500 for adults for 30-minute all-you-can-eat cherry picking.',
  access = 'Access varies by orchard. Official Yamagata tourism listings show orchards across Kaminoyama, Tendo, Higashine, Sagae and other areas, usually reached by car from the nearest station; confirm the orchard-specific access when booking.',
  opening_hours = 'Varies by orchard and crop conditions. Official 2025 examples include 8:00–17:00 and 9:00–16:00 / 17:00; many orchards open from early June to early July.',
  tips = 'Advance reservation or prior contact may be required. Opening dates, hours and prices can change depending on growing conditions, so contact the orchard directly before visiting.'
WHERE id = 'yamagata-cherry-picking';

-- zao-snow-monsters: 入場料・アクセス・営業時間・tips を修正
UPDATE spots SET
  admission = 'Zao Ropeway to Jizo Sancho: adults ¥4,400 round trip / ¥2,200 one way; children ¥2,200 round trip / ¥1,100 one way.',
  access = 'From JR Yamagata Station East Exit, take a bus bound for Zao Onsen (about 40 minutes), get off at Zao Onsen Bus Terminal, walk about 15 minutes to Zao Ropeway Sanroku Station, then take the ropeway to Juhyo Kogen and Jizo Sancho.',
  opening_hours = 'Snow monster season: typically late December to late February (best viewing around late December to mid-February, depending on conditions). Ropeway hours: Sanroku Line 8:30–17:00, Sancho Line 8:45–16:45; last uphill round-trip departure to Jizo Sancho is 16:00. Light-up events are typically held on selected dates, 17:00–21:00, with last uphill departure 19:50.',
  tips = 'Check ropeway operation and weather conditions before visiting. Visibility and growth vary with the weather, and temperatures can fall below -10°C. Light-up dates are limited and should be confirmed on the official site before planning.'
WHERE id = 'zao-snow-monsters';

-- fact_checked_at を更新
UPDATE spots SET fact_checked_at = NOW()
WHERE id IN (
  'yamagata-kajo-park',
  'yamagata-bunshokan',
  'yamagata-imoni-festival',
  'yamagata-cherry-picking',
  'zao-snow-monsters'
);
