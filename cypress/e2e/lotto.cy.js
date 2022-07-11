import {
  LOTTO_NUMBER_LENGTH,
  LOTTO_UNIT_PRICE,
  MAX_LOTTO_NUMBER,
  MIN_LOTTO_NUMBER,
  errorMessages,
} from '../../src/js/constants';

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

  describe('소비자는 자동 구매를 할 수 있어야 한다.', () => {
    beforeEach(() => {
      cy.pay(5000);

      const lottos = [];

      cy.get('.lotto-detail').each((el) => {
        const lottoNumbers = el.text().split(', ').map(Number);
        lottos.push(lottoNumbers);
      });

      cy.wrap(lottos).as('lottos');
    });

    it('구매한 로또 한 장은 총 6개의 숫자를 포함한다.', function () {
      this.lottos.forEach((lotto) => {
        expect(lotto).to.have.lengthOf(LOTTO_NUMBER_LENGTH);
      });
    });

    it('로또 숫자는 1이상 45이하의 숫자이다.', function () {
      this.lottos.forEach((lotto) => {
        lotto.forEach((number) => {
          expect(number).to.above(MIN_LOTTO_NUMBER - 1);
          expect(number).to.below(MAX_LOTTO_NUMBER + 1);
        });
      });
    });

    it('로또 한 장은 서로 다른 숫자로 구성된다.', function () {
      this.lottos.forEach((lotto) => {
        expect(new Set(lotto).size).to.equal(LOTTO_NUMBER_LENGTH);
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
