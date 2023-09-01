export class LottoPrize {
  checkPrize(matchingCount, isBonusMatched) {
    if (matchingCount < 3) return 0;
    if (matchingCount === 3) return 5_000;
    if (matchingCount === 4) return 5_0000;
    if (matchingCount === 5 && !isBonusMatched) return 1_500_000;
    if (matchingCount === 5 && isBonusMatched) return 30_000_000;
    if (matchingCount === 6) return 2_000_000_000;

    throw new Error('로또는 최대 6자리 수입니다.');
  }
}
