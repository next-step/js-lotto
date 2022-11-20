import { $bonusNumber, $profit, $purchaseAmount, $tbody } from './dom.js';
import { removeChild } from './utils.js';
export const winningForm = {
  fifth: { number: `3개`, winnings: 5_000 },
  fourth: { number: `4개`, winnings: 50_000 },
  third: { number: `5개`, winnings: 1_500_000 },
  second: { number: `5개 + 보너스볼`, winnings: 30_000_000 },
  first: { number: `6개`, winnings: 2_000_000_000 },
};
const PERCENTAGE_UNIT = 100;

export class LottoResultModel {
  lottoNumbers = [];
  winningNumbers = [];
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

  constructor(lottoNumbers, winningNumbers) {
    this.lottoNumbers = lottoNumbers;
    this.winningNumbers = winningNumbers;

    this.computeWinningResult();
  }

  computeWinningResult() {
    for (const numbers of this.lottoNumbers) {
      const hitWinningNumber = numbers.filter((number) =>
        this.winningNumbers.includes(number)
      );

      const hitBonusNumber = numbers.includes(parseInt($bonusNumber.value))
        ? 1
        : 0;

      const result = { hit: hitWinningNumber.length, bonus: hitBonusNumber };

      Object.keys(this.place).forEach((key) => {
        if (JSON.stringify(this.place[key]) === JSON.stringify(result)) {
          this.winningResult[key] += 1;
        }
      });
    }

    this.computeProfit();
  }

  computeProfit() {
    const purchaseAmount = $purchaseAmount.value;
    const profit = Object.keys(this.winningResult).reduce(
      (acc, cur) => acc + this.winningResult[cur] * winningForm[cur].winnings,
      0
    );

    this.profitRate =
      ((profit - purchaseAmount) / purchaseAmount) * PERCENTAGE_UNIT;
  }
}

export class LottoResultComponent {
  lottoResultModel;

  constructor(lottoResultModel) {
    this.lottoResultModel = lottoResultModel;
  }

  render() {
    removeChild($tbody);

    const result = Object.keys(winningForm)
      .map(
        (place) => `
          <tr class="text-center">
            <td class="p-3">${winningForm[place].number}</td>
            <td class="p-3">${winningForm[place].winnings}</td>
            <td class="p-3">${this.lottoResultModel.winningResult[place]}개</td>
          </tr>`
      )
      .join('');

    $tbody.insertAdjacentHTML('afterbegin', result);
    $profit.textContent = this.lottoResultModel.profitRate;
  }
}
