describe("로또 당첨 번호 입력 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
    cy.get(".purchase-section form input").type("3000");
    cy.get(".purchase-section form button").click();
  });

  it("당첨 번호는 숫자만 입력할 수 있다. 숫자가 아닐 경우 입력되지 않는다", () => {
    cy.get('.draw-numbers-section input[name="winningNumbers"]')
      .first()
      .type("abc");

    cy.get('.draw-numbers-section input[name="winningNumbers"]')
      .first()
      .should("have.value", "");
  });

  it("보너스 번호는 숫자만 입력할 수 있다. 숫자가 아닐 경우 입력되지 않는다", () => {
    cy.get('.draw-numbers-section input[name="bonusNumber"]')
      .first()
      .type("abc");

    cy.get('.draw-numbers-section input[name="bonusNumber"]')
      .first()
      .should("have.value", "");
  });

  it("당첨 번호는 최대 숫자 2자리까지 입력할 수 있다. 2자리가 초과되면 입력되지 않는다.", () => {
    cy.get(".draw-numbers-section input[name='winningNumbers']")
      .first()
      .type("123");

    cy.get(".draw-numbers-section input[name='winningNumbers']")
      .first()
      .should("have.value", "12");
  });

  it("보너스 번호는 최대 숫자 2자리까지 입력할 수 있다. 2자리가 초과되면 입력되지 않는다.", () => {
    cy.get(".draw-numbers-section input[name='bonusNumber']")
      .first()
      .type("123");

    cy.get(".draw-numbers-section input[name='bonusNumber']")
      .first()
      .should("have.value", "12");
  });
});

describe("로또 당첨 번호 제출 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
    cy.get(".purchase-section form input").type("3000");
    cy.get(".purchase-section form button").click();
  });

  it("당첨 번호와 보너스 번호는 중복되서는 안된다. 중복될 경우 제출 시 alert 창에 에러 메시지가 노출된다.", () => {
    cy.get('.draw-numbers-section input[name="winningNumbers"]').each(
      ($input, index) => {
        cy.wrap($input).type(`${index + 1}`);
      }
    );
    cy.get('.draw-numbers-section input[name="bonusNumber"]').type("1");

    cy.get(".draw-numbers-section form button").click();

    cy.on("window:alert", (text) => {
      expect(text).to.equal("로또 번호는 중복될 수 없습니다.");
    });
  });

  it("당첨 번호와 보너스 번호는 1이상 45이하의 숫자만 입력할 수 있다. 범위를 벗어날 경우 제출 시 alert 창에 에러 메시지가 노출된다.", () => {
    cy.get('.draw-numbers-section input[name="winningNumbers"]').each(
      ($input, index) => {
        cy.wrap($input).type(`${index + 1}`);
      }
    );
    cy.get('.draw-numbers-section input[name="bonusNumber"]').type("46");

    cy.get(".draw-numbers-section form button").click();

    cy.on("window:alert", (text) => {
      expect(text).to.equal("1 이상 45 이하 숫자를 입력해 주세요.");
    });
  });

  it("당첨 번호 제출 시 당첨 통계 모달창이 노출된다", () => {
    cy.get('.draw-numbers-section input[name="winningNumbers"]').each(
      ($input, index) => {
        cy.wrap($input).type(`${index + 1}`);
      }
    );
    cy.get('.draw-numbers-section input[name="bonusNumber"]').type("10");

    cy.get(".draw-numbers-section form button").click();

    cy.get(".modal-content header").should("have.text", "🏆 당첨 통계 🏆");
  });
});
