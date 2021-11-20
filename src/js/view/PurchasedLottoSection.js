import { $, $$, showElement, hideElement } from '../utils/utils.js';
import View from './View.js';

export default class PurchasedLottoSection extends View {
  constructor(el) {
    super(el);
    this.$purchasedLottoText = $('#purchasedLottoText');
    this.$toggleSwitch = $('#toggleSwitch');
    this.$lottoWrapper = $('#lottoWrapper');
    this.bindEvents();
  }

  render(lottos) {
    this.renderPurchasedLottoText(lottos.length);
    this.renderLottos(lottos);
    this.resetLottoDetail();
  }

  bindEvents() {
    this.$toggleSwitch.addEventListener('click', (e) =>
      this.onClickToggleBtn(e)
    );
  }

  onClickToggleBtn({ target }) {
    this.renderLottoDetail(target.checked);
  }

  renderPurchasedLottoText(count) {
    this.$purchasedLottoText.textContent = `총 ${count}개를 구매하였습니다.`;
  }

  renderLottos(lottos) {
    this.$lottoWrapper.innerHTML = lottos
      .map((lotto) => {
        return `
        <div class="d-flex items-center">
          <span class="mx-1 text-4xl">🎟️ </span>
          <span class="lotto-detail" style="display: none;">${lotto.join(
            ', '
          )}</span>
        </div>
      `;
      })
      .join('');
  }

  resetLottoDetail() {
    this.$lottoWrapper.classList.remove('flex-col');
    this.$toggleSwitch.checked = false;
    $$('.lotto-detail').forEach((el) => hideElement(el));
  }

  renderLottoDetail(toggleFlag) {
    console.log(toggleFlag);
    console.log(this.$lottoWrapper.classList);
    this.$lottoWrapper.classList.toggle('flex-col');

    $$('.lotto-detail').forEach((el) =>
      toggleFlag ? showElement(el) : hideElement(el)
    );
  }
}
