import InputView from "../view/InputView.js";
import Budget from "../domain/Budget.js";
import LottoNumber from "../domain/LottoNumber.js";
import WinningLotto from "../domain/WinningLotto.js";

class LottoInputService {
  static INVALID_INPUT = "잘못된 사용자 입력입니다.";
  static RESTART_COMMAND = "y";
  static END_COMMAND = "n";

  constructor() {
    this.inputView = new InputView();
  }

  async askBudget() {
    while (true) {
      try {
        const budget = await this.inputView.askBudget();
        return new Budget(budget);
      } catch (error) {
        console.log(LottoInputService.INVALID_INPUT);
      }
    }
  }

  async askRestart() {
    while (true) {
      try {
        const input = await this.inputView.askRestart();
        if (
          input !== LottoInputService.RESTART_COMMAND &&
          input !== LottoInputService.END_COMMAND
        ) {
          throw new Error(LottoInputService.INVALID_INPUT);
        }
        return input === LottoInputService.RESTART_COMMAND;
      } catch (error) {
        console.log(LottoInputService.INVALID_INPUT);
      }
    }
  }

  async askWinningLotto() {
    while (true) {
      try {
        const winningNumbers = await this.inputView.askWinningNumbers();
        const lottoWinningNumbers =
          LottoNumber.createLottoNumbers(winningNumbers);
        const bonusNumber = await this.inputView.askBonusNumber();
        const lottoBonusNumber = LottoNumber.valueOf(bonusNumber);
        return new WinningLotto(lottoWinningNumbers, lottoBonusNumber);
      } catch (error) {
        console.log(LottoInputService.INVALID_INPUT);
      }
    }
  }
}

export default LottoInputService;
