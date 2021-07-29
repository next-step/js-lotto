import { MESSAGES } from "../../src/utils/constants";

describe("🎱 행운의 로또", () => {
  before(() => {
    cy.visit("/");
  });
});

/**
 * 로또 금액 입력 기능
 *
 * - 로또 구입 금액을 입력하면, 금액에 해당하는 로또를 발급해야 한다.
 * - 로또 1장의 가격은 1,000원이다.
 */

describe("로또 구매 금액 입력 기능", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get("[data-cy=input-purchase]").as("inputPurchase");
    cy.get("[data-cy=btn-purchase]").as("btnPurchase");
  });
  it("로또 구매 금액을 입력할 수 있어야 한다.", () => {
    cy.get("@inputPurchase").should("be.visible");
    cy.get("@inputPurchase").type("5000").should("have.value", "5000");
    cy.get("@btnPurchase").should("be.visible");
  });
  describe("로또 구매 금액이 1000원 단위가 아닐 경우", () => {
    it("에러 문구를 표시해야 한다.", () => {
      const stub = cy.stub();
      cy.on("window:alert", stub);
      cy.get("@inputPurchase").type("5500");
      cy.get("@btnPurchase")
        .click()
        .then(() => {
          cy.windowAlertStub(stub, MESSAGES.PURCHASE);
        });
    });
  });
  describe("로또 구매 금액을 입력하지 않은 경우", () => {
    it("에러 문구를 표시해야 한다.", () => {
      cy.get("@inputPurchase");
      cy.get("@btnPurchase")
        .click()
        .then(() => {
          cy.get("input:invalid")
            .should("have.length", 1)
            .then(($input) => {
              expect($input[0].validationMessage).to.eq("이 입력란을 작성하세요.");
            });
        });
    });
  });
});
