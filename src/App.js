import { Lotto } from "./domain/Lotto";
import { LottoResult } from "./domain/LottoResult";
import { validateAmount } from "./utils/validator/validateAmount";
import { View } from "./views/view";

export class App {
  #isReStart = true;

  async play() {
    while (this.#isReStart) {
      const amount = await View.inputAmount();
      const count = this.getLottoCount(amount);
      const lottoList = this.buyLotto(amount);
      View.outputBuyLog(count, lottoList);

      const winningNumbers = await View.inputWinningNumbers();
      const bonusNumber = await View.inputBonusNumber();
      const lottoResult = new LottoResult(winningNumbers, bonusNumber);
      View.outputWinningLog(
        lottoResult.getWinningResult(lottoList),
        lottoResult.getProfitRate({ amount, lottoList })
      );

      const restart = await View.inputReStart();
      this.#isReStart = restart === "y";
    }
  }

  getLottoCount(amount) {
    return Math.floor(amount / Lotto.PRICE);
  }

  buyLotto(amount) {
    validateAmount(amount);

    return Array.from(
      { length: this.getLottoCount(amount) },
      () => new Lotto(this.getRandomNumbers(Lotto.LEN))
    );
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
