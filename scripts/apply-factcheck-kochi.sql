-- Kochi spot corrections based on fact-check report

UPDATE spots SET
  admission     = 'Free for temple grounds. Garden, treasure hall, and study hall access: ¥800 (adults)',
  access        = 'About 20 minutes by car from Kochi IC. By public transport: from JR Kochi Station, take the MY-YU Bus to Chikurin-ji Shomon Mae or Chikurin-ji Mae stop.',
  opening_hours = 'Temple grounds 8:00–17:00. Garden, treasure hall, and study hall 8:30–17:00. Open year-round.',
  tips          = 'Chikurin-ji is renowned as a autumn foliage viewing spot. Many visitors pray here for academic success.'
WHERE id = 'chikurin-ji-temple';

UPDATE spots SET
  admission     = '¥850 (adults). High school students and younger free. Free also for seniors with Kochi Prefecture/City senior handbook and holders of disability certificates.',
  opening_hours = '9:00–17:00 (last entry 16:30). Closed Dec 27–Jan 1 and certain maintenance days.',
  tips          = 'Bloom calendars and seasonal highlights are available on the official website. Allow about 2 hours to tour the main garden areas. The greenhouse features tropical plants year-round.'
WHERE id = 'makino-botanical-garden';

UPDATE spots SET
  opening_hours = '9:30–17:00 (last entry 16:00). Closed Mondays (or next day if Monday is a holiday) and Dec 29–Jan 1.',
  tips          = 'Exhibits feature naturalistic habitats mimicking animals'' native environments. Food and drink may be brought into the park. On-site dining: full restaurant, weekend/holiday snack sales, and picnic areas.'
WHERE id = 'noichi-zoo';

UPDATE spots SET
  access        = 'About 35 minutes by car from Nankoku IC. By public transport: JR Dosan Line to Tosa-Yamada Station, then JR Bus Odochi Line for about 25 minutes to Birafu (Anpanman Museum) stop. Walk about 5 minutes.',
  opening_hours = '9:30–17:00 (last entry 16:30). Closed Tuesdays (or next day if Tuesday is a holiday). Periodic closures for exhibition changeovers.',
  tips          = 'Single ticket grants entry to both Anpanman Museum and the Yanase Takashi Poem and Fairy Tale Picture Book Hall; re-entry allowed until 17:00 same day. The gift shop is for museum visitors only. No restaurant on-site.'
WHERE id = 'anpanman-museum';

UPDATE spots SET
  access        = 'Tosaden Kotsu Bus or MY-YU Bus to Ryoma Kinenkan Mae stop, then walk about 2 minutes. By car: about 25 minutes from Kochi IC, or about 15 minutes from the Kochi-Minami IC (Katsurahama direction).',
  opening_hours = '9:00–17:00 (last entry 16:30). Open year-round. The new building galleries may close for exhibition changeovers.',
  tips          = 'Plan about 90 minutes to view both the main hall and new building. Easily combined with Katsurahama Beach, but the walking route includes stone steps and steep slopes (10+ minutes).'
WHERE id = 'sakamoto-ryoma-museum';

UPDATE spots SET fact_checked_at = NOW()
WHERE id IN (
  'chikurin-ji-temple',
  'makino-botanical-garden',
  'noichi-zoo',
  'anpanman-museum',
  'sakamoto-ryoma-museum'
);
