import SETTINGS from '../settings.js';
import { $ } from '../lib/utils.js';

import { getState, actionCreator } from '../store.js';

const PurchaseDetails = (({ KLASS, EVENT, CONSTANT, DELIMITER }) => {
  return $el => {
    const { lottos, isDetailsShow } = getState();

    const bindEvent = $el => {
      const $input = $.klass(KLASS.NUMBERS_TOGGLE_BUTTON, $el);
      $input.addEventListener(EVENT.CLICK, _ => {
        $input.checked = !isDetailsShow;
        setTimeout(actionCreator.toggleDetails, 100);
      });
    };

    const render = $el => {
      $el.innerHTML = `
        <div class="d-flex">
          <label class="flex-auto my-0">총 ${
            lottos.length
          }개를 구매하였습니다.</label>
          <div class="flex-auto d-flex justify-end pr-1">
            <label class="switch">
              <input type="checkbox" class="${KLASS.NUMBERS_TOGGLE_BUTTON}" ${
        isDetailsShow ? 'checked' : CONSTANT.EMPTY_STRING
      }/>
              <span class="text-base font-normal">번호보기</span>
            </label>
          </div>
        </div>
        <ul class="d-flex flex-wrap ${
          isDetailsShow ? KLASS.FLEX_COL : KLASS.DUMMY
        }">
          ${lottos
            .map(
              lotto => `
                <li class="mx-1 text-4xl ${KLASS.LOTTO_WRAPPER}">
                  <span>🎟️ </span>
                  ${
                    isDetailsShow
                      ? `<span class="${KLASS.LOTTO_DETAIL}">${lotto.join(
                          DELIMITER.LOTTO_NUMBER,
                        )}</span>`
                      : CONSTANT.EMPTY_STRING
                  }
                </li>
              `,
            )
            .join(DELIMITER.EMPTY_STRING)}
        </ul>
      `;
    };

    render($el);
    bindEvent($el);
  };
})(SETTINGS);

export default PurchaseDetails;
