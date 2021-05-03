/// <reference types="cypress" />

import {
  Id,
  ClassName,
  AlertMsg,
  LottoConfig,
} from "../../src/ts/common/constants";
import { class2Query, id2Query } from "../../src/ts/common/dom";

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

  const purchasedCnt = 5;

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

  const validateLottoInput = (invalidInputCnt: number) => {
    cy.get(id2Query(Id.inputLotto))
      .find("input:invalid")
      .should("have.length", invalidInputCnt);
  };

  describe("Input Cost", () => {
    it("should fail if cost is lower than Price", () => {
      typeCost(LottoConfig.PRICE - 1);
      clickCostBtn().then(() => {
        cy.get(id2Query(Id.purchaseInfo)).should("not.be.visible");
        cy.get(id2Query(Id.inputLotto)).should("not.be.visible");
      });
    });
    it("should fail if cost is not a multiple of Price", () => {
      typeCost(LottoConfig.PRICE + 1);
      clickCostBtn().then(() => {
        cy.get(id2Query(Id.purchaseInfo)).should("not.be.visible");
        cy.get(id2Query(Id.inputLotto)).should("not.be.visible");
        expect(alertStub).to.be.calledWith(AlertMsg.InvalidCost);
      });
    });
    it("should input cost", () => {
      typeCost(LottoConfig.PRICE * 5);
      clickCostBtn().then(() => {
        cy.get(id2Query(Id.purchaseInfo)).should("be.visible");
        cy.get(id2Query(Id.inputLotto)).should("be.visible");
      });
    });
  });

  describe("Purchase Info", () => {
    beforeEach(() => {
      typeCost(LottoConfig.PRICE * purchasedCnt);
      clickCostBtn();
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

    it("should not be visible lotto detail when toggle on", () => {
      cy.get(class2Query(ClassName.switch)).click();
      cy.get(class2Query(ClassName.lottoDetail)).should(
        "have.not.class",
        ClassName.displayNone
      );
    });
  });

  describe("Input Lotto", () => {
    beforeEach(() => {
      typeCost(LottoConfig.PRICE * purchasedCnt);
      clickCostBtn();
    });

    it("should fail if a lotto number is smaller than 1", () => {
      validateLottoInput(7);
      inputLottoNumbers([0]);
      validateLottoInput(7);
    });

    it("should fail if a lotto number is bigger than 45", () => {
      validateLottoInput(7);
      inputLottoNumbers([46]);
      validateLottoInput(7);
    });

    it("should fail if lotto numbers have duplication ", () => {
      validateLottoInput(7);
      inputLottoNumbers([1, 2, 3, 4, 5, 6], 6);
      validateLottoInput(0);
      cy.get(id2Query(Id.inputLotto))
        .find(class2Query(ClassName.btn))
        .click()
        .then(() =>
          expect(alertStub).to.be.calledWith(AlertMsg.DuplicateNumber)
        );
    });

    it("should input lotto numbers", () => {
      validateLottoInput(7);
      inputLottoNumbers([1, 2, 3, 4, 5, 6], 7);
      validateLottoInput(0);
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
    });

    it("should show Purchase Info", () => {
      inputLottoNumbers([1, 2, 3, 4, 5, 6], 7);
      cy.get(id2Query(Id.resultPopup)).should("not.be.visible");
      cy.get(id2Query(Id.inputLotto)).find(class2Query(ClassName.btn)).click();
      cy.get(id2Query(Id.resultPopup)).should("be.visible");
    });
  });
});
