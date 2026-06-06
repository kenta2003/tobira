# Tobira Funnel Definition

This is the working funnel for product and marketing strategy. Update it only when the team agrees on a change.

## Primary funnel

`Visit -> Discover start -> Quiz complete -> Lead submit -> Planner start -> Planner complete -> Pricing view -> Signup/Login -> Paid`

## Secondary funnels

- `SEO article -> Spot detail -> Planner start -> Paid`
- `Instagram / social -> Discover start -> Lead submit -> Planner -> Paid`
- `Guide page -> Spot exploration -> Pricing -> Signup -> Paid`

## Stage definitions

| Stage | Definition | Current surface | Main KPI | Notes |
| --- | --- | --- | --- | --- |
| Visit | Qualified visitor lands on Tobira from search, social, referral, or direct. | Home, guides, blog, discover | Qualified sessions | Define "qualified" explicitly later. |
| Discover start | User begins the quiz / matching flow. | `/discover` | Discover start rate | Good indicator of curiosity and fit. |
| Quiz complete | User finishes preference questions and sees matched spots. | Spot finder flow | Quiz completion rate | Strong activation candidate. |
| Lead submit | User shares email to unlock or save results. | Lead form / email capture | Lead conversion rate | Critical bridge from anonymous to identified user. |
| Planner start | User attempts to generate an itinerary. | `/plan` | Planner start rate | Indicates higher intent than browsing. |
| Planner complete | User receives a full itinerary result. | `/api/plan` success | Planner completion rate | Likely strongest activation signal. |
| Pricing view | User reaches pricing after seeing value. | `/pricing` | Pricing visit rate | Useful intent marker. |
| Signup/Login | User authenticates successfully. | Auth flow | Signup completion rate | Moves user into account-based value. |
| Paid | User starts an active Pro subscription. | Stripe / subscriptions | Paid conversion rate | Primary monetization outcome. |

## Candidate north star metrics

- `Planner completions per qualified visitor`
- `Qualified leads per 100 visits`
- `Paid subscriptions per planner completer`

## Recommended KPI stack for now

- North star:
  - `Planner completions per qualified visitor`
- Acquisition:
  - Qualified sessions
  - Traffic by channel
  - Landing page to discover start rate
- Activation:
  - Quiz completion rate
  - Lead submission rate
  - Planner completion rate
- Monetization:
  - Pricing visit rate
  - Signup rate
  - Paid conversion rate
- Retention:
  - Repeat planner usage
  - Saved trips per user
  - 7-day return rate

## Minimum event taxonomy

| Event | When it fires | Required properties |
| --- | --- | --- |
| `lp_cta_click` | User clicks a major hero CTA | `page`, `cta_name`, `channel`, `utm_source`, `utm_campaign` |
| `discover_started` | User starts the quiz | `landing_page`, `channel`, `persona_guess` |
| `discover_completed` | User completes the quiz | `vibe`, `region_interest`, `matched_spot_count` |
| `lead_submitted` | Email lead is created | `channel`, `landing_page`, `matched_spot_count` |
| `planner_started` | User requests itinerary generation | `days`, `interests`, `pace`, `group_type`, `region` |
| `planner_completed` | Planner returns success | `days`, `region`, `spot_count`, `is_pro` |
| `pricing_viewed` | User opens pricing page | `source_page`, `channel`, `is_logged_in` |
| `signup_started` | User enters auth flow | `source_page`, `channel` |
| `subscription_started` | User starts Pro | `plan`, `source_page`, `channel` |

## Immediate gaps

- Event tracking implementation is not clearly visible in app code
- UTM persistence strategy is not documented
- "Qualified visitor" is not formally defined
- Lead nurture after first email is not yet mapped

## Decision needed

- Primary north star metric:
  - Recommended: `Planner completions per qualified visitor`
- Definition of qualified visitor:
  - Recommended: a visitor who reaches a high-intent surface such as `/discover`, `/plan`, a guide page, a blog article, or a spot detail page and does not bounce immediately
- Single most important activation event:
  - Recommended: `planner_completed`
- Main funnel bottleneck:
  - Recommended: friction between discovery interest and authenticated planner usage
