-- fix-website-urls.sql
-- 2026-02: Corrects 19 broken website_url entries found by check-urls.mjs

-- Kumamoto
UPDATE spots SET website_url = 'https://www.town.kumamoto-takamori.lg.jp/site/kanko/1950.html' WHERE id = 'kamishikimi-shrine';
UPDATE spots SET website_url = 'https://www.city.amakusa.kumamoto.jp/sakitsu-sekai/'             WHERE id = 'amakusa-sakitsu';
UPDATE spots SET website_url = 'https://tsujunbridge.jp/'                                          WHERE id = 'tsuujun-bridge';
UPDATE spots SET website_url = 'https://ogunitown.info/nabegataki/'                                WHERE id = 'nabegataki-falls';

-- Miyazaki
UPDATE spots SET website_url = 'https://www.udojingu.or.jp/'                                      WHERE id = 'udo-jingu';
UPDATE spots SET website_url = 'https://kushima-city.jp/toi/'                                     WHERE id = 'cape-toi-horses';
UPDATE spots SET website_url = 'https://ebino-ecomuseum.go.jp/en/ebino/'                          WHERE id = 'ebino-plateau';

-- Nagasaki
UPDATE spots SET website_url = 'https://nagasakidejima.jp/'                                        WHERE id = 'dejima';
UPDATE spots SET website_url = 'https://nagasakipeace.jp/en/'                                      WHERE id = 'nagasaki-peace-park';
UPDATE spots SET website_url = 'https://inasayama.info/'                                           WHERE id = 'mount-inasa-observatory';
UPDATE spots SET website_url = 'https://www.gunkanjima-cruise.jp/en/'                              WHERE id = 'hashima-island';
UPDATE spots SET website_url = 'https://english.huistenbosch.co.jp/'                               WHERE id = 'huis-ten-bosch';
UPDATE spots SET website_url = 'https://oura-church.jp/'                                           WHERE id = 'oura-cathedral';

-- Oita
UPDATE spots SET website_url = 'https://okajou.jp/'                                                WHERE id = 'oka-castle';
UPDATE spots SET website_url = 'https://nakatsuyaba.com/'                                          WHERE id = 'yabakei-gorge';
UPDATE spots SET website_url = 'https://www.usa-kanko.jp/en/pages/116/'                            WHERE id = 'usa-shrine';

-- Okinawa
UPDATE spots SET website_url = 'https://www.nakijinjoseki-osi.jp/'                                 WHERE id = 'nakijin-castle';
-- gyokusendo-cave: 403 はbot対策のみ、実際にはブラウザで開ける。URLはそのまま維持。
UPDATE spots SET website_url = 'https://heiwa-irei-okinawa.jp/'                                    WHERE id = 'okinawa-peace-memorial-park';
