import AbstractView from './AbstractView.js';
import PurchaseLottoView from './PurchaseLottoView.js';
import WinningLottoView from './WinningLottoView.js';

class LottoVendingView extends AbstractView {
  static #purchasedLotto() {
    WinningLottoView.showWinningLotto();
  }

  static eventBindings() {
    PurchaseLottoView.eventBindings(LottoVendingView.#purchasedLotto);
    WinningLottoView.eventBindings(LottoVendingView.initialize);
  }

  static initialize() {
    PurchaseLottoView.initialize();
    WinningLottoView.initialize();
  }
}
export default LottoVendingView;
