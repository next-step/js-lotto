context('purchase amount form', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  describe('initial UI', () => {
    it('should display purchase amount form', () => {
      cy.get('#purchase-amount').should('exist');
    });

    it('should display purchase amount submit button', () => {
      cy.get('#purchase-amount-submit').should('exist');
    });
  });

  describe('features', () => {
    it('should only accept number inputs', () => {
      cy.get('#purchase-amount')
        .type('123')
        .invoke('val')
        .then(text => {
          expect(text).to.equal('123');
        });

      cy.get('#purchase-amount').clear();

      cy.get('#purchase-amount')
        .type('abc')
        .invoke('val')
        .then(text => {
          expect(text).to.equal('');
        });
    });

    it('should accept numbers within 1000 and 100000', () => {
      cy.get('#purchase-amount')
        .should('have.attr', 'min', '1000')
        .and('have.attr', 'max', '100000');
    });

    it('should show alert when amount cannot be divided by 1000', () => {
      let alertCount = 0;

      cy.get('#purchase-amount').type('9999');
      cy.get('#purchase-amount-submit')
        .click()
        .then(() => {
          expect(alertCount).to.equal(1);
        });

      cy.on('window:alert', text => {
        expect(text).to.equal('로또 구입 금액을 1,000원 단위로 입력해 주세요.');
        alert++;
      });
    });

    it('should show purchase result when valid input is given', () => {
      cy.get('#purchase-amount').type('10000');
      cy.get('#purchase-amount-submit').click();
      cy.get('#purchased-lottos').should('be.visible');
    });
  });
});
