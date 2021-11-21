import { ERROR_MESSAGE } from "../../src/utils/constants.js";

before(() => {
  cy.visit("http://localhost:5500");
});

describe("js-lotto", () => {
  context("구입금액 예외처리 확인", () => {
    beforeEach(() => {
      cy.get("[data-cy=purchase-price-input]").clear();
    });

    it("금액을 입력하지 않고 버튼 클릭시 에러 발생", () => {
      cy.get("[data-cy=purchase-form]").submit();
      cy.checkAlertMessage(ERROR_MESSAGE.EMPTY_PRICE);
    });

    it("천원 미만이거나 십만원 초과 금액을 입력했을 때 에러", () => {
      cy.purchaseLotto(200);
      cy.checkAlertMessage(ERROR_MESSAGE.OUT_OF_AMOUNT_RANGE);
    });

    it("금액이 천원 단위가 아니면 에러", () => {
      cy.purchaseLotto(2999);
      cy.checkAlertMessage(ERROR_MESSAGE.NOT_IN_UNITS_OF);
    });
  });

  context("구매액에 맞게 로또가 발급되는지 확인", () => {

    beforeEach(() => {
      cy.get("[data-cy=purchase-price-input]").clear();
    });

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

      cy.get("[data-cy=purchase-price-input]").clear();
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

  context("당첨번호 예외처리 확인", () => {
    beforeEach(() => {
      cy.get("[data-cy=purchase-price-input]").clear();
      cy.purchaseLotto(2000);
    });

    it("당첨번호를 모두 입력하지 않을시 에러 발생", () => {
      cy.inputWinningNumber([1, 2, 3, 4, 5]);
      cy.get("[data-cy=result-modal-btn]").click();
      cy.checkAlertMessage(ERROR_MESSAGE.EMPTY_WINNING_NUMBER);
    });

    it("보너스 번호를 입력하지 않을시 에러 발생", () => {
      cy.inputWinningNumber([1, 2, 3, 4, 5, 6]);
      cy.get("[data-cy=result-modal-btn]").click();
      cy.checkAlertMessage(ERROR_MESSAGE.EMPTY_BONUS_NUMBER);
    });

    it("입력한 번호가 1 ~ 99 범위를 벗어날 시 에러 발생", () => {
      cy.inputWinningNumber([1, 2, 3, 4, 5, 6]);
      cy.inputBonusNumber(100);
      cy.get("[data-cy=result-modal-btn]").click();
      cy.checkAlertMessage(ERROR_MESSAGE.WINNING_NUMBER_RANGE);
    });

    it("당첨 번호에 중복이 있을 시 에러 발생", () => {
      cy.inputWinningNumber([1, 2, 3, 4, 6, 6]);
      cy.inputBonusNumber(7);
      cy.get("[data-cy=result-modal-btn]").click();
      cy.checkAlertMessage(ERROR_MESSAGE.DUPLICATED_WINNING_NUMBER);
    });
  });

  context("결과 모달창 작동 확인", () => {
    before(() => {
      cy.get("[data-cy=purchase-price-input]").clear();
      cy.purchaseLotto(2000);
    });

    it("정상적으로 당첨 번호를 입력하고 결과 출력하기 버튼을 누르면 모달창이 출력된다.", () => {
      cy.inputWinningNumber([1, 2, 3, 4, 5, 6]);
      cy.inputBonusNumber(7);
      cy.get("[data-cy=result-modal-btn]").click();
      cy.get(".modal").should("be.visible");
    });

    it("닫기 버튼을 클릭하면 결과 모달 창이 닫힌다.", () => {
      cy.get(".modal-close").click();
      cy.get(".modal").should("not.be.visible");
    });
  });

  context("결과 초기화 확인", () => {
    beforeEach(() => {
      cy.get("[data-cy=purchase-price-input]").clear();
      cy.purchaseLotto(2000);
    });

    it("로또 결과 확인 후, 다시 시작하기 버튼을 누르면 로또를 새로 구입할 수 있다.", () => {
      cy.inputWinningNumber([1, 2, 3, 4, 5, 6]);
      cy.inputBonusNumber(7);
      cy.get("[data-cy=result-modal-btn]").click();
      cy.get(".restart-btn").click();
      cy.get(".modal").should("not.be.visible");
      cy.get(".lotto__menu").children().should("have.length", 0);
      cy.get(".lotto__tickets").children().should("have.length", 0);
      cy.get(".winning-number-form").children().should("have.length", 0);
    });
  });
});
