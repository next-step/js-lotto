import InputView from "../view/InputView.js";
import OutputView from "../view/OutputView.js";
import Budget from "../domain/Budget.js";
import LottoNumber from "../domain/LottoNumber.js";
import WinningLotto from "../domain/WinningLotto.js";

class IoService {
  static INVALID_INPUT = "잘못된 사용자 입력입니다.";
  static RESTART_COMMAND = "y";
  static END_COMMAND = "n";

  constructor() {
    this.inputView = new InputView();
    this.outputView = new OutputView();
  }

  async askBudget() {
    while (true) {
      try {
        const budget = await this.inputView.askBudget();
        return new Budget(budget);
      } catch (error) {
        console.log(IoService.INVALID_INPUT);
      }
    }
  }

  async askRestart() {
    while (true) {
      try {
        const input = await this.inputView.askRestart();
        if (
          input !== IoService.RESTART_COMMAND &&
          input !== IoService.END_COMMAND
        ) {
          throw new Error(IoService.INVALID_INPUT);
        }
        return input === IoService.RESTART_COMMAND;
      } catch (error) {
        console.log(IoService.INVALID_INPUT);
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
        console.log(IoService.INVALID_INPUT);
      }
    }
  }

  printLottoPurchase(lottoGame) {
    this.outputView.printLottoCount(lottoGame.getLottoCount());
    this.outputView.printLottos(lottoGame.getLottos());
  }

  printWinningStatistics(statistics, lottoGame) {
    this.outputView.printWinningStatistics(statistics, lottoGame);
  }

  printError(error) {
    this.outputView.printError(error);
  }
}

export default IoService;
