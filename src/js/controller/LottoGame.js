import { Lotto, LottoMachine, LottoRewards, WinningLotto } from '../domain/index.js';
import { LottoListView, LottoResultView, PurchaseView, WinningLottoView } from '../view/index.js';

class LottoGame {
  #view = {
    purchaseForm: new PurchaseView(),
    lottoList: new LottoListView(),
    winningLotto: new WinningLottoView(),
    lottoResult: new LottoResultView(),
  };

  #errorView = alert.bind(window);

  #lottoMachine;

  #money;

  #lottos;

  #winningLotto;

  #rewards;

  #isShowNumbers;

  constructor() {
    this.init();
    this.bindEvents();
  }

  init() {
    this.#lottoMachine = new LottoMachine();
    this.#money = 0;
    this.#lottos = [];
    this.#winningLotto = null;
    this.#rewards = null;
    this.#isShowNumbers = false;
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
    this.#money = Number(money.trim());
    this.#lottos = this.#lottoMachine.buy(this.#money);
    this.showLottos(this.#isShowNumbers);
    this.#view.winningLotto.show();
  }

  showLottos(visibleNumbers = false) {
    this.#view.lottoList.setLottoQuantity(this.#lottos.length);
    this.#view.lottoList.showLottos(
      this.#lottos.map(({ numbers }) => numbers),
      visibleNumbers
    );
    this.#view.lottoList.show();
  }

  toggleShowNumbers() {
    this.#isShowNumbers = !this.#isShowNumbers;
    this.showLottos(this.#isShowNumbers);
  }

  setWinningLotto() {
    const winningNumbers = this.#view.winningLotto
      .getWinningNumbers()
      .map(Number)
      .filter((number) => number);
    const bonus = Number(this.#view.winningLotto.getBonusNumber());
    this.#winningLotto = new WinningLotto(Lotto.of(winningNumbers.map(Number)), Number(bonus));
    this.computeRewards();
    this.computeRateOfReturn();
    this.showResult();
  }

  computeRewards() {
    this.#rewards = new LottoRewards(this.#lottos, this.#winningLotto);
    const rankResult = this.#rewards.getRankList();
    this.#view.lottoResult.setResult(rankResult);
  }

  computeRateOfReturn() {
    const rateOfReturn = this.#rewards.computeRateOfReturn(this.#money);
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
      this.#errorView(message);
    }
  }
}

export default LottoGame;
