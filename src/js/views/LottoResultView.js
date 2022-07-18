import View from './View.js';
import { $ } from '../utils.js';

export default class LottoResultView extends View {
  constructor(element = $('#lotto-result')) {
    super(element);
    this.labelElement = $('#lotto-result__label');
    this.toggleElement = $('#lotto-numbers-toggle-button');
    this.bindEvents();
  }

  bindEvents() {
    this.on('change', (event) => this.handleToggle(event));
  }

  handleToggle(event) {
    const { checked } = event.target;
    this.emit('@toggle', { value: checked });
    checked ? this.toggleElement.setAttribute('checked', true) : this.toggleElement.removeAttribute('checked', false);
  }

  show(winningNumbers = []) {
    const quantity = winningNumbers.length;

    if (!winningNumbers.length) return super.hide();
    if (winningNumbers.length > 0) {
      super.show();
      this.labelElement.textContent = `총 ${quantity}개를 구매하였습니다.`;
    }
  }
}
