import { ERROR_MESSAGE } from "../../src/js/constants";

describe("test", () => {
  before(() => {
    cy.visit("/");
  });

  context("구입할 금액 입력 검사", () => {
    beforeEach(() => {
      cy.get("#moneyInput").clear();
    });

    it("1000원 이하 입력", () => {
      cy.get("#moneyInput")
        .type("100{Enter}")
        .then(($input) => {
          expect($input[0].validationMessage).to.equal(
            ERROR_MESSAGE.MONEY_UNDER_FLOW
          );
        });
    });

    it("100000 초과 입력", () => {
      cy.get("#moneyInput")
        .type("1000000{Enter}")
        .then(($input) => {
          expect($input[0].validationMessage).to.equal(
            ERROR_MESSAGE.MONEY_OVER_FLOW
          );
        });
    });

    it("금액 미입력", () => {
      cy.get("#moneyInput")
        .type("{Enter}")
        .then(($input) => {
          expect($input[0].validationMessage).to.equal(
            ERROR_MESSAGE.EMPTY_VALUE
          );
        });
    });

    it("정상 입력시 로또 리스트 노출", () => {
      cy.get("#moneyInput")
        .type("10000{Enter}")
        .then(() => {
          cy.get("#lottoSection").should("not.have.class", "d-none");
        });
    });
  });

  context("로또 리스트 검사", () => {
    it("10000원 입력시 로또 10개 출력", () => {
      cy.get("#lottoWrap").children().should("have.length", 10);
      cy.get("#lottoListLengthLabel").contains("10개");
    });

    it("번호 노출 테스트", () => {
      cy.get("#lottoWrap")
        .children()
        .first()
        .then(($lotto) => {
          expect($lotto[0].innerText).to.equal("🎟️");
        });

      cy.get("#showNumberSwitch")
        .click({ force: true })
        .then(() => {
          cy.get("#lottoWrap")
            .children()
            .first()
            .then(($lotto) => {
              expect($lotto[0].innerText.split(",")).to.have.lengthOf(6);
            });
        });
    });
  });

  context("당첨 번호 입력", () => {
    beforeEach(() => {
      cy.get(".winning-number").clear();
    });

    it("1 미만 입력", () => {
      cy.get(".winning-number")
        .first()
        .type("0{Enter}")
        .then(($input) => {
          expect($input[0].validationMessage).to.equal(
            ERROR_MESSAGE.WINNING_NUMBER_UNDER_FLOW
          );
        });
    });

    it("45 미만 입력", () => {
      cy.get(".winning-number")
        .first()
        .type("100{Enter}")
        .then(($input) => {
          expect($input[0].validationMessage).to.equal(
            ERROR_MESSAGE.WINNING_NUMBER_OVER_FLOW
          );
        });
    });

    it("필수값 미입력", () => {
      cy.get(".winning-number")
        .first()
        .type("{Enter}")
        .then(($input) => {
          expect($input[0].validationMessage).to.equal(
            ERROR_MESSAGE.EMPTY_VALUE
          );
        });
    });

    it("정상 입력 시 모달 노출", () => {
      cy.get(".winning-number")
        .then(($inputs) => {
          $inputs.each((index) => {
            $inputs[index].value = index + 1;
          });
        })
        .first()
        .type("{Enter}")
        .then(() => {
          cy.get("#resultModal").should("not.have.class", "close");
        });
    });
  });

  context("결과창 테스트", () => {
    beforeEach(() => {
      cy.visit("/");

      cy.get("#moneyInput")
        .type("10000{Enter}")
        .then(() => {
          cy.get("#lottoSection").should("not.have.class", "d-none");
        });

      cy.get(".winning-number")
        .then(($inputs) => {
          $inputs.each((index) => {
            $inputs[index].value = index + 1;
          });
        })
        .first()
        .type("{Enter}")
        .then(() => {
          cy.get("#resultModal").should("not.have.class", "close");
        });
    });

    it("모달 종료 테스트", () => {
      cy.get(".modal-close")
        .click()
        .then(() => {
          cy.get("#resultModal").should("have.class", "close");
        });
    });

    it("초기화 테스트", () => {
      cy.get("#resetButton")
        .click()
        .then(() => {
          cy.get("#lottoSection").should("have.class", "d-none");
          cy.get("#winningNumberForm").should("have.class", "d-none");
          cy.get("#resultModal").should("have.class", "close");
        });
    });
  });
});
