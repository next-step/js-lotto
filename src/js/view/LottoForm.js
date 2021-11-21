import View from "./view.js"
import {$, $$} from "../utils.js";
import {DOM_ID, ERROR_MESSAGE, MAX_LOTTO_NUMBER, MIN_LOTTO_NUMBER, WINNING_NUMBERS_LENGTH} from "../constants.js";

export default class LottoForm extends View {
  constructor() {
    super();
    this.$lottoInputForm = $(DOM_ID.LOTTO_INPUT_FORM);
    this.$getResultButton = $(DOM_ID.GET_RESULT_BUTTON);
    this.$winningNumbers = $$(DOM_ID.WINNING_NUMBERS); //.value
    this.$bonusNumber = $(DOM_ID.BONUS_NUMBER);
  }

  checkLottoNumber(winningNumbers, bonusNumber) {
    const uniqueWinningNumbers = [...new Set(winningNumbers), bonusNumber];
    uniqueWinningNumbers.forEach((number) => {
      if (number === '') throw Error(ERROR_MESSAGE.NONE_VALUE);
      if (number > MAX_LOTTO_NUMBER) throw Error(ERROR_MESSAGE.MAX_NUMBER);
      if (number < MIN_LOTTO_NUMBER) throw Error(ERROR_MESSAGE.MIN_NUMBER);
      if (uniqueWinningNumbers.length !== WINNING_NUMBERS_LENGTH) throw Error(ERROR_MESSAGE.DUPLICATED_NUMBER);
    });
  }

  bindOnClickGetResultButton(handler) {
    this.$getResultButton.addEventListener('click', (event) => {
      event.preventDefault();
      console.log(this.$winningNumbers);
      handler(
        [...this.$winningNumbers].map($input => Number($input.value)),
        this.$bonusNumber.value,
      );
    });
  }
};