import { AWARD_MODAL } from "../../src/js/utils/selectors";

beforeEach(() => {
  cy.visit("http://localhost:5500");
});

describe("모달 창 on/off", () => {
  it("결과 확인하기 버튼 클릭하면 모달창 열기", () => {
    cy.showAward();
    cy.get(AWARD_MODAL).should("be.visible");
  });

  it("모달 창 닫기버튼 클릭하면 모달창 닫기", () => {
    cy.showAward();
    cy.closeAward();
    cy.get(AWARD_MODAL).should("not.be.visible");
  });
});
