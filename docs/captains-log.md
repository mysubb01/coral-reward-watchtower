# Captain's Log: Build A Reward Triage Agent With Coral

This guide shows how to build a small local-first reward triage agent with Coral. The project helps a coding agent decide which public reward, bounty, prize, or voucher path is worth acting on next without jumping straight into spammy issue comments or low-quality pull requests.

The result is intentionally modest: a JSONL dataset, a Coral custom source spec, a SQL query, and a fallback Node.js ranker. The value is in making the decision process inspectable before the agent acts.

Repository: https://github.com/mysubb01/coral-reward-watchtower

## Problem

Reward-seeking agents need guardrails.

A search result can say "bounty" or "reward", but the actual page may have one of several blockers:

- no real payout route
- cash-only or token-only payment
- personal account registration
- legal terms or CLA signing
- expired dates
- already crowded claims
- requirements that only a human account owner can satisfy

If an agent treats every result as actionable, it creates noise. It may post comments without reading terms, open duplicate pull requests, or imply that payment is guaranteed when it is not.

Coral helps because it turns the messy decision into a queryable local table. The agent can inspect normalized rows before doing anything public.

## Build The Dataset

The core dataset is `data/reward-signals.jsonl`. Each line is one candidate:

```json
{
  "id": "harnessclaw-pr50",
  "title": "HarnessClaw provider template fix",
  "source_url": "https://github.com/harnessclaw/harnessclaw/pull/50",
  "reward_type": "jd-card",
  "reward_value": "CNY 100 equivalent JD card",
  "status": "open-mergeable",
  "verdict": "pursue",
  "fit_score": 93,
  "requires_account": false,
  "requires_legal": true,
  "deadline": "none-listed",
  "risk": "CLA pending; maintainer must merge; account owner must sign legal agreement",
  "next_action": "Sign CLA, recheck license/cla, then monitor maintainer review"
}
```

The fields are deliberately simple. `verdict`, `fit_score`, `risk`, and `next_action` are the decision surface. They let an agent explain why it should pursue, review, or skip a candidate.

## Add A Coral Source

The source template lives at `coral/reward-signals.template.yaml`.

It defines a JSONL-backed source named `reward_signals` with one table:

```yaml
name: reward_signals
version: 0.1.0
dsl_version: 3
backend: jsonl
test_queries:
  - SELECT id, title FROM reward_signals.candidates LIMIT 1
  - SELECT id, reward_type, fit_score FROM reward_signals.candidates WHERE verdict = 'pursue' ORDER BY fit_score DESC LIMIT 3
tables:
  - name: candidates
    description: Reward candidates normalized for local-first agent triage
```

Coral source specs need an absolute file path for local JSONL. To keep the repo portable, the committed template uses a placeholder and `scripts/generate-coral-spec.mjs` writes a local generated file under `.coral-local/`.

## Run It

Install Coral:

```bash
brew install withcoral/tap/coral
```

Run the full demo:

```bash
npm run demo
```

The demo performs four checks:

1. Generate `.coral-local/reward-signals.yaml`.
2. Lint the Coral source spec.
3. Add and test the source.
4. Run a SQL triage query.

The query:

```sql
SELECT
  id,
  title,
  reward_type,
  reward_value,
  verdict,
  fit_score,
  next_action
FROM reward_signals.candidates
ORDER BY fit_score DESC
LIMIT 6;
```

Expected shape:

```text
harnessclaw-pr50          jd-card              pursue  93
coral-hackathon-showcase  hardware-or-voucher  pursue  86
agent-academy-hackathon   microsoft-store...   review  74
open-collective-gift-card open-collective...   review  52
dev-finish-up-a-thon      cash-and-badge       skip    48
cognitive-os-5            usd-bounty           skip    31
```

This output is useful because it does not hide constraints. The top live task is valuable, but blocked by CLA signing. The Coral hackathon path is promising, but requires user-controlled registration and social/Discord submission. Cash-only or crowded USD bounties are explicitly skipped.

## Why Coral Instead Of A Script Only?

The fallback script is useful:

```bash
npm run rank
```

But the Coral path has two advantages:

1. The data is queryable by any agent that can use Coral over CLI or MCP.
2. The policy can grow into joins across sources later.

For example, the next version can join local candidate rows with GitHub pull request state, issue comments, Discord checklist status, or a private submission log.

## Guardrails

This project follows a few rules:

- Do not claim payment before reward receipt is verified.
- Do not submit legal agreements or contest registrations on behalf of the account owner.
- Do not open PRs or comments unless the target has a clear payout path and a real contribution.
- Prefer non-cash rewards such as hardware, store cards, vouchers, or useful credits when requested.
- Keep private account details out of the public repo.

## Current Outcome

At the time of this guide:

- HarnessClaw PR #50 is open and mergeable, but blocked by CLA signing.
- Coral Reward Watchtower is public, runnable, and ready to use as a Coral showcase or Captain's Log entry.
- Actual reward receipt is still unproven.

The project is not a promise that an agent can always earn rewards. It is a small tool for making the path less noisy, less spammy, and easier to verify.
