const $purchaseInputSelector = '[data-cy="purchase-amount-input"]';
const $purchaseSubmitButtonSelector = '[data-cy="purchase-amount-submit"]';
const $toggleSelector = '[data-cy="lotto-numbers-toggle-button"]';
const $iconSelector = ".lotto-icon";
const $lottoDetail = ".lotto-detail";

describe("행운의 로또 테스트", () => {
  const validateAmountUnit = ({ input, expectedMessage }) => {
    cy.get($purchaseInputSelector).type(input);
    cy.get($purchaseSubmitButtonSelector).click();

    cy.get("input:invalid").should("have.length", 1);
    cy.get($purchaseInputSelector).then(($input) => {
      expect($input[0].validationMessage).to.eq(expectedMessage);
    });
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
                "로또 구입 금액을 1,000원 단위로 입력해 주세요."
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
          const alertStub = cy.stub();
          cy.on("window:alert", alertStub);
          cy.get($purchaseInputSelector)
            .type("1001{enter}")
            .then(() => {
              expect(alertStub.getCall(0)).to.be.calledWith(
                "로또 구입 금액을 1,000원 단위로 입력해 주세요."
              );
            });
        });
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
      cy.get($lottoDetail).should("be.visible");
    });

    it("토글이 비활성화되면 랜덤번호는 가려진다.", () => {
      cy.get($toggleSelector).should("not.be.checked");
      cy.get($lottoDetail).should("not.be.visible");
    });
  });
});
