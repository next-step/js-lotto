import { LOTTO_PRICE, STATE } from '../constants/index.js';

export class Clerk {
  constructor() {
    this.budget = 0;
    this.lottos = [];
    this.lottoPrice = LOTTO_PRICE;
    this.winningNumber = Array.from({ length: 6 });
    this.bonusNumber = null;
    this.lottoCount = 0;
    this.lottoCycle = STATE.FALSE;
  }

  countWinningNumber(lotto) {
    const winningCount = this.winningNumber.filter((number) => lotto.includes(number));
    const bonusCount = lotto.includes(this.bonusNumber);

    if (bonusCount) {
      return winningCount.length === 4 ? 6 : winningCount.length === 5 ? 7 : winningCount.length;
    }
    return winningCount.length === 6 ? 7 : winningCount.length;
  }

}