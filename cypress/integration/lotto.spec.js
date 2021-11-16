before(() => {
  cy.visit("http://localhost:5500");
});

describe("js-lotto", () => {
  beforeEach(() => {
    cy.get(".purchase__price-input").clear();
  });

  context("구입금액 예외처리 확인", () => {
    it("금액을 입력하지 않고 버튼 클릭시 에러 발생", () => {
      cy.get(".purchase__form").submit();
      cy.on("window.alert", (text) =>
        expect(text).to.be("금액을 입력해주세요")
      );
    });
    it("천원 미만이거나 십만원 초과 금액을 입력했을 때 에러", () => {
      cy.purchaseLotto(200);
      cy.on("window.alert", (text) =>
        expect(text).to.be("천원 이상 십 만원 이하로 입력해주세요.")
      );
    });
    it("금액이 천원 단위가 아니면 에러", () => {
      cy.purchaseLotto(2999);
      cy.on("window.alert", (text) =>
        expect(text).to.be("금액을 천원 단위로 입력해주세요")
      );
    });
  });

  context("구매액에 맞게 로또가 발급되는지 확인", () => {
    it("로또 개수가 갱신된다", () => {
      cy.purchaseLotto(5000);
      cy.get(".lotto-amounts").should("have.text", "총 5개를 구매하였습니다.");
    });
    it("로또 개수만큼의 티켓이 표시된다.", () => {
      cy.purchaseLotto(5000);
      cy.get(".lotto-tickets div").should("have.length", 5);
    });
  });

  context("번호보기 토글기능 확인", () => {
    beforeEach(() => {
      cy.purchaseLotto(5000);
    });
    it("토글버튼 클릭시 로또 번호가 보인다.", () => {
      cy.get(".lotto-numbers-toggle-btn").check({ force: true });
      cy.get(".lotto-tickets").each((el) => {
        cy.wrap(el).should("have.class", "d-flex");
      });
    });
    // 토글 두번 눌렀을 때의 테스트 코드 작성 실패..
    // it("토글버튼이 활성화된 채로 버튼 클릭시 로또 번호가 숨겨진다", () => {
    //   cy.get(".lotto-numbers-toggle-btn").uncheck();
    //   cy.get(".lotto-tickets").each((el) => {
    //     cy.wrap(el).should("not.have.class", "d-flex");
    //   });
    // });
  });
});
