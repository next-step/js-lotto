export const pressRestartButton = () => {
    cy.get(".open-result-modal-button").click();
    cy.get(".modal").should("have.class", "open");
    cy.get(".btn-restart").click();

    cy.get(".lotto-section").should("not.exist");
    cy.get(".inputnum-section").should("not.exist");
  }