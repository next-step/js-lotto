describe('Main Test', () => {
    it('Click into main', () => {
      cy.visit('/');
      cy.wait(1000);
      cy.get('.input-price');
      cy.wait(1000);
      cy.get('form.mt-5 > .d-flex > .btn').click();
      cy.wait(1000);
      cy.get('.input-price').type("1000{enter}");
      cy.wait(1000);
      cy.get('.input-price').type("999{enter}");
      cy.wait(1000);
      cy.get('.text-base').click();
    })
  })