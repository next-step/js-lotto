import { EMPTY_STRING, SELECTOR, STATE, CLASS } from '../../constants/index.js';
import { sortNumberArray } from '../../../util/index.js';

export class LottoSection {
  constructor({ lotto }) {
    this.lottoSection = lotto;
    this.render();
  }

  render() {
    const $wrapper = this.lottoSection.querySelector(SELECTOR.LOTTO_LIST);
    const $toggleWrapper = app.querySelector(SELECTOR.LOTTO_TOGGLE_WRAPPER);
    const $toggle = this.lottoSection.querySelector(SELECTOR.LOTTO_TOGGLE);

    $toggleWrapper.classList.add(CLASS.HIDDEN);
    this.lottoSection.classList.add(CLASS.HIDDEN);
    $wrapper.classList.remove(CLASS.FLEX_COL);
    $toggle.checked = STATE.FALSE;
    $wrapper.innerHTML = EMPTY_STRING;
  }

  showLottos(lottos) {
    const $wrapper = this.lottoSection.querySelector(SELECTOR.LOTTO_LIST);
    const $toggleWrapper = app.querySelector(SELECTOR.LOTTO_TOGGLE_WRAPPER);
    const $count = this.lottoSection.querySelector(SELECTOR.LOTTO_COUNT);

    $count.textContent = `총 ${lottos.length}개를 구매했습니다.`;
    $toggleWrapper.classList.remove(CLASS.HIDDEN);
    lottos.forEach((lotto) => ($wrapper.innerHTML += this.lottoTicket(lotto)));

    this.lottoSection.classList.remove(CLASS.HIDDEN);
  }

  toggleLotto(isChecked) {
    const $wrapper = this.lottoSection.querySelector(SELECTOR.LOTTO_LIST);
    const $icons = document.querySelectorAll('.lotto-tickets');

    $wrapper.classList.toggle(CLASS.FLEX_COL, isChecked);
    $icons.forEach((child) => child.classList.toggle(CLASS.HIDDEN, !isChecked));
  }

  lottoTicket = (lotto) =>
    `
  <div class="lotto-ticket d-flex items-center">
    <div class="mx-2 text-4xl">🎟️ </div>
    <span  data-test-id="lotto-tickets" class="text-base hidden lotto-tickets">
      ${sortNumberArray(lotto).join(', ')}
    </span>
  <div>`;
}
