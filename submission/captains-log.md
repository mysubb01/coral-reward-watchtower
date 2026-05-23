# Captain's Log: Using Coral To Keep Reward-Seeking Agents Honest

Public bounties and prize threads look simple until an agent starts acting on them. A search result may say "reward", but the real page may be closed, crowded, cash-only, token-based, account-gated, or legally blocked by something the account owner must do personally.

I built Coral Reward Watchtower as a small local-first triage layer for that problem. Instead of letting an agent jump from search result to comment or pull request, the project normalizes each candidate into a local JSONL record:

- reward type
- payout or prize shape
- current status
- account requirements
- legal or CLA requirements
- deadline
- risk
- next action
- fit score

The dataset is then exposed through a Coral custom source as `reward_signals.candidates`. That means the agent can ask normal SQL questions like:

```sql
SELECT id, title, reward_type, reward_value, verdict, fit_score, next_action
FROM reward_signals.candidates
ORDER BY fit_score DESC
LIMIT 6;
```

The most important design choice is that the decision is inspectable. If a lead is skipped, the reason is stored in the row. If a lead is promising but blocked, the blocker is visible. If a prize requires Discord, a legal agreement, or a private account, that stays in the table instead of being hidden inside a chat transcript.

For this run, the top live candidate remains a HarnessClaw pull request for a JD-card reward. It is open and mergeable, but blocked by a CLA that only the GitHub account owner can sign. The next ranked non-cash route is this Coral hackathon path itself, because the available rewards include hardware, a keyboard, and Claude Max vouchers rather than only cash or token payouts.

The first version was prepared before the official May 25-31 build window, so the right submission path is to register, continue improving it during the window, then publish the final Captain's Log and showcase post with fresh verification output.

Coral helped turn a messy "go find money" task into a queryable local decision surface. The result is not a magic bounty hunter. It is a small guardrail that keeps the agent from creating spam, fabricating payout confidence, or stepping across user-controlled legal/account boundaries.

## What Worked

- JSONL source specs are fast enough for a one-day build.
- SQL makes the triage policy visible and easy to review.
- A deterministic fallback script keeps the demo understandable even without Coral.
- Local-first data keeps private submission details out of the repo.

## What I Would Build Next

- Add a GitHub source join for live issue and PR status.
- Add a Discord/social-submission checklist table.
- Add a verifier that fails any candidate with missing payout terms.
- Add an MCP prompt that forces agents to query Coral before commenting on reward issues.
