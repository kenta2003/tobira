# Tobira Research Questions For Subagents

Each subagent should take one clearly bounded problem and return recommendations tied to a KPI, a target user, and a validation path.

## Global brief for all subagents

- Time horizon: next 90 days
- Do not redesign the whole company
- Assume limited team bandwidth
- Prefer actions that improve acquisition, activation, or monetization soon
- Use the current product shape as the starting point

## Subagent 1: ICP and positioning

- Goal:
  - Recommend the best primary ICP for the next 90 days.
- Inputs:
  - `00-context.md`
  - `01-assumptions.md`
  - Homepage and pricing messaging
- Questions:
  - Which user segment has the clearest pain and best willingness to pay?
  - Which message should lead: curation, hidden gems, or itinerary confidence?
  - Which audiences should Tobira explicitly ignore for now?
- Deliverable:
  - One recommended ICP
  - One-line value prop
  - Three supporting proof points
  - Key risks and disconfirming signals

## Subagent 2: Funnel and activation

- Goal:
  - Improve movement from anonymous visit to planner completion.
- Inputs:
  - `02-funnel.md`
  - Discover, lead, plan, and pricing surfaces
- Questions:
  - What is the strongest activation event?
  - Where is the likely biggest drop-off in the current funnel?
  - Which CTA changes could improve planner starts and completions?
- Deliverable:
  - Revised funnel hypothesis
  - Top 3 activation improvements
  - Suggested event instrumentation priorities

## Subagent 3: Pricing and monetization

- Goal:
  - Clarify what users should pay for and when.
- Inputs:
  - Pricing page
  - Planner gating
  - Premium spot model
- Questions:
  - What is the strongest Pro trigger?
  - Should Pro be sold on exclusivity, utility, or confidence?
  - Which free-to-paid boundary is most credible?
- Deliverable:
  - Monetization hypothesis
  - Recommended paywall emphasis
  - Three pricing experiments

## Subagent 4: Acquisition channels and content

- Goal:
  - Recommend the next 2-3 acquisition channels.
- Inputs:
  - Blog, guides, social scripts, brand language
- Questions:
  - Which channels fit the current product and team best?
  - Which content clusters can become a moat?
  - Which landing pages should each channel drive to?
- Deliverable:
  - Channel ranking
  - Content pillar map
  - Landing page strategy by channel

## Subagent 5: Measurement

- Goal:
  - Define the minimum viable analytics system.
- Inputs:
  - `02-funnel.md`
  - Existing product events and missing instrumentation
- Questions:
  - Which events are mandatory in the next sprint?
  - How should UTM and source attribution be stored?
  - What should the first dashboard include?
- Deliverable:
  - Event taxonomy
  - Property schema
  - Dashboard spec

## Standard output format

Every subagent response should include:

1. Recommendation
2. Why this is the best next move
3. Risks and alternative interpretations
4. Validation plan
5. What the team should decide next
