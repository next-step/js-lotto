import { FifthPrize, FourthPrize, LottoPrize, SecondPrize, ThirdPrize, FirstPrize } from './LottoPrize/index.js';

export class LottoReward {
  static FIRST = 6;

  static SECOND = 5;

  static THIRD = 5;

  static FOURTH = 4;

  static FIFTH = 3;

  static getPrize(winningLotto, lotto) {
    const matched = winningLotto.getMatchedCount(lotto);
    const hasBonus = winningLotto.hasBonus(lotto);
    switch (matched) {
      case LottoReward.FIRST:
        return new FirstPrize();
      case LottoReward.SECOND:
        return hasBonus ? new SecondPrize() : new ThirdPrize();
      case LottoReward.FOURTH:
        return new FourthPrize();
      case LottoReward.FIFTH:
        return new FifthPrize();
      default:
        return new LottoPrize();
    }
  }
}
