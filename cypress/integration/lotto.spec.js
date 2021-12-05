import SELECTOR from '../../src/js/constant/selector';
import ERROR_MESSAGE from '../../src/js/constant/errorMessage';
import { LOTTO, MAX_LOTTO_NUMBER } from '../../src/js/constant/lotto';

const BASE_URL = 'http://127.0.0.1:5500';

beforeEach(() => {
  cy.visit(BASE_URL);
});

const buyLotto = (price) => {
  cy.get(SELECTOR.PAYMENT_INPUT).type(price);
  cy.get(SELECTOR.CONFIRM_BUTTON).click();
};

const issueRest = () => {
  cy.get(SELECTOR.MANUAL_NUMBERING_CANCEL).click();
};

const answer = (first, second, third, fourth, fifth, sixth, bonus) => {
  cy.get(`${SELECTOR.ANSWER_FORM} [name="first"]`).type(first);
  cy.get(`${SELECTOR.ANSWER_FORM} [name="second"]`).type(second);
  cy.get(`${SELECTOR.ANSWER_FORM} [name="third"]`).type(third);
  cy.get(`${SELECTOR.ANSWER_FORM} [name="fourth"]`).type(fourth);
  cy.get(`${SELECTOR.ANSWER_FORM} [name="fifth"]`).type(fifth);
  cy.get(`${SELECTOR.ANSWER_FORM} [name="sixth"]`).type(sixth);
  cy.get(`${SELECTOR.ANSWER_FORM} [name="bonus"]`).type(bonus);
  cy.get(SELECTOR.ANSWER_SUBMIT).click();
};

describe('로또 게임', () => {
  beforeEach(() => {
    buyLotto(5000);
  });

  it('로또 구입 금액을 입력하면, 금액에 해당하는 로또를 구입해야 한다.', () => {
    issueRest();
    cy.get(SELECTOR.LOTTO_TICKET).should('have.length', 5);
  });

  it('복권 번호는 번호보기 토글버틀을 클릭하면, 숫자를 확인할수 있어야 한다.', () => {
    issueRest();
    cy.get(SELECTOR.TOGGLE).click();
    cy.get(SELECTOR.LOTTO_DETAIL).first().should('be.visible');
  });

  it('티켓 구매 금액 입력 시, 발급 가능한 티켓 수량을 보여준다.', () => {
    cy.get(SELECTOR.LOTTO_COUNT).should('have.text', 5);
  });

  it('결과 확인 버튼을 누르면 당첨 통계, 수익률을 모달로 확인한다.', () => {
    issueRest();
    answer(1, 2, 3, 4, 5, 6, 7);

    cy.get('.modal').should('be.visible');
  });

  it('다시 시작하기 버튼을 누르면 초기화되어서 다시 구매를 시작할 수 있다.', () => {
    issueRest();
    answer(1, 2, 3, 4, 5, 6, 7);
    cy.get(SELECTOR.RESTART_BUTTON).click();
    cy.get(SELECTOR.MODAL).should('not.to.be.visible');
  });

  it('당첨번호는 1~45 사이의 숫자여야한다.', () => {
    issueRest();
    cy.window().then((window) => cy.stub(window, 'alert').as('alert'));
    answer(LOTTO.MAX_NUMBER + 1, 2, 3, 4, 5, 6, 7);
    cy.get('@alert').should('be.calledWith', ERROR_MESSAGE.INVALID_ANSWER_INPUT);
  });

  it('당첨번호는 중복될 수 없다.', () => {
    cy.window().then((window) => cy.stub(window, 'alert').as('alert'));

    issueRest();
    answer(2, 2, 3, 4, 5, 6, 7);

    cy.get('@alert').should('be.calledWith', ERROR_MESSAGE.INVALID_ANSWER_INPUT);
  });
});
