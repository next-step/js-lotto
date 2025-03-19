import LottoService from "../service/LottoService.js";
import IoService from "../service/IoService.js";
import Budget from "../domain/Budget.js";


class LottoController {
  constructor() {
    this.lottoService = new LottoService();
    this.ioService = new IoService();
  }

  buyLottos(amount) {
    const budget = new Budget(amount);
    const lottoGame = this.lottoService.createLottoGame(budget);
    this.lottoService.buyLottos(lottoGame);
    return lottoGame;
  }

  calculateResults(lottoGame, winningLotto) {
    return this.lottoService.calculateResults(lottoGame, winningLotto);
  }

  async run() {
    while (true) {
      try {
        const budget = await this.ioService.askBudget();
        const lottoGame = this.lottoService.createLottoGame(budget);
        this.lottoService.buyLottos(lottoGame);
        this.ioService.printLottoPurchase(lottoGame);

        const winningLotto = await this.ioService.askWinningLotto();
        const statistics = this.lottoService.calculateResults(
          lottoGame,
          winningLotto,
        );

        this.ioService.printWinningStatistics(statistics, lottoGame);
        if (!(await this.ioService.askRestart())) {
          break;
        }
      } catch (error) {
        this.ioService.printError(error);
      }
    }
  }
}

export default LottoController;
