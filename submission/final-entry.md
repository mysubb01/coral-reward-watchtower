# Coral Reward Watchtower - Final Submission Entry

Prepared: 2026-05-23

## Submission Title

Coral Reward Watchtower: reward triage before the agent acts

## Short Description

Coral Reward Watchtower is a local-first Coral project that ranks public reward, prize, voucher, and bounty leads before an agent takes public action. It exposes candidates, evidence, and next actions as three JSONL-backed Coral tables, then uses SQL joins to show which opportunities are worth pursuing, which are blocked by account-owner actions, and which should be skipped.

## Primary Links

- Live guide: https://mysubb01.github.io/coral-reward-watchtower/
- Repository: https://github.com/mysubb01/coral-reward-watchtower
- Release package: https://github.com/mysubb01/coral-reward-watchtower/releases/tag/v0.2.0-submission
- CI proof: https://github.com/mysubb01/coral-reward-watchtower/actions/workflows/coral-demo.yml
- Latest successful CI run: https://github.com/mysubb01/coral-reward-watchtower/actions/runs/26335248582
- Showcase screenshot: https://github.com/mysubb01/coral-reward-watchtower/blob/main/submission/evidence/coral-reward-watchtower-showcase-20260523.png
- Demo output asset: https://github.com/mysubb01/coral-reward-watchtower/releases/download/v0.2.0-submission/demo-output-20260523.txt

## Track Fit

Best fit:

- Personal Agent track
- Tell the Tale: Discord Showcase + Social Post
- Captain's Log: reproducible "How to Build X" guide

This is strongest as a showcase and Captain's Log entry because it is small, reproducible, and demonstrates Coral's SQL interface on a real decision problem.

## What It Demonstrates

- A custom Coral source over local JSONL files.
- Three tables: `reward_signals.candidates`, `reward_signals.evidence`, and `reward_signals.actions`.
- A ranking query for candidate triage.
- A join query that combines candidate rows with source evidence and account-owner/agent next actions.
- 100% local data, with no private account tokens or credentials.
- CI proof that the Coral demo runs remotely.

## Why It Matters

Reward-seeking agents can create noise if they act on every public "bounty" or "reward" result. Some leads are cash-only, token-based, crowded, expired, legally blocked, or require user-controlled account actions.

This project makes the decision inspectable before the agent acts. The agent can see:

- the reward type
- the current status
- the evidence source
- the risk
- whether the next action belongs to the agent or the account owner

## Coral SQL Query

```sql
SELECT
  c.id,
  c.verdict,
  c.fit_score,
  e.evidence_type,
  e.confidence,
  a.owner,
  a.action_type,
  a.action
FROM reward_signals.candidates c
JOIN reward_signals.evidence e
  ON c.id = e.candidate_id
JOIN reward_signals.actions a
  ON c.id = a.candidate_id
WHERE c.verdict IN ('pursue', 'review')
ORDER BY c.fit_score DESC, a.priority ASC, e.confidence DESC
LIMIT 12;
```

## Verification

Local:

```bash
npm run validate
npm run rank
npm run demo
```

Remote:

- GitHub Actions workflow: `Coral Demo`
- Latest successful run: https://github.com/mysubb01/coral-reward-watchtower/actions/runs/26335248582
- Release asset: https://github.com/mysubb01/coral-reward-watchtower/releases/download/v0.2.0-submission/demo-output-20260523.txt

## Discord Showcase Draft

```md
I built Coral Reward Watchtower, a local-first reward triage layer for agents.

Live guide: https://mysubb01.github.io/coral-reward-watchtower/
Repo: https://github.com/mysubb01/coral-reward-watchtower
Release package: https://github.com/mysubb01/coral-reward-watchtower/releases/tag/v0.2.0-submission
CI proof: https://github.com/mysubb01/coral-reward-watchtower/actions/workflows/coral-demo.yml
Screenshot: https://github.com/mysubb01/coral-reward-watchtower/blob/main/submission/evidence/coral-reward-watchtower-showcase-20260523.png

The problem: reward and bounty leads are noisy. Some are cash-only, token-based, crowded, expired, or blocked by account-owner actions like CLA signing.

The Coral part: I expose reward candidates, source evidence, and next actions as three JSONL-backed Coral tables:

- reward_signals.candidates
- reward_signals.evidence
- reward_signals.actions

Then I use SQL joins to show which opportunities are worth pursuing, which are blocked, and which should be skipped.

Run:

```bash
brew install withcoral/tap/coral
npm run demo
```

What I learned: Coral is useful even for small local datasets because it makes an agent's decision policy inspectable before the agent comments, claims, or opens a pull request.
```

## Social Post Draft

```text
Built Coral Reward Watchtower for Pirates of the Coral-bean:

A local-first Coral project that ranks public reward/prize/bounty leads before an agent acts.

It exposes candidates, evidence, and next actions as Coral SQL tables, then joins them to show what is safe to pursue, what is blocked, and what should be skipped.

Guide: https://mysubb01.github.io/coral-reward-watchtower/
Repo: https://github.com/mysubb01/coral-reward-watchtower
Release: https://github.com/mysubb01/coral-reward-watchtower/releases/tag/v0.2.0-submission
```

## Boundary

No reward receipt is claimed yet.

Account-owner actions still required:

- Register for Pirates of the Coral-bean.
- Post the showcase in Coral Discord `#how-i-coral`.
- Post on LinkedIn or X if entering the showcase bounty.
- Sign the HarnessClaw CLA if pursuing the separate JD-card PR path.

