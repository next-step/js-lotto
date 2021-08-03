import Component from '../core/Component.js'
import { CLASS, NUMBERS, SELECTOR, TEXTS } from '../utils/constants.js'
import { $get } from '../utils/dom.js'
import { NumberWinningInput } from './NumberWinningInput.js'
import { NumberBonusInput } from './NumberBonusInput.js'

export class NumberSection extends Component {
	constructor() {
		super()
		this.numberSize = NUMBERS.LOTTO_NUMBER_SIZE + NUMBERS.LOTTO_BONUS_SIZE
		this.winningInputs = []
		this.bonusInputs = []
	}

	mapState() {
		this.stateList = ['lottos']
	}

	mapActions() {
		this.actionList = ['setWinningNumbers', 'setBonusNumbers', 'setIsShowModal']
	}

	setElements() {
		this.$winningContainer = $get(
			SELECTOR.NUMBER_WINNING_CONTAINER,
			this.$target
		)
		this.$bonusContainer = $get(SELECTOR.NUMBER_BONUS_CONTAINER, this.$target)
		this.$resultBtn = $get(SELECTOR.RESULT_BTN, this.$target)
	}

	setEvents() {
		this.$resultBtn.addEventListener('click', () => {
			this.onClickResultBtn()
		})
	}

	render() {
		if (this.lottos.length <= 0) {
			this.toggleTarget(false)
			return
		}

		this.setWinningContainer()
		this.setBonusContainer()
		this.toggleTarget(true)
	}

	setWinningContainer() {
		this.numberWinningComponents = []

		for (let i = 0; i < NUMBERS.LOTTO_NUMBER_SIZE; i++) {
			const winningInput = new NumberWinningInput()
			this.winningInputs.push(winningInput)
			this.$winningContainer.appendChild(winningInput.$target)
		}
	}

	setBonusContainer() {
		this.numberWinningComponents = []

		for (let i = 0; i < NUMBERS.LOTTO_BONUS_SIZE; i++) {
			const bonusInput = new NumberBonusInput()
			this.bonusInputs.push(bonusInput)
			this.$bonusContainer.appendChild(bonusInput.$target)
		}
	}

	onClickResultBtn() {
		const winningNumberList = this.winningInputs.map((input) =>
			input.getValue()
		)
		const bonusNumberList = this.bonusInputs.map((input) => input.getValue())
		const currentNumberSize = new Set([
			...winningNumberList,
			...bonusNumberList,
		]).size

		if (currentNumberSize < this.numberSize) {
			alert(TEXTS.ALERT_DUPLICATE_NUMBER)
			return
		}

		this.setWinningNumbers(winningNumberList)
		this.setBonusNumbers(bonusNumberList)
		this.setIsShowModal(true)
	}

	template() {
		return /*html*/ `
      <form class="${CLASS.DP_NONE} mt-9">
        <label class="flex-auto d-inline-block mb-3">
          지난 주 당첨번호 ${NUMBERS.LOTTO_NUMBER_SIZE}개와 보너스 넘버 ${NUMBERS.LOTTO_BONUS_SIZE}개를 입력해주세요.
        </label>
        <div class="d-flex">
          <div>
            <h4 class="mt-0 mb-3 text-center">당첨 번호</h4>
            <div class="${CLASS.NUMBER_WINNING_CONTAINER}"></div>
          </div>
          <div class="flex-grow">
            <h4 class="mt-0 mb-3 text-center">보너스 번호</h4>
            <div class="${CLASS.NUMBER_BONUS_CONTAINER} d-flex justify-center"></div>
          </div>
        </div>
        <button type="button" class="open-result-modal-button mt-5 btn btn-cyan w-100">
          결과 확인하기
        </button>
      </form>
		`
	}
}
