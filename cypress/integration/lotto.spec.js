import { PriceInput, PriceBtn, Lottos, LottoNumbers } from './targets.js'
import { TEXTS } from '../../src/js/utils/constants.js'

describe('Buy Lotto', () => {
	beforeEach(() => {
		cy.visit('')
	})

	it('로또 구입 금액을 입력하면, 금액에 해당하는 로또를 발급한다.', () => {
		const priceInput = new PriceInput()
		const priceBtn = new PriceBtn()
		const lottos = new Lottos()

		priceInput.type('2000')
		priceBtn.click()
		lottos.testCount(2)
	})

	it('로또 1장의 가격은 1,000원이고, 1,000원 단위가 아니면 alert를 띄운다', () => {
		const priceInput = new PriceInput()
		const priceBtn = new PriceBtn()

		cy.on('window:alert', (message) => {
			expect(message).to.equal(TEXTS.ALERT_WRONG_PRICE)
		})

		priceInput.type('2001')
		priceBtn.click()
	})

	it('자동구매를 하여 중복되지 않는 번호 6개를 갖는다', () => {
		const priceInput = new PriceInput()
		const priceBtn = new PriceBtn()
		const lottoNumbers = new LottoNumbers()

		priceInput.type('4000')
		priceBtn.click()

		lottoNumbers.testSixNumber(4)
	})
})
