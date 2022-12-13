import {
  MESSAGE_ABOUT_DUPLICATION_NUMBER,
  MESSAGE_ABOUT_ENTERED_OUTSTANDING_AMOUNT,
  MESSAGE_ABOUT_UNIT_OF_AMOUNT,
  PRICE_BY_RANK,
} from "../../src/js/constants.js";
import {
  calculatorReturnRate,
  getMatchedNumberCounts,
  getTotalSum,
  getWinningStatistics,
} from "../../src/js/utils.js";
import {
  $bonusNumberInputSelector,
  $checkResultButtonSelector,
  $checkWinningNumberAreaSelector,
  $iconSelector,
  $lottoDetailSelector,
  $matchCountSelector,
  $modalCloseButtonSelector,
  $modalSelector,
  $purchasedLottosSelector,
  $purchaseInputSelector,
  $purchaseSubmitButtonSelector,
  $resetLottoButtonSelector,
  $toggleSelector,
  $totalReturnRateSelector,
  $winningNumberInputSelector,
  $createManualLottoButtonSelector,
  $manualNumberInputSelector,
  $manualLottoListItemSelector,
} from "../support/selectors.js";
import {
  BONUS_NUMBER,
  MATCHED_COUNT_BY_RANK,
  NOT_MATCHED_COUNT,
  WINNING_NUMBERS,
} from "../support/constants.js";

describe("행운의 로또 테스트", () => {
  const validateAmountUnit = ({ input, expectedMessage }) => {
    cy.get($purchaseInputSelector).type(input);
    cy.get($purchaseSubmitButtonSelector).click();

    cy.get($purchaseInputSelector).then(($input) => {
      expect($input[0].validationMessage).to.eq(expectedMessage);
    });
  };

  const validateNumber = ({
    $selector,
    $submitButton,
    value,
    expectedMessage,
  }) => {
    cy.get($selector).first().type(value);
    cy.get($submitButton).click();

    cy.get($selector).then(($input) => {
      expect($input[0].validationMessage).to.eq(expectedMessage);
    });
  };

  const setWinningNumberAndBonusNumber = () => {
    cy.get($winningNumberInputSelector).each(($number, index) =>
      cy.get($number).type(`${WINNING_NUMBERS[index]}`)
    );
    cy.get($bonusNumberInputSelector).type(BONUS_NUMBER);
  };

  beforeEach(() => {
    cy.visit("/");
  });

  describe("로또 구입 금액을 입력한다.", () => {
    it("입력할 input 태그가 있다.", () => {
      cy.get($purchaseInputSelector).should("exist");
    });

    it("로또 구입 금액을 입력하면 input에 입력한 금액이 유지되어야한다.", () => {
      cy.get($purchaseInputSelector).type(1000);
      cy.get($purchaseInputSelector).should("have.value", 1000);
    });

    describe("금액은 숫자만 입력할 수 있다.", () => {
      it("문자를 입력할 수 없다.", () => {
        cy.get($purchaseInputSelector).type("hello");
        cy.get($purchaseInputSelector).should("have.value", "");
      });

      it("특수 문자를 입력할 수 없다.", () => {
        cy.get($purchaseInputSelector).type("!#@!#@!#!@");
        cy.get($purchaseInputSelector).should("have.value", "");
      });
    });
  });

  describe("금액에 해당하는 로또를 발급해야 한다.", () => {
    it("클릭할 확인 버튼이 있다.", () => {
      cy.get($purchaseInputSelector).should("exist");
    });

    describe("금액을 입력하고 확인 버튼을 누르면 발급이 된다.", () => {
      it("금액은 100,000원을 넘을 수 없다.", () => {
        validateAmountUnit({
          input: "10000000",
          expectedMessage: "값은 100000 이하여야 합니다.",
        });
      });

      describe("1,000원 단위로만 구매가 가능하며 입력이 되지 않았을 경우 alert를 띄워준다.", () => {
        it("999원", () => {
          validateAmountUnit({
            input: "999",
            expectedMessage: "값은 1000 이상이어야 합니다.",
          });
        });

        it("1001원", () => {
          const alertStub = cy.stub();

          cy.on("window:alert", alertStub);

          cy.get($purchaseInputSelector).type("1001");
          cy.get($purchaseSubmitButtonSelector)
            .click()
            .then(() => {
              expect(alertStub.getCall(0)).to.be.calledWith(
                MESSAGE_ABOUT_UNIT_OF_AMOUNT
              );
            });
        });

        it("-1,500원", () => {
          validateAmountUnit({
            input: "-1500",
            expectedMessage: "값은 1000 이상이어야 합니다.",
          });
        });

        it("0원", () => {
          validateAmountUnit({
            input: "0",
            expectedMessage: "값은 1000 이상이어야 합니다.",
          });
        });
      });

      describe("금액을 입력하고 엔터키를 눌러서도 submit이 된다.", () => {
        it("올바른 값을 입력했을 경우 alert가 뜨지 않는다.", () => {
          const alertStub = cy.stub();
          cy.on("window:alert", alertStub);
          cy.get($purchaseInputSelector)
            .type("1000{enter}")
            .then(() => {
              expect(alertStub).to.be.not.called;
            });
        });

        it("잘못된 값을 입력했을 경우 alert가 노출된다.", () => {
          cy.alert({
            action: () => cy.get($purchaseInputSelector).type("1001{enter}"),
            message: MESSAGE_ABOUT_UNIT_OF_AMOUNT,
          });
        });
      });
    });
  });

  describe("소비자는 수동 구매를 할 수 있어야 한다.", () => {
    it("수동 입력 추가하기 버튼이 존재한다.", () => {
      cy.get($createManualLottoButtonSelector).should("exist");
    });

    describe("수동 입력 추가하기 버튼을 클릭하면 수동으로 입력할 수 있는 게임이 생성된다", () => {
      beforeEach(() => {
        cy.get($createManualLottoButtonSelector).click();
      });

      it("게임당 6개의 번호를 수동으로 입력할 수 있는 Input이 나타난다.", () => {
        cy.get($manualNumberInputSelector).should("have.length", 6);
      });

      it("수동 입력 추가하기 버튼을 클릭하면 수동으로 로또를 입력할 수 있는 Input이 추가로 렌더링된다", () => {
        cy.get($createManualLottoButtonSelector).click();
        cy.get($manualNumberInputSelector).should("have.length", 12);
      });

      describe("수동 번호는 1부터 45까지 입력이 가능하다.", () => {
        it("수동 번호는 1부터 입력이 가능하다.", () => {
          validateNumber({
            $selector: $manualNumberInputSelector,
            $submitButton: $purchaseSubmitButtonSelector,
            value: "0",
            expectedMessage: "값은 1 이상이어야 합니다.",
          });
        });

        it("수동 번호는 45까지 입력이 가능하다.", () => {
          validateNumber({
            $selector: $manualNumberInputSelector,
            $submitButton: $purchaseSubmitButtonSelector,
            value: "46",
            expectedMessage: "값은 45 이하여야 합니다.",
          });
        });
      });

      it("수동 번호 중 중복된 번호가 존재한다면 alert를 보여준다.", () => {
        cy.get($manualNumberInputSelector).each(($number) =>
          cy.get($number).type("1")
        );

        cy.get($purchaseInputSelector)
          .type("1000{enter}")
          .then(() => {
            cy.alert({
              action: () => cy.get($purchaseSubmitButtonSelector).click(),
              message: MESSAGE_ABOUT_DUPLICATION_NUMBER,
            });
          });
      });
    });

    it("구입 금액은 수동으로 입력된 로또의 갯수(게임당 1000원)보다 작으면 alert가 노출된다.", () => {
      cy.get($createManualLottoButtonSelector)
        .click()
        .click()
        .then(() => {
          cy.get($manualNumberInputSelector).each(($number, index) =>
            cy.get($number).type(index + 1)
          );
        });

      cy.get($purchaseInputSelector)
        .type("1000{enter}")
        .then(() => {
          cy.alert({
            action: () => cy.get($purchaseSubmitButtonSelector).click(),
            message: MESSAGE_ABOUT_ENTERED_OUTSTANDING_AMOUNT,
          });
        });
    });

    it("구입 금액이 수동으로 입력된 로또의 갯수(게임당 1000원)보다 많으면 나머지 금액은 자동으로 구매할 수 있어야한다.", () => {
      cy.get($createManualLottoButtonSelector)
        .click()
        .then(() => {
          cy.get($manualNumberInputSelector).each(($number, index) =>
            cy.get($number).type(index + 1)
          );
        });

      cy.get($purchaseInputSelector)
        .type("5000{enter}")
        .then(() => {
          cy.get($lottoDetailSelector).should("have.length", 5);
        });
    });
  });

  describe("소비자는 자동 구매를 할 수 있어야 한다.", () => {
    beforeEach(() => {
      cy.get($purchaseInputSelector).type("5000{enter}");
    });

    it("구매하였을때, 총 ~개를 구매하였습니다라는 텍스트가 노출된다.", () => {
      cy.get(".purchased-count").contains("5");
    });

    it("화면에 보여지는 로또 아이콘 개수가 구매한 복권의 수와 같아야 한다.", () => {
      cy.get(".purchased-count").contains("5");
      cy.get($iconSelector).should("have.length", 5);
    });
  });

  describe("복권 번호는 번호보기 토글 버튼을 클릭하면, 볼 수 있어야 한다.", () => {
    beforeEach(() => {
      cy.get($purchaseInputSelector).type("3000");
      cy.get($purchaseSubmitButtonSelector).click();
    });

    it("로또 발급 후에는 번호보기 토글 버튼이 존재한다", () => {
      cy.get($toggleSelector).should("exist");
    });

    it("토글이 활성화되면 랜덤번호가 보여진다.", () => {
      cy.contains("번호보기").click();
      cy.get($toggleSelector).should("be.checked");
      cy.get($lottoDetailSelector).should("be.visible");
    });

    it("토글이 비활성화되면 랜덤번호는 가려진다.", () => {
      cy.get($toggleSelector).should("not.be.checked");
      cy.get($lottoDetailSelector).should("not.be.visible");
    });
  });

  describe("결과 확인하기 버튼을 누르면 당첨 통계, 수익률을 모달로 확인할 수 있다.", () => {
    beforeEach(() => {
      cy.get($purchaseInputSelector).type("100000{enter}");
    });

    it("당첨 번호 및 보너스 번호를 입력할 수 있는 Input이 존재한다.", () => {
      cy.get($winningNumberInputSelector).should("have.length", 6);
      cy.get($bonusNumberInputSelector).should("have.length", 1);
    });

    it("결과 확인하기 버튼이 존재한다.", () => {
      cy.get($checkResultButtonSelector).should("exist");
    });

    it("결과를 확인하기 위해서는 당첨 번호 또는 보너스 번호가 입력되어 있지 않다면 비어있는 인풋에 포커스를 잡아준다.", () => {
      cy.get($winningNumberInputSelector).each(($number, index) => {
        if (index > 3) return;
        cy.get($number).type("1");
      });

      cy.get($checkResultButtonSelector)
        .click()
        .then(() => {
          cy.get($winningNumberInputSelector).should(($input) => {
            const isFocused = Cypress.dom.isFocused($input[4]);
            expect(isFocused).eq(true);
          });
        });
    });

    describe("당첨 번호 또는 보너스 번호는 1부터 45까지 입력이 가능하다.", () => {
      it("당첨 번호 또는 보너스 번호는 1부터 입력이 가능하다.", () => {
        validateNumber({
          $selector: $winningNumberInputSelector,
          $submitButton: $checkResultButtonSelector,
          value: "0",
          expectedMessage: "값은 1 이상이어야 합니다.",
        });
      });

      it("당첨 번호 또는 보너스 번호는 45까지 입력이 가능하다.", () => {
        validateNumber({
          $selector: $winningNumberInputSelector,
          $submitButton: $checkResultButtonSelector,
          value: "46",
          expectedMessage: "값은 45 이하여야 합니다.",
        });
      });
    });

    it("당첨 번호와 보너스 번호 중 중복된 번호가 존재한다면 alert를 보여준다.", () => {
      cy.get($winningNumberInputSelector).each(($number) =>
        cy.get($number).type("1")
      );
      cy.get($bonusNumberInputSelector).type("1");

      cy.alert({
        action: () => cy.get($checkResultButtonSelector).click(),
        message: MESSAGE_ABOUT_DUPLICATION_NUMBER,
      });
    });

    describe("결과 확인 버튼을 클릭하면 수익률을 확인할 수 있다.", () => {
      beforeEach(() => {
        setWinningNumberAndBonusNumber();
      });

      it("수익률을 확인할 수 있는 모달이 노출된다.", () => {
        cy.get($checkResultButtonSelector)
          .click()
          .then(() => {
            cy.get($modalSelector).should("have.class", "open");
          });
      });

      it("당첨 갯수를 확인할 수 있다", () => {
        const lottos = [];
        const viewedMatchedCountsByRanks = {};
        let statistics = {};

        cy.get($checkResultButtonSelector)
          .click()
          .then(() => {
            cy.get($lottoDetailSelector)
              .each(($detail) => {
                lottos.push($detail.text().split(",").map(Number));
              })
              .then(() => {
                const mocking = getMatchedNumberCounts(
                  lottos,
                  WINNING_NUMBERS,
                  Number(BONUS_NUMBER)
                );
                statistics = getWinningStatistics(mocking);
              });

            cy.get($modalSelector).should("have.class", "open");

            cy.get($matchCountSelector)
              .each(($count) => {
                const rank = $count.removeClass("match-count").attr("class");
                expect($count).to.have.not.text("");
                if ($count.text() === NOT_MATCHED_COUNT) return;
                viewedMatchedCountsByRanks[MATCHED_COUNT_BY_RANK[rank]] =
                  Number($count.text());
              })
              .then(() => {
                expect(JSON.stringify(viewedMatchedCountsByRanks)).to.equal(
                  JSON.stringify(statistics)
                );
              });
          });
      });

      it("수익률을 확인할 수 있다", () => {
        const lottos = [];
        let statistics = {};
        let totalReturnRate = 0;
        cy.get($checkResultButtonSelector)
          .click()
          .then(() => {
            cy.get($modalSelector).should("have.class", "open");
            cy.get($totalReturnRateSelector).should("not.have.text", "");
          });

        cy.get($lottoDetailSelector)
          .each(($detail) => {
            lottos.push($detail.text().split(",").map(Number));
          })
          .then(() => {
            const mocking = getMatchedNumberCounts(
              lottos,
              WINNING_NUMBERS,
              Number(BONUS_NUMBER)
            );
            statistics = getWinningStatistics(mocking);
            const convertedMatchCountsToArray = Object.entries(statistics);
            const calculatedAmountByRank = convertedMatchCountsToArray.map(
              ([key, value]) => PRICE_BY_RANK[key] * value
            );

            const totalPrizeMoney = getTotalSum(calculatedAmountByRank);

            cy.get($purchaseInputSelector).should(($input) => {
              const purchasePrice = $input.val();
              totalReturnRate = calculatorReturnRate(
                totalPrizeMoney,
                Number(purchasePrice)
              );
            });

            cy.get($totalReturnRateSelector).should(($totalReturnRate) => {
              const viewedTotalReturnRate = Number($totalReturnRate.text());
              expect(viewedTotalReturnRate).to.equal(totalReturnRate);
            });
          });
      });
    });

    describe("결과 확인 모달을 닫을 수 있다.", () => {
      beforeEach(() => {
        setWinningNumberAndBonusNumber();
        cy.get($checkResultButtonSelector).click();
      });

      it("결과 확인 모달의 외부를 클릭했을때 모달은 사라진다.", () => {
        cy.get($modalCloseButtonSelector)
          .click()
          .then(() => {
            cy.get($modalSelector).should("not.have.class", "open");
          });
      });

      it("결과 확인 모달의 X 버튼을 클릭했을때 모달은 사라진다.", () => {
        cy.get($modalCloseButtonSelector)
          .click()
          .then(() => {
            cy.get($modalSelector).should("not.have.class", "open");
          });
      });
    });
  });

  describe("다시 시작하기를 할 수 있다.", () => {
    beforeEach(() => {
      cy.get($purchaseInputSelector).type("5000{enter}");
      setWinningNumberAndBonusNumber();
      cy.get($checkResultButtonSelector).click();
    });

    it("모달에 다시 시작하기 버튼이 존재한다", () => {
      cy.get($resetLottoButtonSelector).should("exist");
    });

    describe("다시 시작하기 버튼 클릭시", () => {
      beforeEach(() => {
        cy.get($resetLottoButtonSelector).click();
      });

      it("입력된 구입 금액은 초기화된다.", () => {
        cy.get($purchaseInputSelector).should("have.value", "");
      });

      it("구매한 로또 내역이 화면에서 사라진다", () => {
        cy.get($purchasedLottosSelector).should("not.have.class", "display");
      });

      it("수동 게임 내역이 화면에서 사라진다", () => {
        cy.get($manualLottoListItemSelector).should("have.length", 0);
      });

      it("당첨번호 조회영역이 화면에서 사라진다", () => {
        cy.get($checkWinningNumberAreaSelector).should(
          "not.have.class",
          "display"
        );
      });
    });
  });
});
