import { LOTTO_PRICE, AVAILABLE_PRICE } from "../../src/js/constants/index.js";
import { computedAmount } from "../../src/js/utils/common.js";

describe("로또 어플리케이션 테스트", () => {
  const mockPrices = [0, 1200, +7800, 5000, 45300, 100000, 999999, -1000, 6595];

  before(() => {
    cy.visit("/");
  });

  context(`Step1 - 로또 자동 구매하기`, () => {
    mockPrices.forEach(price => {
      const amount = computedAmount(price);
      
      if (price < AVAILABLE_PRICE.MIN || price > AVAILABLE_PRICE.MAX) {
        it(`${price} 원을 입력한 경우 구입 가능한 금액에 포함되지 않아 구매할 수 없다.`, () => {
          cy.get("#InputPurchaseAmount:invalid").should('have.length', 1);
        })
      } else {
        it(`${price} 원을 입력한 경우 총 ${amount}개의 로또를 받아야 한다.`, () => {
          cy.submitPrice(price);
          cy.getAmountMessage().should("have.text", `총 ${amount}개를 구매하였습니다.`);
          cy.getLottoList().should("have.length", amount);
        })
      }
    })
  })

  context("Step1 - 구입한 로또 번호 확인하기", () => {
    it(`로또는 1장당 6개의 번호를 가지며 1부터 45의 숫자 범위에 포함되어야 한다.`, () => {
      cy.getLottoList().each(($el) => {
        const arr = $el.find(".lotto-detail").text().split(', ');
        expect(arr.length).to.equal(6);
        
        for (const i of arr) {
          expect(Number(i)).to.be.within(1, 45);
        }
      })
    })
  })

  context("Step2 당첨 결과 기능", () => {
    
  })
})