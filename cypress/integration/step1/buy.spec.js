import { INVALID_INPUT_ALERT_STRING } from "../../../src/js/constants.js";

describe("Calculator Test", function () {
  beforeEach(() => {
    cy.visit("http://127.0.0.1:5500/index.html");
  });

  const typePriceInput = (price) => {
    cy.get(".price-input").type(price);
    cy.get(".confirm").click();
  };

  it("로또 금액을 입력하면 적절한 개수의 로또가 발급된다. ", function () {
    typePriceInput("10000");
    cy.get("#count-text").should("have.text", "총 10개를 구매하였습니다. ");
  });

  it("0 이상이고, 천 원 단위로 나뉘어 떨어지는 경우 정상적으로 로또를 발급한다. ", function () {
    typePriceInput("5000");
    cy.get("#count-text").should("have.text", "총 5개를 구매하였습니다. ");
  });

  it("0 이하이거나, 천 원 단위로 나뉘어 떨어지지 않는 경우 에러를 안내해준다. ", function () {
    typePriceInput("5");
    cy.on("window:alert", (text) => {
      expect(text).to.contains(INVALID_INPUT_ALERT_STRING);
    });
  });

  it("구입 금액 입력창에 아무 값이 없을 경우 적절한 placeholder를 보여준다. ", function () {
    cy.get(".price-input").clear();
    cy.get(".price-input").should("have.attr", "placeholder", "구입 금액");
  });

  it("구입할 금액을 입력하기 전까지는 아래 구매내역, 번호 입력창을 보여주지 않는다. ", function () {
    // 노출 여부 판단
    cy.get("#purchase-detail").should("not.be.visible");
    typePriceInput("10000");
    cy.get("#purchase-detail").should("be.visible");
  });

  it("번호보기 토글 버튼을 클릭하면 복권 번호를 보여준다. ", function () {
    typePriceInput("10000");
    cy.get(".switch .toggle-button")
      .check({ force: true })
      .should("be.checked");
    cy.get(".icons").should("be.visible");
    cy.get(".contents").should("be.visible");
  });
});
