const BASE_URL = 'http://127.0.0.1:5501';

beforeEach(() => {
  cy.visit(BASE_URL);
});

const buyLotto = (price) => {
  cy.get('.js-payment-input').type(price);
  cy.get('.js-confirm-button').click();
};

describe('로또 게임', () => {
  it('로또 구입 금액을 입력하면, 금액에 해당하는 로또를 구입해야 한다.', () => {
    buyLotto(5000);
    cy.get('.js-lotto-count').should('have.text', 5);
    
    cy.get('.js-automatic-buy-button').click();
    cy.get('.js-lotto-ticket').should('have.length', 5);
  });

  it('복권 번호는 번호보기 토글버틀을 클릭하면, 숫자를 확인할수 있어야 한다.', () => {
    buyLotto(5000);
    cy.get('.js-toggle').click();
    cy.get('.js-automatic-buy-button').click();
    cy.get('.js-lotto-numbers').first().should('be.visible');
  });

  it('결과 확인하기 버튼을 누르면 당첨 통계 , 수익률을 모달로 확인할 수 있다.', ()=>{
    [5, 15, 22, 25, 30, 40].forEach((value, index) => {
      cy.get(`.winning-number[data-winning-number="${index+1}"]`).type(value)
    })
    cy.get('.bonus-number').type(35);
    cy.get('.open-result-modal-button').click();
  })

   it('다시 시작하기 버튼을 누르면 초기화되서 다시 구매를 시작할 수 있다.', ()=>{
    buyLotto(5000);
    [5, 15, 22, 25, 30, 40].forEach((value, index) => {
      cy.get(`.winning-number[data-winning-number="${index+1}"]`).type(value)
    })
    cy.get('.bonus-number').type(43);
    cy.get('.open-result-modal-button').click();
    cy.get('.js-reset-button').click();
   })

   it('소비자는 수동구매를 할 수 있어야 한다. (번호입력) 남는 금액이 있다면 자동으로 구매할수 있어야한다.',()=>{
    buyLotto(5000);
    [5, 15, 22, 25, 30, 40].forEach((value, index) => {
      cy.get(`.manual-number[data-manual-number="${index+1}"]`).type(value)
    })
    cy.get('.js-manual-buy-button').click();
    cy.get('.js-automatic-buy-button').click();
   })
});  



