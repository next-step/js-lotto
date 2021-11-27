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
    cy.get('.js-lotto-count').should('have.text', '5');
    cy.get('.js-lotto-ticket').should('have.length', 5);
  });

  it('복권 번호는 번호보기 토글버틀을 클릭하면, 숫자를 확인할수 있어야 한다.', () => {
    buyLotto(5000);
    cy.get('.js-toggle').click();
    cy.get('.js-lotto-numbers').first().should('be.visible');
  });

  it('결과 확인하기 버튼을 누르면 당첨 통계 , 수익률을 모달로 확인할 수 있다.', ()=>{
    cy.get('.winning-number:first-child').type(5);
    cy.get('.winning-number:nth-child(2)').type(11);
    cy.get('.winning-number:nth-child(3)').type(16);
    cy.get('.winning-number:nth-child(4)').type(22);
    cy.get('.winning-number:nth-child(5)').type(30);
    cy.get('.winning-number:last-child').type(44);
    cy.get('.bonus-number').type(35);
    cy.get('.open-result-modal-button').click();
  })

   it('다시 시작하기 버튼을 누르면 초기화되서 다시 구매를 시작할 수 있다.', ()=>{
    buyLotto(5000);
    cy.get('.winning-number:first-child').type(5);
    cy.get('.winning-number:nth-child(2)').type(15);
    cy.get('.winning-number:nth-child(3)').type(22);
    cy.get('.winning-number:nth-child(4)').type(25);
    cy.get('.winning-number:nth-child(5)').type(30);
    cy.get('.winning-number:last-child').type(40);
    cy.get('.bonus-number').type(43);
    cy.get('.open-result-modal-button').click();
    cy.get('.js-reset-button').click();
   })
});

