import { LOTTO_PRICE, AVAILABLE_PRICE, ERROR_MESSAGES, WINNINGS } from "../../src/js/constants/index.js";
import { computedAmount, getLottoNumberList, hasDuplicateNumber, getTotalReturnRate, toFixedDecimalPoint } from "../../src/js/utils/common.js";

describe("로또 어플리케이션 테스트", () => {
  const mockPrices = [0, 1200, 2000, 5000, +7800, 45300, 999999, -1000, 6595];
  const mock2DManualNumbers = [
    [1, 11, 22, 33, 36, 41]
  ];

  const mockWinningsWithResult = [
    {
      winningNumbers: [1, 11, 22, 30, 20, 42, 45],
      matchedKey: 'NUM3',
      expectReturnRate: 400
    },
    {
      winningNumbers: [1, 11, 22, 33, 30, 20, 42],
      matchedKey: 'NUM4',
      expectReturnRate: 4900
    },
    {
      winningNumbers: [1, 11, 22, 33, 36, 20, 42],
      matchedKey: 'NUM5',
      expectReturnRate: 149900
    },
    {
      winningNumbers: [1, 11, 22, 33, 36, 20, 41],
      matchedKey: 'NUM5_BONUS',
      expectReturnRate: 2999900
    },
    {
      winningNumbers: [1, 11, 22, 33, 36, 41, 42],
      matchedKey: 'NUM6',
      expectReturnRate: 199999900
    }
  ];

  before(() => {
    cy.visit("/");
  });

  context("Step1 - 로또 자동 구매하기", () => {
    mockPrices.forEach(price => {
      const amount = computedAmount(price);
      
      if (price < AVAILABLE_PRICE.MIN || price > AVAILABLE_PRICE.MAX) {
        it(`${price} 원을 입력한 경우 구입 가능한 금액에 포함되지 않아 구매할 수 없다.`, () => {
          cy.get("#InputPurchaseAmount:invalid").should('have.length', 1);
        })
      } else {
        it(`${price} 원을 입력한 경우 총 ${amount}개의 로또를 받아야 한다.`, () => {
          cy.submitPrice("auto", price);
          cy.get("#PurchasedLottoList").should("be.visible");
          cy.getAmountMessage().should("have.text", `총 ${amount}개를 구매하였습니다.`);
          cy.getLottoList().should("have.length", amount);
        })
      }
    })
  })

  context("Step1 - 구입한 로또 번호 확인하기", () => {
    it(`로또는 1장당 6개의 번호를 가지며 1부터 45의 중복되지 않는 숫자들을 포함해야 한다.`, () => {
      cy.getLottoList().each(($el) => {
        const arr = $el.find(".lotto-detail").text().split(', ');

        expect(arr.length).to.equal(6);
        expect(hasDuplicateNumber(arr)).to.be.false;
        for (const i of arr) {
          expect(Number(i)).to.be.within(1, 45);
        }
      })
    })
  })

  context("Step2 - 당첨 결과를 통계 모달로 확인하기", () => {
    it(`당첨 번호를 입력 후 당첨 통계 모달을 볼 수 있다.`, () => {
      cy.inputWinningNumber(getLottoNumberList(7));
      cy.get(".modal").should("be.visible");
    });

    it(`다시 시작하기 버튼을 클릭하면 모달이 사라지고 화면이 초기화된다.`, () => {
      cy.get(".btn-restart").click();
      cy.get(".modal").should("not.be.visible");
    })
  });

  context("Step3 - 로또 수동 구매하기", () => {
    it(`구매 방법을 수동으로 선택하고 금액을 입력하면 수동 입력 폼 화면이 보여야 한다.`, () => {
      cy.submitPrice("manual", LOTTO_PRICE);
      cy.get("#ManualLottoForm").should("be.visible");
    });

    it(`수동 로또 번호를 입력하면 구입한 로또 번호를 확인할 수 있어야 한다.`, () => {
      const amount = mock2DManualNumbers.length;
      cy.inputManualNumber({ mock2DManualNumbers });
      
      cy.get("#PurchasedLottoList").should("be.visible");
      cy.getAmountMessage().should("have.text", `총 ${amount}개를 구매하였습니다.`);
      cy.getLottoList().should("have.length", amount);
    });
  });

  context("Step2 - 예상하는 수익률과 일치하는지 테스트하기", () => {
    mockWinningsWithResult.forEach(({ winningNumbers, matchedKey, expectReturnRate }) => {
      it(`로또 ${mock2DManualNumbers.length}장에 일차하는 당첨 번호가 ${WINNINGS[matchedKey].text}이면 기대하는 수익률은 ${toFixedDecimalPoint(expectReturnRate)}%이다.`, () => {
        cy.clearWinningNumber();
        cy.inputWinningNumber(winningNumbers);
        cy.get(".modal").should("be.visible");

        cy.get(".total-winning-result").should("contain", `${expectReturnRate}`);
        cy.wrap(toFixedDecimalPoint(getTotalReturnRate(WINNINGS[matchedKey].price, mock2DManualNumbers.length))).should('equal', toFixedDecimalPoint(expectReturnRate))

        cy.get('.modal-close').click();
      });
    })
  });

  context("Step3 - 로또 수동 구매시 수동으로 기입하지 않은 나머지 열은 일괄 자동 구매로 선택하여 구매할 수 있다.", () => {
    it(`수동 구매로 2000원을 입력 후 1열만 입력하고 나머지 열의 칸들에는 입력하지 않은 상태에서 "나머지 일괄 자동 구매"를 체크 후 구매하기 버튼을 클릭하면 총 2장이 구매된다.`, () => {
      cy.submitPrice("manual", LOTTO_PRICE * 2);
      cy.get("#ManualLottoForm").should("be.visible");

      const amount = 2;
      cy.inputManualNumber({ mock2DManualNumbers, autoSelectRest: true });
      
      cy.get("#PurchasedLottoList").should("be.visible");
      cy.getAmountMessage().should("have.text", `총 ${amount}개를 구매하였습니다.`);
      cy.getLottoList().should("have.length", amount);
    });
  });
})
