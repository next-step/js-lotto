describe('로또 테스트', () => {
  beforeEach('visit', () => {
    // given
    cy.visit('http://localhost:5500/')
  })

  it('로또 구입 금액을 입력하면 화면에 입력한 금액이 그대로 보여져야 한다.', () => {
    // when
    cy.get('#input-purchase-amount').type(2000)

    // then
    cy.get('#input-purchase-amount').should('have.value', '2000')
  })

  it('확인 버튼을 눌렀을 때, 1,000원 단위로 입력이 되지 않았을 경우 alert를 띄워준다.', () => {
    const stub = cy.stub()
    cy.on('window:alert', stub)

    // when
    cy.get('#btn-buy').should('be.visible')
    cy.get('#input-purchase-amount').type(999)
    cy.get('#btn-buy')
      .click()
      .then(() => {
        // then
        expect(stub.getCall(0)).to.be.calledWith('1000원 단위로 구매 가능합니다.')
      })
  })

  it('로또 구입 금액을 1000원단위로 입력하면, 금액에 해당하는 로또를 발급해야 한다.', () => {
    // when
    cy.get('#input-purchase-amount').type(2000)
    cy.get('#btn-buy').click()

    // then
    cy.get('#label-buy-cnt').contains(2)
  })

  it('복권을 구매하고, 번호보기 토글 버튼을 클릭하면 복권 번호가 노출된다.', () => {
    // when
    cy.get('#input-purchase-amount').type(2000)
    cy.get('#btn-buy').click()
    cy.get('.lotto-numbers-toggle-button').first().click({ force: true })

    // then
    cy.get('#list-lotto').should('be.visible')
  })

  it('복권 번호가 비활성화 상태일 때는 각 번호가 노출되지 않는다.', () => {
    // when
    cy.get('.lotto-numbers-toggle-button').first().value().should('have.value', 'false')

    // then
    cy.get('#list-lotto').should('not.be.visible')
  })
})
