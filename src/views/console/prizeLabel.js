export function getPrizeLabel(prize) {
  const strategy = prize.matchingStrategy;
  const requiredMatchCount = strategy.requiredMatchCount;
  const bonusOption = strategy.bonusOption;
  const prizeAmount = prize.prizeAmount.toLocaleString();

  return bonusOption
    ? `${requiredMatchCount}개 일치, 보너스 볼 일치 (${prizeAmount}원)`
    : `${requiredMatchCount}개 일치 (${prizeAmount}원)`;
}
