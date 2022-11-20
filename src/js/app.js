import InputPriceForm from './view/input-price-form.js';
import PurchasedLotto from './view/purchased-lotto.js';
import WinningInputForm from './view/winning-input-form.js';

class App {
  constructor($target, lotto) {
    this.lotto = lotto;
    this.$target = $target;
    new InputPriceForm($target, lotto);
    new PurchasedLotto($target, lotto);
    new WinningInputForm($target, lotto);
  }
}

export default App;
