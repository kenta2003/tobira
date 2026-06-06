-- Kagawa spot corrections based on fact-check report

UPDATE spots SET
  access        = 'About 12 minutes on foot from JR Utazu Station. About 10 minutes by car from Sakaide IC; about 5 minutes from Sakaide-kita IC.',
  opening_hours = '9:00–18:00 (last entry 17:30). Extended hours and shortened hours apply on certain dates.',
  tips          = 'The "Twilight Landscape" dolphin pool offers views of the sunset over the Seto Inland Sea with dolphins. Weekends and holidays are crowded; public transport is recommended.'
WHERE id = 'shikoku-aquarium';

UPDATE spots SET
  opening_hours = 'Hours vary by date and season; check the official operating calendar. As of March 29, 2026, park hours are 10:00–20:00.',
  tips          = 'Operating hours, events, and illumination dates vary; check the official calendar and event schedule before visiting. Confirm free shuttle timetables in advance.'
WHERE id = 'new-reoma-world';

UPDATE spots SET
  opening_hours = 'March 1–July 19 and September 1–October 31: 9:30–17:00. July 20–August 31: 9:30–18:00. November 1–end of February: 9:30–16:30. Closed Tuesdays (or next day if Tuesday is a holiday), December 29–January 1, and the fourth Wednesday–Friday of January. Open without closure during certain periods.',
  tips          = 'Spring blooms include cherry blossoms and tulips; autumn features brilliant red kochia. Bicycle rentals available. On weekends and holidays during peak season, rental bicycles may be fully booked by late morning.'
WHERE id = 'sanuki-manno-park';

UPDATE spots SET
  opening_hours = '9:30–17:00 (admission and gallery entry until 16:30). Closed Tuesdays (or next day if Tuesday is a holiday).',
  tips          = 'The museum features traditional buildings and structures relocated from across Shikoku. The contemporary gallery, designed by Tadao Ando, provides striking contrast to the historic architecture.'
WHERE id = 'shikoku-mura-museum';

UPDATE spots SET
  access        = 'About 12 minutes by car from Onohara IC. About 15 minutes from Sanuki Toyonaka IC. About 5 minutes by taxi from JR Kanonji Station. Shared-ride bus service to Kotohiki Park (Moriuchishika stop).',
  opening_hours = 'Open 24 hours year-round for viewing. Illumination runs daily from sunset to 22:00.',
  tips          = 'Best viewed from the Zenizata viewing platform at the summit of Kotohiki Mountain. Illumination runs daily from sunset to 22:00. During peak periods (year-end holidays, Golden Week), parking may be congested; consider parking nearby and walking up.'
WHERE id = 'zenigata-sand-coin';

UPDATE spots SET fact_checked_at = NOW()
WHERE id IN (
  'shikoku-aquarium',
  'new-reoma-world',
  'sanuki-manno-park',
  'shikoku-mura-museum',
  'zenigata-sand-coin'
);
