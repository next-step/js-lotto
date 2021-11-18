import { ERROR_MESSAGE } from "../../src/utils/constants.js";

before(() => {
  cy.visit("http://localhost:5500");
});

describe("js-lotto", () => {
  beforeEach(() => {
    cy.get("[data-cy=purchase-price-input]").clear();
  });

  context("구입금액 예외처리 확인", () => {
    it("금액을 입력하지 않고 버튼 클릭시 에러 발생", () => {
      cy.get("[data-cy=purchase-form]").submit();
      cy.on("window.alert", (text) =>
        expect(text).to.be(ERROR_MESSAGE.EMPTY_PRICE)
      );
    });
    it("천원 미만이거나 십만원 초과 금액을 입력했을 때 에러", () => {
      cy.purchaseLotto(200);
      cy.on("window.alert", (text) =>
        expect(text).to.be(ERROR_MESSAGE.OUT_OF_AMOUNT_RANGE)
      );
    });
    it("금액이 천원 단위가 아니면 에러", () => {
      cy.purchaseLotto(2999);
      cy.on("window.alert", (text) =>
        expect(text).to.be(ERROR_MESSAGE.NOT_IN_UNITS_OF)
      );
    });
  });

  context("구매액에 맞게 로또가 발급되는지 확인", () => {
    it("로또 개수가 갱신된다", () => {
      cy.purchaseLotto(5000);
      cy.get("[data-cy=lotto-amounts]").should(
        "have.text",
        "총 5개를 구매하였습니다."
      );
    });
    it("로또 개수만큼의 티켓이 표시된다.", () => {
      cy.purchaseLotto(5000);
      cy.get("[data-cy=lotto-tickets] div").should("have.length", 5);
    });
  });

  context("번호보기 토글기능 확인", () => {
    beforeEach(() => {
      cy.purchaseLotto(5000);
    });
    it("토글버튼 클릭시 로또 번호가 보인다.", () => {
      cy.get("[data-cy=lotto-numbers-toggle-btn]").check({ force: true });
      cy.get("[data-cy=lotto-tickets]").each((el) => {
        cy.wrap(el).should("have.class", "d-flex");
      });
    });
    it("토글버튼이 활성화된 채로 버튼 클릭시 로또 번호가 숨겨진다", () => {
      cy.get("[data-cy=lotto-numbers-toggle-btn]").uncheck();
      cy.get("[data-cy=lotto-tickets] div").each((el) => {
        cy.get(el).find("span").should("not.have.class", "d-flex");
      });
    });
  });
});
