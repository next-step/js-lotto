import View from './View.js';
import { $ } from '../utils.js';

export default class LottoResultView extends View {
  constructor(element = $('#lotto-result')) {
    super(element);
    this.labelElement = $('#lotto-result__label');
    this.toggleElement = $('#lotto-numbers-toggle-button');
    this.bindEvents();
    super.hide();
  }

  bindEvents() {
    this.on('change', (event) => this.handleToggle(event));
  }

  handleToggle(event) {
    const { checked } = event.target;
    this.emit('@toggle', { value: checked });
    checked ? this.toggleElement.setAttribute('checked', true) : this.toggleElement.removeAttribute('checked', false);
  }

  show(lottoNumbers = []) {
    const lottoQuantity = lottoNumbers.length;
    if (!lottoQuantity) return super.hide();

    this.labelElement.textContent = `총 ${lottoQuantity}개를 구매하였습니다.`;
    super.show();
  }
}
