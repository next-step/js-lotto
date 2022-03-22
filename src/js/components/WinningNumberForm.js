import Component from '../core/Component.js';
import { DOM, ERROR_MESSAGE } from '../constants.js';
import { $, $$ } from '../utils/dom.js';
import { isDuplicatedNumbersInArray } from '../utils/index.js';

class WinningNumberForm extends Component {
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
    $$(`.${DOM.WINNING_NUMBER_CLASS}`)[0].focus();
  }

  setEvent() {
    $(`#${DOM.WINNING_NUMBER_CONTAINER_ID}`).oninput = this.onInputWinningNumberInput.bind(this);
    $(`#${DOM.WINNING_NUMBER_FORM_ID}`).onsubmit = this.onSubmitWinningNumberForm.bind(this);
  }

  onSubmitWinningNumberForm(e) {
    e.preventDefault();

    if (!this.isCorrectWinningAndBonusNumbers()) {
      return;
    }

    this.props.openModal();
  }

  onInputWinningNumberInput(e) {
    if (e.target.value.length < 2) {
      return;
    }

    if (!e.target.nextElementSibling) {
      $(`.${DOM.BONUS_NUMBER_CLASS}`).focus();
      return;
    }

    e.target.nextElementSibling.focus();
  }

  isCorrectWinningAndBonusNumbers() {
    const inputedNumbers = [...this.getWinningNumbers(), this.getBonusNumber()];

    if (isDuplicatedNumbersInArray(inputedNumbers)) {
      alert(ERROR_MESSAGE.DUPLICATED_LOTTO_NUMBER);
      return false;
    }

    return true;
  }

  getWinningNumbers() {
    return Array.from($$(`.${DOM.WINNING_NUMBER_CLASS}`)).map(element => element.value);
  }

  getBonusNumber() {
    return $(`.${DOM.BONUS_NUMBER_CLASS}`).value;
  }
}

export default WinningNumberForm;
