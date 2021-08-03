import Component from '../core/Component.js'
import { $get } from '../utils/dom.js'
import { KEYS, NUMBERS, SELECTOR, TEXTS } from '../utils/constants.js'

export class PriceForm extends Component {
	constructor() {
		super()
	}

	mapActions() {
		this.actionList = ['setPrice']
	}

	setElements() {
		this.$priceInput = $get(SELECTOR.INPUT_PRICE, this.$target)
		this.$priceBtn = $get(SELECTOR.PRICE_BTN, this.$target)
	}

	setEvents() {
		this.$priceBtn.addEventListener('click', (e) => {
			e.preventDefault()
			this.priceHandler()
		})

		this.$priceInput.addEventListener('keydown', (e) => {
			if (e.keyCode !== KEYS.ENTER) return
			e.preventDefault()
			this.priceHandler()
		})
	}

	getPrice() {
		return +this.$priceInput.value
	}

	priceHandler() {
		const price = this.getPrice()

		if (isNaN(price) || price === 0 || price % NUMBERS.LOTTO_PRICE_UNIT !== 0) {
			this.alertWrongPrice()
			return
		}

		this.setPrice(price)
	}

	alertWrongPrice() {
		alert(TEXTS.ALERT_WRONG_PRICE)
		this.$priceInput.value = ''
		this.setPrice('')
	}

	template() {
		return /*html*/ `
      <form class="mt-5">
        <label class="mb-2 d-inline-block">구입할 금액을 입력해주세요.</label>
        <div class="d-flex">
          <input id="input-price" type="number" class="w-100 mr-2 pl-2" placeholder="구입 금액" />
          <button id="price-btn" type="button" class="btn btn-cyan">
            확인
          </button>
        </div>
      </form>
		`
	}
}
