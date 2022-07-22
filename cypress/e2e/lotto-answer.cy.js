import {
  inputSelector,
  buttonSelector,
  spanSelector,
  formSelector,
  liSelector,
  modalSelector,
} from "../../src/js/constants/selectors";

describe("로또 당첨 결과 기능 테스트", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.submitPriceForm(10000);
  });

  context("당첨 번호 작성 테스트", () => {
    it("로또 당첨 번호 입력창이 화면에 보인다.", () => {
      cy.get(formSelector.LOTTO_ANSWER_FORM).should("be.visible");
    });
    it("로또 당첨 번호를 입력할 수 있다.", () => {
      cy.get(inputSelector.LOTTO_ANSWER_NUMBER_INPUT).each((input) => {
        cy.wrap(input).type(1).should("have.value", 1);
      });
    });
    it("보너스 번호를 입력할 수 있다.", () => {
      cy.get(inputSelector.LOTTO_BONUS_NUMBER_INPUT)
        .type(1)
        .should("have.value", 1);
    });
  });

  context("로또 결과 테스트", () => {
    it("결과 확인하기 버튼이 화면에 보인다.", () => {
      cy.get(buttonSelector.LOTTO_RESULT_MODAL_OPEN).should("be.visible");
    });
    it("결과 확인하기 버튼을 누르면 결과 모달이 화면에 보인다.", () => {
      cy.get(inputSelector.LOTTO_ANSWER_NUMBER_INPUT).each((input, idx) => {
        cy.wrap(input)
          .type(idx + 1)
          .should("have.value", idx + 1);
      });
      cy.get(inputSelector.LOTTO_BONUS_NUMBER_INPUT).type(7);
      cy.get(formSelector.LOTTO_ANSWER_FORM)
        .submit()
        .then(() => {
          cy.get(modalSelector.LOTTO_RESULT_MODAL).should("be.visible");
        });
    });
    it("로또 당첨 번호에 중복된 숫자가 입력하고 결과를 보려하면 에러창이 뜬다.", () => {
      const stub = cy.stub();
      cy.on("window:alert", stub);
      cy.get(inputSelector.LOTTO_ANSWER_NUMBER_INPUT).each((input) => {
        cy.wrap(input).type(1).should("have.value", 1);
      });
      cy.get(inputSelector.LOTTO_BONUS_NUMBER_INPUT)
        .type(1)
        .should("have.value", 1);
      cy.get(buttonSelector.LOTTO_RESULT_MODAL_OPEN)
        .click()
        .then(() => {
          expect(stub.getCall(0)).to.be.calledWith(
            "Error: 로또 번호에는 중복된 숫자를 입력할 수 없습니다."
          );
        });
    });
    it("결과 모달에 수익률이 숫자로 표시된다.");
  });

  context("다시 시작하기 테스트", () => {
    it("다시 시작하기 버튼이 결과 모달에 보인다.", () => {});
    it("다시 시작하기 버튼을 누르면 모달이 닫힌다.", () => {});
    it("다시 시작하기 버튼을 누르면 구매한 로또 정보가 초기화된다.", () => {});
  });
});
