class WinningRankCalculator {
  static calculate(matchedCount, hasBonus) {
    if (matchedCount === 6) return 1;
    if (matchedCount === 5 && hasBonus) return 2;
    if (matchedCount === 5) return 3;
    if (matchedCount === 4) return 4;
    if (matchedCount === 3) return 5;
    return null;
  }
}
export default WinningRankCalculator;
