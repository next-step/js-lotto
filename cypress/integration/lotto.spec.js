describe("로또게임 페이지 테스트", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("input 버튼을 누른다.", () => {
    cy.get("#payment-button").click();
  });

  it("input에 숫자를 넣는 테스트", () => {
    cy.get("#payment-cost-input").click();
    cy.get("#payment-cost-input").type("1000");
  });

  it("로또가격을 1000원 단위가 아닌경우", () => {
    cy.get("#payment-cost-input").click();
    cy.get("#payment-cost-input").type("1200");
    cy.get("#payment-button").click();
  });

  cy.on("window:alert", (text) => {
    expect(text).to.equal("로또 구입 금액을 1,000원 단위로 입력해 주세요.");
  });

  cy.on("window:confirm", () => true);

  it("토글버튼 클릭했을때 ", () => {
    cy.get("#payment-cost-input").click();
    cy.get("#payment-cost-input").type("1000");
    cy.get("#payment-button").click();
    cy.get(".lotto-numbers-toggle-button").check({ force: true });
    cy.get(".lotto-result").should("be.visible");
    cy.get("#payment-button").click();
    cy.get(".lotto-numbers-toggle-button").uncheck({ force: true });
    cy.get(".lotto-ticket-number").should("not.be.visible");
  });

  it("결과 확인하기 버튼", () => {
    cy.get(".open-result-modal-button").click();
    cy.get(".modal").should("have.class", "open");
  });

  it("모달 닫기 버튼", () => {
    cy.get(".open-result-modal-button").click();
    cy.get(".modal").should("have.class", "open");
    cy.get(".modal-close").click();
    cy.get(".modal").should("not.have.class", "open");
  });

  it("당첨번호와 보너스번호가 1~45사이 숫자가 아니면 alert를 띄운다.", () => {
    cy.get(".winning-number")
      .each((element, index, list) => {
        cy.wrap(element).type(0);
      })
      .then(() => {
        cy.get(".open-result-modal-button").click;
      });
    const stub = cy.stub();
    cy.on("window:alert", stub);

    cy.get(".winning-number").each((element, index, list) => {
      expect(stub.getCall(0)).to.be.calledWith("1~45사이의 숫자를 입력해주세요");
    });
  });

  it("보너스 번호가 1~45사이 숫자가 아니면 alert를 띄운다.", () => {
    cy.get(".bonus-number")
      .each((element, index, list) => {
        cy.wrap(element).type(0);
      })
      .then(() => {
        cy.get(".open-result-modal-button").click;
      });
    const stub = cy.stub();
    cy.on("window:alert", stub);

    cy.get(".bonus-number").each((element, index, list) => {
      expect(stub.getCall(0)).to.be.calledWith("1~45사이의 숫자를 입력해주세요");
    });
  });
});
