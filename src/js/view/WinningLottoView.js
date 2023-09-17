import { EVENT, SELECTOR } from '../constants/dom.js';
import { $, $All } from '../utils/index.js';
import { View } from './View.js';

export class WinningLottoView extends View {
  $winningNumbers;

  $bonus;

  constructor() {
    super(SELECTOR.WINNING_LOTTO_FORM);
    this.#setElements();
  }

  #setElements() {
    this.$winningNumbers = $All(SELECTOR.WINNING_NUMBER_INPUT);
    this.$bonus = $(SELECTOR.BONUS_NUMBER_INPUT);
  }

  bindWinningLottoSubmitEvent(handler) {
    this.$element.addEventListener(EVENT.SUBMIT, (e) => {
      e.preventDefault();
      handler();
    });
  }

  get winningNumbers() {
    return this.$winningNumbers.map(({ value }) => value);
  }

  get bonusNumber() {
    return this.$bonus.value;
  }

  reset() {
    this.hide();
    this.$winningNumbers.forEach((input) => {
      // eslint-disable-next-line no-param-reassign
      input.value = '';
    });
    this.$bonus.value = '';
  }
}
