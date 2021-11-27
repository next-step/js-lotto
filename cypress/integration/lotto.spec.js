import * as SELECTOR from "../../src/js/constants/selector.js";

before(() => {
  cy.visit("/");
});

describe("JS 로또", function () {
  const testCase = [0, 3000, 10000, 2500, 500];

  beforeEach(() => {
    cy.clearInput();
  });

  it("로또 구입 금액을 입력하면, 금액에 해당하는 로또를 발급해야 한다.", () => {
    //로또 1장의 가격은 1,000원이다.
    //소비자는 **자동 구매**를 할 수 있어야 한다.
    testCase.forEach((ele) => {
      cy.clearInput();
      cy.typeInput(ele);
      cy.clickConfirmBtn();
      const lottoCnt = Math.trunc(ele / 1000);
      cy.get(SELECTOR.LOTTO_BOARD).then(($parent) => {
        const childNodesCnt = $parent[0].childNodes.length;
        expect(childNodesCnt).to.equal(lottoCnt);
      });
    });
  });

  it("복권 번호는 번호보기 토글 버튼을 클릭하면, 볼 수 있어야 한다.", () => {
    cy.typeInput(3000);
    cy.clickConfirmBtn();
    cy.clickToggleBtn();
    cy.get(SELECTOR.LOTTO_BOARD)
      .children()
      .children()
      .should("have.class", "lotto-detail");
  });
});
