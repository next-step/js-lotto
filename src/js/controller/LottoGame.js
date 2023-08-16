import { Exchange, LottoChecker, LottoMachine } from '../domain/index.js';
import checkValidWinningNumbers from '../validator/winningNumbers.js';
import { LottoInputView, LottoOutputView } from '../view/Lotto/index.js';

class LottoGame {
  #inputView = new LottoInputView();

  #outputView = new LottoOutputView();

  #lottoChecker = new LottoChecker();

  #lottoMachine = new LottoMachine();

  #exchange = new Exchange();

  #recentPurchaseMoney = 0;

  #recentLottos = [];

  #winningNumbers = [];

  #bonus = null;

  #result = null;

  #totalPrize = 0;

  #rateOfReturn = null;

  get recentPurchaseMoney() {
    return this.#recentPurchaseMoney;
  }

  get recentLottos() {
    return this.#recentLottos;
  }

  get winningNumbers() {
    return this.#winningNumbers;
  }

  get bonus() {
    return this.#bonus;
  }

  get result() {
    return this.#result;
  }

  get totalPrize() {
    return this.#totalPrize;
  }

  get rateOfReturn() {
    return this.#rateOfReturn;
  }

  async start() {
    await this.buyLotto();
    await this.setWinningNumbers();
    await this.setBonus();
    this.checkLottos();
    this.setTotalPrize();
    this.setRateOfReturn();
    this.stopGame();
  }

  async buyLotto() {
    try {
      this.#recentPurchaseMoney = Number((await this.#inputView.purchase()).trim());
      this.#recentLottos = this.#lottoMachine.buy(this.#recentPurchaseMoney);
      this.#outputView.buyLottos(this.#recentLottos);
      this.#outputView.lottos(this.#recentLottos);
    } catch (err) {
      this.showError(err);
    }
  }

  async setWinningNumbers() {
    const winningNumbers = await this.#inputView.winningNumbers();
    this.checkValidation(checkValidWinningNumbers, winningNumbers);
    this.#winningNumbers = winningNumbers;
  }

  async setBonus() {
    this.#bonus = await this.#inputView.bonus();
  }

  checkLottos() {
    this.#recentLottos.forEach((lotto) => {
      lotto.check(this.#winningNumbers, this.#bonus);
    });
    this.#result = this.#lottoChecker.getLottoRewardBoard(this.#recentLottos);
    this.#outputView.lottoResult(this.#result);
  }

  setTotalPrize() {
    this.#totalPrize = Exchange.getLottoPrize(this.#result);
  }

  setRateOfReturn() {
    this.#rateOfReturn = this.#exchange.calculateRateOfReturn(this.#recentPurchaseMoney, this.#totalPrize);
    this.#outputView.rateOfReturn(this.#rateOfReturn);
  }

  stopGame() {
    this.reset();
    process.exit();
  }

  reset() {
    this.#recentPurchaseMoney = 0;
    this.#recentLottos = [];
    this.#winningNumbers = [];
    this.#bonus = null;
    this.#result = null;
    this.#totalPrize = 0;
    this.#rateOfReturn = null;
  }

  checkValidation(validator, target) {
    try {
      validator(target);
    } catch (err) {
      this.showError(err);
    }
  }

  showError({ message }) {
    this.#outputView.error(message);
    this.stopGame();
  }
}

export default LottoGame;
