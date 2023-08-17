import { LOTTO_RETRY_CODE } from '../constants/lotto-config.js';
import { Exchange, LottoChecker, LottoMachine } from '../domain/index.js';
import { checkValidWinningNumbers, checkValidBonus, checkValidRetry } from '../validator/index.js';
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
  }

  async buyLotto() {
    try {
      const money = Number((await this.#inputView.purchase()).trim());
      this.#recentPurchaseMoney = money;
      this.#recentLottos = this.#lottoMachine.buy(this.#recentPurchaseMoney);
      this.#outputView.buyLottos(this.#recentLottos);
      this.#outputView.lottos(this.#recentLottos);
      await this.setWinningNumbers();
    } catch ({ message }) {
      this.#outputView.error(message);
      this.buyLotto();
    }
  }

  async setWinningNumbers() {
    try {
      const winningNumbers = await this.#inputView.winningNumbers();
      checkValidWinningNumbers(winningNumbers);
      this.#winningNumbers = winningNumbers;
      await this.setBonus();
    } catch ({ message }) {
      this.#outputView.error(message);
      this.setWinningNumbers();
    }
  }

  async setBonus() {
    try {
      const bonus = await this.#inputView.bonus();
      checkValidBonus(bonus, this.#winningNumbers);
      this.#bonus = bonus;
      this.checkLottos();
    } catch ({ message }) {
      this.#outputView.error(message);
      this.setBonus();
    }
  }

  checkLottos() {
    this.#recentLottos.forEach((lotto) => {
      lotto.check(this.#winningNumbers, this.#bonus);
    });
    this.#result = this.#lottoChecker.getLottoRewardBoard(this.#recentLottos);
    this.#outputView.lottoResult(this.#result);
    this.setTotalPrize();
  }

  setTotalPrize() {
    this.#totalPrize = Exchange.getLottoPrize(this.#result);
    this.setRateOfReturn();
  }

  setRateOfReturn() {
    this.#rateOfReturn = this.#exchange.calculateRateOfReturn(this.#recentPurchaseMoney, this.#totalPrize);
    this.#outputView.rateOfReturn(this.#rateOfReturn);
    this.askRetry();
  }

  async askRetry() {
    try {
      const retry = await this.#inputView.retry();
      checkValidRetry(retry);
      if (retry === LOTTO_RETRY_CODE.CONFIRM) this.retryGame();
      process.exit();
    } catch ({ message }) {
      this.#outputView.error(message);
      this.askRetry();
    }
  }

  retryGame() {
    this.reset();
    this.start();
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
}

export default LottoGame;
