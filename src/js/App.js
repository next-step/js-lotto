import Component from './core/Component.js'
import { PriceForm } from './components/PriceForm.js'
import { replaceSelectorToDOM } from './utils/dom.js'
import { SELECTOR, SLOTS } from './utils/constants.js'
import { LottoSection } from './components/LottoSection.js'
import { NumberSection } from './components/NumberSection.js'
import { ResultModal } from './components/ResultModal.js'

export class App extends Component {
	constructor() {
		super()

		this.priceForm = new PriceForm()
		this.lottoSection = new LottoSection()
		this.numberSection = new NumberSection()
		this.resultModal = new ResultModal()
	}

	setChildren() {
		replaceSelectorToDOM(SELECTOR.PRICE_FORM, this.priceForm.$target)
		replaceSelectorToDOM(SELECTOR.LOTTO_SECTION, this.lottoSection.$target)
		replaceSelectorToDOM(SELECTOR.NUMBER_SECTION, this.numberSection.$target)
		replaceSelectorToDOM(SELECTOR.RESULT_MODAL, this.resultModal.$target)
	}

	template() {
		return /*html*/ `
		<div id="app" class="p-3">
			<div class="d-flex justify-center mt-5">
				<div class="w-100">
					<h1 class="text-center">🎱 행운의 로또</h1>
					<div data-slot="${SLOTS.PRICE_FORM}"></div>
					<div data-slot="${SLOTS.LOTTO_SECTION}"></div>
					<div data-slot="${SLOTS.NUMBER_SECTION}"></div>
				</div>
			</div>

			<div data-slot="result-modal"></div>
		</div>
		`
	}
}
