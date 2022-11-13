describe('로또 구입 금액 입력', () => {
  const $inputPurchase = '[data-cy="input-purchase"]';
  const $submitPurchase = '[data-cy="submit-purchase"]';
  const $messagePurchase = '[data-cy="message-purchase"]';
  const min = 1000;
  const max = 100000;

  beforeEach(() => {
    cy.visit('/');
  });

  it('숫자만 입력할 수 있다', () => {
    cy.get($inputPurchase).type('1000e')
      .should('have.value', 1000);
  });

  it('숫자만 입력할 수 있다 (음수)', () => {
    cy.get($inputPurchase).type('-1000')
      .should('have.value', 1000);
  });

  it(`${min} 단위의 값만 허용한다`, () => {
    cy.get($inputPurchase).type(`${min + 1}`);
    cy.get($submitPurchase).click();
    cy.get($messagePurchase).should('be.visible')
      .should('have.text', `${min} 단위로 입력해 주세요`);
  });

  it(`${min} ~ ${max} 사이의 값만 허용한다 (0 입력)`, () => {
    cy.get($inputPurchase).type('0');
    cy.get($submitPurchase).click();
    cy.get($messagePurchase).should('be.visible')
      .should('have.text', '값을 입력해 주세요');
  });

  it(`${min} ~ ${max} 사이의 값만 허용한다 (${min} 이하)`, () => {
    cy.get($inputPurchase).type(`${min - 1}`);
    cy.get($submitPurchase).click();
    cy.get($messagePurchase).should('be.visible')
      .should('have.text', `${min} ~ ${max} 사이의 값을 입력해 주세요`);
  });

  it(`${min} ~ ${max} 사이의 값만 허용한다 (${max} 이상)`, () => {
    cy.get($inputPurchase).type(`${max + 1000}{enter}`);
    cy.get($messagePurchase).should('be.visible')
      .should('have.text', `${min} ~ ${max} 사이의 값을 입력해 주세요`);
  });

  it('올바른 값 입력 시, input 내의 내용을 지운다', () => {
    cy.get($inputPurchase).type(`${min}{enter}`)
      .should('have.value', '');
  });
});
