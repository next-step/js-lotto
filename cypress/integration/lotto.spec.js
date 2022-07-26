import { getLottoNumber } from '../../src/utils/getLottoNumber.js'

describe('로또 테스트 입니다.', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('로또 구입 후 n장을 반환 합니다.', () => {
    const LOTTO_PRICE = 1000

    const lotto = 10
    const payment = 10 * LOTTO_PRICE

    cy.get('input[name="lottoPriceInput"]').type(payment)
    cy.get('button#lottoPriceButton').click()

    cy.get('label#lottoCountLabel').should(
      'have.text',
      `총 ${lotto}개를 구매하였습니다.`
    )
  })

  it('로또는 장당 1000원 입니다.', () => {
    cy.get('input[name="lottoPriceInput"]').type(1000)
    cy.get('button#lottoPriceButton').click()

    cy.get('label#lottoCountLabel').should(
      'have.text',
      `총 1개를 구매하였습니다.`
    )
  })

  it('로또의 번호는 1 ~ 45까지 숫자이고 6개의 배열 값을 반환한다.', () => {
    const lottoNumbers = getLottoNumber()

    const checkDuplicates = (array) => Boolean(array.filter((item, index) => array.indexOf(item) !== index))
    const isValidateLotto = (lottoNumbers) => checkDuplicates(lottoNumbers)

    expect(isValidateLotto(lottoNumbers)).to.equal(true)
  })

  it('로또 번호보기 토글 클릭 시 로또 번호는 보입니다.', () => {
    cy.get('input[name="lottoPriceInput"]').type(3000)
    cy.get('button#lottoPriceButton').click()
    cy.get('.switch').click()
    cy.get('span[name="lottoNumbers"]').should('be.visible')
  })
})
