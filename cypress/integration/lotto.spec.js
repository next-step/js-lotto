/**
 * Commands
 *
 * purchaseLotto: 로또를 구매합니다.
 * toggleButton: 로또보기 토글을 클릭합니다.
 * lottoCountShouldBe: 구매한 로또의 개수를 확인합니다.
 * checkLottoDetailDisplay: (visible: boolean) 로또의 번호가 visible인지 확인합니다.
 */

const LIVE_SERVER_URL = 'http://127.0.0.1:3000/'

describe('로또의 미션의 요구조건을 만족한다.', () => {
  const lottoPrice = 1000
  const purchasePrice = 3000

  beforeEach(() => {
    cy.visit(LIVE_SERVER_URL)
  })

  context('1단계', () => {
    it('로또는 1장에 1000원이고, 금액에 해당하는 로또를 발급한다.', () => {
      cy.purchaseLotto(purchasePrice)
      cy.lottoCountShouldBe(purchasePrice / lottoPrice)
    })

    it('소비자는 자동 구매를 할 수 있어야 하고, 번호보기를 토글하면 볼 수 있어야 한다.', () => {
      cy.purchaseLotto(purchasePrice)
      cy.toggleButton()
      cy.checkLottoDetailDisplay(true)
      cy.toggleButton()
      cy.checkLottoDetailDisplay(false)
    })

    it('로또의 금액이 나눠떨어지지 않으면 경고창을 표시한다.', () => {
      cy.purchaseLotto(purchasePrice + 5)

      cy.on('window:alert', (txt) => {
        expect(txt).to.contains(lottoPrice + '원 단위로 입력해주세요.')
      })
    })
  })
})
