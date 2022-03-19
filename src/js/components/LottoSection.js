import {
  LOTTO_SECTION,
  LOTTO_SECTION__LABEL,
  LOTTO_SECTION_TICKETS,
  LOTTO_NUMBERS_TOGGLE__LABEL,
  LOTTO_NUMBERS_TOGGLE__CHECK,
} from '../constants/selectTarget.js';
export default class LottoSection {
  #el;
  #state;

  constructor($parent, { onSwitch }) {
    this.#el = document.createElement('div');
    this.#el.innerHTML = LottoSection.getHtml();
    $parent.replaceWith(this.#el);
    this.#el.querySelector(`.${LOTTO_NUMBERS_TOGGLE__LABEL}`).addEventListener('click', onSwitch);
  }

  static getHtml() {
    return `<section class="mt-9 ${LOTTO_SECTION}" hidden>
              <div class="d-flex">
              <label class="flex-auto my-0 ${LOTTO_SECTION__LABEL}"></label>
              <div class="flex-auto d-flex justify-end pr-1">
                  <label class="switch ${LOTTO_NUMBERS_TOGGLE__LABEL}">
                  <input type="checkbox"/>
                  <span class="text-base font-normal">번호보기</span>
                  </label>
              </div>
              </div>
              <div class="d-flex flex-wrap ${LOTTO_SECTION_TICKETS}"></div>
            </section>`;
  }
}
