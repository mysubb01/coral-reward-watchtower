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
