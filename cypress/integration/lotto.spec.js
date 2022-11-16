const getPurchaseAmountInput = () =>
  cy.get("[data-cy='purchase-amount-input']");
const getPurchaseButton = () => cy.get("[data-cy='purchase-button']");
const getShowNumbersToggle = () => cy.get("[data-cy='show-numbers-toggle']");
const getLottoTicket = () => cy.get("[data-cy='lotto-ticket']");

describe("로또 어플리케이션의 금액 input을 테스트한다.", () => {
  beforeEach(() => {
    cy.visit("../../index.html");
  });

  it("금액을 입력할 input 태그가 있다.", () => {
    getPurchaseAmountInput().should("exist");
  });

  it("로또 구입 금액을 입력하면 화면에 입력한 금액이 그대로 보여진다.", () => {
    getPurchaseAmountInput().type("1000");
    getPurchaseAmountInput().should("have.value", "1000");
  });

  it("금액은 숫자만 입력할 수 있다.", () => {
    getPurchaseAmountInput().type("가나다abc!@#");
    getPurchaseAmountInput().should("have.value", "");
  });
});

describe("로또 어플리케이션의 발급 버튼을 테스트한다.", () => {
  beforeEach(() => {
    cy.visit("../../index.html");
  });

  it("로또를 발급할 확인 버튼이 있다.", () => {
    getPurchaseButton().should("exist");
  });

  it("1,000원 단위로 입력되지 않았을 경우 alert를 띄워준다.", () => {
    const stub = cy.stub();
    cy.on("window:alert", stub);
    getPurchaseAmountInput().type("1010");
    getPurchaseButton()
      .click()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith(
          "로또 구입 금액을 1,000원 단위로 입력해 주세요."
        );
      });
  });

  it("확인 버튼을 클릭했을 때, 입력한 금액에 맞는 로또 개수가 발급된다.", () => {
    getPurchaseAmountInput().type("3000");
    getPurchaseButton().click();
    getLottoTicket().should("have.length", 3);
  });
});

describe("로또 어플리케이션의 번호보기 토글을 테스트한다.", () => {
  beforeEach(() => {
    cy.visit("../../index.html");
    getPurchaseAmountInput().type("3000");
    getPurchaseButton().click();
    getShowNumbersToggle().click();
  });

  it("번호보기 토글이 있다.", () => {
    getShowNumbersToggle().should("exist");
  });

  it("번호보기 토글을 클릭하면 로또 번호를 볼 수 있다.", () => {
    getLottoTicket().find(".ticket-detail").should("be.visible");
  });

  it("로또 번호의 숫자는 총 6개이다.", () => {
    getLottoTicket()
      .find(".ticket-detail")
      .each(($detail) => {
        const splitted = $detail.text().split(", ");
        assert.equal(splitted.length, "6");
      });
  });

  it("로또 번호의 범위는 1부터 45까지다.", () => {
    getLottoTicket()
      .find(".ticket-detail")
      .each(($detail) => {
        const splitted = $detail.text().split(", ");
        for (let i = 0; i < splitted.length; i++) {
          if (splitted[i] < 1 || splitted[i] > 45) {
            throw Error("로또 번호의 범위를 벗어납니다.");
          }
        }
      });
  });

  it("번호보기 토글을 비활성화하면 번호는 가려진다.", () => {
    getShowNumbersToggle().click();
    getLottoTicket().find(".ticket-detail").should("not.be.visible");
  });
});
