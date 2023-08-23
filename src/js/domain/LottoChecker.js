import { FifthPrize, FourthPrize, LottoPrize, SecondPrize, ThirdPrize, FirstPrize } from './LottoPrize/index.js';

export class LottoChecker {
  static FIRST = 6;

  static SECOND = 5;

  static THIRD = 5;

  static FOURTH = 4;

  static FIFTH = 3;

  static getPrize(winningLotto, lotto) {
    const matched = winningLotto.getMatchedCount(lotto);
    const hasBonus = winningLotto.hasBonus(lotto);
    switch (matched) {
      case LottoChecker.FIRST:
        return new FirstPrize();
      case LottoChecker.SECOND:
        return hasBonus ? new SecondPrize() : new ThirdPrize();
      case LottoChecker.FOURTH:
        return new FourthPrize();
      case LottoChecker.FIFTH:
        return new FifthPrize();
      default:
        return new LottoPrize();
    }
  }
}
