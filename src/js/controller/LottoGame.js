import { Lotto, LottoMachine, LottoRewards, WinningLotto } from '../domain/index.js';
import { LottoOutputView } from '../view/Lotto/index.js';
import { LottoListView } from '../view/Lotto/LottoListView.js';
import { LottoResultView } from '../view/Lotto/LottoResultView.js';
import { PurchaseView } from '../view/Lotto/PurchaseView.js';
import { WinningLottoView } from '../view/Lotto/WinningLottoView.js';

class LottoGame {
  #view = {
    purchaseForm: new PurchaseView(),
    lottoList: new LottoListView(),
    winningLotto: new WinningLottoView(),
    lottoResult: new LottoResultView(),
  };

  #outputView = new LottoOutputView();

  #lottoMachine = new LottoMachine();

  #money = 0;

  #lottos = [];

  #winningLotto = null;

  #rewards;

  #isShowNumbers = false;

  constructor() {
    this.bindEvents();
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
    this.#view.lottoResult.bindRestartEvent();
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

  withRetry(action) {
    try {
      action();
    } catch ({ message }) {
      this.#outputView.error(message);
    }
  }
}

export default LottoGame;
