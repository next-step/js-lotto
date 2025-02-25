import LottoGame from "../domain/LottoGame.js";

class LottoService {
  createLottoGame(budget) {
    return new LottoGame(budget);
  }

  buyLottos(lottoGame) {
    lottoGame.buyLottos();
  }

  calculateResults(lottoGame, winningLotto) {
    lottoGame.calculateTotalWinningAmount(winningLotto);
    return lottoGame.getWinningStatistics(winningLotto);
  }
}

export default LottoService;
