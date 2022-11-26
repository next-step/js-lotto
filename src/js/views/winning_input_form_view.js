import { DEFAULT_NUMBER, LOTTO_COUNT } from '../../const.js';
import { $ } from '../../utils.js';
import View from './view.js';

class WinningInputFormView extends View {
  constructor($target) {
    super($target);
    this.$winningLottoNumbersForm = $('#winning-lotto-numbers-form');
    this.$winningLottoNumbers = $('#winning-lotto-numbers');
    this.$winningBonusNumbers = $('#winning-bonus-numbers');
    this.$winningResultModal = $('.modal');

    this.$winningLottoNumbers.innerHTML = Array(LOTTO_COUNT)
      .fill()
      .map(
        (_, index) =>
          `<input type="number" name=${index} class="winning-number mx-1 text-center" required />`
      )
      .join('');
    this.$winningBonusNumbers.innerHTML = `<input type="number" name=${LOTTO_COUNT} class="bonus-number text-center" required />`;
  }

  render({ lottoCount }) {
    if (lottoCount > DEFAULT_NUMBER) {
      this.$winningLottoNumbersForm.style.display = 'block';
      return;
    }
  }
}

export default WinningInputFormView;
