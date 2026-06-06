-- Tokushima spot corrections based on fact-check report

UPDATE spots SET
  access        = 'Direct bus service available to Otsuka Museum of Art-mae stop. From JR Naruto Station, take the "Naruto Park Line" bus to Otsuka Museum of Art-mae; about 3 minutes by car from Naruto-kita IC via the Kobe-Naruto Expressway.',
  opening_hours = '9:30–17:00 (ticket sales until 16:00). Closed Mondays (or next business day if Monday is a holiday). Continuous closure in January; no closure in August; other special closures apply.',
  tips          = 'The exhibition route spans approximately 4 kilometers with a large indoor complex. Comfortable walking shoes are recommended.'
WHERE id = 'otsuka-museum-of-art';

UPDATE spots SET
  opening_hours = '6:00–17:00 (March–November); 6:30–16:30 (December–February)',
  tips          = 'Tokushima''s premier shrine, honored as the province''s protective sanctuary. Notable features include the large torii gate, lantern-lined approach path, the Deutsch bridge, and a thousand-year-old sacred oak.'
WHERE id = 'oasahiko-shrine';

UPDATE spots SET
  access        = 'About 10 minutes by car from Wakimachi IC. By public transport: from JR Anabuki Station to Mima City Bus to Michi-no-eki Udatsu stop; or 10 minutes by taxi or car from JR Anabuki Station.',
  opening_hours = 'The townscape itself has no set closure times. Main facilities: Yoshida House 9:00–17:00 (last entry 16:30, closed Dec 27–Jan 1); Miraikoubo 9:00–17:00 (closed year-end holidays).'
WHERE id = 'udatsu-townscape';

UPDATE spots SET
  access        = 'From JR Tokushima Station bus terminal, platform 7, take the Kawauchi Loop Bus to Jurobe Yashiki stop; about 5 minutes by car from Tokushima IC on the Tokushima Expressway.',
  opening_hours = '9:30–17:00 (open until 18:00 July–August; last entry 30 minutes before closing). Closed Dec 31–Jan 3.',
  tips          = 'Designated as a National Intangible Folk Cultural Property, the Awa ningyo joruri puppet theater performs daily. Check the official schedule for performance times and ticket information before visiting.'
WHERE id = 'awa-jurobe-yashiki';

UPDATE spots SET
  admission     = 'Tairyuji Ropeway round trip ¥2,600; one-way ¥1,300 (adults). Temple grounds entry is free.',
  access        = 'From JR Tokushima Station, take the Tokushima Bus Niibutani Line for about 1.5 hours to Naka-machi Wajiki-Higashi; 10-minute walk to Tairyuji Ropeway base. By car: about 1 hour from Tokushima IC; about 50 minutes from Tokushima City.',
  opening_hours = 'Tairyuji Ropeway operates 8:00–16:40 (last departure), departing every 20 minutes.',
  tips          = 'Japan''s longest ropeway at 2,775 meters spans about 10 minutes and offers expansive views of the Naka River, surrounding mountains, and views of the Kii Channel and Tachibana Bay.'
WHERE id = 'tairyuji-temple';

UPDATE spots SET fact_checked_at = NOW()
WHERE id IN (
  'otsuka-museum-of-art',
  'oasahiko-shrine',
  'udatsu-townscape',
  'awa-jurobe-yashiki',
  'tairyuji-temple'
);
