import SETTINGS from '../settings.js';
import { $, warn } from '../lib/utils.js';

import { getState, actionCreator } from '../store.js';

const WinningForm = (({ KLASS, EVENT, CONSTANT, DELIMITER }) => {
  return $el => {
    const { winningLotto, bonusNumber } = getState();

    const bindEvent = $el => {
      const $winningNumbers = $.klass.all(KLASS.WINNING_NUMBER, $el);
      const $bonusNumber = $.klass(KLASS.BONUS_NUMBER, $el);

      $.klass(KLASS.OPEN_MODAL_BUTTON, $el).addEventListener(EVENT.CLICK, _ => {
        const winningLotto = [...$winningNumbers].map(
          $winningNumber => $winningNumber.value,
        );
        const bonusNumber = $bonusNumber.value;
        try {
          actionCreator.checkResult(winningLotto, bonusNumber);
        } catch (e) {
          warn(e);
        }
      });
    };

    const render = $el => {
      $el.innerHTML = `
        <label class="flex-auto d-inline-block mb-3"
          >지난 주 당첨번호 6개와 보너스 넘버 1개를 입력해주세요.</label
        >
        <div class="d-flex">
          <div>
            <h4 class="mt-0 mb-3 text-center">당첨 번호</h4>
            <div>
              ${Array.from({ length: CONSTANT.LOTTO_SIZE }, (_, idx) => {
                return `
                  <input type="number"
                    ${
                      winningLotto[idx]
                        ? `value="${winningLotto[idx]}"`
                        : CONSTANT.EMPTY_STRING
                    }
                    class="${KLASS.WINNING_NUMBER} mx-1 text-center"
                  />
                `;
              }).join(DELIMITER.EMPTY_STRING)}
            </div>
          </div>
          <div class="bonus-number-container flex-grow">
            <h4 class="mt-0 mb-3 text-center">보너스 번호</h4>
            <div class="d-flex justify-center">
              <input type="number"
                ${
                  bonusNumber ? `value="${bonusNumber}"` : CONSTANT.EMPTY_STRING
                } 
                class="bonus-number text-center"
              />
            </div>
          </div>
        </div>
        <button
          type="button"
          class="${KLASS.OPEN_MODAL_BUTTON} mt-5 btn btn-cyan w-100"
        >
          결과 확인하기
        </button>
      `;
    };

    render($el);
    bindEvent($el);
  };
})(SETTINGS);

export default WinningForm;
