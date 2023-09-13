const cypressPurchaseLottoBeforeEach =
  (payment = "3000") =>
  () => {
    cy.visit("http://localhost:9000/");

    cy.get("input.payment").type(payment);
    cy.get("button.purchase").click();

    cy.window().then((win) => {
      cy.stub(win, "alert").as("alertStub");
    });
  };

const getWinningNumberInputByIndex = (index) =>
  cy.get(`input.winning-number[data-index="${index}"]`);

const getBonusNumberInput = () => cy.get("input.bonus-number");

const getOpenResultModalButton = () =>
  cy.get("button.open-result-modal-button");

describe("당첨 번호 및 보너스 번호 설정 테스트", () => {
  beforeEach(cypressPurchaseLottoBeforeEach());

  it("당첨 번호 모두 입력하지 않으면 alert가 발생한다.", () => {
    getWinningNumberInputByIndex(0).type("1");
    getWinningNumberInputByIndex(1).type("2");
    getWinningNumberInputByIndex(2).type("3");
    getWinningNumberInputByIndex(3).type("4");
    getWinningNumberInputByIndex(4).type("5");
    getBonusNumberInput().type("6");

    getOpenResultModalButton().click();

    cy.get("@alertStub")
      .should("have.been.calledOnce")
      .and(
        "have.been.calledWith",
        "당첨 번호의 개수가 규칙과 일치하지 않습니다.",
      );
  });

  it("보너스 번호가 당첨 번호에 포함되면 alert가 발생한다.", () => {
    getWinningNumberInputByIndex(0).type("1");
    getWinningNumberInputByIndex(1).type("2");
    getWinningNumberInputByIndex(2).type("3");
    getWinningNumberInputByIndex(3).type("4");
    getWinningNumberInputByIndex(4).type("5");
    getWinningNumberInputByIndex(5).type("6");
    getBonusNumberInput().type("6");

    getOpenResultModalButton().click();

    cy.get("@alertStub")
      .should("have.been.calledOnce")
      .and("have.been.calledWith", "보너스 번호와 당첨번호가 중복됩니다.");
  });

  it("당첨 번호 중 범위를 벗어나는 번호가 있으면 alert가 발생한다.", () => {
    getWinningNumberInputByIndex(0).type("1");
    getWinningNumberInputByIndex(1).type("2");
    getWinningNumberInputByIndex(2).type("3");
    getWinningNumberInputByIndex(3).type("4");
    getWinningNumberInputByIndex(4).type("5");
    getWinningNumberInputByIndex(5).type("100");
    getBonusNumberInput().type("6");

    getOpenResultModalButton().click();

    cy.get("@alertStub")
      .should("have.been.calledOnce")
      .and("have.been.calledWith", "당첨 번호가 규칙의 범위를 벗어납니다.");
  });

  it("보너스 번호가 범위를 벗어나면 alert가 발생한다.", () => {
    getWinningNumberInputByIndex(0).type("1");
    getWinningNumberInputByIndex(1).type("2");
    getWinningNumberInputByIndex(2).type("3");
    getWinningNumberInputByIndex(3).type("4");
    getWinningNumberInputByIndex(4).type("5");
    getWinningNumberInputByIndex(5).type("6");
    getBonusNumberInput().type("100");

    getOpenResultModalButton().click();

    cy.get("@alertStub")
      .should("have.been.calledOnce")
      .and("have.been.calledWith", "보너스 번호가 규칙의 범위를 벗어납니다.");
  });
});

describe("결과 확인 모달 팝업 테스트", () => {
  beforeEach(() => {
    cypressPurchaseLottoBeforeEach()();

    getWinningNumberInputByIndex(0).type("1");
    getWinningNumberInputByIndex(1).type("2");
    getWinningNumberInputByIndex(2).type("3");
    getWinningNumberInputByIndex(3).type("4");
    getWinningNumberInputByIndex(4).type("5");
    getWinningNumberInputByIndex(5).type("6");
    getBonusNumberInput().type("7");
  });

  it("로또 구매 및 당첨 조건 입력 후 결과 확인 버튼을 클릭하면 모달이 팝업된다.", () => {
    getOpenResultModalButton().click();

    cy.get("div.modal").should("be.visible");
  });

  it("x아이콘을 클릭하면 모달이 닫힌다.", () => {
    getOpenResultModalButton().click();

    cy.get("div.modal-close svg").click();

    cy.get("div.modal").should("not.be.visible");
  });

  it("모달의 다시 시작하기 버튼을 클릭하면 모달이 닫히며 게임이 초기화 된다.", () => {
    getOpenResultModalButton().click();

    cy.get("button.restart").click();

    cy.get("div.modal").should("not.be.visible");

    cy.get("form.prize-info").should("not.be.visible");
    cy.get("input.winning-number").each((input) => {
      cy.wrap(input).should("have.value", "");
    });
    cy.get("input.bonus-number").should("have.value", "");

    cy.get(".purchase-info").should("not.exist");
    cy.get("input.payment").should("have.value", "");
  });

  it("게임을 다시 시작해도 정상적으로 게임이 진행된다.", () => {
    getOpenResultModalButton().click();

    cy.get("button.restart").click();

    cy.get("input.payment").type("2000");
    cy.get("button.purchase").click();

    getWinningNumberInputByIndex(0).type("10");
    getWinningNumberInputByIndex(1).type("12");
    getWinningNumberInputByIndex(2).type("13");
    getWinningNumberInputByIndex(3).type("14");
    getWinningNumberInputByIndex(4).type("25");
    getWinningNumberInputByIndex(5).type("16");
    getBonusNumberInput().type("37");

    getOpenResultModalButton().click();

    cy.get("div.modal").should("be.visible");
  });
});
