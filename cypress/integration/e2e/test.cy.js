import { MIN_COST, ERROR_MESSAGES, CLASSNAME } from "/src/js/constants.js";
import {
  shouldBeHidden,
  shouldNotBeHidden,
  shouldShowAlert,
  typeAndSubmitPriceForm,
  clearVal,
} from "./utils.js";

describe("Lotto", () => {
  before(() => {
    cy.visit("http://127.0.0.1:5500/index.html");
  });

  beforeEach(() => {
    clearVal(CLASSNAME.PRICE_FORM_INPUT);
  });

  describe("1. 첫 랜더링 시 금액 입력창만 뜨는지 테스트", () => {
    it("1-1. 로또 구입 금액 입력창만 보여야 한다.", () => {
      shouldBeHidden(CLASSNAME.LOTTO_SECTION);
      shouldBeHidden(CLASSNAME.LOTTO_FORM);
      shouldBeHidden(CLASSNAME.MODAL);
    });
    it("1-2. 금액 입력창이 비어 있어야 한다.", () => {
      cy.get(CLASSNAME.PRICE_FORM_INPUT).should("be.empty");
    });
  });

  describe("2. 입력한 금액이 정확한지 테스트", () => {
    it(`2-1. 입력한 금액이 ${MIN_COST}보다 적은 경우 에러메세지 알림창이 사용자에게 뜬다.`, () => {
      shouldShowAlert(ERROR_MESSAGES.REQUIRED_MIN_AMOUNT, MIN_COST - 100);
    });
    it(`2-2. 입력한 금액이 ${MIN_COST}단위가 아닌 경우 에러메세지 알림창이 사용자에게 뜬다.`, () => {
      shouldShowAlert(ERROR_MESSAGES.UNIT_ERROR, MIN_COST + 100);
    });
  });

  describe("3. 금액 입력 후 결과창이 정상적으로 작동하는지 테스트(자동구매 시)", () => {
    it("3-1. 로또 구입 금액에 해당하는 개수의 로또 티켓이 발급되어야 한다.", () => {
      const testCount = 5;
      const price = testCount * 1000;

      typeAndSubmitPriceForm(price);
      cy.get(CLASSNAME.LOTTO_ICON).should("length", testCount);
    });
    it("3-2. 로또 구입 금액 새로 입력시 로또 티켓이 기존 티켓에 추가되지 않고 새로 그만큼 만든다.", () => {
      const testCount = 5;
      const price = testCount * 1000;

      typeAndSubmitPriceForm(price);
      clearVal(CLASSNAME.PRICE_FORM_INPUT);
      typeAndSubmitPriceForm(price);
      cy.get(CLASSNAME.LOTTO_ICON).should("length", testCount);
    });
    describe("3-3. 번호 보기 토글이 정상 작동하는지 테스트", () => {
      const TEST_PRICE = 3000;
      it("3-3-1. 처음 로또 티켓 렌더 시 로또 번호는 보이지 않는다.", () => {
        typeAndSubmitPriceForm(TEST_PRICE);
        shouldBeHidden(CLASSNAME.LOTTO_DETAIL);
      });
      it("3-3-2. 번호 보기 토글 클릭 시 로또 번호를 볼 수 있어야 한다.", () => {
        typeAndSubmitPriceForm(TEST_PRICE);
        cy.get(CLASSNAME.LOTTO_TOGGLE_BTN).check({ force: true });
        shouldNotBeHidden(CLASSNAME.LOTTO_DETAIL);
      });
    });
  });
});
