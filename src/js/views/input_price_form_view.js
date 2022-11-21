import { $ } from '../../utils.js';
import View from './view.js';

class InputPriceFormView extends View {
  constructor($target) {
    super($target);
    this.$inputPrice = $('#input-price');
    this.$inputPriceButton = $('#input-price-btn');
  }
}

export default InputPriceFormView;
