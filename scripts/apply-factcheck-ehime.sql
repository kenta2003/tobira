-- Ehime spot corrections based on fact-check report

UPDATE spots SET
  admission     = '¥600 (adults), ¥300 (seniors), ¥200 (high school), ¥100 (elementary and middle school), preschool children free',
  opening_hours = '9:00–17:00 (entry until 16:30); closed Mondays (or next business day if Monday is a holiday); closed Dec 29–Jan 1',
  tips          = 'Around 15:30, animal feeding begins and some animals may not be visible. Check the official "Today''s Schedule" page before your visit.'
WHERE id = 'tobe-zoo';

UPDATE spots SET
  admission     = 'Free entry to roadside station area; mine sightseeing tour ¥1,500 (adults), ¥1,100 (high school and middle school), ¥900 (children 3+)',
  access        = 'About 12 minutes by car from Niihama IC. By public transport: JR Niihama Station to Setouchi Bus (Yamane/Minetopia Line) toward Minetopia Besshi terminal.',
  opening_hours = 'Mine sightseeing 9:00–17:00. Facility hours and closures vary; consult the official operating calendar.',
  tips          = 'The sightseeing tunnel stays cool even in summer. During peak season weekends and holidays, consider the East Taira sightseeing bus tour.'
WHERE id = 'minetopia-besshi';

UPDATE spots SET
  opening_hours = 'Varies by facility: Minato Kouryu Hall 9:00–21:30, Agora Marche 8:30–18:00, Doya Market 8:00–16:00, Doya Dining 7:00–14:00',
  tips          = 'Seafood features that morning''s catch. Doya Market has irregular closures; early morning is ideal for viewing the fish market. Payment methods vary by vendor; confirm on-site.'
WHERE id = 'yawatahama-minatto';

UPDATE spots SET
  access        = 'Directly off Uwajima-Asahi IC by car. About 1 km from JR Uwajima Station (approximately 15 minutes on foot). Bus shuttle available from the station.',
  opening_hours = 'Local specialty sales and cultural exhibition hall 9:00–18:00. Restaurant 10:30–16:30 (last order 16:00). Closed Jan 1.',
  tips          = 'Food court uses vending machines; reservations are not available. Credit cards and PayPay accepted. 228 parking spaces available.'
WHERE id = 'uwajima-kisaiya-hiroba';

UPDATE spots SET
  access        = 'About 17 minutes by car from Imabari IC. By public transport: from Imabari Station front, take the bus (Kagoji/Nibu Line) about 30 minutes to Seseragi Koryukan stop.',
  opening_hours = 'Bathing 10:30–21:00 (last entry 20:30). Closed second and fourth Mondays, Dec 31, and Jan 1.',
  tips          = 'Alkaline simple hot spring (pH 9.9), known as a beauty bath. Light meals available 11:00–14:30.'
WHERE id = 'nibukawa-seseragi-koryukan';

UPDATE spots SET fact_checked_at = NOW()
WHERE id IN (
  'tobe-zoo',
  'minetopia-besshi',
  'yawatahama-minatto',
  'uwajima-kisaiya-hiroba',
  'nibukawa-seseragi-koryukan'
);
