import SETTINGS from '../settings.js';
import { $, warn } from '../lib/utils.js';

import { getState, actionCreator } from '../store.js';

const PriceForm = (({ TAG, EVENT, KEYCODE, CONSTANT }) => {
  return $el => {
    const { money } = getState();

    const bindEvent = $el => {
      const [$input, $button] = [$(TAG.INPUT, $el), $(TAG.BUTTON, $el)];
      $button.addEventListener(EVENT.CLICK, _ => {
        try {
          actionCreator.buyLottos($input.value);
        } catch (e) {
          warn(e);
        }
      });
      $input.addEventListener(EVENT.KEYDOWN, ({ code }) => {
        if (code === KEYCODE.ENTER) $button.click();
      });
    };

    const render = $el => {
      $el.innerHTML = `
        <label class="mb-2 d-inline-block"
          >구입할 금액을 입력해주세요. (단위: ${CONSTANT.PRICE}원)
        </label>
        <div class="d-flex">
          <input
            type="number"
            class="w-100 mr-2 pl-2"
            placeholder="구입 금액"
            value="${money}"
            autofocus
          />
          <button type="button" class="btn btn-cyan">확인</button>
        </div>
      `;
    };

    render($el);
    bindEvent($el);
  };
})(SETTINGS);

export default PriceForm;
