import {
  LOTTO_FORM,
  LOTTO_FORM__WINNING_NUMBER,
  LOTTO_FORM__BUTTON,
  LOTTO_FORM__BONUS_NUMBER,
} from '../constants/selectTarget.js';

import { LOTTO_NUMBER_SIZE } from '../constants/unit.js';

const LottoForm = ($parent, { displayResult }) => {
  const inputTemplate = `<input
                    type="number"
                    min="1"
                    max="45"
                    required
                    class="${LOTTO_FORM__WINNING_NUMBER} winning-number mx-1 text-center"
                    />`;

  const template = `<form class="mt-9 ${LOTTO_FORM}" hidden>
            <label class="flex-auto d-inline-block mb-3"
              >지난 주 당첨번호 6개와 보너스 넘버 1개를 입력해주세요.</label
            >
            <div class="d-flex">
              <div>
                <h4 class="mt-0 mb-3 text-center">당첨 번호</h4>
                <div>
                ${Array(LOTTO_NUMBER_SIZE).fill(inputTemplate).join('')}
                </div>
                </div>
              <div class="bonus-number-container flex-grow">
                <h4 class="mt-0 mb-3 text-center">보너스 번호</h4>
                <div class="d-flex justify-center">
                  <input type="number" class="${LOTTO_FORM__BONUS_NUMBER} text-center" required/>
                </div>
              </div>
            </div>
            <button
              type="submit"
              class="${LOTTO_FORM__BUTTON} open-result-modal-button mt-5 btn btn-cyan w-100"
          >
              결과 확인하기
            </button>
          </form>`;

  const $el = document.createElement('div');
  $el.innerHTML = template;
  $parent.replaceWith($el);
  $el.addEventListener('submit', displayResult);
};

export default LottoForm;
