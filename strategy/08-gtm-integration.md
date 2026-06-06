# Tobira 90日間 GTM統合戦略

このメモは、今後90日間のプロダクト、メッセージ、ファネル、収益化をひとつの戦略として整理したものです。

## 戦略仮説

Tobira は「より広い日本旅行ガイド」になることで勝とうとすべきではありません。そうではなく、英語圏で、日本旅行のリピーター、あるいはゴールデンルートの外へ行きたい旅行者が、地域への興味を“実際に使える旅程”へ最短で変えられる手段として勝つべきです。

そのため、GTM全体は次の1つの考え方で統一する必要があります。

`集客は planner completion に向かって設計し、収益化は planning confidence を売る。`

実務的には、次の意味になります。

- プロダクトは、単なる閲覧深度ではなく `planner_completed` を最大化する
- メッセージは `hidden gems` 単体から `locally curated + practically planned` へ寄せる
- コンテンツはトップファネルの流入獲得だけでなく、discover から planner への導線を支える
- Pro は「良いアイデアを、実際に実行できる旅行に変えるための手段」として売る

## 各レイヤーで何を意味するか

### Product

- プロダクトの主な仕事は、discover から最初の planner 成功体験までの摩擦を減らすこと
- planner は最も強い価値体験なので、activation の中心として扱うべき
- 現状の auth gate や入口の分散は、planner completion までの道筋がもっと明確で、もっと強く訴求できる場合にのみ許容される

### Messaging

- 主メッセージ:
  - ローカルに厳選されたスポットと、実用的な旅程ガイダンスで、よりオリジナルな日本旅行をより早く計画できる
- 補強要素:
  - 旅行系の一般的な寄せ集めではなく、ローカル視点でキュレーションされている
  - discover によって、自分に合う行き先をすばやく絞り込める
  - planner が、インスピレーションを日別の旅程に変える

### Funnel

- 主ファネル:
  - `Visit -> Discover start -> Quiz complete -> Lead submit -> Planner start -> Planner complete -> Pricing view -> Signup/Login -> Paid`
- activation event:
  - `planner_completed`
- 現在のボトルネック:
  - discover への興味から、認証付き planner 利用までの摩擦が大きい

### Monetization

- Pro の主価値:
  - planning confidence
- Pro が意味すべきこと:
  - 無制限の旅程生成
  - アクセス、時間帯、インサイダーノートなど、より実用的で深い情報
  - “王道ではない日本旅行” を実際に遂行しやすくすること
- Pro が主に意味してはいけないこと:
  - hidden gems が少し多く見られるだけの機能

## 90日間のフェーズ別計画

### Phase 1: 0-2週

目的:

- 流入を増やす前に、KPIとメッセージを1つに揃える

やること:

- 北極星指標を `planner_completed per qualified visitor` に確定する
- `qualified visitor` を定義し、最低限のファネルイベントを計測できるようにする
- ホーム、pricing、ブログCTA、lead email のメッセージ階層を揃える
- 戦略とUXの両面で、`discover -> planner` を最も明確な導線にする
- 週次レビューで見る指標と、チャネルごとの attribution ルールを決める

期待する成果:

- 共通のKPI定義が1つある
- 共通のメッセージ階層が1つある
- 最低限のイベント設計が1つある

### Phase 2: 3-6週

目的:

- activation を改善しながら、収益化メッセージを検証し、集中した認知拡大を回す

やること:

- discover 後に planner へ進む流れのファネル実験を行う
- ブログ記事のCTAを `/discover` に送るべきか `/plan` に送るべきかを検証する
- pricing と upgrade 表現を、premium access より planning confidence 中心に組み替えてテストする
- SEO と Instagram で、1つのテーマクラスターを集中して出す
- コンテンツの柱は広げず、1つか2つに限定する

初期の推奨コンテンツ柱:

- second-trip / beyond-Tokyo alternatives
- car-free regional Japan

期待する成果:

- planner completion がどこから生まれているかの最初の証拠が得られる
- pricing conversion を改善するメッセージの最初の証拠が得られる
- テーマを絞った運用が、広く出す運用より強いかどうかの初期シグナルが得られる

### Phase 3: 7-12週

目的:

- planner completion と paid intent を生むものに集中投資する

やること:

- チャネル別、ランディングページ別、コンテンツ柱別に planner completion 率を比較する
- 最も強い柱だけ配信量を増やす
- 実際の行動データを見ながら、planner から pricing、planner から save/share への導線を改善する
- 実際の conversion data を使って free-to-paid の見せ方を調整する
- 現行チャネルで明確なシグナルが出るまで、新しいチャネル拡張は判断しない

期待する成果:

- 再現性のある集客導線が見えてくる
- より明確な paid conversion のストーリーができる
- 次のプロダクト改善に向けた根拠が揃う

## 依存関係と進める順番

### 最初に必ずやること

- KPI とイベント定義
- メッセージ階層の統一
- 基本的な流入 attribution

これがないと、認知を広げてもトラフィックは増える一方で、学びが弱くなります。

### 有意義な収益化学習の前に必要なこと

- ユーザーが planner まで、よりスムーズに到達できること
- pricing が、ファネル上流で見せたプロダクトの約束と一致していること

これがないと、pricing テストは「本当に払いたいか」ではなく、「前段とのメッセージ不整合」を測ることになります。

### チャネル拡張の前に必要なこと

- 少なくとも1つのコンテンツ柱で、planner start と planner complete のトラクションが見えること
- 少なくとも1本、流入から conversion まで attribution できる導線があること

これがないと、新しいチャネルはノイズを増やすだけになります。

## 毎週見るべき指標

- qualified visits
- discover starts
- quiz completion rate
- lead submission rate
- planner start rate
- planner completion rate
- pricing view rate
- paid conversion rate
- チャネル別 planner completions
- ランディングページ別 planner completions
- コンテンツ柱別 planner completions

## 主な失敗パターン

### Failure mode 1: 認知は広がるが activation が伸びない

- 症状:
  - トラフィックは増えるが planner completion は横ばい
- 主な原因:
  - コンテンツは興味を生むが、最初の本質的な価値体験までの距離が遠い

### Failure mode 2: メッセージが分断されたまま

- 症状:
  - ホームは curation、email は matches、pricing は hidden gems、planner は utility を売っている
- 主な原因:
  - 各画面が個別最適され、GTM全体として設計されていない

### Failure mode 3: Pro の訴求が狭すぎる

- 症状:
  - ユーザーにとって Pro が「ロックされた情報」に見え、「旅行を形にする道具」に見えない
- 主な原因:
  - pricing や upgrade の文脈で premium spots を強調しすぎ、execution confidence を十分に打ち出していない

### Failure mode 4: 早い段階でチャネルを増やしすぎる

- 症状:
  - コンテンツ量は増えるが、明確な学びが出ない
- 主な原因:
  - SEO、Instagram、Pinterest、提携、新規プロダクト改善を同時に広げすぎる

### Failure mode 5: ICP の方向性がずれている

- 症状:
  - repeat visitor 向けの打ち出しをしても activation や paid intent が改善しない
- 主な原因:
  - 想定よりも、非王道志向の初回訪日客の方が強いセグメントである可能性がある

## 次のサイクルに進む判断基準

90日後に Tobira が問うべきことは、「トラフィックは増えたか？」ではありません。

問うべきなのは次の3つです。

1. どの導線が最も多くの planner completion を生んだか
2. どのメッセージが planning intent から paid intent への移行を最も促したか
3. どのコンテンツ柱が、単に多いユーザーではなく、最も相性の良いユーザーを連れてきたか

この3つが明確になれば、次のプロダクトとマーケティングのサイクルは、自信を持って拡張できます。
