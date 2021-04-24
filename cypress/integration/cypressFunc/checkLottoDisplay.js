export const checkLottoDisplay = (amount) => {
  cy.get("#amount-display")
    .find("label")
    .then((x) => {
      let html = x[0].innerHTML;
      let str = `총 ${parseInt(amount) / 1000}개를 구매하였습니다.`;
      expect(html).to.equal(str);
    });
  cy.get("#ticket-display")
    .find(".lotto-wrapper")
    .then((x) => {
      expect(x.length).to.equal(parseInt(amount / 1000));
    });
};

export const checkToggleButton = (status) => {
  cy.get(".lotto-numbers-toggle-button")
    .click({ force: true })
    .then(() => {
      cy.get(".lotto-detail").then((x) => {
        let checkDisplay = true;
        for (let i = 0; i < x.length; i++) {
          checkDisplay = x[i].style.display == status ? true : false;
        }
        expect(checkDisplay).to.equal(true);
      });
    });
};
