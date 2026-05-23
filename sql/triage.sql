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
