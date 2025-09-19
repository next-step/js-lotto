describe("당첨 통계 모달 시나리오", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173", {
      onbeforeunload(win) {
        win.addEventListener("load", () => {
          pageLoaded = true;
        });
      },
    });
    cy.get(".lotto-price form input").type("5000");
    cy.get(".lotto-price form button").click();
    cy.get('.numbers-row input[name="winning-number"]').each(
      ($input, index) => {
        cy.wrap($input).type(index + 1);
      }
    );
    cy.get('.numbers-row input[name="bonus-number"]').type(45);
    cy.get(".winning-lotto form button").click();
  });
  it("닫기 버튼을 누르면 모달이 닫히고 기존에 입력했던 정보가 초기화됩니다.", () => {
    cy.get(".modal-close-button").click();
    cy.get(".modal").should("not.exist");
    cy.get(".lotto-price form input").should("have.value", "");
  });
  it("다시 시작하기 버튼을 누르면 모달이 닫히고 기존에 입력했던 정보가 초기화됩니다.", () => {
    cy.get(".modal-container button").click();
    cy.get(".modal").should("not.exist");
    cy.get(".lotto-price form input").should("have.value", "");
  });
});
