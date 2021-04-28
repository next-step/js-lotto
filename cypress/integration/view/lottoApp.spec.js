import { BUY_SELECTOR } from "../../../src/js/utils/dom.js";

const URL = "http://localhost:5500";
const BUY_PRICE = 5000;
const LOTTO_PRICE = 1000;
const BUY_NUM = BUY_PRICE / LOTTO_PRICE;

const typeTarget = (target, input) =>
  cy.get(target).type(input).type("{enter}");

describe("로또를 구매할 수 있다", () => {
  beforeEach("방문한다", () => {
    cy.visit(URL);
  });

  it("금액에 맞는 구매개수를 가져야한다.", () => {
    typeTarget(BUY_SELECTOR.INPUT, BUY_PRICE);
  });

  it("구매금액은 1000원을 넘어야한다", () => {});

  it("구매 금액은 1000원 단위어야한다.", () => {});

  it("번호보기 클릭시 로또 상세번호가 보여야한다.", () => {});

  it("번호보기를 두 번 클릭시 로또 상세번호가 가려져야한다.", () => {});
});
