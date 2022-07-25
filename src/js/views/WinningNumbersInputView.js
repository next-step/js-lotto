import View from './View.js';
import { $ } from '../utils.js';

export default class WinningNumbersInputView extends View {
  constructor(element = $('#winning-lotto-container')) {
    super(element);
    super.hide();
    this.inputElements = document.querySelectorAll('.winning-number');
    this.bonusInputElement = $('.bonus-number');
    this.buttonElement = $('#show-winning-result-modal');
    this.bindEvents();
  }

  bindEvents() {
    this.on('submit', (event) => this.checkWinningNumbers(event));
  }

  checkWinningNumbers(event) {
    event.preventDefault();
    const numbers = Array.from(event.target.elements)
      .map(({ value }) => value)
      .filter((number) => number);
    this.emit('@submit', { value: numbers });
  }

  show(winningNumbers = []) {
    const lottoQuantity = winningNumbers.length;
    if (!lottoQuantity) {
      this.inputElements.forEach((el) => (el.value = ''));
      this.bonusInputElement.value = '';
      return super.hide();
    }
    super.show();
  }
}
