import { Lotto, LottoMachine, LottoRewards, WinningLotto } from '../domain/index.js';
import { LottoListView, LottoResultView, PurchaseView, WinningLottoView } from '../view/index.js';

class LottoGame {
  #view = {
    purchaseForm: new PurchaseView(),
    lottoList: new LottoListView(),
    winningLotto: new WinningLottoView(),
    lottoResult: new LottoResultView(),

    error: alert.bind(window),

    settings: {
      isShowNumbers: false,
    },
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
    this.#view.settings.isShowNumbers = false;
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
    this.showLottos(this.#view.settings.isShowNumbers);
    this.#view.winningLotto.show();
  }

  showLottos(visibleNumbers = false) {
    this.#view.lottoList.setLottoQuantity(this.#lottoConfig.lottos.length);
    this.#view.lottoList.showLottos(this.#lottoConfig.lottos, visibleNumbers);
    this.#view.lottoList.show();
  }

  toggleShowNumbers() {
    this.#view.settings.isShowNumbers = !this.#view.settings.isShowNumbers;
    this.showLottos(this.#view.settings.isShowNumbers);
  }

  setWinningLotto() {
    const winningNumbers = this.#view.winningLotto
      .getWinningNumbers()
      .map(Number)
      .filter((number) => number);
    const bonus = Number(this.#view.winningLotto.getBonusNumber());
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
      this.#view.error(message);
    }
  }
}

export default LottoGame;
