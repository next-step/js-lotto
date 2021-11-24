import { DOM_ID } from '../constants.js';
import el from '../dom.js';
import { $, $$, hide } from '../utils.js';

import View from './view.js';

export default class LottoInfo extends View {
  constructor() {
    super();
    this.$lottoInfoSection = $(DOM_ID.LOTTO_INFO_SECTION);
    this.$lottoList = $(DOM_ID.LOTTO_LIST);
    this.$toggleButton = $(DOM_ID.TOGGLE_BUTTON);
    this.$$lottoDetail = $$(DOM_ID.LOTTO_DETAIL);

    hide(this.$lottoInfoSection);
  }

  updateLottoList(lottos) {
    el(
      this.$lottoList,
      lottos.map((lotto) => el('<li class="mx-1 text-4xl lotto-wrapper">', [
        '<span class=\'lotto-icon\'>🎟️</span>',
        `<span id='lottoDetail' class="lotto-detail" style="display: none">${lotto}</span>`,
      ])),
    );
    this.$$lottoDetail = $$(DOM_ID.LOTTO_DETAIL);
  }

  bindOnClickToggleButton(handler) {
    this.$toggleButton.addEventListener('click', (event) => {
      handler(event);
    });
  }
}
