describe("당첨번호 입력 시나리오", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
    cy.window().then((win) => {
      cy.stub(win, "alert").as("alert");
    });
    cy.get(".lotto-price form input").type("5000");
    cy.get(".lotto-price form button").click();
  });
  it("당첨번호를 중복이 포함된 6개의 숫자로 구성하여 결과 확인하기 버튼을 누르면 경고창이 뜹니다.", () => {
    // given
    const winningNumber = [1, 2, 3, 4, 5, 5];

    // when
    cy.get('.numbers-row input[name="winning-number"]').each(
      ($input, index) => {
        cy.wrap($input).type(winningNumber[index]);
      }
    );
    cy.get(".winning-lotto form button").click();

    // then
    cy.get("@alert").should(
      "have.been.calledOnceWith",
      "Lotto는 6개의 숫자로 구성되어야 합니다"
    );
  });
  it("당첨번호만 입력하여 결과 확인하기 버튼을 누르면 경고창이 뜹니다.", () => {
    // given
    const winningNumber = [1, 2, 3, 4, 5, 6];

    // when
    cy.get('.numbers-row input[name="winning-number"]').each(
      ($input, index) => {
        cy.wrap($input).type(winningNumber[index]);
      }
    );
    cy.get(".winning-lotto form button").click();

    // then
    cy.get("@alert").should(
      "have.been.calledOnceWith",
      "value는 1 ~ 45 사이이어야 합니다."
    );
  });
  it("보너스번호가 당첨번호에 포함하여 결과 확인하기 버튼을 누르면 경고창이 뜹니다.", () => {
    // given
    const winningNumber = [1, 2, 3, 4, 5, 6];
    const bonusNumber = 6;

    // when
    cy.get('.numbers-row input[name="winning-number"]').each(
      ($input, index) => {
        cy.wrap($input).type(winningNumber[index]);
      }
    );
    cy.get('.numbers-row input[name="bonus-number"').type(bonusNumber);
    cy.get(".winning-lotto form button").click();

    // then
    cy.get("@alert").should(
      "have.been.calledOnceWith",
      "보너스 번호는 당첨 번호에 포함될 수 없습니다."
    );
  });
  it("당첨번호와 보너스번호를 입력하여 결과 확인하기 버튼을 누르면 모달이 뜹니다.", () => {
    // given
    const winningNumber = [1, 2, 3, 4, 5, 6];
    const bonusNumber = 7;

    // when
    cy.get('.numbers-row input[name="winning-number"]').each(
      ($input, index) => {
        cy.wrap($input).type(winningNumber[index]);
      }
    );
    cy.get('.numbers-row input[name="bonus-number"]').type(bonusNumber);
    cy.get(".winning-lotto form button").click();

    // then
    cy.get(".modal").should("exist");
  });
});
