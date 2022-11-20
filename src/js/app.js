import { $ } from '../utils.js';
import InputPriceForm from './view/input-price-form.js';
import PurchasedLotto from './view/purchased-lotto.js';

class App {
  constructor($target, lotto) {
    this.lotto = lotto;
    this.$target = $target;
    this.$inputLottoNumbers = $('#input-lotto-numbers');
    new InputPriceForm($target, lotto);
    new PurchasedLotto($target, lotto);

    this.initRender();
  }

  renderInputLottoNumbers() {
    if (this.showPurchasedLottos) {
      this.$inputLottoNumbers.style.display = 'block';
      return;
    }

    this.$inputLottoNumbers.style.display = 'none';
  }

  initRender() {
    this.renderInputLottoNumbers();
  }
}

export default App;
