import {
  BUY_SELECTOR,
  MODAL_SELECTOR,
  VIEW_SELECTOR,
  WINNING_SELECTOR,
} from "../../../src/js/utils/dom.js";
import { VALID } from "../../../src/js/utils/message.js";

const URL = "http://localhost:5500";
const BUY_PRICE = 5000;
const LOTTO_PRICE = 1000;
const BUY_NUM = BUY_PRICE / LOTTO_PRICE;

const typeTarget = (target, input) =>
  cy.get(target).type(input).type("{enter}");

const alertStub = () => cy.on("window:alert", cy.stub().as("alerted"));
const checkAlertWtihMessage = (message) =>
  cy
    .get("@alerted")
    .should("have.been.calledOnce")
    .and("have.been.calledWith", message);

describe("로또를 구매할 수 있다", () => {
  beforeEach("방문한다", () => {
    cy.visit(URL);
  });

  it("금액에 맞는 구매개수를 가져야한다.", () => {
    typeTarget(BUY_SELECTOR.INPUT, BUY_PRICE);
    cy.get(VIEW_SELECTOR.TOTAL).should("have.text", BUY_NUM);
    cy.get(VIEW_SELECTOR.LOTTO_DETAIL).its("length").should("eq", BUY_NUM);
  });

  it("구매금액은 1000원을 넘어야한다", () => {
    alertStub();
    typeTarget(BUY_SELECTOR.INPUT, 300);
    cy.get("input:invalid").should("have.length", 8);
  });

  it("구매 금액은 1000원 단위어야한다.", () => {
    alertStub();
    typeTarget(BUY_SELECTOR.INPUT, 3300);
    checkAlertWtihMessage(VALID.NOT_DIVIDE);
  });
});

const visitWithBuy = () => {
  cy.visit(URL);
  typeTarget(BUY_SELECTOR.INPUT, BUY_PRICE);
};

describe("번호보기를 확인한다.", () => {
  beforeEach("방문하고 구매한다.", () => {
    visitWithBuy();
  });

  it("번호보기 클릭 전에는 가려져있어야한다", () => {
    cy.get(VIEW_SELECTOR.LOTTOS).should("not.have.class", "flex-col");
    cy.get(VIEW_SELECTOR.LOTTO_DETAIL).should("not.be.visible");
  });

  it("번호보기 클릭시 로또 상세번호가 보여야한다.", () => {
    cy.get(VIEW_SELECTOR.SWITCH).click({ force: true });
    cy.get(VIEW_SELECTOR.LOTTOS).should("have.class", "flex-col");
    cy.get(VIEW_SELECTOR.LOTTO_DETAIL).should("be.visible");
  });

  it("번호보기를 두 번 클릭시 로또 상세번호가 가려져야한다.", () => {
    cy.get(VIEW_SELECTOR.SWITCH).click({ force: true });
    cy.get(VIEW_SELECTOR.SWITCH).click({ force: true });
    cy.get(VIEW_SELECTOR.LOTTOS).should("not.have.class", "flex-col");
    cy.get(VIEW_SELECTOR.LOTTO_DETAIL).should("not.be.visible");
  });
});

describe("당첨결과를 확인한다", () => {
  beforeEach("방문하고 구매한다.", () => {
    visitWithBuy();
    cy.get(WINNING_SELECTOR.INPUT)
      .eq(1)
      .type(1)
      .tab()
      .type(2)
      .tab()
      .type(3)
      .tab()
      .type(4)
      .tab()
      .type(5)
      .tab()
      .type(6)
      .tab()
      .type(7)
      .type("{enter}");
  });

  it("결과 모달창이 나타난다", () => {
    cy.get(MODAL_SELECTOR.MODAL).should("have.class", "open");
  });

  it("재시작 버튼 클릭시 reload된다", () => {
    cy.window().then((w) => (w.beforeReload = true));
    cy.get(MODAL_SELECTOR.RESTART).click();
    cy.window().should("not.have.prop", "beforeReload");
  });
});
