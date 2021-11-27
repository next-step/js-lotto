import View from './View.js';
import { $, $$, isDuplicatedNumber } from '../utils/utils.js';
import { ALERT } from '../constants/constants.js';

export default class ManualLottoFormSection extends View {
  constructor(el) {
    super(el);
    this.render();
    this.bindEvents();
  }

  render() {
    this.$target.innerHTML = `
      <form id="manualNumberForm" class="mt-9">
        <div class="d-flex">
          <p>남은 금액: <span id="remainPrice"></span></p>
        </div>
        <label class="flex-auto d-inline-block mb-3"
          >수동 입력 번호를 입력하세요.</label
        >
        <div class="d-flex justify-around">
          <div>
            <h4 class="mt-0 mb-3 text-center">수동 번호</h4>
            <div>
              <input
                type="number"
                class="manual-number winning-number mx-1 text-center"
                required
                min="1"
                max="45"
                data-manual-number="0"
              />
              <input
                type="number"
                class="manual-number winning-number mx-1 text-center"
                required
                min="1"
                max="45"
                data-manual-number="1"
              />
              <input
                type="number"
                class="manual-number winning-number mx-1 text-center"
                required
                min="1"
                max="45"
                data-manual-number="2"
              />
              <input
                type="number"
                class="manual-number winning-number mx-1 text-center"
                required
                min="1"
                max="45"
                data-manual-number="3"
              />
              <input
                type="number"
                class="manual-number winning-number mx-1 text-center"
                required
                min="1"
                max="45"
                data-manual-number="4"
              />
              <input
                type="number"
                class="manual-number winning-number mx-1 text-center"
                required
                min="1"
                max="45"
                data-manual-number="5"
              />
            </div>
          </div>
        </div>
        <button
          id="submitManualLottoBtn"
          type="submit"
          class="submit-manual-lotto-button mt-5 btn btn-cyan w-100"
        >
          제출하기
        </button>
      </form>
      <button
        id="autoPurchaseBtn"
        type="button"
        class="mt-5 btn btn-cyan w-100"
      >
        자동 구매 및 결과 보기
      </button>
    `;
  }

  bindEvents() {
    this.$target.addEventListener(
      'submit',
      this.onSubmitManualLottoNumbers.bind(this)
    );

    $('#autoPurchaseBtn').addEventListener(
      'click',
      this.onClickAutoLottoNumbers.bind(this)
    );
  }

  renderRemainPrice(remainPrice) {
    $('#remainPrice', this.$target).textContent = `${remainPrice}원`;
  }

  onSubmitManualLottoNumbers(e) {
    e.preventDefault();
    const manualLottoNumbers = [...$$('.manual-number')].map(({ value }) =>
      Number(value)
    );

    if (isDuplicatedNumber([...manualLottoNumbers], 6)) {
      alert(ALERT.DUPLICATED);
      return;
    }
    this.emit('@submitManualNumber', { manualLottoNumbers });
    this.resetManualNumberForm();
  }

  onClickAutoLottoNumbers() {
    this.emit('@clickAutoNumber');
  }

  resetManualNumberForm() {
    $$('.manual-number').forEach((el) => {
      el.value = '';
    });
    $('[data-manual-number="0"]').focus();
  }
}
