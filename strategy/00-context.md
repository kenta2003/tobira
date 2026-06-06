# Tobira Strategy Context

## One-line summary

Tobira is a curated Japan travel guide and AI itinerary planner for travelers who want to go beyond Tokyo and discover more local, authentic experiences.

## Current strategic frame

- Brand line: `Beyond Tokyo. Real Japan.`
- Core claims already visible in product:
  - `Curated by locals`
  - `AI itinerary builder`
  - `Hidden gems across all 47 prefectures`
  - `Verified, practical travel details`
- Current monetization:
  - Free plan
  - Pro at `$4.99 / month`

## What exists today

- Top page with broad positioning and primary CTAs to discovery and planning
- Discovery quiz flow that matches users to spots
- Lead capture flow via email
- AI planner gated by auth and limited for free users
- Pricing page with free vs Pro comparison
- Blog and guide surfaces for organic discovery
- Premium spot model for deeper content and upsell

## Observed funnel from current implementation

`Home / SEO / Social -> Discover or Guides or Blog -> Lead capture or Spot exploration -> Planner -> Pricing -> Signup/Login -> Paid`

## Product strengths visible in the repo

- Clear brand angle distinct from generic Japan travel content
- Good combination of editorial curation and utility
- Existing conversion surfaces, not just content
- Database-backed spots and premium gating already in place
- Email capture and pricing flow already implemented

## Constraints and risks visible in the repo

- Strategic focus may be too broad across `discover`, `guides`, `blog`, and `plan`
- Main ICP is not yet explicitly fixed in one place
- Event tracking taxonomy is not visible in product code
- Free/Pro boundary is strong in some places but may still need sharper messaging
- Content breadth may outpace density in priority regions
- Brand awareness is likely lower than product quality

## Current phase assumption

- Planning horizon: next 90 days
- Likely company stage: early validation / early growth
- Main goal assumption: prove repeatable acquisition and conversion before expanding scope

## Strategic questions this workspace should answer

1. Which user segment should Tobira win first?
2. What exact promise makes users try Tobira instead of guides, blogs, or AI chat?
3. Which acquisition channels deserve focus in the next 90 days?
4. What action best predicts eventual paid conversion?
5. What should remain free, and what should be the main trigger for Pro?

## Known product facts from implementation

- Planner requires login and limits free users to one AI plan per month
- Lead flow emails matched spots and pushes users toward planner, pricing, and signup
- Pricing emphasizes premium spots, insider tips, maps, and unlimited AI plans
- Homepage emphasizes curation, off-the-beaten-path discovery, and AI trip planning

## Decision needed

- Primary ICP:
  - Recommended: English-speaking independent travelers planning their second Japan trip, or their first trip beyond the Tokyo-Kyoto-Osaka route
- Primary growth goal for next 90 days:
  - Recommended: increase `planner_completed per qualified visitor`
- Primary monetization trigger:
  - Recommended: planning confidence through unlimited itinerary generation plus deeper practical details

## Relevant files

- `../src/app/page.tsx`
- `../src/app/pricing/page.tsx`
- `../src/app/discover/page.tsx`
- `../src/app/discover/DiscoverClient.tsx`
- `../src/app/plan/page.tsx`
- `../src/app/api/plan/route.ts`
- `../src/app/api/leads/route.ts`
- `../../SPEC.md`
