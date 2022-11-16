describe('로또 어플리케이션 테스트', () => {
  beforeEach(() => {
    cy.visit('');
  });

  // # 로또 구입 금액을 입력한다.
  it('로또 구입 금액 입력할 input 태그가 있다.', () => {
    cy.get('[data-cy="purchase-price-input"]').should('exist');
  });

  it('로또 구입 금액을 입력하면 그대로 보여진다.', () => {
    cy.get('[data-cy="purchase-price-input"]').type('1000');
    cy.get('[data-cy="purchase-price-input"]').should('have.value', '1000');
  });

  it('금액은 숫자만 입력된다.', () => {
    cy.get('[data-cy="purchase-price-input"]').type('ab가갸1cd000거겨');
    cy.get('[data-cy="purchase-price-input"]').should('have.value', '1000');
  });

  // # 금액에 해당하는 로또를 발급해야 한다.
  it('확인 버튼이 있다.', () => {
    cy.get('[data-cy="purchase-price-button"]').should('exist');
  });

  it('확인 버튼을 클릭할 수 있다.', () => {
    cy.get('[data-cy="purchase-price-button"]').click();
  });

  it('금액에 맞는 로또 개수를 발급한다.', () => {
    cy.get('[data-cy="purchase-price-input"]').type('1000');
    cy.get('[data-cy="purchase-price-button"]').click();
    cy.get('[data-cy="total-purchase"]').should('have.text', '1');
  });

  // it('엔터를 누르면 로또가 발급된다.', () => {
  //   cy.get('[data-cy="purchase-price-button"]').type({ enter });
  // });
});
