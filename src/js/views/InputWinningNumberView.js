import View from './View.js';
import { $$ } from '../utils/dom.js';
import { LOTTO_NUMBERS } from '../utils/constants.js';

export default class InputWinningNumberView extends View {
  constructor($element) {
    super($element);
    this.$winningNumberInputs = $$('.winning-number');
    this.winningNumbers = {};

    this.bindNumberInputEvent();
  }

  resetWinningNumbers() {
    this.$element.reset();
    this.winningNumbers = [];
  }

  bindNumberInputEvent() {
    this.$winningNumberInputs.forEach((winningNumber, idx) => {
      winningNumber.addEventListener('change', () =>
        this.inputWinningNumberHandler(winningNumber)
      );
      winningNumber.addEventListener('input', () =>
        this.moveFocusHandler(winningNumber, idx)
      );
    });

    this.$element.addEventListener('submit', e =>
      this.submitWinningNumberHandler(e)
    );
  }

  inputWinningNumberHandler($element) {
    this.winningNumbers[$element.dataset.indexNum] = Number($element.value);
  }

  moveFocusHandler($element, idx) {
    if ($element.value.length === 2) {
      if (idx === LOTTO_NUMBERS.WINNING_NUMBER_COUNT - 1) return;
      this.$winningNumberInputs[idx + 1].focus();
    }
  }

  submitWinningNumberHandler(e) {
    e.preventDefault();
    this.emit('submitNumbers', this.winningNumbers);
  }
}
