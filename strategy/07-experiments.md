# Tobira 90-Day Experiments

This file turns the strategy into a short execution plan.

## Goal

Increase the number of qualified visitors who complete planning and create evidence for the best path to paid conversion.

## Primary success metric

- Candidate:
  - `planner_completed per qualified visitor`
- Decision needed:
  - Confirm whether this is the main north star for the next 90 days.

## Experiment principles

- Prefer message and funnel changes over large product rebuilds
- Run only a few experiments at once
- Tie each test to one stage of the funnel
- Record outcomes back in `03-decisions.md`

## Priority experiments

### EXP-001: Align the main promise across high-traffic surfaces

- Objective:
  - Increase qualified visitors who start discovery or planning
- Hypothesis:
  - A consistent promise around `beyond-the-guidebook itinerary confidence` will outperform mixed messaging around hidden gems alone
- Surfaces:
  - Home
  - Pricing
  - Blog CTA
  - Lead email
- KPI:
  - `discover_started rate`
  - `planner_started rate`
- Effort:
  - Medium

### EXP-002: Compare article CTA destinations

- Objective:
  - Learn whether content should push readers into discovery or planning
- Hypothesis:
  - Broad inspiration articles convert better to `/discover`, while practical route content converts better to `/plan`
- Surfaces:
  - Blog article pages
- Variants:
  - CTA to `/discover`
  - CTA to `/plan`
- KPI:
  - `planner_started`
  - `planner_completed`
- Effort:
  - Low to medium

### EXP-003: Clarify the Pro trigger

- Objective:
  - Improve movement from pricing view to paid
- Hypothesis:
  - Users respond more to `planning confidence` than to `premium spots` as the lead framing
- Surfaces:
  - Pricing page
  - Planner upgrade states
- KPI:
  - `subscription_started`
  - `pricing_view to paid`
- Effort:
  - Medium

### EXP-004: Make social traffic land with clearer intent

- Objective:
  - Improve quality of Instagram traffic
- Hypothesis:
  - Utility-led posts and CTAs outperform generic scenic inspiration for planner starts
- Surfaces:
  - Instagram carousel captions and bio link destinations
- Variants:
  - `Find your match`
  - `Plan your route`
- KPI:
  - `discover_started`
  - `planner_started`
- Effort:
  - Low

### EXP-005: Focus SEO on repeat-visitor themes

- Objective:
  - Increase qualified organic traffic
- Hypothesis:
  - Repeat-visitor and no-car topics attract better-fit users than broad Japan travel topics
- Surfaces:
  - Blog
  - Guide internal links
- KPI:
  - Organic sessions
  - Article to planner start rate
- Effort:
  - Medium

## Backlog

- Add UTM persistence and channel attribution
- Instrument minimum event taxonomy from `02-funnel.md`
- Define "qualified visitor"
- Add source-aware reporting for blog, guide, discover, and planner flows
- Review whether guide pages need stronger planner CTAs

## Suggested sequencing

### Weeks 1-2

- Confirm north star and activation event
- Align core messaging
- Instrument minimum events

### Weeks 3-6

- Run homepage, blog CTA, and pricing message tests
- Start focused SEO topic cluster work
- Tighten Instagram landing-page strategy

### Weeks 7-12

- Review which channel brings planner completers
- Double down on the best content pillar
- Refine pricing and upgrade path based on measured behavior
