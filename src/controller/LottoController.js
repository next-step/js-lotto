import LottoGame from "../domain/LottoGame.js";
import LottoInputService from "../service/InputService.js";
import LottoOutputService from "../service/OutputService.js";

class LottoController {
  constructor() {
    this.inputService = new LottoInputService();
    this.outputService = new LottoOutputService();
  }

  async run() {
    while (true) {
      try {
        const budget = await this.inputService.askBudget();
        const lottoGame = new LottoGame(budget);

        lottoGame.buyLottos();
        this.outputService.printLottoPurchase(lottoGame);

        const winningLotto = await this.inputService.askWinningLotto();

        lottoGame.calculateTotalWinningAmount(winningLotto);
        const statistics = lottoGame.getWinningStatistics(winningLotto);
        this.outputService.printWinningStatistics(statistics, lottoGame);

        if (!(await this.inputService.askRestart())) {
          break;
        }
      } catch (error) {
        this.outputService.printError(error);
      }
    }
  }
}

export default LottoController;
