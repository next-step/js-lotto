import {
  LOTTO_SECTION,
  LOTTO_SECTION__LABEL,
  LOTTO_SECTION_TICKETS,
  LOTTO_NUMBERS_TOGGLE_BUTTON,
} from '../constants/selectTarget.js';
export default class LottoSection {
  #el;
  #state;

  constructor($parent, props) {
    Object.assign(this, props);

    this.#el = document.createElement('div');
    this.#el.innerHTML = LottoSection.getHtml();
    $parent.replaceWith(this.#el);
  }

  static getHtml() {
    return `<section class="mt-9 ${LOTTO_SECTION}" hidden>
              <div class="d-flex">
              <label class="flex-auto my-0 ${LOTTO_SECTION__LABEL}"></label>
              <div class="flex-auto d-flex justify-end pr-1">
                  <label class="switch">
                  <input type="checkbox" class="${LOTTO_NUMBERS_TOGGLE_BUTTON}"/>
                  <span class="text-base font-normal">번호보기</span>
                  </label>
              </div>
              </div>
              <div class="d-flex flex-wrap ${LOTTO_SECTION_TICKETS}"></div>
            </section>`;
  }
}
