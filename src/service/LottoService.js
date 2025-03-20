import LottoGame from "../domain/LottoGame.js";
import WinningLotto from "../domain/WinningLotto.js";
import LottoNumber from "../domain/LottoNumber.js";

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

  createWinningLotto(winningNumbers, bonusNumber) {
    console.log(winningNumbers, bonusNumber);
    const lottoWinningNumbers = winningNumbers.map((number) =>
      LottoNumber.valueOf(number),
    );
    const lottoBonusNumber = LottoNumber.valueOf(bonusNumber);
    return new WinningLotto(lottoWinningNumbers, lottoBonusNumber);
  }
}

export default LottoService;
