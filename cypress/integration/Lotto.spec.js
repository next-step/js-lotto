import { PRICE_PER_LOTTO } from "../../src/js/utils/constants";
import { CHARGE_INPUT, LOTTOS, NUMBER_OF_LOTTOS, NUMBER_VISIBILITY_TOGGLE } from "../../src/js/utils/selectors";

beforeEach(() => {
  cy.visit("http://localhost:5500");
});

describe("Initial state", () => {
  it("$numOfLottos는 0개를 표시", () => {
    cy.get(NUMBER_OF_LOTTOS).should("contain.text", "0개");
  });

  it("$lottos는 비어있음", () => {
    cy.get(LOTTOS).should("be.empty");
  });
});

describe("금액 입력", () => {
  it("정상적인 금액 입력", () => {
    cy.buyLotto(5000);
    cy.get(CHARGE_INPUT).should("have.value", "");
  });

  it("1 개당 가격에 나누어 떨어지지 않는 금액 입력", () => {
    cy.buyLotto(5500);
    cy.on("window:alert", (text) => expect(text).to.contain(PRICE_PER_LOTTO));
  });

  it("일반 문자열을 값으로 입력", () => {
    cy.buyLotto("hello world");
    cy.get(CHARGE_INPUT).should("have.value", "");
  });
});

describe("구매", () => {
  it("1개당 1000원인 로또를 10장 구매", () => {
    cy.buyLotto(10000);
    cy.get(NUMBER_OF_LOTTOS).should("contain.text", "10");
    cy.get(LOTTOS).children().should("have.length", 10);
    cy.get(CHARGE_INPUT).should("have.value", "");
  });
});

describe("로또 번호 시각화", () => {
  it("번호 보기가 true이면 구매한 로또 번호 보여주기", () => {
    cy.buyLotto(10000);
    cy.toggleViewLotto();
    cy.get(LOTTOS)
      .children()
      .each((el) => {
        cy.wrap(el).children("span").should("to.be.visible");
      });
  });

  it("번호 보기를 true에서 false로 바꾸면 번호를 안보여줌", () => {
    cy.buyLotto(10000);
    cy.toggleViewLotto();
    cy.toggleViewLotto();
    cy.get(LOTTOS)
      .children()
      .each((el) => {
        cy.wrap(el).children("span").should("to.not.be.visible");
      });
  });

  it("로또를 구매하지 않았으면 번호보기가 true여도 변화없음", () => {
    cy.toggleViewLotto();
    cy.get(LOTTOS).should("be.empty");
  });
});
