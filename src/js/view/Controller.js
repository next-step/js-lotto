import { Lotto, LottoMachine } from "../domain";
import { Input } from "./Input";
import { Output } from "./Output";

export class LottoController {
  lottoMachine;

  constructor() {
    this.lottoMachine = new LottoMachine();
  }

  async play() {
    while (this.lottoMachine.playable) {
      await this.buyLotto();
      const winningNumbers = await this.getWinningNumbers();
      const winningLotto = await this.getBonusNumber(winningNumbers);
      const lottoResult = this.getLottoResult(winningLotto);

      this.printLottoStatistics(lottoResult);

      await this.playAgain();
    }
  }

  async buyLotto() {
    while (true) {
      try {
        const money = await Input.getMoney();
        const lottos = this.lottoMachine.buy(money);
        Output.printLottoInfo(lottos);

        return true;
      } catch (error) {
        console.error(error.message);
      }
    }
  }

  async getWinningNumbers() {
    while (true) {
      try {
        const numbers = await Input.getWinningNumbers();
        const winningNumbers = new Lotto(numbers);

        return winningNumbers;
      } catch (error) {
        console.error(error.message);
      }
    }
  }
  async getBonusNumber(winningNumbers) {
    while (true) {
      try {
        const bonusNumber = await Input.getBonusNumber();
        const winningLotto = this.lottoMachine.generateWinningLotto(winningNumbers, bonusNumber);

        return winningLotto;
      } catch (error) {
        console.error(error.message);
      }
    }
  }

  getLottoResult(winningLotto) {
    return this.lottoMachine.getLottoResult(winningLotto);
  }

  printLottoStatistics(lottoResult) {
    Output.printLottoStatistics(lottoResult);
  }

  async playAgain() {
    while (true) {
      try {
        const playAgain = await Input.getPlayAgain();
        return this.lottoMachine.updatePlayableState(playAgain);
      } catch (error) {
        console.error(error.message);
      }
    }
  }

  get lottoMachine() {
    return this.lottoMachine;
  }
}
