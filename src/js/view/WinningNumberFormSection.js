import { ALERT } from '../constants/constants.js';
import { $, $$ } from '../utils/utils.js';
import View from './View.js';

const isDuplicatedNumber = (lottos) => new Set([...lottos]).size < 7;

export default class WinningNumberFormSection extends View {
  constructor(el) {
    super(el);
  }

  render() {
    this.$target.innerHTML = `
      <form id="winningNumberForm" class="mt-9">
        <label class="flex-auto d-inline-block mb-3"
          >지난 주 당첨번호 6개와 보너스 넘버 1개를 입력해주세요.</label
        >
        <div class="d-flex">
          <div>
            <h4 class="mt-0 mb-3 text-center">당첨 번호</h4>
            <div>
              <input
                type="number"
                class="winning-number mx-1 text-center"
                required
                min="1"
                max="45"
                data-lotto-number="0"
              />
              <input
                type="number"
                class="winning-number mx-1 text-center"
                required
                min="1"
                max="45"
                data-lotto-number="1"
              />
              <input
                type="number"
                class="winning-number mx-1 text-center"
                required
                min="1"
                max="45"
                data-lotto-number="2"
              />
              <input
                type="number"
                class="winning-number mx-1 text-center"
                required
                min="1"
                max="45"
                data-lotto-number="3"
              />
              <input
                type="number"
                class="winning-number mx-1 text-center"
                required
                min="1"
                max="45"
                data-lotto-number="4"
              />
              <input
                type="number"
                class="winning-number mx-1 text-center"
                required
                min="1"
                max="45"
                data-lotto-number="5"
              />
            </div>
          </div>
          <div class="bonus-number-container flex-grow">
            <h4 class="mt-0 mb-3 text-center">보너스 번호</h4>
            <div class="d-flex justify-center">
              <input 
                type="number" 
                class="bonus-number text-center" 
                required
                min="1"
                max="45"
                data-lotto-number="6"
              />
            </div>
          </div>
        </div>
        <button
          type="submit"
          class="open-result-modal-button mt-5 btn btn-cyan w-100"
        >
          결과 확인하기
        </button>
      </form>
    `;
    this.winningNumberForm = $('#winningNumberForm');
    this.bindEvents();
  }

  bindEvents() {
    this.$target.addEventListener(
      'submit',
      this.onSubmitWinningLottoNumbers.bind(this)
    );
  }

  onSubmitWinningLottoNumbers(e) {
    e.preventDefault();
    const winningLottoNumbers = [...$$('.winning-number')].map(({ value }) =>
      Number(value)
    );
    const bonusNumber = Number($('.bonus-number').value);

    if (isDuplicatedNumber([...winningLottoNumbers, bonusNumber])) {
      alert(ALERT.DUPLICATED);
      return;
    }
    this.emit('@submitWinningNumber', { winningLottoNumbers, bonusNumber });
  }
}
