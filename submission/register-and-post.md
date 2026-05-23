# Register And Post Checklist

Official event page: https://www.wemakedevs.org/hackathons/coral

Public project repo: https://github.com/mysubb01/coral-reward-watchtower

## Registration Notes

Use the official registration link from the event page. Registration and prize delivery may require personal details, so the GitHub account owner should do this step directly.

Suggested project fields:

- Project name: Coral Reward Watchtower
- Track: Personal Agent, or Captain's Log / Showcase special bounty
- Repo: https://github.com/mysubb01/coral-reward-watchtower
- Short description: Local-first Coral project that ranks public reward, prize, and bounty leads with SQL so agents avoid spammy or legally blocked work.
- Built with: Coral CLI, Coral custom JSONL source, SQL, Node.js
- Demo command: `npm run demo`

## Discord Showcase Draft

```md
I built Coral Reward Watchtower, a local-first reward triage layer for agents.

Repo: https://github.com/mysubb01/coral-reward-watchtower

The problem: public reward and bounty leads are noisy. Some are cash-only, token-based, account-gated, already crowded, or blocked by legal/user actions like CLA signing.

The Coral part: I normalize reward candidates into local JSONL, expose them as `reward_signals.candidates` through a Coral custom source, and query them with SQL:

```sql
SELECT id, title, reward_type, reward_value, verdict, fit_score, next_action
FROM reward_signals.candidates
ORDER BY fit_score DESC
LIMIT 6;
```

Current result: the query ranks a live HarnessClaw JD-card PR first, then this Coral hackathon path for hardware/voucher rewards, while skipping cash-only or crowded bounty leads.

Run:

```bash
brew install withcoral/tap/coral
npm run demo
```

What I learned: Coral is useful even for small local datasets because it makes an agent's decision policy inspectable before the agent posts comments or opens PRs.
```

## Social Post Draft

```text
Built Coral Reward Watchtower for the Coral hackathon:

A local-first reward triage layer that exposes public bounty/prize leads as a Coral SQL table, so agents can rank real opportunities and avoid spammy, cash-only, crowded, or legally blocked tasks.

Repo: https://github.com/mysubb01/coral-reward-watchtower
Demo: npm run demo
```

