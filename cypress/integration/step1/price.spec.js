import {getTestRandomArray} from "../../support/utils";

before(() => {
  cy.visit('index.html');
});

describe('로또 구입 금액을 입력하면, 금액에 해당하는 로또를 발급해야 한다.\n로또 1장의 가격은 1,000원이다.\n소비자는 자동 구매를 할 수 있어야 한다.', () => {

  let lottoPrice = 1000;
  let unitTestCounts = 10;
  describe('-10만원 ~ 0원의 금액은 구매할 수 없다', () => {
    beforeEach(() => {
      cy.reload();
    });

    const prices = getTestRandomArray(-100000, 0, unitTestCounts);
    const count = 0;
    prices.forEach(price => {
      it(String(price), () => {
        cy.inputPrice(price);
        cy.purchase();
        cy.getPurchaseQty().should('have.length', Number.parseInt(count));
      });
    })
  });

  describe('0원 ~ 1000원의 금액은 구매할 수 없다', () => {
    beforeEach(() => {
      cy.reload();
    });

    const prices = getTestRandomArray(0, 1000, unitTestCounts);
    const count = 0;
    prices.forEach(price => {
      it(String(price), () => {
        cy.inputPrice(price);
        cy.purchase();
        cy.getPurchaseQty().should('have.length', Number.parseInt(count));
      });
    })
  });

  describe('1000원 ~ 10만원원의 금액은 금액에 맞춰서 적절한 갯수를 구매해야 한다', () => {
    beforeEach(() => {
      cy.reload();
    });

    const prices = getTestRandomArray(0, 100000, unitTestCounts);
    prices.forEach(price => {
      it(String(price), () => {
        cy.inputPrice(price);
        cy.purchase();
        cy.getPurchaseQty().should('have.length', Number.parseInt(price/1000));
      });
    })
  });

  describe('10만원 이상의 금액은 구매할 수 없다', () => {
    beforeEach(() => {
      cy.reload();
    });

    const prices = getTestRandomArray(100000, 1000000, unitTestCounts);
    const count = 0;
    prices.forEach(price => {
      it(String(price), () => {
        cy.inputPrice(price);
        cy.purchase();
        cy.getPurchaseQty().should('have.length', Number.parseInt(count));
      });
    })
  });
});

