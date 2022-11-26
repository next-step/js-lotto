import { $ } from '../../utils.js';
import View from './view.js';

class InputPriceFormView extends View {
  constructor($target) {
    super($target);
    this.$inputPriceForm = $('#input-price-form');
    this.$inputPrice = $('#input-price');
    this.$purchasedLottos = $('#purchased-lottos');
    this.$winningLottoNumbersForm = $('#winning-lotto-numbers-form');
  }
}

export default InputPriceFormView;
