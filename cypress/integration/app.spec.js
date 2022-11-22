/// <reference types="cypress" />

describe('App initiation', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5500/')
  });

  it('앱이 시작되면 구입금액 입력창만 보여야 한다.', () => {
    cy.get('[data-test-id="lotto-purchase"]').should('be.visible');
    cy.get('[data-test-id="lotto-list"]').should('not.be.visible');
    cy.get('[data-test-id="lotto-input"]').should('not.be.visible');
    cy.get('[data-test-id="modal"]').should('not.be.visible');
  });
});


