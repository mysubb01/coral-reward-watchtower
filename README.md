# Coral Reward Watchtower

[![Coral Demo](https://github.com/mysubb01/coral-reward-watchtower/actions/workflows/coral-demo.yml/badge.svg)](https://github.com/mysubb01/coral-reward-watchtower/actions/workflows/coral-demo.yml)

Local-first reward triage for builders who need to decide which public prize, bounty, or voucher path is worth acting on next.

This is a fresh Coral hackathon build. It turns messy reward leads into local JSONL tables, exposes them through a Coral custom source, then ranks candidates and joins them with evidence/action rows through SQL. The goal is to keep agents away from noisy, spam-prone bounty threads and toward verifiable, ethical work.

## Why This Exists

Public reward work is noisy:

- some issues have no real payout path
- some rewards require private account actions or legal agreements
- some are crowded by automated comments
- some are cash, token, or tax-heavy when the builder wants non-cash prizes
- some are useful, but only after a user-controlled action such as CLA signing

Coral is a good fit because the agent does not need bespoke wrappers for every source. It can query normalized candidate rows and make the decision policy visible.

## Current Best Result

The current top live candidate is still the HarnessClaw PR:

- PR: https://github.com/harnessclaw/harnessclaw/pull/50
- Reward issue: https://github.com/harnessclaw/harnessclaw/issues/43
- Reward type: JD card / CNY store-card equivalent
- State: open and mergeable
- Blocker: CLA must be signed by the GitHub account owner

This project adds a second, non-cash route: Coral hackathon submission assets for hardware, vouchers, or showcase rewards. The current official WeMakeDevs page lists the build window as May 25-31, 2026.

## Install

```bash
brew install withcoral/tap/coral
npm install
```

## Run The Local Agent Flow

```bash
npm run demo
```

This runs:

1. Validate JSON and JSONL files.
2. Generate a local Coral source spec with absolute file paths.
3. Lint the Coral source.
4. Add and test the source.
5. Query the ranked candidate table.
6. Join candidate rows with evidence and account-owner/agent action rows.

If Coral is unavailable, use the deterministic fallback:

```bash
npm run rank
```

## Files

- `data/reward-signals.jsonl`: normalized reward candidates
- `data/evidence.jsonl`: source evidence supporting each candidate verdict
- `data/actions.jsonl`: next actions split by agent-owned and account-owner-owned work
- `coral/reward-signals.template.yaml`: Coral source spec template
- `sql/triage.sql`: example Coral SQL query
- `scripts/generate-coral-spec.mjs`: creates the local Coral spec
- `scripts/validate-jsonl.mjs`: validates local package/data files
- `scripts/rank-candidates.mjs`: fallback ranker without Coral
- `.github/workflows/coral-demo.yml`: remote CI proof that the demo runs
- `docs/captains-log.md`: shareable end-to-end build guide
- `submission/captains-log.md`: ready-to-post hackathon write-up
- `submission/demo-script.md`: short demo recording script

## Submission Angle

Pirates of the Coral-bean has non-cash/hardware/voucher paths:

- Best Enterprise Agent: MacBook Neo
- Best Personal Agent: iPad
- Captain's Log: Keychron mechanical keyboard
- Showcase Reward: Claude Max 5x 1-month vouchers for the best 50 showcases

This project is strongest for the Captain's Log or Showcase lane because it is small, practical, and directly demonstrates why SQL-shaped agent data and joins beat ad hoc wrappers.

## Shareable Guide

Captain's Log guide:

https://github.com/mysubb01/coral-reward-watchtower/blob/main/docs/captains-log.md

GitHub Pages landing page:

https://mysubb01.github.io/coral-reward-watchtower/
