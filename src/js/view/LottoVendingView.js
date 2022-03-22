import { LottoVendingMachine } from '../lottoVendingMachine.js';
import { Wallet } from '../data/wallet.js';
import { PurchasedLottoResultView } from './PurchasedLottoResultView.js';

export class LottoVendingView {
  #purchaseLottoElement;

  #purchaseMoneyElement;

  #lottoWinningResultElement;

  #wallet = new Wallet();

  #purchasedLottoResultView;

  constructor() {
    this.#purchaseLottoElement = document.querySelector('form.mt-5');
    this.#purchaseMoneyElement =
      this.#purchaseLottoElement.querySelector('input');
    this.#lottoWinningResultElement = document.querySelector('form.mt-9');

    this.#purchasedLottoResultView = new PurchasedLottoResultView();
    this.#eventBindings();
  }

  #initialPurchaseMoney() {
    this.#purchaseMoneyElement.value = '';
  }

  #hideWinningResult() {
    this.#lottoWinningResultElement.style.visibility = 'hidden';
  }

  #handlePurchaseLotto(event) {
    event.preventDefault();
    const money = new FormData(event.currentTarget).get('money');
    this.#wallet.addLottos(LottoVendingMachine.purchaseLotto(money));
    this.#purchasedLottoResultView.changePurchaseResult(this.#wallet.lottos);
  }

  #eventBindings() {
    this.#purchaseLottoElement.addEventListener(
      'submit',
      this.#handlePurchaseLotto
    );
  }

  initial() {
    this.#initialPurchaseMoney();
    this.#hideWinningResult();
    this.#purchasedLottoResultView.initial();
  }
}
