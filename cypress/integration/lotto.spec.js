// * 요구사항
// * 로또 구입 금액을 입력하면, 금액에 해당하는 로또를 발급해야 한다.
// * 로또 1장의 가격은 1,000원이다.
// * 소비자는 자동 구매를 할 수 있어야 한다.
// * 복권 번호는 번호보기 토글 버튼을 클릭하면, 볼 수 있어야 한다.

describe("로또 앱 테스트", () => {
  beforeEach(() => {
    cy.visit("http://192.168.0.10:5500/index.html");
  });

  it("1. 로또 1장의 가격은 1,000원이다.", () => {
    // * 1,000원 단위가 아니라면 : 구매 결과 UI가 보이지 않아야한다.
    cy.get("#purchasePrice").type(900);
    cy.get("#purchaseButton").click();
    cy.get("#purchaseResult").should("not.be.visible");
    cy.get("#confirmWinningNumbers").should("not.be.visible");
  });

  it("2. 로또 구입 금액을 입력하면, 금액에 해당하는 로또를 발급해야 한다.", () => {
    // * 3,000 을 입력했을 경우 : 3장 발급해야 한다.
    cy.get("#purchasePrice").type(3000);
    cy.get("#purchaseButton").click();

    // * 로또 구매 갯수는 3개라고 표시해야 한다.
    cy.get("#purchasedLottoCount").should("have.text", "3");

    // * 로또는 3개 생성되어야 한다.
    cy.get("li.lotto-item").should("have.length", 3);
  });

  it("3. 복권 번호는 번호보기 토글 버튼을 클릭하면, 볼 수 있어야 한다.", () => {
    // * 우선 금액을 입력해서 로또를 발급해야 한다.
    cy.get("#purchasePrice").type(5000);
    cy.get("#purchaseButton").click();

    // * 번호보기 토글을 아직 클릭하지 않은 상태이고, 로또 번호가 보이면 안된다.
    cy.get(".lotto-numbers-toggle-button").should("not.be.checked");
    cy.get("span.lotto-numbers").should("not.be.visible");

    // * 번호보기 토글을 체크하면 로또 번호를 표시해야 한다.
    cy.get(".lotto-numbers-toggle-button").click({ force: true });
    cy.get("span.lotto-numbers").should("be.visible");

    // * 번호보기 토글을 한 번 더 체크하면 로또 번호를 숨겨야 한다.
    cy.get(".lotto-numbers-toggle-button").click({ force: true });
    cy.get("span.lotto-numbers").should("not.be.visible");
  });
});
