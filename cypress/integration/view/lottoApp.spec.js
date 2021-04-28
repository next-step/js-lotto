import { BUY_SELECTOR, VIEW_SELECTOR } from "../../../src/js/utils/dom.js";
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
    checkAlertWtihMessage(VALID.LOWER_PRICE);
  });

  it("구매 금액은 1000원 단위어야한다.", () => {
    alertStub();
    typeTarget(BUY_SELECTOR.INPUT, 3300);
    checkAlertWtihMessage(VALID.NOT_DIVIDE);
  });
});

describe("번호보기를 확인한다.", () => {
  beforeEach("방문하고 구매한다.", () => {
    cy.visit(URL);
    typeTarget(BUY_SELECTOR.INPUT, BUY_PRICE);
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
