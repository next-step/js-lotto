import { Store, initialState } from "../../src/js/store/index.js";

before(() => {
  cy.visit("/");
});

describe("로또 테스트 step 2", () => {
  it("결과 확인하기 버튼을 누르면 모달이 열려 수익률과 당첨 결과를 확인 할 수 있다.", () => {
    //given
    const lottoPrice = 1000;
    const bonusNumber = 7;
    const profit = 2000000;

    //when
    cy.inputPrice(lottoPrice);
    cy.get(".purchased-numbers-wrapper .numbers")
      .first()
      .then((el) => {
        const winningNumbers = el.text().split(",");
        cy.inputWinningNumbers({ winningNumbers, bonusNumber });
        cy.checkResult();
        cy.get(".modal").should("be.visible");
        cy.get("td[data-test='six']").contains("1");
        cy.get("#profit").contains(profit);
    });

    cy.get("#retry-btn").click();
  });

  it("당첨 번호를 입력하지 않고, 결과 확인하기 버튼을 누르면 alert창이 뜬다", () => {
    //given
    const lottoPrice = 1000;

    //when
    cy.inputPrice(lottoPrice);
    cy.checkResult();

    //then
    cy.on("window:alert", (text) => expect(text).to.contains("Please input correct winning numbers and bonus number"));
  });

  it("다시 시작하기 버튼을 누르면 초기화 되서 다시 구매를 시작할 수 있다.", () => {
    //given
    const lottoPrice = 1000;
    const winningNumbers = [1, 2, 3, 4, 5, 6];
    const bonusNumber = 7;

    //when
    cy.inputPrice(lottoPrice);
    cy.inputWinningNumbers({ winningNumbers, bonusNumber });
    cy.checkResult();
    cy.clickRetry();

    //then
    expect(Store.state).to.deep.equal(initialState);
  });
});
