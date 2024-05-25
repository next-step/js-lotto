import Lotto from "../../src/js/domain/Lotto";

const PURCHASE_AMOUNT = 3000;
const PURCHASED_LOTTO_COUNT = 3;

const selectors = {
  purchaseAmountInput: ".purchase-amount-input",
  lottoCount: ".lotto-count",
  lottoList: ".lotto-list",
  lottoListToggleButton: ".lotto-list-toggle-button",
  lottoItem: ".lotto-item",
  lottoNumbers: ".lotto-numbers",
};

describe("구매한 로또 목록 기능 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8080/");

    // 구매 금액 입력
    cy.get(selectors.purchaseAmountInput).type(PURCHASE_AMOUNT);
    cy.get(selectors.purchaseAmountInput).type("{enter}");
  });

  it("로또 목록은 lotto-count 엘리먼트, lottolotto-list 엘리먼트와 토글 버튼으로 이루어져 있다.", () => {
    cy.get(selectors.lottoCount).should("exist");
    cy.get(selectors.lottoList).should("exist");
    cy.get(selectors.lottoListToggleButton).should("exist");
  });

  it("구매한 로또의 갯수만큼 lotto-count 엘리먼트에 숫자가 표시된다.", () => {
    cy.get(selectors.lottoCount).should("have.text", PURCHASED_LOTTO_COUNT);
  });

  it("구매한 로또의 갯수만큼 lotto-item 엘리먼트가 생성된다.", () => {
    cy.get(selectors.lottoItem).should("have.length", PURCHASED_LOTTO_COUNT);
  });

  it("토글버튼이 false일 때 로또 목록은 flex-direction이 row 이다.", () => {
    // 현재 토글버튼이 false인지 확인
    cy.get(selectors.lottoListToggleButton).should("not.be.checked");

    // flex-direction이 row인지 확인
    cy.get(selectors.lottoList).should("not.have.class", "flex-col");
  });

  it("토글버튼이 true일 때 로또 목록은 flex-direction이 column 이다.", () => {
    // 토글버튼을 클릭하여 true로 변경
    cy.get(selectors.lottoListToggleButton).check({ force: true });

    // flex-direction이 column인지 확인
    cy.get(selectors.lottoListToggleButton).should("be.checked");
    cy.get(selectors.lottoList).should("have.class", "flex-col");
  });

  it("토글버튼이 false일 때  로또 숫자가 보이지 않는다.", () => {
    // 현재 토글버튼이 false인지 확인
    cy.get(selectors.lottoListToggleButton).should("not.be.checked");

    // 로또 숫자가 보이지 않는지 확인
    cy.get(selectors.lottoNumbers).should("have.class", "d-none");
  });

  it("토글버튼이 true일 때  로또 숫자가 보인다.", () => {
    // 토글버튼을 클릭하여 true로 변경
    cy.get(selectors.lottoListToggleButton).check({ force: true });

    // 로또 숫자가 보이는지 확인
    cy.get(selectors.lottoNumbers).should("not.have.class", "d-none");
  });

  it("토글버튼이 true 일때 보여지는 로또 숫자는 ',' 로 구분된다,", () => {
    // 토글버튼을 클릭하여 true로 변경
    cy.get(selectors.lottoListToggleButton).check({ force: true });

    // 로또 숫자가 ','로 구분된 숫자인지 확인
    cy.get(selectors.lottoNumbers).each(($lottoNumbers) => {
      const lottoNumbers = $lottoNumbers.text().split(", ");
      expect(lottoNumbers).to.have.length(Lotto.LENGTH_LOTTO_NUMBERS);
    });
  });
});
