import { LOTTO_UNIT_PRICE, errorMessages } from '../../src/js/constants';

describe('lotto', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('로또 구입 금액을 입력하면, 금액에 해당하는 로또를 발급해야 한다.', () => {
    const won = 5000;
    const totalLotto = won / LOTTO_UNIT_PRICE;

    cy.pay(won);

    cy.get('#orders-message').should('contain', `${totalLotto}개`);
    cy.get('#lotto-list > li').should('have.lengthOf', totalLotto);
  });

  it('로또 1장의 가격은 1,000원이다.', () => {
    cy.on('window:alert', (message) => {
      expect(message).to.equal(errorMessages.LOTTO_UNIT_PRICE_ERROR);
    });

    cy.pay(5100);
  });

  it('소비자는 자동 구매를 할 수 있어야 한다.', () => {
    cy.pay(5000);
    cy.get('.lotto-detail').each((el) => {
      const numbers = el.text().split(', ').map(Number);

      expect(numbers).to.have.lengthOf(6);
      numbers.forEach((number) => {
        expect(number).to.above(0);
        expect(number).to.below(46);
      });
    });
  });

  it('복권 번호는 번호보기 토글 버튼을 클릭하면, 볼 수 있어야 한다.', () => {
    cy.pay(5000);

    cy.findByText('번호보기').click();
    cy.get('.lotto-detail').should('be.visible');

    cy.findByText('번호보기').click();
    cy.get('.lotto-detail').should('not.be.visible');
  });
});
