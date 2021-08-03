import { SELECTOR } from '../../src/js/utils/constants.js'

class CypressTarget {
	selector

	getTarget() {
		return cy.get(this.selector)
	}
}

export class PriceInput extends CypressTarget {
	constructor() {
		super()
		this.selector = SELECTOR.INPUT_PRICE
	}

	type(priceText) {
		priceText.split('').forEach((priceChar) => {
			this.getTarget().type(priceChar)
		})
	}
}

export class PriceBtn extends CypressTarget {
	constructor() {
		super()
		this.selector = SELECTOR.PRICE_BTN
	}

	click() {
		return this.getTarget().click()
	}
}

export class Lottos extends CypressTarget {
	constructor() {
		super()
		this.selector = SELECTOR.LOTTOS
		this.lottoNumbersList = []
	}

	testCount(count) {
		this.getTarget().should(($lotto) => {
			expect($lotto, 'lottos count').to.have.length(count)
		})
	}
}

export class LottoNumbers extends CypressTarget {
	constructor() {
		super()
		this.selector = SELECTOR.LOTTO_NUMBERS
	}

	getUniqueNumberLength(numberText) {
		return new Set(numberText.trim().split(' ')).size
	}

	getInRangeNumberLength(numberText) {
		return numberText
			.trim()
			.split(' ')
			.filter((strNumber) => +strNumber <= 45 && +strNumber >= 1).length
	}

	testSixNumber(length) {
		this.getTarget().should(($numbers) => {
			for (let i = 0; i < length; i++) {
				expect(this.getUniqueNumberLength($numbers.eq(i).text())).to.equal(6)
			}
		})
	}
}
