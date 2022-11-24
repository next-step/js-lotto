describe("로또게임 페이지 테스트", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  describe("구입금액을 입력한다.", () => {
    it("구입금액은 숫자만 입력된다.", () => {
      cy.get("#payment-cost-input").click();
      cy.get("#payment-cost-input").type("abcdefg");
      cy.get("#payment-cost-input").type("가나다라마바사");
      cy.get("#payment-cost-input").type(",~!@#$%");
    });
  });

  describe("금액에 해당하는 로또티켓을 발급해야한다.", () => {
    it("금액에 맞는 로또티켓 개수를 출력한다.", () => {
      cy.get("#payment-cost-input").click();
      cy.get("#payment-cost-input").type("1000");
      cy.get("#payment-button").click();
      cy.get("#payment-ticket").should("have.text", "총 1개를 구매하였습니다.");
    });
    it("금액에 맞는 로또 아이콘이 나타난다", () => {
      cy.get("#payment-cost-input").click();
      cy.get("#payment-cost-input").type("3000");
      cy.get("#payment-button").click();
      cy.get(".lotto-result-list-item").should("have.length", 3);
    });
  });

  describe("번호보기 버튼을 클릭하면 로또번호가 보여야한다.", () => {
    it("번호보기 토글이 활성화되면 로또번호가 보인다.", () => {
      cy.get("#payment-cost-input").click();
      cy.get("#payment-cost-input").type("1000");
      cy.get("#payment-button").click();
      cy.get(".lotto-numbers-toggle-button").check({ force: true });
      cy.get(".lotto-result").should("be.visible");
    });
    it("번호보기 토글을 비활성화 시키면 로또번호가 보이지않는다.", () => {
      cy.get("#payment-cost-input").click();
      cy.get("#payment-cost-input").type("1000");
      cy.get("#payment-button").click();
      cy.get("#payment-button").click();
      cy.get(".lotto-numbers-toggle-button").uncheck({ force: true });
      cy.get(".lotto-ticket-number").should("not.be.visible");
    });
  });

  describe("당첨번호는 중복되지않는 1~45사이의 숫자여야한다.", () => {
    beforeEach(() => {
      cy.get("#payment-cost-input").click();
      cy.get("#payment-cost-input").type("1000");
    });

    it("로또번호가 1~45사이 숫자가 아닐경우 alert를 띄운다.", () => {
      cy.winningNumberArray([-1, 111, 222, 46, 0, 4]);
      cy.get(".open-result-modal-button").click();
      cy.on("window:alert", (error) => {
        expect(error).to.contains("1~45사이의 숫자를 입력해주세요.");
      });
    });

    it("로또 번호에 중복된 숫자가 입력된다면 alert를 띄운다", () => {
      cy.winningNumberArray([1, 1, 1, 2, 2, 6, 2]);
      cy.get(".open-result-modal-button").click();
      cy.on("window:alert", (error) => {
        expect(error).to.contains("중복되지 않는 숫자를 입력해주세요.");
      });
    });
  });

  // describe("결과 확인하기 버튼을 누른다면 통계, 수익률을 모달로 확인할 수 있다.", () => {
  //   beforeEach(() => {
  //     cy.get("#payment-cost-input").click();
  //     cy.get("#payment-cost-input").type("1000");
  //     cy.winningNumberArray([1, 2, 3, 4, 5, 6, 7]);
  //     cy.get(".open-result-modal-button").click();
  //   });
  // });
});
