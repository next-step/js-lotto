describe("로또 당첨 통계 모달 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
    cy.get(".purchase-section form input").type("3000");
    cy.get(".purchase-section form button").click();
    cy.get('.draw-numbers-section input[name="winningNumbers"]').each(
      ($input, index) => {
        cy.wrap($input).type(`${index + 1}`);
      }
    );
    cy.get('.draw-numbers-section input[name="bonusNumber"]').type("10");
    cy.get(".draw-numbers-section form button").click();
  });

  it("일치 갯수, 당첨금, 당첨 갯수, 총 수익률을 보여준다.", () => {
    cy.get(".modal-content table th").eq(0).should("have.text", "일치 갯수");
    cy.get(".modal-content table th").eq(1).should("have.text", "당첨금");
    cy.get(".modal-content table th").eq(2).should("have.text", "당첨 갯수");
    cy.get(".modal-text")
      .should("include.text", "당신의 총 수익률은")
      .and("include.text", "%")
      .and("include.text", "입니다");
  });

  it("모달 우측 상단 X 버튼을 클릭하면 모달이 닫힌다.", () => {
    cy.get(".modal-content .close-button").click();
    cy.get(".modal-content").should("not.exist");
  });

  it("모달의 다시 시작하기 버튼을 클릭할 경우, 모달이 닫히고 기존 입력했던 폼이 리셋된다.", () => {
    cy.get(".modal-content .modal-button").click();

    cy.get(".modal-content").should("not.exist");
    cy.get(".purchase-section form input").should("have.value", "");
    cy.get(".purchase-result-step").should("not.be.visible");
  });
});
