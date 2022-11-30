const buttonSelector = ".open-result-modal-button";
const inputSelector = ".winning-number";
const modalSelector = ".modal";
const bonusInputSelector = ".bonus-number";
const resetButtonSelector = ".btn-cyan";
const spanSelector = `.lotto-amount`;

describe("당첨 결과기능 테스트", () => {
  beforeEach(() => {
    cy.visit("../../index.html");
    cy.purchaseLotto(5000);
  });

  context("번호 입력하기 테스트", () => {
    it("로또 번호를 입력할 수 있다.", () => {
      cy.get(inputSelector).each((input) => {
        cy.wrap(input).type(1).should("have.value", 1);
      });
    });
    it("보너스 번호를 입력할 수 있다.", () => {
      cy.get(bonusInputSelector).each((input) => {
        cy.wrap(input).type(2).should("have.value", 2);
      });
    });
    it("1, 2, 3, 4, 5, 6 / 보너스 7 => 가능", () => {
      cy.get(inputSelector).each((input, idx) => {
        cy.wrap(input).type(idx + 1);
      });
      cy.get(bonusInputSelector).type(7);
      cy.get(buttonSelector).click();
      cy.get(modalSelector).should("have.class", "open");
    });
  });

  context("다시하기 테스트", () => {
    it("다시하기 버튼을 누르면 초기화 된다.", () => {
      cy.get(resetButtonSelector).click();
      cy.get(spanSelector).should("have.value", 0);
    });
  });
});
