const cypressPurchaseLottoBeforeEach =
  (payment = "3000") =>
  () => {
    cy.visit("http://localhost:9000/");

    cy.get("input").get(".payment").type(payment);
    cy.get("button").get(".purchase").click();

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

  xit("당첨 번호에 숫자가 아닌값이 포함되면 alert가 발생한다.", () => {});

  xit("보너스 번호가 당첨 번호에 포함되면 alert가 발생한다.", () => {});

  xit("당첨 번호 중 범위를 벗어나는 번호가 있으면 alert가 발생한다.", () => {});
});

xdescribe("결과 확인 모달 팝업 테스트", () => {
  beforeEach(cypressPurchaseLottoBeforeEach());

  it("로또 구매 및 당첨 조건 입력 후 결과 확인 버튼을 클릭하면 모달이 팝업된다.", () => {});
});
