import { EVENT, SELECTOR } from '../../constants/dom';
import { $, $All } from '../../utils';
import { View } from '../View';

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

  getWinningNumbers() {
    return this.$winningNumbers.map(({ value }) => value);
  }

  getBonusNumber() {
    return this.$bonus.value;
  }
}
