import { SELECTOR } from '../../src/constants';

describe('로또를 구매하면', () => {
  beforeEach(() => {
    cy.visit('http://localhost:9000');
  });

  it('구매한 로또 티켓이 렌더링된다.', () => {
    const purchaseAmount = 5000;
    cy.get(SELECTOR.TICKET.PURCHASE_AMOUNT_INPUT).type(purchaseAmount);
    cy.get(SELECTOR.TICKET.FORM).submit();

    cy.get(SELECTOR.TICKET.AMOUNT).should(
      'contain',
      '총 5개를 구매하였습니다.'
    );
    cy.get(SELECTOR.TICKET.TICKETS).children().should('have.length', 5);
  });

  describe('로또 티켓 번호 토글버튼이 렌더링된다.', () => {
    it('버튼을 한 번 누르면 로또 번호가 표시된다.', () => {
      const purchaseAmount = 1000;
      cy.get(SELECTOR.TICKET.PURCHASE_AMOUNT_INPUT).type(purchaseAmount);
      cy.get(SELECTOR.TICKET.FORM).submit();

      cy.get(SELECTOR.LOTTO.NUMBER_DISPLAY_TOGGLE_LABEL).click();
      cy.get(SELECTOR.LOTTO.NUMBERS).should('be.visible');
    });

    it('버튼을 두 번 누르면 로또 번호가 사라진다.', () => {
      const purchaseAmount = 1000;
      cy.get(SELECTOR.TICKET.PURCHASE_AMOUNT_INPUT).type(purchaseAmount);
      cy.get(SELECTOR.TICKET.FORM).submit();

      cy.get(SELECTOR.LOTTO.NUMBER_DISPLAY_TOGGLE_LABEL).click();
      cy.get(SELECTOR.LOTTO.NUMBER_DISPLAY_TOGGLE_LABEL).click();
      cy.get(SELECTOR.LOTTO.NUMBERS).should('not.visible');
    });
  });

  it('당첨 번호와 보너스 번호를 입력할 수 있다', () => {
    const purchaseAmount = 1000;
    cy.get(SELECTOR.TICKET.PURCHASE_AMOUNT_INPUT).type(purchaseAmount);
    cy.get(SELECTOR.TICKET.FORM).submit();

    const winningNumbers = [1, 2, 3, 4, 5, 6];
    const bonusNumber = 7;

    winningNumbers.forEach((number, index) => {
      cy.get(SELECTOR.LOTTO.WINNING_NUMBER).eq(index).type(number);
    });

    cy.get(SELECTOR.LOTTO.BONUS_NUMBER).type(bonusNumber);
  });
});
