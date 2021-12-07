import { ALERT_MESSAGE } from "../constants/messages.js";
import { CLASS_NAME, INPUT_NAME } from "../constants/selectors.js";
import { LOTTO_NUMBER } from "../constants/lotto.js";
import lottoStore, { lottoStoreActions, LOTTO_STORE_KEY } from "../lottoStore.js";

class LottoResult {
  constructor() {
    this.$winningNumberForm = document.querySelector(CLASS_NAME.WINNING_NUMBER_FORM);

    this.winningNumbers = [];
    this.bonusNumber = -1;
  }

  init() {
    this.$winningNumberForm.addEventListener("submit", this.onWinningNumberSubmit.bind(this));
    this.$winningNumberForm.addEventListener("keydown", this.onFormKeydown.bind(this));

    lottoStore.subscribeState(LOTTO_STORE_KEY.WINNGIN_NUMBERS, (stateValue) => {
      if (stateValue.length === 0) {
        this.$winningNumberForm.reset();
      }
    });
  }

  onWinningNumberSubmit(event) {
    event.preventDefault();

    const formElements = event.target.elements;
    const winningNumberInputs = Array.from(formElements[INPUT_NAME.WINNING_NUMBER]).map(($input) => $input.value);
    const bonusNumberInput = formElements[INPUT_NAME.BONUS_NUMBER].value;
    const ticketCount = lottoStore.selectState(LOTTO_STORE_KEY.TICKET_COUNT);

    const allInput = [...winningNumberInputs, bonusNumberInput];
    const isEmptyInputExist = allInput.some((value) => value === "");
    const isDuplicatedNumberExist = new Set(allInput).size !== allInput.length;
    const isNumbersInRange = allInput.every(
      (input) => Number(input) >= LOTTO_NUMBER.MIN_VALUE && Number(input) <= LOTTO_NUMBER.MAX_VALUE
    );

    if (isEmptyInputExist) {
      alert(ALERT_MESSAGE.EMPTY_NUMBERS);

      return;
    }

    if (isDuplicatedNumberExist) {
      alert(ALERT_MESSAGE.DUPLICATED_NUMBERS);

      return;
    }

    if (!isNumbersInRange) {
      alert(ALERT_MESSAGE.INVAILD_NUMBER_RANGE(LOTTO_NUMBER.MIN_VALUE, LOTTO_NUMBER.MAX_VALUE));

      return;
    }

    if (ticketCount === 0) {
      alert(ALERT_MESSAGE.NO_LOTTO_TICKET);

      return;
    }

    lottoStore.setState(
      LOTTO_STORE_KEY.WINNGIN_NUMBERS,
      winningNumberInputs.map((input) => Number(input))
    );
    lottoStore.setState(LOTTO_STORE_KEY.BONUS_NUMBER, Number(bonusNumberInput));

    lottoStoreActions.evalutateLottoPrize();
    lottoStoreActions.evalutateProfitRate();
  }

  onFormKeydown(event) {
    if (/[.-]/.test(event.key)) {
      event.preventDefault();
    }
  }
}

export default LottoResult;
