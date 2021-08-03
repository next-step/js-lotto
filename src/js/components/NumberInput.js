import Component from '../core/Component.js'
import { NUMBERS, TEXTS } from '../utils/constants.js'

export class NumberInput extends Component {
	constructor() {
		super()
		this.setMinMax()
		this.maxlength = NUMBERS.LOTTO_MAX.toString().length
	}

	setEvents() {
		this.$target.addEventListener('input', () => {
			this.onInputHandler()
		})
	}

	onInputHandler() {
		if (!this.checkNumberValid()) {
			return
		}
		this.checkNumberLength()
	}

	setMinMax() {
		this.$target.min = NUMBERS.LOTTO_MIN
		this.$target.max = NUMBERS.LOTTO_MAX
	}

	checkNumberValid() {
		const valueNum = +this.$target.value

		if (valueNum < NUMBERS.LOTTO_MIN || valueNum > NUMBERS.LOTTO_MAX) {
			alert(TEXTS.ALERT_INVALID_NUMBER)
			this.$target.value = ''
			return false
		}
		return true
	}

	checkNumberLength() {
		const valueStr = +this.$target.value

		if (valueStr.length > this.maxlength) {
			this.$target.value = valueStr.substring(0, this.maxlength)
			return false
		}
		return true
	}

	getValue() {
		return +this.$target.value
	}

	template() {
		return /*html*/ `
      <input type="number" class="mx-1 text-center" />
		`
	}
}
