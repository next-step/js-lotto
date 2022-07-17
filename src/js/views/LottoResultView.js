import View from './View.js';
import { $ } from '../utils.js';

export default class LottoResultView extends View {
  constructor(element = $('#div-lotto-result')) {
    super(element);
    this.labelElement = $('#label-lotto-result');
    this.toggleElement = $('#input-toggle-button');
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
    if (winningNumbers.length > 0) {
      super.show();
      const quantity = winningNumbers.length;
      this.labelElement.textContent = quantity > 0 && `총 ${quantity}개를 구매하였습니다.`;
    } else {
      super.hide();
    }
  }
}
