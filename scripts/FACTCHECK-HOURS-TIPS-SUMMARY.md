# 営業時間・tips ファクトチェック 変更一覧（成果物）

**対象:** 全スポット 497件（10地域）  
**検証項目:** opening_hours（営業時間）, tips（アドバイス）のみ  
**検証日:** 2025年3月  
**適用SQL:** `scripts/apply-factcheck-hours-tips.sql`

---

## 概要

全スポットの **opening_hours** と **tips** を、公式サイト・観光協会・一次情報で検証し、誤り・古い表記を修正した。admission / access は既存の地域別ファクトチェックで対応済みのため対象外。

- **検証したスポット数:** 497件
- **UPDATE 文数:** 130件（opening_hours または tips の修正）
- **地域別報告書:** 下記の markdown を参照

---

## 地域別報告書

| 地域 | スポット数 | 報告書 | 主な修正件数（目安） |
|------|------------|--------|----------------------|
| 北海道 | 22 | spot-factcheck-hours-tips-hokkaido.md | 7 |
| 東北 | 50 | spot-factcheck-hours-tips-tohoku.md | 10 |
| 関東 | 70 | spot-factcheck-hours-tips-kanto.md | 18 |
| 北陸 | 39 | spot-factcheck-hours-tips-hokuriku.md | 21 |
| 中部 | 56 | spot-factcheck-hours-tips-chubu.md | 10 |
| 関西 | 55 | spot-factcheck-hours-tips-kansai.md | 9+任意 |
| 中国 | 51 | spot-factcheck-hours-tips-chugoku.md | 7 |
| 四国 | 40 | spot-factcheck-hours-tips-shikoku.md | 17 |
| 九州 | 88 | spot-factcheck-hours-tips-kyushu.md | 14 |
| 沖縄 | 26 | spot-factcheck-hours-tips-okinawa.md | 12 |

---

## 適用方法

1. Supabase の SQL Editor で `scripts/apply-factcheck-hours-tips.sql` を開く。
2. 全文を実行する（130 行の UPDATE）。
3. 必要に応じて、地域別報告書で「要注意」のみのスポットを目視確認し、手動で追加修正する。

---

## 補足

- 営業時間・休館日は施設により随時変更されるため、運用時は公式サイトで再確認を推奨する。
- 報告書内の「要注意」は、季節差・施設差・一時休館などで SQL には含めず、必要なら別途 UPDATE する想定。
