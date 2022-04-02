import {
  LOTTO_SECTION,
  LOTTO_SECTION__LABEL,
  LOTTO_SECTION_TICKETS,
  LOTTO_NUMBERS_TOGGLE__LABEL,
} from '../constants/selectTarget.js';
import { $ } from '../util/dom.js';

const LottoSection = ($parent, { toggleDisplay }) => {
  const template = `<section class="mt-9 ${LOTTO_SECTION}" hidden>
              <div class="d-flex">
              <label class="flex-auto my-0 ${LOTTO_SECTION__LABEL}"></label>
              <div class="flex-auto d-flex justify-end pr-1">
                  <label class="switch ${LOTTO_NUMBERS_TOGGLE__LABEL}">
                  <input type="checkbox"/>
                  <span class="text-base font-normal">번호보기</span>
                  </label>
              </div>
              </div>
              <div class="d-flex flex-wrap ${LOTTO_SECTION_TICKETS} hidden"></div>
            </section>`;

  const $el = document.createElement('div');
  $el.innerHTML = template;
  $parent.replaceWith($el);
  $(LOTTO_NUMBERS_TOGGLE__LABEL, $el).addEventListener('change', toggleDisplay);
};

export default LottoSection;
