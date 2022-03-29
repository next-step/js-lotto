import { DOM, ERROR_MESSAGE, LOTTO } from '../constants.js';
import { $, $$ } from '../utils/dom.js';
import { isDuplicatedNumbersInArray, isAllSatisfiedConditionInArray } from '../utils/index.js';

class WinningNumberForm {
  constructor($target, props) {
    this.$target = $target;
    this.props = props;
    this.render();
    this.setEvent();
  }

  render() {
    this.$target.innerHTML = this.template();
    this.mounted();
  }

  template() {
    return String.raw`
				<label class="flex-auto d-inline-block mb-3"
					>지난 주 당첨번호 6개와 보너스 넘버 1개를 입력해주세요.</label
				>
				<div class="d-flex">
					<div>
						<h4 class="mt-0 mb-3 text-center">당첨 번호</h4>
						<div id="${DOM.WINNING_NUMBER_CONTAINER_ID}">
							<input required type="number" class="${DOM.WINNING_NUMBER_CLASS} mx-1 text-center" />
							<input required type="number" class="${DOM.WINNING_NUMBER_CLASS} mx-1 text-center" />
							<input required type="number" class="${DOM.WINNING_NUMBER_CLASS} mx-1 text-center" />
							<input required type="number" class="${DOM.WINNING_NUMBER_CLASS} mx-1 text-center" />
							<input required type="number" class="${DOM.WINNING_NUMBER_CLASS} mx-1 text-center" />
							<input required type="number" class="${DOM.WINNING_NUMBER_CLASS} mx-1 text-center" />
						</div>
					</div>
					<div class="bonus-number-container flex-grow">
						<h4 class="mt-0 mb-3 text-center">보너스 번호</h4>
						<div class="d-flex justify-center">
							<input required type="number" class="${DOM.BONUS_NUMBER_CLASS} text-center" />
						</div>
					</div>
				</div>
				<button type="submit" id="${DOM.OPEN_RESULT_MODAL_BUTTON_ID}" class="mt-5 btn btn-cyan w-100">
					결과 확인하기
				</button>
			`;
  }

  mounted() {
    this.$winningNumbers = $$(`.${DOM.WINNING_NUMBER_CLASS}`);
    this.$bonusNumber = $(`.${DOM.BONUS_NUMBER_CLASS}`);
    this.$winningNumbers[0].focus();
  }

  setEvent() {
    $(`#${DOM.WINNING_NUMBER_CONTAINER_ID}`).oninput =
      this.changeFocusWinningNumberInput.bind(this);
    $(`#${DOM.WINNING_NUMBER_FORM_ID}`).onsubmit = this.props.onSubmitWinningNumberForm;
  }

  changeFocusWinningNumberInput(e) {
    const MAX_INPUT_LENGTH = 2;
    if (e.target.value.length < MAX_INPUT_LENGTH) return;

    if (!e.target.nextElementSibling) {
      this.$bonusNumber.focus();
      return;
    }

    e.target.nextElementSibling.focus();
  }

  checkWinningAndBonusNumbersWithAlert(inputedNumbers) {
    if (
      !isAllSatisfiedConditionInArray(
        inputedNumbers,
        number => number >= LOTTO.START_NUMBER && number <= LOTTO.END_NUMBER,
      )
    ) {
      alert(ERROR_MESSAGE.INVALID_RANGE_LOTTO_NUMBER);
      return false;
    }
    if (isDuplicatedNumbersInArray(inputedNumbers)) {
      alert(ERROR_MESSAGE.DUPLICATED_LOTTO_NUMBER);
      return false;
    }

    return true;
  }

  getWinningNumbers() {
    return Array.from(this.$winningNumbers).map(element => +element.value);
  }

  getBonusNumber() {
    return +this.$bonusNumber.value;
  }
}

export default WinningNumberForm;
