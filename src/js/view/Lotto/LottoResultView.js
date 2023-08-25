import { EVENT, SELECTOR } from '../../constants/dom';
import { $ } from '../../utils';
import { View } from '../View.js';

export class LottoResultView extends View {
  $resultTableBody;

  $closeBtn;

  $rateOfReturn;

  $restart;

  constructor() {
    super(SELECTOR.RESULT_MODAL);
    this.#setElements();
  }

  #setElements() {
    this.$resultTableBody = $(SELECTOR.RESULT_TABLE_BODY);
    this.$closeBtn = $(SELECTOR.RESULT_MODAL_CLOSE_BUTTON);
    this.$rateOfReturn = $(SELECTOR.RATE_OF_RETURN);
    this.$restart = $(SELECTOR.RESTART);
  }

  bindModalCloseEvent() {
    this.$element.addEventListener(EVENT.CLICK, (e) => {
      if (e.target.classList.contains(SELECTOR.RESULT_MODAL.replace('.', ''))) {
        this.hide();
      }
    });
    this.$closeBtn.addEventListener(EVENT.CLICK, () => this.hide());
  }

  bindRestartEvent(handler) {
    this.$restart.addEventListener(EVENT.CLICK, () => {
      this.hide();
      handler();
    });
  }

  show() {
    this.$element.classList.add('open');
  }

  hide() {
    this.$element.classList.remove('open');
  }

  setResult(result) {
    this.$resultTableBody.innerHTML = result
      .map(
        ({ reward, quantity }) => `
        <tr class="text-center">
          <td class="p-3">${reward.match}개${reward.hasBonus ? ' + 보너스볼' : ''}</td>
          <td class="p-3">${reward.prize}</td>
          <td class="p-3">${quantity}개</td>
        </tr>
      `
      )
      .join('');
  }

  setRateOfReturn(value) {
    this.$rateOfReturn.textContent = `당신의 총 수익률은 ${value}%입니다.`;
  }
}
