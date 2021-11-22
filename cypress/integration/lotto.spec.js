import {DOM_ID, ERROR_MESSAGE, LOTTO_PRICE} from "../../src/js/constants.js";

const BASE_URL = 'http://127.0.0.1:8080/';

beforeEach(() =>   cy.visit(BASE_URL));

describe('lotto-step1-2', () => {

  describe('로또 구입 금액을 입력하면, 금액에 해당하는 로또를 발급해야 한다.', () => {
    it('금액을 제출하기 전 까지 복권이 보이지 않는다.', () => {
      cy.get(DOM_ID.LOTTO_ICON).should('not.exist');
    });

    [LOTTO_PRICE - 100, LOTTO_PRICE + 100, LOTTO_PRICE, 0].forEach(money => {
      it(`잘못된 금액(  ${money}원 )이 입력되면 복권을 발급하지 않는다.`, () => {
        cy.typeMoneyAndSubmit(money);
        cy.on('uncaught:exception', () => false);
      });
    });

    describe('금액을 입력하고 확인 버튼을 누르면, 복권이 발급 된다.', () => {
      [1000, 5000, 10000].forEach(money => {
        it('발급이 완료되면 보이지 않던 로또 아이콘이 보인다.', () => {
          cy.typeMoneyAndSubmit(money);
          cy.get(DOM_ID.LOTTO_ICON).should('be.visible');
        });

        it('발급이 완료되면 구입된 로또의 개수를 알려주는 메시지를 보여준다.', () => {
          cy.typeMoneyAndSubmit(money);
          cy.checkEqualityText(DOM_ID.PURCHASE_MESSAGE, `총 ${money / LOTTO_PRICE}개를 구매하였습니다.`);
        });

        it('로또 한장의 가격은 1000원으로 금액에 맞는 개수의 로또가 발급 된다.', () => {
          cy.typeMoneyAndSubmit(money);
          cy.checkChildLength(DOM_ID.LOTTO_LIST, money / LOTTO_PRICE)
        });
      })
    });
  });

  describe('토글버튼을 이용해 로또 정보의 가시성을 관리 할 수 있다..', () => {
    const money = 10000;
    it('토글 버튼이 unchecked인 경우 복권의 숫자 정보가 보이지 않는다.', () => {
      cy.typeMoneyAndSubmit(money);
      cy.get(DOM_ID.TOGGLE_BUTTON).uncheck();
      cy.get(DOM_ID.LOTTO_DETAIL).should('not.be.visible');
    });

    it('토글 버튼이 checked인 경우 복권의 숫자 정보가 보인다.', () => {
      cy.typeMoneyAndSubmit(money);
      cy.get(DOM_ID.TOGGLE_BUTTON).check({ force: true });
      cy.get(DOM_ID.LOTTO_DETAIL).should('be.visible');
    });

    it('토글 버튼을 checked -> unchecked 로 상태가 변경되는 경우에도 정상적으로 동작한다.', () => {
      cy.typeMoneyAndSubmit(money);
      cy.get(DOM_ID.TOGGLE_BUTTON).check({ force: true });
      cy.get(DOM_ID.LOTTO_DETAIL).should('be.visible');
      cy.get(DOM_ID.TOGGLE_BUTTON).uncheck({ force: true });
      cy.get(DOM_ID.LOTTO_DETAIL).should('not.be.visible');
    });
  });

  describe('잘못된 번호로 결과학인을 할 경우 에러가 발생한다.', () => {
    beforeEach(() => cy.typeMoneyAndSubmit(1000));


    it("당첨번호를 모두 입력하지 않을시 에러 발생", () => {
      cy.typeWinningNumbers([1, 2, 3, 4]);
      cy.typeBonusNumber(5);
      cy.clickElements(DOM_ID.GET_RESULT_BUTTON);
      cy.on('uncaught:exception', () => false);
    });

    it("보너스 번호를 입력하지 않을시 에러 발생", () => {
      cy.typeWinningNumbers([1, 2, 3, 4, 5, 6]);
      cy.typeBonusNumber(7);
      cy.clickElements(DOM_ID.GET_RESULT_BUTTON);
      cy.on('uncaught:exception', () => false);
    });

    it("0보다 작은 번호 입력시 에러", () => {
      cy.typeWinningNumbers([-1, 2, 3, 4, 5, 6]);
      cy.typeBonusNumber(7);
      cy.clickElements(DOM_ID.GET_RESULT_BUTTON);
      cy.on('uncaught:exception', () => false);
    });

    it("45보다 큰 번호 입력시 에러", () => {
      cy.typeWinningNumbers([46, 2, 3, 4, 5, 6]);
      cy.typeBonusNumber(7);
      cy.clickElements(DOM_ID.GET_RESULT_BUTTON);
      cy.on('uncaught:exception', () => false);
    });

    it("중복된 숫자 입력시 에러", () => {
      cy.typeWinningNumbers([1, 1, 3, 4, 5, 6]);
      cy.typeBonusNumber(7);
      cy.clickElements(DOM_ID.GET_RESULT_BUTTON);
      cy.on('uncaught:exception', () => false);
    });
  });

  describe('당천번호를 입력하면 결과를 확인 할 수 있다.', () => {
    beforeEach(() => {
      cy.typeMoneyAndSubmit(10000);
      cy.typeWinningNumbers([1, 2, 3, 4, 5, 6]);
      cy.typeBonusNumber(7);
      }
    );

    it("올바른 당첨 번호를 입력하면 결과를 확인 할 수 있다.", () => {
      cy.clickElements(DOM_ID.GET_RESULT_BUTTON);
      cy.get(DOM_ID.RESULT_MODAL).should('be.visible');
    });

    it("확인버튼을 누르지 않으면 결과를 확인 할 수 없다.", () => {
      cy.get(DOM_ID.RESULT_MODAL).should('not.be.visible');
    });
  });
});