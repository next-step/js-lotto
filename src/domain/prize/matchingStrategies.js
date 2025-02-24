export function defaultMatchingStrategy(requiredMatchCount) {
  const strategy = (lotto, winningLotto) => {
    return winningLotto.countMatchNumbers(lotto) === requiredMatchCount;
  };
  strategy.requiredMatchCount = requiredMatchCount;
  strategy.bonusOption = false;
  return strategy;
}

export function bonusMatchingStrategy(requiredMatchCount) {
  const strategy = (lotto, winningLotto) => {
    return (
      winningLotto.countMatchNumbers(lotto) === requiredMatchCount &&
      winningLotto.hasBonus(lotto)
    );
  };
  strategy.requiredMatchCount = requiredMatchCount;
  strategy.bonusOption = true;
  return strategy;
}

export function nonBonusMatchingStrategy(requiredMatchCount) {
  const strategy = (lotto, winningLotto) => {
    return (
      winningLotto.countMatchNumbers(lotto) === requiredMatchCount &&
      !winningLotto.hasBonus(lotto)
    );
  };
  strategy.requiredMatchCount = requiredMatchCount;
  strategy.bonusOption = false;
  return strategy;
}
