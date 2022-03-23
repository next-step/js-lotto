/// <reference types="cypress" />

context('step2', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5000')
    cy.get('input:contains(".winning-number")').eq(1).type("1");
    cy.get('input:contains(".winning-number")').eq(2).type("2");
    cy.get('input:contains(".winning-number")').eq(3).type("3");
    cy.get('input:contains(".winning-number")').eq(4).type("4");
    cy.get('input:contains(".winning-number")').eq(5).type("5");
    cy.get('input:contains(".winning-number")').eq(6).type("6");
    cy.get('input:contains(".bonus-number")').eq(0).type("7");
  })

  context('결과 확인하기 버튼을 누르면', () => {
    cy.get('button:contains("결과 확인하기")').click();
    it('모달을 확인할 수 있다.', () => {
      expect(cy.get('.modal')).should('exist');
    })
    it('모달에서는 당첨 통계, 수익률을 확인할 수 있다.', () => {
      cy.get('button:contains("결과 확인하기")').click();

      expect(cy.get('.statistics')).should('exist');
      expect(cy.get('.earnings')).should('exist');
    })
  })


  context('다시 시작하기 버튼을 누르면', () => {
    it('초기화 되서 다시 구매를 시작할 수 있다.', () => {
      cy.get('button:contains("결과 확인하기")').click();
      cy.get('button:contains("다시 시작하기")').click()

      expect(cy.get('input:contains(".winning-number")'))
        .should('all.have.value', '');
      expect(cy.get('input[placeholder="구입 금액"]'))
        .should('have.value', '');
    })
  })
});
