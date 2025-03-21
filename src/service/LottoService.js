import LottoGame from "../domain/LottoGame.js";
import WinningLotto from "../domain/WinningLotto.js";
import LottoNumber from "../domain/LottoNumber.js";
import Budget from "../domain/Budget.js";

class LottoService {
  static LOTTO_GAME_NOT_CREATED;

  constructor() {
    this.lottoGame = null;
  }

  startLottoGame(amount) {
    const budget = new Budget(amount);
    this.lottoGame = new LottoGame(budget);
  }

  buyLottos() {
    this.lottoGame.buyLottos();
  }

  calculateResults(winningNumbers, bonusNumber) {
    if (!this.lottoGame) {
      throw new Error(LottoService.LOTTO_GAME_NOT_CREATED);
    }

    const winningLotto = new WinningLotto(
      winningNumbers.map((number) => LottoNumber.valueOf(number)),
      LottoNumber.valueOf(bonusNumber),
    );

    this.lottoGame.calculateTotalWinningAmount(winningLotto);
    return this.lottoGame.getWinningStatistics(winningLotto);
  }

  getProfit() {
    if (!this.lottoGame) {
      throw new Error(LottoService.LOTTO_GAME_NOT_CREATED);
    }
    return this.lottoGame.getProfit();
  }

  getLottos() {
    if (!this.lottoGame) {
      throw new Error(LottoService.LOTTO_GAME_NOT_CREATED);
    }
    return this.lottoGame.getLottos();
  }
}

export default LottoService;
