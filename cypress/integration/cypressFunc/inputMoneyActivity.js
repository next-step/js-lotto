import { MESSAGE } from "../../../src/js/constant.js";

export const inputMoneyActivity = (amount, isAlert, isSuccess) => {
  cy.window().then((win) => cy.stub(win, "alert").as("windowAlert"));
  cy.get("form.mt-5>div>input").type(amount);
  cy.get("form.mt-5>div>button").click();
  if (isAlert) {
    cy.get("@windowAlert").should("be.calledWith", MESSAGE.MONEY_UNIT);
  }
  if (!isSuccess) {
    cy.get(".lotto-section").should("not.exist");
    cy.get(".inputnum-section").should("not.exist");
  } else {
    cy.get(".lotto-section").should("be.exist");
    cy.get(".inputnum-section").should("be.exist");
  }
};
