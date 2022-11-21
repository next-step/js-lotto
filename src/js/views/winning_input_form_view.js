import { DEFAULT_LOTTO_COUNT } from '../../const.js';
import { $ } from '../../utils.js';
import View from './view.js';

class WinningInputFormView extends View {
  constructor($target) {
    super($target);
    this.$inputLottoNumbers = $('#input-lotto-numbers');
    this.$inputPriceButton = $('#input-price-btn');
  }

  render({ lottoCount }) {
    if (lottoCount > DEFAULT_LOTTO_COUNT) {
      this.$inputLottoNumbers.style.display = 'block';
      return;
    }
  }
}

export default WinningInputFormView;
