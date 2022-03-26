/// <reference types="cypress" />

context('step2', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5000')
    cy.get('input.winning-number').eq(0).type("1");
    cy.get('input.winning-number').eq(1).type("2");
    cy.get('input.winning-number').eq(2).type("3");
    cy.get('input.winning-number').eq(3).type("4");
    cy.get('input.winning-number').eq(4).type("5");
    cy.get('input.winning-number').eq(5).type("6");
    cy.get('input.bonus-number').eq(0).type("7");
  })

  context('로또를 구매하지 않고', () => {
    it('결과 확인하기 버튼을 누르면 오류메세지가 나온다', () => {
      const stub = cy.stub()

      cy.on('window:alert', stub)
      cy.get('button:contains("결과 확인하기")').click().then(() => {
        expect(stub.getCall(0)).to.be.calledWith('먼저 로또를 구매해주세요')
      })
    })
  })

  context('로또를 구매하고 결과 확인하기 버튼을 누르면', () => {
    it('모달에서 당첨 통계, 수익률을 확인할 수 있다.', () => {
      cy.get('input[placeholder="구입 금액"]').type("3000")
      cy.get('input + button:contains("확인")').click()
      cy.get('button:contains("결과 확인하기")').click();
      cy.get('.modal').should('exist');

      cy.get('.statistics').should('exist');
      cy.get('.earnings').should('exist');
    })
  })


  context('다시 시작하기 버튼을 누르면', () => {
    it('초기화 되서 다시 구매를 시작할 수 있다.', () => {
      cy.get('input[placeholder="구입 금액"]').type("3000")
      cy.get('input + button:contains("확인")').click()
      cy.get('button:contains("결과 확인하기")').click();
      cy.get('button:contains("다시 시작하기")').click()

      cy.get('input.winning-number')
        .should('all.have.value', '');
      cy.get('input[placeholder="구입 금액"]')
        .should('have.value', '');
    })
  })
});
