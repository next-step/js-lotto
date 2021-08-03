import { MOCK, PRIZE } from "../support/constants.js";
import { MESSAGES } from "../../src/utils/constants.js";

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

/**
 * 로또 용지 화면 표시
 * - 소비자는 자동 구매를 할 수 있어야 한다.
 * - 복권 번호는 번호보기 토글 버튼을 클릭하면, 볼 수 있어야 한다.
 */

describe("로또 용지 화면 표시", () => {
  const purchase = 5000;
  const total = purchase / 1000;
  beforeEach(() => {
    cy.visit("/");
    cy.get("[data-cy=btn-purchase]").as("btnPurchase");
    cy.get("[data-cy=input-purchase]").type(purchase);
    cy.get("[data-cy=btn-purchase]").click();
    cy.get("[data-cy=lotto-icon]").as("lottoIcon");
    cy.get("[data-cy=toggle-lotto]").as("toggleLotto");
    cy.get("[data-cy=lotto-detail]").as("lottoDetail");
  });
  it("총 로또 숫자가 보여야 한다.", () => {
    cy.get("[data-cy=section-lotto-tickets]")
      .should("be.visible")
      .find("[data-cy=lotto-total]")
      .should("have.text", `총 ${total}개를 구매하였습니다.`);
    cy.get("@lottoIcon").each(($el) => cy.wrap($el).should("have.text", "🎟️"));
  });
  it("구입 금액에 따른 자동 구매가 이루어져야 한다.", () => {
    cy.get("@lottoIcon").should("have.length", total);
  });
  describe("복권 번호보기 토글 버튼을 클릭하면", () => {
    it("당첨 번호는 1이상 45이하 숫자여야 한다.", () => {
      cy.get("@toggleLotto").eq(0).check({ force: true });
      cy.get("@lottoDetail").each(($el) => {
        $el
          .text()
          .split(",")
          .forEach((num) => {
            cy.wrap(Number(num)).should("be.gt", 0).should("be.lt", 46);
          });
      });
    });
    it("로또 숫자만큼 당첨 번호가 보여야 한다.", () => {
      cy.get("@toggleLotto").eq(0).check({ force: true });
      cy.get("@lottoDetail").each(($el) => {
        cy.wrap($el.text().split(",")).should("have.length", 6);
      });
    });
  });
});

/**
 * 당첨 결과 기능
 * - 결과 확인하기 버튼을 누르면 당첨 통계, 수익률을 모달로 확인할 수 있다.
 * - 다시 시작하기 버튼을 누르면 초기화 되서 다시 구매를 시작할 수 있다.
 */

describe("당첨 결과 기능", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.mockMathRandom(MOCK.LOTTOS);
    cy.get("[data-cy=btn-purchase]").as("btnPurchase");
    cy.get("[data-cy=input-purchase]").type(MOCK.PURCHASE);
    cy.get("[data-cy=btn-purchase]").click();
    cy.get("[data-cy=toggle-lotto]").eq(0).check({ force: true });
    cy.get("[data-cy=input-win-num]").each(($el, i) => {
      cy.wrap($el).type(MOCK.WIN_NUMS[i]);
    });
    cy.get("[data-cy=input-bonus-num]").type(7);
    cy.get("[data-cy=button-submit").click();
  });

  describe("결과 확인하기 버튼을 누르면", () => {
    it("당첨 통계, 수익률을 모달로 확인할 수 있다.", () => {
      cy.get("[data-cy=result-modal]").should("be.visible");
      MOCK.STATICS.forEach((win, i) => {
        cy.get("[data-cy=result-num]").eq(i).should("have.text", `${win[0]}개`);
      });
      cy.get("[data-cy=result-earning]").should("have.text", `당신의 총 수익률은 ${PRIZE}%입니다.`);
    });
  });
  describe("다시 시작하기 버튼을 누르면", () => {
    it("초기화 되서 다시 구매를 시작할 수 있다.", () => {
      cy.get("[data-cy=result-reset-btn]").click();
      cy.get("[data-cy=lotto-input]").should("be.visible");
      cy.get("[data-cy=section-lotto-tickets]").should("be.not.visible");
      cy.get("[data-cy=lotto-win]").should("be.not.visible");
      cy.get("[data-cy=result-modal]").should("be.not.visible");
    });
  });
});
