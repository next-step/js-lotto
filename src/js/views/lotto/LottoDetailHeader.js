import { CLASS } from '../../const/className.js';
import { $Curry } from '../../dom/index.js';
import View from '../View.js';

class LottoDetailHeader extends View {
  #$toggleNumbersBtn;
  #$lottoCount;

  constructor($el) {
    const $ = $Curry($el);
    super($el);
    this.#$lottoCount = $(CLASS.LOTTO_COUNT);
    this.#$toggleNumbersBtn = $(CLASS.TOGGLE_NUMBERS);
  }

  init() {
    this.bindEvent();
    this.hide();
    return this;
  }

  render({ count = 0 }, reset) {
    this.#initializeToggleStyle(count);

    if (reset) {
      this.hide();
    } else {
      this.show();
      this.#printCount(count);
    }
  }

  bindEvent() {
    this.#$toggleNumbersBtn.addEventListener('change', this.#toggleLottoNumbers.bind(this));
  }

  #printCount(count) {
    this.#$lottoCount.textContent = `총 ${count}개를 구매하였습니다.`;
  }

  #toggleLottoNumbers({ target }) {
    this.emit('@toggle-numbers', target.checked);
  }

  #initializeToggleStyle(count) {
    this.#$toggleNumbersBtn.checked = false;
    this.#$toggleNumbersBtn.disabled = count === 0;
  }
}

export default $el => new LottoDetailHeader($el);
