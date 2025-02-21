import LottoGame from "../domain/LottoGame.js";
import outputView from "../view/outputView.js";
import OutputView from "../view/outputView.js";
import Lotto from "../domain/Lotto.js";
import WinningLotto from "../domain/WinningLotto.js";
import InputView from "../view/InputView.js";
import FirstPrize from "../domain/prize/FirstPrize.js";
import FifthPrize from "../domain/prize/FifthPrize.js";
import FourthPrize from "../domain/prize/FourthPrize.js";
import ThirdPrize from "../domain/prize/ThirdPrize.js";
import SecondPrize from "../domain/prize/SecondPrize.js";

class LottoController {
  constructor() {
    this.inputView = new InputView();
    this.outputView = new OutputView();
  }

  async run() {
    try {
      const budget = await this.inputView.askBudget();
      const lottoGame = new LottoGame(budget);
      outputView.printLottoCount(budget.getLottoCount(Lotto.LOTTO_PRICE));
      lottoGame.buyLottos(Lotto.LOTTO_PRICE);
      outputView.printLottos(lottoGame.getLottos());
      const winningNumbers = await this.inputView.askWinningNumbers();
      const bonusNumber = await this.inputView.askBonusNumber();
      const winningLotto = new WinningLotto(winningNumbers, bonusNumber);

      lottoGame.calculateTotalWinningAmount(winningLotto, [
        new FirstPrize(),
        new SecondPrize(),
        new ThirdPrize(),
        new FourthPrize(),
        new FifthPrize(),
      ]);
    } catch (error) {
      this.outputView.printError(error);
    }
  }
}

export default LottoController;
