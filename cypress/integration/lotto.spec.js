import SELECTOR from '../../src/js/constant/selector';

const BASE_URL = 'http://127.0.0.1:5500';

beforeEach(() => {
  cy.visit(BASE_URL);
});

const buyLotto = (price) => {
  cy.get(SELECTOR.PAYMENT_INPUT).type(price);
  cy.get(SELECTOR.CONFIRM_BUTTON).click();
};

describe('로또 게임', () => {
  it('로또 구입 금액을 입력하면, 금액에 해당하는 로또를 구입해야 한다.', () => {
    buyLotto(5000);

    cy.get(SELECTOR.LOTTO_COUNT).should('have.text', '5');
    cy.get(SELECTOR.LOTTO_TICKET).should('have.length', 5);
  });

  it('복권 번호는 번호보기 토글버틀을 클릭하면, 숫자를 확인할수 있어야 한다.', () => {
    buyLotto(5000);

    cy.get(SELECTOR.TOGGLE).click();
    cy.get(SELECTOR.LOTTO_DETAIL).first().should('be.visible');
  });
});
