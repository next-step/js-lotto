import { Lotto, LottoMachine, LottoRewards, WinningLotto } from '../domain/index.js';
import { LottoOutputView } from '../view/Lotto/index.js';
import { LottoListView } from '../view/Lotto/LottoListView.js';
import { PurchaseView } from '../view/Lotto/PurchaseView.js';
import { WinningLottoView } from '../view/Lotto/WinningLottoView.js';

class LottoGame {
  #view = {
    purchaseForm: new PurchaseView(),
    lottoList: new LottoListView(),
    winningLotto: new WinningLottoView(),
  };

  #outputView = new LottoOutputView();

  #lottoMachine = new LottoMachine();

  #lottos = [];

  #winningLotto = null;

  #isShowNumbers = false;

  #rewards;

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
  }

  buyLotto(money) {
    this.#lottos = this.#lottoMachine.buy(Number(money.trim()));
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
  }

  // async setRewards() {
  //   this.#rewards = new LottoRewards(this.#lottos, this.#winningLotto);

  //   this.showResult();
  // }

  // showResult() {
  //   this.#outputView.lottoResult();
  //   const rankResult = this.#rewards.getRankList();

  //   rankResult.forEach(({ reward, quantity }) => {
  //     this.#outputView.prize(reward, quantity);
  //   });

  //   this.calculateRateOfReturn();
  // }

  // async calculateRateOfReturn() {
  //   const rateOfReturn = this.#rewards.computeRateOfReturn(this.#money);
  //   this.#outputView.rateOfReturn(rateOfReturn);

  //   await this.withRetry(() => this.askRetry());
  // }

  // async askRetry() {
  //   const retry = await this.#inputView.retry();
  //   if (!retry) {
  //     process.exit();
  //   }
  //   this.start();
  // }

  withRetry(action) {
    try {
      action();
    } catch ({ message }) {
      this.#outputView.error(message);
    }
  }
}

export default LottoGame;
