import { EVENT, SELECTOR } from '../constants/dom.js';
import { $ } from '../utils/querySelector.js';
import { View } from './View.js';

export class LottoListView extends View {
  $quantity;

  $toggle;

  $boughtLottos;

  constructor() {
    super(SELECTOR.LOTTO_LIST);
    this.#setElements();
  }

  #setElements() {
    this.$quantity = $(SELECTOR.LOTTO_QUANTITY);
    this.$toggle = $(SELECTOR.LOTTO_LIST_TOGGLE);
    this.$boughtLottos = $(SELECTOR.BOUGHT_LOTTO_LIST);
  }

  bindToggleEvent(handler) {
    this.$toggle.addEventListener(EVENT.CLICK, handler);
  }

  setLottoQuantity(quantity) {
    this.$quantity.textContent = `총 ${quantity}개를 구매하였습니다`;
  }

  showLottos(lottos, visibleNumbers) {
    if (visibleNumbers) this.$boughtLottos.classList.add('flex-col');
    if (!visibleNumbers) this.$boughtLottos.classList.remove('flex-col');
    this.$boughtLottos.innerHTML = lottos
      .map(
        ({ numbers }) => `<li class="mx-1 text-4xl lotto-wrapper">
        <span class="lotto-icon">🎟️ </span>
        <span class="lotto-detail" style="display: ${visibleNumbers ? 'inline' : 'none'};">${numbers}</span>
      </li>
      `
      )
      .join('');
  }

  reset() {
    this.hide();
    this.setLottoQuantity(0);
    this.$boughtLottos.innerHTML = '';
    this.$toggle.checked = false;
  }
}
