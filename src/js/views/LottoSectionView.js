import View from './View.js';
import { $, $$, setToString } from '../utils/utils.js';

export default class LottoSectionView extends View {
  constructor(el) {
    super(el);
    this.$lottoWrapper = $('#lotto-wrapper');
    this.$lottoInformation = $('#lotto-information');
  }

  render(lottos) {
    this.$lottoInformation.innerHTML = this.renderLottoInformation(lottos.length);
    this.$lottoWrapper.innerHTML = this.renderLottoElement(lottos);
    this.$lottoNumberSwitch = $('#lotto-number-switch');
    this.hideLottoElement();
    this.bindEvents();
  }

  bindEvents() {
    this.$lottoNumberSwitch.addEventListener('click', () => {
      this.toggleLottoSwitch();
    });
  }

  toggleLottoSwitch() {
    this.$lottoNumberSwitch.checked ? this.showLottoElement() : this.hideLottoElement();
  }

  hideLottoElement() {
    this.$lottoWrapper.classList.remove('flex-col');
    $$('.lotto-numbers').forEach((el) => {
      el.style.display = 'none';
    });
  }

  showLottoElement() {
    this.$lottoWrapper.classList.add('flex-col');
    $$('.lotto-numbers').forEach((el) => {
      el.style.display = 'block';
    });
  }

  renderLottoInformation(count) {
    return `
      <label class="flex-auto my-0">총 ${count}개를 구매하였습니다.</label>
      <div class="flex-auto d-flex justify-end pr-1">
        <label class="switch">
          <input id="lotto-number-switch" type="checkbox" class="lotto-numbers-toggle-button" />
          <span class="text-base font-normal">번호보기</span>
        </label>
      </div>
    `;
  }

  renderLottoElement(lottos) {
    return [...lottos].reduce((html, lotto) => {
      const lottoElement = `
        <div class="d-flex items-center">
          <span class="mx-1 text-4xl">🎟️ </span>
          <span class="lotto-numbers">${setToString(lotto)}</span>
        </div>
      `;
      return (html += lottoElement);
    }, '');
  }
}
