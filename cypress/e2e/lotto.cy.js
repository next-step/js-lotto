import {
  inputSelector,
  ulSelector,
  buttonSelector,
  spanSelector,
  formSelector,
  liSelector,
} from "../../src/js/constants/selectors";

describe("로또 구매 1단계 테스트", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  context(
    "로또 구입 금액을 입력하면, 금액에 해당하는 로또를 발급해야 한다.",
    () => {
      it("구입 금액 입력창이 화면에 보인다.", () => {
        cy.get(inputSelector.LOTTO_PURCHASE_FORM_INPUT).should("be.visible");
      });

      it("구입 금액 입력창에 숫자를 입력할 수 있다.", () => {
        cy.get(inputSelector.LOTTO_PURCHASE_FORM_INPUT)
          .type(1000)
          .should("have.value", 1000);
      });

      it("구입 금액 입력창에 아무것도 입력하지 않고 확인 버튼을 누르면 로또가 발급되지 않는다.", () => {
        cy.get(formSelector.LOTTO_PURCHASE_FORM)
          .submit()
          .then(() => {
            cy.get(spanSelector.PURCHASED_LOTTO_COUNT_TEXT).should(
              "have.text",
              "0"
            );
          });
      });

      it("구입 금액 입력창에 1000을 입력하고 확인 버튼을 누르면 로또가 1장 발급된다.", () => {
        cy.get(inputSelector.LOTTO_PURCHASE_FORM_INPUT).type(1000);
        cy.get(formSelector.LOTTO_PURCHASE_FORM)
          .submit()
          .then(() => {
            cy.get(spanSelector.PURCHASED_LOTTO_COUNT_TEXT).should(
              "have.text",
              "1"
            );
          });
      });

      it("구입 금액 입력창에 30000을 입력하고 확인 버튼을 누르면 로또가 30장 발급된다.", () => {
        cy.get(inputSelector.LOTTO_PURCHASE_FORM_INPUT).type(30000);
        cy.get(formSelector.LOTTO_PURCHASE_FORM)
          .submit()
          .then(() => {
            cy.get(spanSelector.PURCHASED_LOTTO_COUNT_TEXT).should(
              "have.text",
              "30"
            );
          });
      });
    }
  );

  context("소비자는 자동 구매를 할 수 있어야 한다.", () => {
    it("구매한 로또에 자동 생성된 로또 번호가 적혀있다.", () => {
      const MIN_LOTTO_DETAIL_LENGTH = 11;
      cy.get(inputSelector.LOTTO_PURCHASE_FORM_INPUT).type(1000);
      cy.get(formSelector.LOTTO_PURCHASE_FORM)
        .submit()
        .then(() => {
          cy.get(liSelector.LOTTO_TICKET);
          cy.get(spanSelector.LOTTO_NUMBERS_DETAIL)
            .invoke("text")
            .then((text) => {
              expect(text.length).to.be.at.least(MIN_LOTTO_DETAIL_LENGTH);
            });
        });
    });
  });

  context(
    "로또 번호는 번호보기 토글 버튼을 클릭하면, 볼 수 있어야 한다.",
    () => {
      it("로또를 구매한 직후에는 로또 번호를 볼 수 없다.", () => {
        cy.get(inputSelector.LOTTO_PURCHASE_FORM_INPUT).type(3000);
        cy.get(formSelector.LOTTO_PURCHASE_FORM)
          .submit()
          .then(() => {
            cy.get(spanSelector.LOTTO_NUMBERS_DETAIL).should("not.be.visible");
          });
      });

      it("번호보기 토글 버튼을 클릭할 수 있다.", () => {
        cy.get(buttonSelector.LOTTO_NUMBERS_DETAIL_TOGGLE).click();
      });

      it("로또를 구매한 뒤 번호보기 토글 버튼을 클릭하면 로또 번호가 보인다.", () => {
        cy.get(inputSelector.LOTTO_PURCHASE_FORM_INPUT).type(3000);
        cy.get(formSelector.LOTTO_PURCHASE_FORM)
          .submit()
          .then(() => {
            cy.get(buttonSelector.LOTTO_NUMBERS_DETAIL_TOGGLE).click();
            cy.get(spanSelector.LOTTO_NUMBERS_DETAIL).should("be.visible");
          });
      });
    }
  );
});
