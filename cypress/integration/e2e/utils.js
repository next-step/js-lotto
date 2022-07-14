export const shouldBeHidden = (className) => {
  cy.get(className).should("be.hidden");
};

export const shouldNotBeHidden = (className) => {
  cy.get(className).should("not.be.hidden");
};

export const shouldShowAlert = (errMsg, typeVal) => {
  cy.on("window:alert", (alertMessage) => {
    expect(alertMessage).to.eq(errMsg);
  });
  cy.get(CLASSNAME.PRICE_FORM_INPUT).type(typeVal);
  cy.get(CLASSNAME.PRICE_FORM).submit();
};

export const typeAndSubmitPriceForm = (testVal) => {
  cy.get(CLASSNAME.PRICE_FORM_INPUT).type(testVal);
  cy.get(CLASSNAME.PRICE_FORM).submit();
};

export const clearVal = (className) => {
  cy.get(className).clear();
};
