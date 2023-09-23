import { SELECTOR } from '../../src/constants';

describe('로또를 구매하면', () => {
  beforeEach(() => {
    cy.visit('http://localhost:9000');
  });

  describe('금액이 부족할 경우', () => {
    it('경고창이 뜬다.', () => {
      const alertStub = cy.stub().as('alertStub');
      cy.on('window:alert', alertStub);

      cy.purchaseLotto(500).then(() => {
        expect(alertStub).to.have.been.calledWith(
          '구입 금액보다 상품의 가격이 높습니다.'
        );
      });
    });

    it('로또 번호 입력창이 떠서는 안된다.', () => {
      cy.purchaseLotto(500);

      cy.get('.winning-number').should('not.exist');
    });
  });

  it('구매한 로또 티켓이 렌더링된다.', () => {
    const purchaseAmount = 5000;
    cy.purchaseLotto(purchaseAmount);

    cy.get(SELECTOR.TICKET.AMOUNT).should(
      'contain',
      `총 ${purchaseAmount / 1000}개를 구매하였습니다.`
    );
    cy.get(SELECTOR.TICKET.TICKETS).children().should('have.length', 5);
  });

  describe('로또 티켓 번호 토글버튼이 렌더링된다.', () => {
    it('버튼을 한 번 누르면 로또 번호가 표시된다.', () => {
      cy.purchaseLotto(1000);

      cy.toggleLottoNumbers();
      cy.get(SELECTOR.LOTTO.NUMBERS).should('be.visible');
    });

    it('버튼을 두 번 누르면 로또 번호가 사라진다.', () => {
      cy.purchaseLotto(1000);

      cy.toggleLottoNumbers();
      cy.toggleLottoNumbers();
      cy.get(SELECTOR.LOTTO.NUMBERS).should('not.visible');
    });
  });

  it('당첨 번호와 보너스 번호를 입력할 수 있다', () => {
    cy.purchaseLotto(1000);

    const winningNumbers = [1, 2, 3, 4, 5, 6];
    const bonusNumber = 7;

    cy.inputWinningNumbers({
      winningNumbers,
      bonusNumber,
    });
  });
});
