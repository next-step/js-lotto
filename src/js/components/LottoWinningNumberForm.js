import Component from '../core/Component.js';
import { DOM } from '../constants.js';

class LottoWinningNumberForm extends Component {
  template() {
    return String.raw`
				<label class="flex-auto d-inline-block mb-3"
					>지난 주 당첨번호 6개와 보너스 넘버 1개를 입력해주세요.</label
				>
				<div class="d-flex">
					<div>
						<h4 class="mt-0 mb-3 text-center">당첨 번호</h4>
						<div>
							<input required type="number" class="${DOM.WINNING_NUMBER} mx-1 text-center" />
							<input required type="number" class="${DOM.WINNING_NUMBER} mx-1 text-center" />
							<input required type="number" class="${DOM.WINNING_NUMBER} mx-1 text-center" />
							<input required type="number" class="${DOM.WINNING_NUMBER} mx-1 text-center" />
							<input required type="number" class="${DOM.WINNING_NUMBER} mx-1 text-center" />
							<input required type="number" class="${DOM.WINNING_NUMBER} mx-1 text-center" />
						</div>
					</div>
					<div class="bonus-number-container flex-grow">
						<h4 class="mt-0 mb-3 text-center">보너스 번호</h4>
						<div class="d-flex justify-center">
							<input type="number" class="${DOM.BONUS_NUMBER} text-center" />
						</div>
					</div>
				</div>
				<button type="button" id="${DOM.OPEN_RESULT_MODAL_BUTTON}" class="mt-5 btn btn-cyan w-100">
					결과 확인하기
				</button>
			`;
  }
}

export default LottoWinningNumberForm;
