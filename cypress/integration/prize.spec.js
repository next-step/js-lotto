const ELEMENT = Object.freeze({
  WINNING_NUMBER_INPUT: (index) =>
    cy.get(`input.winning-number[data-index="${index}"]`),
  BONUS_NUMBER_INPUT: () => cy.get("input.bonus-number"),
  OPEN_RESULT_MODAL_BUTTON: () => cy.get("button.open-result-modal-button"),
  MODAL: () => cy.get("div.modal"),
  CLOSE_MODAL_ICON: () => cy.get("div.modal-close svg"),
  PAYMENT_INPUT: () => cy.get("input.payment"),
  PURCHASE_BUTTON: () => cy.get("button.purchase"),
  RESTART_BUTTON: () => cy.get("button.restart"),
});

const typeWinningNumbers = (numbers) => {
  numbers.forEach((number) => {
    ELEMENT.WINNING_NUMBER_INPUT(number.index).type(number.value);
  });
};

const cypressPurchaseLottoBeforeEach =
  (payment = "3000") =>
  () => {
    cy.visit("http://localhost:9000/");

    ELEMENT.PAYMENT_INPUT().type(payment);
    ELEMENT.PURCHASE_BUTTON().click();

    cy.window().then((win) => {
      cy.stub(win, "alert").as("alertStub");
    });
  };

describe("당첨 번호 및 보너스 번호 설정 테스트", () => {
  beforeEach(cypressPurchaseLottoBeforeEach());

  it("당첨 번호 모두 입력하지 않으면 alert가 발생한다.", () => {
    typeWinningNumbers([
      { index: 0, value: "1" },
      { index: 1, value: "2" },
      { index: 2, value: "3" },
      { index: 3, value: "4" },
      { index: 4, value: "5" },
    ]);

    ELEMENT.BONUS_NUMBER_INPUT().type("6");

    ELEMENT.OPEN_RESULT_MODAL_BUTTON().click();

    cy.get("@alertStub")
      .should("have.been.calledOnce")
      .and(
        "have.been.calledWith",
        "당첨 번호의 개수가 규칙과 일치하지 않습니다.",
      );
  });

  it("보너스 번호가 당첨 번호에 포함되면 alert가 발생한다.", () => {
    typeWinningNumbers([
      { index: 0, value: "1" },
      { index: 1, value: "2" },
      { index: 2, value: "3" },
      { index: 3, value: "4" },
      { index: 4, value: "5" },
      { index: 5, value: "6" },
    ]);
    ELEMENT.BONUS_NUMBER_INPUT().type("6");

    ELEMENT.OPEN_RESULT_MODAL_BUTTON().click();

    cy.get("@alertStub")
      .should("have.been.calledOnce")
      .and("have.been.calledWith", "보너스 번호와 당첨번호가 중복됩니다.");
  });

  it("당첨 번호 중 범위를 벗어나는 번호가 있으면 alert가 발생한다.", () => {
    typeWinningNumbers([
      { index: 0, value: "1" },
      { index: 1, value: "2" },
      { index: 2, value: "3" },
      { index: 3, value: "4" },
      { index: 4, value: "5" },
      { index: 5, value: "100" },
    ]);
    ELEMENT.BONUS_NUMBER_INPUT().type("6");

    ELEMENT.OPEN_RESULT_MODAL_BUTTON().click();

    cy.get("@alertStub")
      .should("have.been.calledOnce")
      .and("have.been.calledWith", "당첨 번호가 규칙의 범위를 벗어납니다.");
  });

  it("보너스 번호가 범위를 벗어나면 alert가 발생한다.", () => {
    typeWinningNumbers([
      { index: 0, value: "1" },
      { index: 1, value: "2" },
      { index: 2, value: "3" },
      { index: 3, value: "4" },
      { index: 4, value: "5" },
      { index: 5, value: "6" },
    ]);
    ELEMENT.BONUS_NUMBER_INPUT().type("100");

    ELEMENT.OPEN_RESULT_MODAL_BUTTON().click();

    cy.get("@alertStub")
      .should("have.been.calledOnce")
      .and("have.been.calledWith", "보너스 번호가 규칙의 범위를 벗어납니다.");
  });
});

describe("결과 확인 모달 팝업 테스트", () => {
  beforeEach(() => {
    cypressPurchaseLottoBeforeEach()();

    typeWinningNumbers([
      { index: 0, value: "1" },
      { index: 1, value: "2" },
      { index: 2, value: "3" },
      { index: 3, value: "4" },
      { index: 4, value: "5" },
      { index: 5, value: "6" },
    ]);
    ELEMENT.BONUS_NUMBER_INPUT().type("7");
  });

  it("로또 구매 및 당첨 조건 입력 후 결과 확인 버튼을 클릭하면 모달이 팝업된다.", () => {
    ELEMENT.OPEN_RESULT_MODAL_BUTTON().click();

    ELEMENT.MODAL().should("be.visible");
  });

  it("x아이콘을 클릭하면 모달이 닫힌다.", () => {
    ELEMENT.OPEN_RESULT_MODAL_BUTTON().click();

    ELEMENT.CLOSE_MODAL_ICON().click();

    ELEMENT.MODAL().should("not.be.visible");
  });

  it("모달의 다시 시작하기 버튼을 클릭하면 모달이 닫히며 게임이 초기화 된다.", () => {
    ELEMENT.OPEN_RESULT_MODAL_BUTTON().click();

    ELEMENT.RESTART_BUTTON().click();

    ELEMENT.MODAL().should("not.be.visible");

    cy.get("form.prize-info").should("not.be.visible");
    cy.get("input.winning-number").each((input) => {
      cy.wrap(input).should("have.value", "");
    });
    ELEMENT.BONUS_NUMBER_INPUT().should("have.value", "");

    cy.get(".purchase-info").should("not.exist");
    ELEMENT.PAYMENT_INPUT().should("have.value", "");
  });

  it("게임을 다시 시작해도 정상적으로 게임이 진행된다.", () => {
    ELEMENT.OPEN_RESULT_MODAL_BUTTON().click();

    ELEMENT.RESTART_BUTTON().click();

    ELEMENT.PAYMENT_INPUT().type("2000");
    ELEMENT.PURCHASE_BUTTON().click();

    typeWinningNumbers([
      { index: 0, value: "10" },
      { index: 1, value: "12" },
      { index: 2, value: "13" },
      { index: 3, value: "14" },
      { index: 4, value: "25" },
      { index: 5, value: "16" },
    ]);

    ELEMENT.BONUS_NUMBER_INPUT().type("37");

    ELEMENT.OPEN_RESULT_MODAL_BUTTON().click();

    ELEMENT.MODAL().should("be.visible");
  });
});
