import {
  DEFAULT_LOTTO_COUNT,
  LOTTO_BONUS_NUMBER_INDEX,
  LOTTO_COUNT,
} from '../../const.js';
import { $ } from '../../utils.js';
import View from './view.js';

class WinningInputFormView extends View {
  constructor($target) {
    super($target);
    this.$winningLottoNumbersForm = $('#winning-lotto-numbers-form');
    this.$winningLottoNumbers = $('#winning-lotto-numbers');
    this.$winningBonusNumbers = $('#winning-bonus-numbers');
    this.$showResultButton = $('#show-result-btn');

    this.$winningLottoNumbers.innerHTML = Array(LOTTO_COUNT)
      .fill()
      .map(
        (_, index) =>
          `<input type="number" name=${index} class="winning-number mx-1 text-center" />`
      )
      .join('');
    this.$winningBonusNumbers.innerHTML = `<input type="number" name=${LOTTO_BONUS_NUMBER_INDEX} class="bonus-number text-center" />`;
  }

  render({ lottoCount }) {
    if (lottoCount > DEFAULT_LOTTO_COUNT) {
      this.$winningLottoNumbersForm.style.display = 'block';
      return;
    }
  }
}

export default WinningInputFormView;
