import {
  LOTTO_TICKETS_WRAPPER,
  LOTTO_NUMBERS_TOGGLE_BUTTON,
  LOTTO_NUMBERS_DETAIL,
  PRICE_INPUT,
  PURCHASED_LOTTO_COUNT_TEXT,
  PRICE_SUBMIT,
  LOTTO_PURCHASE_FORM,
  LOTTO_TICKET,
} from "../../src/js/constants/selectors";

describe("로또 구입 금액을 입력하면, 금액에 해당하는 로또를 발급해야 한다.", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get(PRICE_INPUT).type("1000");
  });

  it("로또 구입 금액 1000원을 입력할 수 있다.", () => {
    cy.get(PRICE_INPUT).should("have.value", "1000");
  });

  it("확인버튼을 누르면, 폼을 제출할 수 있다.", () => {
    cy.get(LOTTO_PURCHASE_FORM).submit();
  });

  it("제출한 금액만큼 로또가 발급된다.", () => {
    cy.get(LOTTO_PURCHASE_FORM)
      .submit()
      .then(() => {
        cy.get(PURCHASED_LOTTO_COUNT_TEXT).should("have.text", "1");
      });
  });
});

describe("로또 1장의 가격은 1,000원이다.", () => {
  it("30000원을 입력한 뒤 확인을 누르면, 로또 30장이 발급된다. ", () => {
    cy.visit("/");
    cy.get(PRICE_INPUT).type("30000");
    cy.get(LOTTO_PURCHASE_FORM)
      .submit()
      .then(() => {
        cy.get(PURCHASED_LOTTO_COUNT_TEXT).should("have.text", "30");
      });
  });

  it("999원을 입력한 뒤 확인을 누르면, 경고창이 뜬다. ", () => {
    const stub = cy.stub();
    cy.on("window:alert", stub);
    cy.visit("/");
    cy.get(LOTTO_PURCHASE_FORM)
      .submit()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith(
          "Error: 로또 구입 금액을 1000원 단위로 입력해 주세요."
        );
      });
  });

  it("아무것도 입력하지 않고 확인을 누르면, 경고창이 뜬다. ", () => {
    const stub = cy.stub();
    cy.on("window:alert", stub);
    cy.visit("/");
    cy.get(LOTTO_PURCHASE_FORM)
      .submit()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith(
          "Error: 로또 구입 금액이 너무 작습니다."
        );
      });
  });
});

describe("소비자는 자동 구매를 할 수 있어야 한다.", () => {
  it("구매한 로또 티켓에 로또 번호가 적혀있다.", () => {
    cy.visit("/");
    cy.get(PRICE_INPUT).type("1000");
    cy.get(LOTTO_PURCHASE_FORM)
      .submit()
      .then(() => {
        cy.get(LOTTO_TICKET).get(LOTTO_NUMBERS_DETAIL);
      });
  });
});

describe("복권 번호는 번호보기 토글 버튼을 클릭하면, 볼 수 있어야 한다.", () => {
  it("번호보기 토글 버튼을 클릭할 수 있다.", () => {
    cy.visit("/");
    cy.get(LOTTO_NUMBERS_TOGGLE_BUTTON).click();
  });

  it("로또를 구매하지 않고 토글 버튼을 클릭하면 아무일도 일어나지 않는다.", () => {
    cy.visit("/");
    cy.get(LOTTO_NUMBERS_TOGGLE_BUTTON).click();
    cy.get(LOTTO_TICKETS_WRAPPER).children().should("have.length", 0);
  });

  it("로또를 10000원 어치 구매한 뒤 토글 버튼을 클릭하면, 로또 번호를 볼 수 있다.", () => {
    cy.visit("/");
    cy.get(PRICE_INPUT).type("10000");
    cy.get(LOTTO_PURCHASE_FORM)
      .submit()
      .then(() => {
        cy.get(LOTTO_NUMBERS_TOGGLE_BUTTON).click();
        cy.get(LOTTO_NUMBERS_DETAIL);
      });
  });
});

// describe("결과 확인하기 버튼을 누르면 당첨 통계, 수익률을 모달로 확인할 수 있다.", () => {});

// describe("다시 시작하기 버튼을 누르면 초기화 되서 다시 구매를 시작할 수 있다.", () => {});

// describe("소비자는 수동 구매(스스로 구매 번호를 입력)를 할 수 있어야 한다.", () => {});

// describe("수동 구매 후 남는 금액이 있다면 자동으로 구매할 수 있어야 한다.", () => {});
