import LottoGame from "../domain/LottoGame.js";
import outputView from "../view/outputView.js";
import OutputView from "../view/outputView.js";
import WinningLotto from "../domain/WinningLotto.js";
import InputView from "../view/InputView.js";

class LottoController {
  constructor() {
    this.inputView = new InputView();
    this.outputView = new OutputView();
  }

  async run() {
    try {
      const budget = await this.inputView.askBudget();
      const lottoGame = new LottoGame();
      this.buyLottos(budget, lottoGame);
      const { winningNumbers, bonusNumber } = await this.askWinningLottos();
      const winningLotto = new WinningLotto(winningNumbers, bonusNumber);

      lottoGame.calculateTotalWinningAmount(budget, winningLotto);
      const winningStatistics = lottoGame.getWinningStatistics(winningLotto);
      this.outputView.printWinningStatistics(winningStatistics, budget);
    } catch (error) {
      this.outputView.printError(error);
    }
  }

  buyLottos(budget, lottoGame) {
    let lottoCount = budget.getLottoCount(LottoGame.LOTTO_PRICE);
    outputView.printLottoCount(lottoCount);
    lottoGame.buyLottos(budget);
    outputView.printLottos(lottoGame.getLottos());
  }

  async askWinningLottos() {
    const winningNumbers = await this.inputView.askWinningNumbers();
    const bonusNumber = await this.inputView.askBonusNumber();
    return { winningNumbers, bonusNumber };
  }
}

export default LottoController;
