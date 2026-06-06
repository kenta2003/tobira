# Tobira Strategy Assumptions

Use this file to separate facts from hypotheses. A subagent should not silently treat a hypothesis as settled truth.

## Current fact base

- Tobira already presents itself as a curated alternative to mainstream Japan travel planning.
- The product combines editorial spot discovery with AI itinerary generation.
- Free users can browse broadly, but Pro unlocks deeper value and unlimited planning.
- There is at least one lead capture mechanism before full planning/paid conversion.
- The repo and product language heavily favor English-speaking international travelers.

## Working hypotheses

| ID | Hypothesis | Why it matters | How to validate | Owner | Target date | Status |
| --- | --- | --- | --- | --- | --- | --- |
| H1 | The best first ICP is repeat Japan visitors who want non-obvious destinations. | A sharper ICP should improve messaging and conversion. | Interview users, analyze landing page copy tests, review lead quality. | TODO | TODO | Open |
| H2 | Users will pay more for planning confidence than for raw discovery alone. | This determines whether Pro should center on planner depth, not just premium spots. | Pricing interviews, paid conversion analysis, CTA experiments. | TODO | TODO | Open |
| H3 | Quiz-led discovery converts better than sending cold traffic directly to pricing. | This shapes the primary growth funnel. | Compare channel landing pages and downstream planner usage. | TODO | TODO | Open |
| H4 | The curation + verification story differentiates Tobira more than "AI" alone. | This affects homepage, pricing, and social messaging. | Message tests on LP, ads, and email subject lines. | TODO | TODO | Open |
| H5 | Coverage across all 47 prefectures builds trust, but density in a few regions drives action. | This affects roadmap and content prioritization. | Measure conversion by region depth and content density. | TODO | TODO | Open |
| H6 | SEO and visually driven discovery channels are stronger near-term fits than broad paid acquisition. | This affects channel focus and budget. | Channel comparison by qualified traffic and planner completion. | TODO | TODO | Open |

## Assumptions that need explicit confirmation

- Primary audience language:
  - Assumed: English first
  - Confirm: TODO
- Travel timing:
  - Assumed: mostly pre-trip planning, with some in-trip usage
  - Confirm: TODO
- Device mix:
  - Assumed: mobile-heavy discovery, desktop-assisted planning
  - Confirm: TODO
- Core willingness to pay:
  - Assumed: paid value starts when a user is building a real itinerary
  - Confirm: TODO

## Out-of-scope assumptions to avoid for now

- Do not assume mass-market OTA behavior
- Do not assume B2B partnerships are the immediate growth engine
- Do not assume app expansion is the next best move before acquisition is repeatable

## Research prompts for subagents

- Which JTBD is strongest: discovery, planning speed, confidence, or exclusivity?
- Which user segment has the clearest pain and highest willingness to pay?
- Which message wins: `hidden gems`, `authenticity`, `local curation`, or `real itinerary planning`?
- Which region/topic clusters can become the first content moat?
