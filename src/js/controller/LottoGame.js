import { Lotto, LottoMachine, LottoRewards, WinningLotto } from '../domain/index.js';
import { ErrorView, LottoListView, LottoResultView, PurchaseView, WinningLottoView } from '../view/index.js';

class LottoGame {
  #view = {
    purchaseForm: new PurchaseView(),
    lottoList: new LottoListView(),
    winningLotto: new WinningLottoView(),
    lottoResult: new LottoResultView(),

    error: new ErrorView(),
  };

  #viewSettings = {
    isShowNumbers: false,
  };

  #lottoConfig = {
    lottoMachine: new LottoMachine(),

    money: 0,

    lottos: [],

    winningLotto: null,

    rewards: null,
  };

  constructor() {
    this.init();
    this.bindEvents();
  }

  init() {
    this.#lottoConfig.lottoMachine = new LottoMachine();
    this.#lottoConfig.money = 0;
    this.#lottoConfig.lottos = [];
    this.#lottoConfig.winningLotto = null;
    this.#lottoConfig.rewards = null;
    this.#viewSettings.isShowNumbers = false;
  }

  bindEvents() {
    this.#view.purchaseForm.bindPurchaseSubmitEvent((money) => {
      this.withRetry(() => this.buyLotto(money));
    });
    this.#view.lottoList.bindToggleEvent(() => this.toggleShowNumbers());
    this.#view.winningLotto.bindWinningLottoSubmitEvent(() => {
      this.withRetry(() => this.setWinningLotto());
    });
    this.#view.lottoResult.bindModalCloseEvent();
    this.#view.lottoResult.bindRestartEvent(() => this.restart());
  }

  buyLotto(money) {
    this.#lottoConfig.money = Number(money.trim());
    this.#lottoConfig.lottos = this.#lottoConfig.lottoMachine.buy(this.#lottoConfig.money);
    this.showLottos(this.#viewSettings.isShowNumbers);
    this.#view.winningLotto.show();
  }

  showLottos(visibleNumbers = false) {
    this.#view.lottoList.setLottoQuantity(this.#lottoConfig.lottos.length);
    this.#view.lottoList.showLottos(this.#lottoConfig.lottos, visibleNumbers);
    this.#view.lottoList.show();
  }

  toggleShowNumbers() {
    this.#viewSettings.isShowNumbers = !this.#viewSettings.isShowNumbers;
    this.showLottos(this.#viewSettings.isShowNumbers);
  }

  setWinningLotto() {
    const winningNumbers = this.#view.winningLotto.winningNumbers.map(Number).filter((number) => number);
    const bonus = Number(this.#view.winningLotto.bonusNumber);
    this.#lottoConfig.winningLotto = new WinningLotto(Lotto.of(winningNumbers.map(Number)), Number(bonus));
    this.computeRewards();
    this.computeRateOfReturn();
    this.showResult();
  }

  computeRewards() {
    this.#lottoConfig.rewards = new LottoRewards(this.#lottoConfig.lottos, this.#lottoConfig.winningLotto);
    const rankResult = this.#lottoConfig.rewards.getRankList();
    this.#view.lottoResult.setResult(rankResult);
  }

  computeRateOfReturn() {
    const rateOfReturn = this.#lottoConfig.rewards.computeRateOfReturn(this.#lottoConfig.money);
    this.#view.lottoResult.setRateOfReturn(rateOfReturn);
  }

  showResult() {
    this.#view.lottoResult.show();
  }

  restart() {
    Object.values(this.#view).forEach((view) => {
      view.reset();
    });
    this.init();
  }

  withRetry(action) {
    try {
      action();
    } catch ({ message }) {
      this.#view.error.setError(message);
      this.#view.error.showError();
    }
  }
}

export default LottoGame;
