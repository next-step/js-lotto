import { PERCENTAGE_UNIT, winningForm } from '../constants.js';

export class LottoResultModel {
  lottoNumbers = [];
  winningLotto;
  place = {
    first: { hit: 6, bonus: 0 },
    second: { hit: 5, bonus: 1 },
    third: { hit: 5, bonus: 0 },
    fourth: { hit: 4, bonus: 0 },
    fifth: { hit: 3, bonus: 0 },
  };

  winningResult = {
    first: 0,
    second: 0,
    third: 0,
    fourth: 0,
    fifth: 0,
  };

  profitRate = 0;

  constructor(lottoNumbers, winningLotto) {
    this.lottoNumbers = lottoNumbers;
    this.winningLotto = winningLotto;
  }

  computeWinningResult(purchaseAmount) {
    for (const numbers of this.lottoNumbers) {
      const hitWinningNumber = numbers.filter((number) =>
        this.winningLotto.lottoNumber.includes(number)
      );

      const hitBonusNumber = numbers.includes(this.winningLotto.bonusNumber)
        ? 1
        : 0;

      const result = { hit: hitWinningNumber.length, bonus: hitBonusNumber };

      Object.keys(this.place).forEach((key) => {
        if (JSON.stringify(this.place[key]) === JSON.stringify(result)) {
          this.winningResult[key] += 1;
        }
      });
    }

    this.computeProfit(purchaseAmount);
  }

  computeProfit(purchaseAmount) {
    const profit = Object.keys(this.winningResult).reduce(
      (acc, cur) => acc + this.winningResult[cur] * winningForm[cur].winnings,
      0
    );

    this.profitRate =
      ((profit - purchaseAmount) / purchaseAmount) * PERCENTAGE_UNIT;
  }
}
