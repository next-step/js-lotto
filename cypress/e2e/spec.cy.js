/* eslint-disable no-undef */
// cypress -> eslint v9를 위한 플러그인은 존재
// eslint v8이라 eslint를 적용하지 않음
describe("BDD 테스트 확인", () => {
  beforeEach("passes", () => {
    // cy.visit("https://imhojeong.github.io/js-lotto/");
    cy.visit("http://127.0.0.1:5500/src/view/web/index.html");
  });

  it("사이트에 방문한다.", () => {
    // 1. 사려는 티켓 값만큼 입력한다.
    cy.get("money-input")
      .find("input", { includeShadowDom: true })
      .type("1000");
    cy.get("money-input").find("button", { includeShadowDom: true }).click();

    // "2. 입력 후, 구매 버튼을 누른다."
    cy.get("money-input").find("button", { includeShadowDom: true }).click();

    // 3. Purchase History가 제대로 나왔는지 확인한다.
    cy.get("purchase-history")
      .find(".numberBox", { includeShadowDom: true })
      .click();

    // 4. 당첨 번호, 보너스 번호에 값을 넣는다.
    cy.get("number-box")
      .find(".winning-number", { includeShadowDom: true })
      .each(($input, index) => {
        cy.wrap($input).type(index + 1);
      });

    cy.get("number-box")
      .find(".bonus-number", { includeShadowDom: true })
      .type(7);
    // .find(".winning-number", { includeShadowDom: true })
    // .click();

    // 5. 결과 확인 버튼을 누른다
    cy.get("custom-button")
      .find("#submit-button", { includeShadowDom: true })
      .click();

    // 결과를 보기 위함
    cy.wait(5000);

    // 6. 다시 시작 버튼을 누른다
    cy.get("custom-button")
      .find("#restart-button", { includeShadowDom: true })
      .click();
  });
});
