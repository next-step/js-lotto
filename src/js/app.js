import InputPriceForm from './views/input-price-form.js';
import PurchasedLotto from './views/purchased-lotto.js';
import WinningInputForm from './views/winning-input-form.js';

class App {
  constructor($target, lotto) {
    new InputPriceForm($target, lotto);
    new PurchasedLotto($target, lotto);
    new WinningInputForm($target, lotto);
  }
}

export default App;
