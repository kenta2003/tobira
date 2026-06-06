# 宮城県スポット ファクトチェックレポート

確認日: 2026-03-22
対象ファイル: `scripts/seed-miyagi-extra.sql`
確認対象: `admission`, `access`, `opening_hours`, `tips`
方針: 日本語の公式・一次情報源（公式サイト、自治体サイト等）を優先。公式上で断定できないものは `公式確認不可` とした。

## sendai-asaichi-market

| field | 現行値 | 判定 | 確認内容 |
|---|---|---|---|
| admission | Free to browse; food purchases vary | 一致 | 入場料設定は確認できず、商店街として自由来訪型。公式サイトの案内内容と矛盾なし。 |
| access | 5-minute walk from Sendai Station (JR Tohoku/Akita/Yamagata Shinkansen). | 概ね一致 | 公式アクセスでは「JR仙台駅西口から徒歩5分」「地下鉄仙台駅西1出口から徒歩1分」。JR基準では概ね一致だが、地下鉄導線を足すとより正確。 |
| opening_hours | 7:00–18:00 (individual shops vary; some close on Sundays) | 要修正 | 公式サイトでは商店街全体の統一営業時間は見当たらず、各店舗ページで個別営業時間を案内。休業日案内では日曜・祝日中心の休みを月別に告知し、「一部店舗では、お休みでも営業している場合あり」と明記。固定の `7:00–18:00` は根拠不足。 |
| tips | Arrive early for the freshest seafood and the most energetic atmosphere. Gyutan restaurants in the market often have queues by 11am — go at opening or after 14:00. The market also sells excellent packaged sasa-kamaboko to take home. | 公式確認不可 | 早朝推奨、11時行列、14時以降推奨、持ち帰り向け商品などは一次情報で確認できず。公式に基づく実用情報としては「月別休業日と各店舗情報を事前確認」が妥当。 |

主な一次情報源:
- https://sendaiasaichi.com/access
- https://sendaiasaichi.com/
- https://sendaiasaichi.com/information/view/127
- https://sendaiasaichi.com/shop/view/37

## shiogama-seafood-market

| field | 現行値 | 判定 | 確認内容 |
|---|---|---|---|
| admission | Free to enter; food purchases vary | 一致 | 公式サイト上で入場料設定なし。市場・飲食利用型施設として矛盾なし。 |
| access | From Sendai Station, take the JR Senseki Line to Hon-Shiogama Station (approx. 25 minutes), then walk 10 minutes to the market. | 要修正 | 公式アクセスは「仙台駅から仙石線で東塩釜駅、駅から徒歩15分」。`本塩釜駅` と `徒歩10分` は不一致。 |
| opening_hours | 8:00–14:00 (Sunday market most active; individual stalls vary) | 要修正 | 公式の開市時間は「火・木・金 6:00-13:00」「土・日・月・祝 6:00-14:00」「毎週水曜休市」。現行値は全体的に誤り。 |
| tips | Sunday mornings are the best time to visit — more stalls are open and the atmosphere is lively. Many vendors will let you eat on the spot; bring cash as card payment is not always accepted. The ferry from Shiogama to Matsushima (¥1,500) is a scenic way to continue the day. | 要修正 | 公式では市場内で「My海鮮丼・お食事処」を案内しているが、現金推奨やフェリー料金は確認できない。日曜・祝日営業、飲食利用可を軸に書き換えるのが妥当。 |

主な一次情報源:
- https://www.nakaoroshi.or.jp/market/about
- https://www.nakaoroshi.or.jp/access

## akiu-crafts-village

| field | 現行値 | 判定 | 確認内容 |
|---|---|---|---|
| admission | Free to enter; workshop fees ¥500–¥2,000 depending on activity | 要修正 | 仙台市公式では「体験できる内容や料金の詳細、ご予約等は各工房までご連絡」と案内。固定レンジ `¥500–¥2,000` は一次情報で確認不可。 |
| access | From Sendai Station, take a bus bound for Akiu Onsen (approx. 50 minutes) and get off at Akiu Kogeino-Sato-mae stop. | 要修正 | 仙台市公式アクセスは「仙台駅前63番のりばから『かわさきまち行』約40分」「『秋保工芸の里』下車、徒歩0分」。行先・所要時間・停留所表記がずれている。 |
| opening_hours | 9:00–17:00 (closed Tuesdays) | 要修正 | 仙台市公式では「休業日：無休（工房毎に定休日が異なります）」。「9:00–17:00」「火曜休」は確認できない。施設全体の統一営業時間も一次情報では確認できない。 |
| tips | Workshop reservations are recommended, especially for kokeshi painting which is the most popular activity. Combine with Akiu Onsen for a full day in the valley — the crafts village and onsen ryokan are within a short taxi ride of each other. | 要修正 | 公式では「体験できる内容やご予約等の詳細は、各工房までご連絡」と案内。人気体験の断定やタクシー所要は確認できない。 |

主な一次情報源:
- https://www.city.sendai.jp/kankokikaku/akiukoge/access.html
- https://www.city.sendai.jp/kankokikaku/akiukoge/kogenosato.html
- https://www.city.sendai.jp/kankokikaku/akiukoge/taiken.html
- https://www.city.sendai.jp/kankokikaku/akiukoge/koge/index.html

## sendai-umino-mori-aquarium

| field | 現行値 | 判定 | 確認内容 |
|---|---|---|---|
| admission | ¥2,400 (adults), ¥1,200 (children 3–15) | 要修正 | 公式料金は「大人 2,400円」「中高校生 1,700円」「小学生 1,200円」「幼児4才以上 700円」「シニア65才以上 1,800円」「4才未満無料」。`children 3–15` は区分が誤り。 |
| access | From Sendai Station, take the JR Senseki Line to Nakano-Sakana-ichiba Station (approx. 20 minutes), then walk 5 minutes. Alternatively, a direct shuttle bus operates from Sendai Station on weekends. | 要修正 | 公式アクセスは「JR仙石線 中野栄駅 下車、徒歩約15分」または「中野栄駅よりミヤコーバス」。駅名・徒歩分数・週末のみ直通バスという記述が誤り。 |
| opening_hours | 9:00–17:30 (last entry 16:30); extended hours during summer and holidays | 要修正 | 公式の通常案内では時期により変動し、例として `11/4～3/19 10:00～17:00（最終入館16:30）`。現行値は冬期と最終入館時刻が不一致。通年固定表記は不正確。 |
| tips | Book tickets online in advance to avoid queues, particularly during school holidays. The dolphin show times vary by season — check the website before visiting. Allow at least 3 hours to see everything comfortably. | 一部一致 | 公式では「事前にWEBでチケットを購入して、チケット窓口に並ばず直接ご入館」が確認できる。一方、学校休暇の混雑断定や所要3時間は一次情報で確認不可。公式根拠に寄せて簡潔化が望ましい。 |

主な一次情報源:
- https://www.uminomori.jp/umino/info/
- https://www.uminomori.jp/umino/index.html
- https://www.uminomori.jp/en/umino/access/index.html

## sendai-castle-ruins

| field | 現行値 | 判定 | 確認内容 |
|---|---|---|---|
| admission | Free (grounds); museum ¥700 (adults) | 要修正 | 仙台市公式では仙台城跡は自由来訪可、仙台城見聞館は無料。近接する青葉城資料展示館は別施設で、公式案内は一般770円。現行の `museum ¥700` は古いか不明確。 |
| access | From Sendai Station, take the Loople Sendai sightseeing bus to Aoba Castle (approx. 20 minutes). Alternatively, take the subway Tozai Line to Kawauchi Station and walk 20 minutes uphill. | 要修正 | 仙台市公式は「るーぷる仙台で約23分、仙台城跡下車」「地下鉄東西線 国際センター駅 から本丸まで徒歩約20分」。`川内駅` は主要公式案内と不一致。 |
| opening_hours | Grounds: open 24 hours; museum: 9:00–17:00 (closed Mondays in winter) | 要修正 | 仙台市公式Q&Aで「仙台城跡は24時間、行くことは可能」。仙台城見聞館は `9:00～17:00（年中無休）・無料`。`closed Mondays in winter` は確認不可。 |
| tips | The Loople Sendai bus (¥630 all-day pass) connects the castle with Zuihoden mausoleum and Osaki Hachimangu Shrine — a convenient way to cover multiple Sendai historical sites. Visit in the evening for city light views, which are particularly beautiful on clear nights. | 要修正 | 公式Q&Aでは100名城スタンプが仙台城見聞館にあり、同館は `9:00～17:00` 利用可。また仙台市公式アクセスでは年末年始・GW・8/15は周辺渋滞に注意と案内。現行tipsは景観評価や運賃情報が中心で、一次情報に寄せる余地が大きい。 |

主な一次情報源:
- https://www.city.sendai.jp/shisekichosa/sendaijoaccess.html
- https://www.city.sendai.jp/shisekichosa/sendaijoqa.html
- https://www.city.sendai.jp/bunkazai-kanri/kennbunnkann.html
- https://www.honmarukaikan.com/tenji/

## SQL更新候補

| id | field | 修正後の値 |
|---|---|---|
| sendai-asaichi-market | access | 5-minute walk from JR Sendai Station West Exit; 1-minute walk from Sendai Subway Station West-1 Exit. |
| sendai-asaichi-market | opening_hours | Hours vary by shop; check the official site for monthly closing days. Many shops close on Sundays and public holidays, though some may open. |
| sendai-asaichi-market | tips | Check the official monthly closing-day notice and individual shop pages before visiting, as business days and hours vary by store. |
| shiogama-seafood-market | access | From Sendai Station, take the JR Senseki Line to Higashi-Shiogama Station, then walk 15 minutes to the market. |
| shiogama-seafood-market | opening_hours | Tue, Thu, Fri 6:00–13:00; Sat, Sun, Mon and public holidays 6:00–14:00; closed Wednesdays. |
| shiogama-seafood-market | tips | Visit early in the day for the fullest market activity. The market officially offers My Kaisendon and other on-site dining options. |
| akiu-crafts-village | admission | Free to enter; workshop fees vary by studio and activity. |
| akiu-crafts-village | access | From Sendai Station bus stop 63, take the Kawasakimachi-bound bus (about 40 minutes) and get off at Akiu Kogei no Sato; the stop is directly in front of the site. |
| akiu-crafts-village | opening_hours | No overall closing day, but each studio has its own schedule and some workshops operate only on selected days. |
| akiu-crafts-village | tips | Contact each studio directly for workshop details, fees, available dates, and reservations. |
| sendai-umino-mori-aquarium | admission | ¥2,400 (adults), ¥1,700 (middle/high school students), ¥1,200 (elementary school students), ¥700 (ages 4+), free for children under 4; seniors 65+ ¥1,800. |
| sendai-umino-mori-aquarium | access | From Sendai Station, take the JR Senseki Line to Nakanosakae Station (about 18 minutes), then walk about 15 minutes or take the Miyako Bus to the aquarium. |
| sendai-umino-mori-aquarium | opening_hours | Hours vary by season; for example, 11/4–3/19 the aquarium is open 10:00–17:00 (last entry 16:30). Check the official calendar for the visit date. |
| sendai-umino-mori-aquarium | tips | Buying tickets online in advance lets you skip the ticket counter and enter directly. |
| sendai-castle-ruins | admission | Free for the castle ruins grounds. Sendai Castle Kenbunkan is free; the nearby Aoba Castle Museum charges ¥770 for adults. |
| sendai-castle-ruins | access | From Sendai Station, take the Loople Sendai bus to Sendai Castle Ruins (about 23 minutes), or take the Tozai Subway Line to International Center Station and walk about 20 minutes to the main enclosure. |
| sendai-castle-ruins | opening_hours | Castle ruins grounds are accessible 24 hours. Sendai Castle Kenbunkan is open 9:00–17:00 year-round. |
| sendai-castle-ruins | tips | The 100 Famous Castles stamp is available at Sendai Castle Kenbunkan (9:00–17:00, free). Expect traffic around the site during New Year holidays, Golden Week, and on August 15. |
