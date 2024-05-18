import { validateNumber } from "../utils/validator/validateNumber";
import { validateNumbers } from "../utils/validator/validateNumbers";

export class LottoResult {
  #winningNumbers;
  #bonusNumber;

  constructor(winningNumbers, bonusNumber) {
    if (typeof winningNumbers === "string") {
      this.#ofString(winningNumbers);
    }

    if (typeof bonusNumber === "string") {
      this.#ofNumber(bonusNumber);
    }

    this.#winningNumbers = winningNumbers;
    this.#bonusNumber = bonusNumber;

    validateNumbers(this.#winningNumbers);
    validateNumber(this.#bonusNumber);
  }

  #ofString(numbers) {
    this.#winningNumbers = numbers
      .split(",")
      .map((number) => Number(number.trim()));
  }

  #ofNumber(number) {
    this.#bonusNumber = Number(number);
  }

  getRanking(lotto) {
    const count = lotto.getMatchCount(this.#winningNumbers);
    const isMatchingBonus = lotto.numbers.includes(this.#bonusNumber);

    if (count === 6) return 1;
    if (count === 5 && isMatchingBonus) return 2;
    if (count === 5) return 3;
    if (count === 4) return 4;
    if (count === 3) return 5;
    return 6;
  }

  getWinningAmount(rank) {
    switch (rank) {
      case 1:
        return 2000000000;
      case 2:
        return 30000000;
      case 3:
        return 1500000;
      case 4:
        return 50000;
      case 5:
        return 5000;
      default:
        return 0;
    }
  }

  getWinningResult(lottoList) {
    return lottoList.reduce(
      (acc, lotto) => {
        const rank = this.getRanking(lotto);
        acc[rank] += 1;
        return acc;
      },
      { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 }
    );
  }

  getTotalProfit(lottoList) {
    return lottoList.reduce(
      (acc, lotto) => acc + this.getWinningAmount(this.getRanking(lotto)),
      0
    );
  }

  getProfitRate(amount, lottoList) {
    const totalProfit = this.getTotalProfit(lottoList);
    return parseFloat(((totalProfit / amount) * 100).toFixed(1));
  }
}
