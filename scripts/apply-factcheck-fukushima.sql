-- apply-factcheck-fukushima.sql
-- ファクトチェック結果に基づく修正（Codex by GPT-5.4）

UPDATE spots SET
  admission     = '¥500 (adults), ¥300 (elementary school children); preschool children free',
  access        = 'By car: approximately 15 minutes from Iwaki Yumoto IC. By public transport: from JR Iwaki Station, take a bus bound for Kawahira, get off at Amidado, then walk 5 minutes.',
  opening_hours = '8:30–16:00 (Apr–Oct), 8:30–15:30 (Nov–Mar); closed on the 4th Wednesday and selected religious observance days',
  tips          = 'Summer lotus blooms and autumn foliage are the key seasonal highlights. Opening days can change due to religious observances or weather, so checking ahead is recommended.'
WHERE id = 'shiramizu-amidado';

UPDATE spots SET
  admission     = '¥1,850 (adults), ¥900 (elementary to high school students); preschool children free',
  access        = 'By car: approximately 20 minutes from Iwaki Yumoto IC, or about 10 minutes from Iwaki Izumi IC via Onahama Road. By public transport: from JR Izumi Station, take a local bus to Aeon Mall Iwaki-Onahama (about 15 minutes), then walk about 5 minutes.',
  opening_hours = '9:00–17:30 (Mar 21–Nov 30), 9:00–17:00 (Dec 1–Mar 20); last entry 1 hour before closing; open year-round',
  tips          = 'Parking is shared with nearby commercial facilities and can become very crowded during Golden Week and summer, so public transport is recommended at peak times.'
WHERE id = 'aquamarine-fukushima';

UPDATE spots SET
  admission     = '¥1,200 (adults/high school and above), ¥800 (junior high students), ¥600 (elementary school children); adventure course +¥300',
  access        = 'By car: approximately 15 minutes from Tamura Smart IC. By public transport: travel via Koriyama to JR Banetsu East Line Kamimata Station, then take a taxi for about 5 minutes.',
  opening_hours = '8:30–17:00 (Apr 1–Jun 22), 8:30–17:30 (Jun 23–Sep 30), 8:30–17:00 (Oct 1–Nov 15), 8:30–16:30 (Nov 16–Mar 6), 8:30–17:00 (Mar 7–Mar 31); adventure course entry until 1.5 hours before closing',
  tips          = 'Wear shoes with good grip. The cave route includes many stairs (about 300 steps), and strollers and wheelchairs are not permitted.'
WHERE id = 'abukuma-cave';

UPDATE spots SET
  admission     = 'Free',
  access        = 'Best accessed by car. From Fukushima Nishi IC, the Jododaira area is about 40 minutes via Takayu Onsen and the Bandai-Azuma Skyline.',
  opening_hours = 'Seasonal mountain road; typically open from late April to mid-November, but exact dates vary and temporary closures can occur due to snow, ice, volcanic gas, or weather conditions',
  tips          = 'Road closures can happen at short notice, so check official Fukushima Prefecture road information before visiting. If you stop at Jododaira, parking requires an environmental maintenance fee.'
WHERE id = 'bandai-azuma-skyline';

UPDATE spots SET
  admission     = 'Free to visit the route itself; fruit-picking and tasting fees vary by orchard, fruit, and season',
  access        = 'In western Fukushima City, with orchards spread across the Fruit Line area. The easiest access is by car via Fukushima-Iizaka IC or Fukushima-Osaso IC; public transport availability varies by orchard, and some farms are reachable by local bus from Fukushima Station.',
  opening_hours = 'Varies by orchard; many orchards and farm shops operate roughly from June to December, with fruit-picking reception commonly around 8:30–16:00',
  tips          = 'Fruit availability, opening days, and reservation rules vary by orchard, so check each farm in advance. The season typically runs from cherries in June through apples in late autumn.'
WHERE id = 'fukushima-fruits-line';

UPDATE spots SET fact_checked_at = NOW()
WHERE id IN (
  'shiramizu-amidado',
  'aquamarine-fukushima',
  'abukuma-cave',
  'bandai-azuma-skyline',
  'fukushima-fruits-line'
);
