import { ERROR_CODES } from "./constants/error";
import { Lotto } from "./domain/Lotto";
import { LottoResult } from "./domain/LottoResult";
import { View } from "./views/view";

export class App {
  async play() {
    const amount = await View.inputAmount();

    this.validateNumber(amount);

    const count = this.getLottoCount(Number(amount));

    const lottoList = this.buyLotto(Number(amount));
    View.outputBuyLog(count, lottoList);

    const winningNumbers = await View.inputWinningNumbers();
    const bonusNumber = await View.inputBonusNumber();
    const lottoResult = new LottoResult(winningNumbers, bonusNumber);

    View.outputWinningLog(
      lottoResult.getWinningResult(lottoList),
      lottoResult.getProfitRate(amount, lottoList)
    );
  }

  getLottoCount(amount) {
    return Math.floor(amount / Lotto.PRICE);
  }

  buyLotto(amount) {
    this.validateAmount(amount);

    const lottoList = [];
    for (let i = 0; i < this.getLottoCount(amount); i++) {
      lottoList.push(new Lotto(this.getRandomNumbers(Lotto.LEN)));
    }

    return lottoList;
  }

  validateAmount(amount) {
    if (amount < Lotto.PRICE) {
      throw new Error(ERROR_CODES.ERROR_AMOUNT_TOO_SMALL);
    }
  }

  validateNumber(value) {
    if (isNaN(value)) {
      throw new Error(ERROR_CODES.ERROR_NOT_A_NUMBER);
    }
  }

  getRandomNumbers(length) {
    const numbers = new Set();

    while (true) {
      if (numbers.size === length) {
        return [...numbers].sort((num1, num2) => num1 < num2);
      }

      numbers.add(this.getRandomNumber());
    }
  }

  getRandomNumber() {
    return Math.floor(Math.random() * 45) + 1;
  }
}
