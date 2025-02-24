import LottoGame from "../domain/LottoGame.js";
import outputView from "../view/outputView.js";
import OutputView from "../view/outputView.js";
import WinningLotto from "../domain/WinningLotto.js";
import InputView from "../view/InputView.js";
import Budget from "../domain/Budget.js";
import LottoNumber from "../domain/LottoNumber.js";

class LottoController {
  constructor() {
    this.inputView = new InputView();
    this.outputView = new OutputView();
  }

  async run() {
    try {
      const budget = Budget.createBudget(await this.inputView.askBudget());
      const lottoGame = new LottoGame(budget);
      this.buyLottos(lottoGame);
      const { winningNumbers, bonusNumber } = await this.askWinningLottos();
      const winningLotto = new WinningLotto(winningNumbers, bonusNumber);

      lottoGame.calculateTotalWinningAmount(winningLotto);
      const winningStatistics = lottoGame.getWinningStatistics(winningLotto);
      this.outputView.printWinningStatistics(winningStatistics, lottoGame);
    } catch (error) {
      this.outputView.printError(error);
    }
  }

  buyLottos(lottoGame) {
    lottoGame.buyLottos();
    outputView.printLottoCount(lottoGame.getLottoCount());
    outputView.printLottos(lottoGame.getLottos());
  }

  async askWinningLottos() {
    const winningNumbers = LottoNumber.createLottoNumbers(
      await this.inputView.askWinningNumbers(),
    );
    const bonusNumber = LottoNumber.valueOf(
      await this.inputView.askBonusNumber(),
    );
    return { winningNumbers, bonusNumber };
  }
}

export default LottoController;
