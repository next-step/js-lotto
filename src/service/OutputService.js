import OutputView from "../view/OutputView.js";

class LottoOutputService {
  constructor() {
    this.outputView = new OutputView();
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

export default LottoOutputService;
