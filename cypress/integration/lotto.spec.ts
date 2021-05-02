/// <reference types="cypress" />

import {
  Id,
  ClassName,
  AlertMsg,
  LottoConfig,
} from "../../src/ts/common/constants";
import { $, $$, class2Query, id2Query } from "../../src/ts/common/dom";

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

  describe("Input Lotto", () => {
    const purchasedCnt = 5;

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

  describe("Purchase Info", () => {});

  describe("Result Popup", () => {});
});
