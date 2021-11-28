/// <reference types="cypress" />

import {
  Id,
  ClassName,
  AlertMsg,
  LottoConfig,
} from "../../src/ts/common/constants";
import { class2Query, id2Query } from "../../src/ts/common/dom";
import { WinningLotto } from "../../src/ts/common/interfaces";
import { calcReward, calcROI } from "../../src/ts/common/utils";

context("lotto", () => {
  let alertStub;
  beforeEach(() => {
    alertStub = cy.stub();
    cy.on("window:alert", alertStub);
    cy.visit(Cypress.config().baseUrl);
  });

  const typeCost = (cost: number) => {
    return cy
      .get(id2Query(Id.inputCost))
      .find(class2Query(ClassName.input))
      .type(`${cost}`);
  };

  const clickCostBtn = () => {
    return cy
      .get(id2Query(Id.inputCost))
      .find(class2Query(ClassName.btn))
      .click();
  };

  const clickAutoSelectBtn = () => {
    return cy
      .get(id2Query(Id.inputManualLotto))
      .find(class2Query(ClassName.autoSelectBtn))
      .click();
  };

  const purchasedCnt = 50;

  const validateInput = (id: string, invalidInputCnt: number) => {
    cy.get(id2Query(id))
      .find("input:invalid")
      .should("have.length", invalidInputCnt);
  };

  const testWinningLotto: WinningLotto = {
    numbers: [1, 2, 3, 4, 5, 6],
    bonus: 7,
  };

  describe("Input Cost", () => {
    it("should fail if cost is lower than Price", () => {
      typeCost(LottoConfig.PRICE - 1);
      clickCostBtn().then(() => {
        cy.get(id2Query(Id.inputManualLotto)).should("not.be.visible");
      });
    });
    it("should fail if cost is not a multiple of Price", () => {
      typeCost(LottoConfig.PRICE + 1);
      clickCostBtn().then(() => {
        cy.get(id2Query(Id.inputManualLotto)).should("not.be.visible");
        expect(alertStub).to.be.calledWith(AlertMsg.InvalidCost);
      });
    });
    it("should input cost", () => {
      typeCost(LottoConfig.PRICE * 5);
      clickCostBtn().then(() =>
        cy.get(id2Query(Id.inputManualLotto)).should("be.visible")
      );
    });
  });

  describe("Input Manual Lotto", () => {
    const inputManualLottoNumbers = (numbers: number[]) => {
      cy.get(id2Query(Id.inputManualLotto))
        .find(class2Query(ClassName.manualNumber))
        .each(($input, i) => {
          if (i < numbers.length) {
            cy.wrap($input).type(`${numbers[i]}`);
          }
        });
    };

    beforeEach(() => {
      typeCost(LottoConfig.PRICE * 1);
      clickCostBtn();
    });

    it("should fail if a manual number is smaller than 1", () => {
      validateInput(Id.inputManualLotto, 6);
      inputManualLottoNumbers([0]);
      validateInput(Id.inputManualLotto, 6);
    });

    it("should fail if a manual number is bigger than 45", () => {
      validateInput(Id.inputManualLotto, 6);
      inputManualLottoNumbers([46]);
      validateInput(Id.inputManualLotto, 6);
    });

    it("should fail if manual numbers have duplication ", () => {
      validateInput(Id.inputManualLotto, 6);
      inputManualLottoNumbers([1, 2, 3, 4, 5, 5]);
      validateInput(Id.inputManualLotto, 0);
      cy.get(id2Query(Id.inputManualLotto))
        .find(class2Query(ClassName.manualSelectBtn))
        .click()
        .then(() =>
          expect(alertStub).to.be.calledWith(AlertMsg.DuplicateNumber)
        );
    });

    it("should input manual lotto", () => {
      validateInput(Id.inputManualLotto, 6);
      inputManualLottoNumbers([1, 2, 3, 4, 5, 6]);
      validateInput(Id.inputManualLotto, 0);
      cy.get(id2Query(Id.inputManualLotto))
        .find(class2Query(ClassName.manualSelectBtn))
        .click()
        .then(() => expect(alertStub).have.not.been.called);
    });

    it("should be able to check manual lotto number", () => {
      const manualLottoNumbers = [1, 2, 3, 4, 5, 6];
      inputManualLottoNumbers(manualLottoNumbers);
      cy.get(id2Query(Id.inputManualLotto))
        .find(class2Query(ClassName.manualSelectBtn))
        .click();
      cy.get(class2Query(ClassName.switch)).click();
      cy.get(class2Query(ClassName.lottoDetail)).should(
        "include.text",
        manualLottoNumbers.join(", ")
      );
    });
  });

  describe("Purchase Info", () => {
    beforeEach(() => {
      typeCost(LottoConfig.PRICE * purchasedCnt);
      clickCostBtn().then(() =>
        cy.get(id2Query(Id.inputManualLotto)).should("be.visible")
      );
      clickAutoSelectBtn();
    });

    it("should be visible purchased lottos", () => {
      cy.get(class2Query(ClassName.lottoItem)).should(
        "have.length",
        purchasedCnt
      );
    });

    it("should not be visible lotto detail when toggle off", () => {
      cy.get(class2Query(ClassName.lottoDetail)).should(
        "have.class",
        ClassName.displayNone
      );
    });

    it("should be visible lotto detail when toggle on", () => {
      cy.get(class2Query(ClassName.switch)).click();
      cy.get(class2Query(ClassName.lottoDetail)).should(
        "have.not.class",
        ClassName.displayNone
      );
    });
  });

  const inputLottoNumbers = (winningNumbers: number[], bonus?: number) => {
    cy.get(id2Query(Id.inputLotto))
      .find(class2Query(ClassName.winningNumber))
      .each(($input, i) => {
        if (i < winningNumbers.length) {
          cy.wrap($input).type(`${winningNumbers[i]}`);
        }
      });
    if (typeof bonus === "number") {
      cy.get(class2Query(ClassName.bonusNumber)).type(`${bonus}`);
    }
  };

  describe("Input Lotto", () => {
    beforeEach(() => {
      typeCost(LottoConfig.PRICE * purchasedCnt);
      clickCostBtn();
      clickAutoSelectBtn();
    });

    it("should fail if a lotto number is smaller than 1", () => {
      validateInput(Id.inputLotto, 7);
      inputLottoNumbers([0]);
      validateInput(Id.inputLotto, 7);
    });

    it("should fail if a lotto number is bigger than 45", () => {
      validateInput(Id.inputLotto, 7);
      inputLottoNumbers([46]);
      validateInput(Id.inputLotto, 7);
    });

    it("should fail if lotto numbers have duplication ", () => {
      validateInput(Id.inputLotto, 7);
      inputLottoNumbers([1, 2, 3, 4, 5, 6], 6);
      validateInput(Id.inputLotto, 0);
      cy.get(id2Query(Id.inputLotto))
        .find(class2Query(ClassName.btn))
        .click()
        .then(() =>
          expect(alertStub).to.be.calledWith(AlertMsg.DuplicateNumber)
        );
    });

    it("should input lotto numbers", () => {
      validateInput(Id.inputLotto, 7);
      inputLottoNumbers(testWinningLotto.numbers, testWinningLotto.bonus);
      validateInput(Id.inputLotto, 0);
      cy.get(id2Query(Id.inputLotto))
        .find(class2Query(ClassName.btn))
        .click()
        .then(() => expect(alertStub).have.not.been.called);
    });
  });

  describe("Result Popup", () => {
    beforeEach(() => {
      typeCost(LottoConfig.PRICE * purchasedCnt);
      clickCostBtn();
      clickAutoSelectBtn();
      inputLottoNumbers(testWinningLotto.numbers, testWinningLotto.bonus);
    });

    it("should show Purchase Info", () => {
      cy.get(id2Query(Id.resultPopup)).should("not.be.visible");
      cy.get(id2Query(Id.inputLotto)).find(class2Query(ClassName.btn)).click();
      cy.get(id2Query(Id.resultPopup)).should("be.visible");
    });

    it("should show ROI", () => {
      cy.get(id2Query(Id.inputLotto)).find(class2Query(ClassName.btn)).click();
      let totalReward = 0;
      cy.get(class2Query(ClassName.lottoDetail))
        .each(($lottoDetail) => {
          const numbers = $lottoDetail
            .text()
            .split(",")
            .map((lottoNumber) => +lottoNumber.trim());
          totalReward += calcReward({ numbers }, testWinningLotto);
        })
        .then(() => {
          const roi = calcROI(purchasedCnt * LottoConfig.PRICE, totalReward);
          cy.get(class2Query(ClassName.roi)).then(($roi) =>
            expect(`당신의 총 수익률은 ${roi}%입니다.`, $roi.text().trim())
          );
        });
    });

    it("should reset when restart button is clicked", () => {
      cy.get(id2Query(Id.inputLotto)).find(class2Query(ClassName.btn)).click();
      cy.get(id2Query(Id.resultPopup))
        .find(class2Query(ClassName.restartBtn))
        .click();

      cy.get(id2Query(Id.inputCost)).should("be.visible");
      cy.get(id2Query(Id.inputLotto)).should("not.be.visible");
      cy.get(id2Query(Id.purchaseInfo)).should("not.be.visible");
      cy.get(id2Query(Id.resultPopup)).should("not.be.visible");

      cy.get(id2Query(Id.inputCost))
        .find(class2Query(ClassName.input))
        .then(($inputCost) => {
          expect($inputCost.val(), undefined);
        });
    });
  });
});
