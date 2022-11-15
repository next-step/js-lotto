describe('로또 테스트', () => {
  it('visit', () => {
    cy.visit('http://localhost:5500/')
  })

  it('로또 구입 금액을 입력하면, 금액에 해당하는 로또를 발급해야 한다.', () => {
    cy.get('#input-purchase-amount').type(2000)
    cy.get('#btn-buy').click()
    cy.get('#label-buy-cnt').contains(2)
  })

  it('복권 번호는 번호보기 토글 버튼을 클릭하면, 볼 수 있어야 한다.', () => {
    cy.get('.lotto-numbers-toggle-button').first().click({ force: true })
    cy.get('.lotto').first().should('be.visible')
  })
})
