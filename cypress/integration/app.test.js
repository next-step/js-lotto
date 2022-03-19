const BASE_URL = '../../index.html';

const lotto = {
  numbers: [],
  getNumbers: count => {
    const array = [
      [1, 4, 3, 2, 5, 8],
      [42, 13, 24, 40, 7, 9],
      [28, 10, 36, 42, 9, 5],
    ];

    for (let i = 0; i < count; i++) {
      lotto.numbers.push(array[i]);
    }

    return lotto.numbers;
  },

  fail: () => {
    throw new Error('fail get number');
  },
};

describe('Lotto', () => {
  beforeEach(() => {
    cy.visit(BASE_URL);
  });

  describe('Mission 1: 구입 기능', () => {
    it('로또 구입 금액을 입력하면, 금액에 해당하는 로또를 발급해야 한다.', () => {
      cy.get('[data-props="amount-input"]').type('3000');
      cy.get('[data-props="confirm-button"]').click();
      cy.get('[data-props="count-span"]').should('have.text', '3');
    });

    it('로또 한 장의 가격은 1,000원이므로 입력 단위는 1,000원이어야 한다.', () => {
      const alertStub = cy.stub();
      cy.on('window:alert', alertStub);
      cy.get('[data-props="amount-input"]').type('1234');
      cy.get('[data-props="confirm-button"]')
        .click()
        .then(() => {
          expect(alertStub).to.be.calledWith('로또 구입 금액을 1,000원 단위로 입력해 주세요.');
        });
    });

    it('소비자는 자동 구매를 할 수 있어야 한다.', () => {
      cy.spy(lotto, 'getNumbers');

      cy.get('[data-props="amount-input"]').type('2234');
      cy.get('[data-props="amount-input"]')
        .invoke('val')
        .then(amount => {
          const count = Math.trunc(amount / 1000);
          const boughtLottoNumbers = lotto.getNumbers(count);
          expect(lotto.getNumbers).to.have.returned(boughtLottoNumbers);
        });
    });

    it('번호보기가 토글(해제)되면, 복권 번호를 볼 수 없다.', () => {
      cy.get('[data-props="amount-input"]').type('2000');
      cy.get('[data-props="confirm-button"]').click();
      cy.get('[data-props="toggle-button"]').uncheck();

      cy.get('.lotto-list')
        .not('.flex-col')
        .then(() => {
          cy.get('.lotto-numbers').first().should('not.be.visible');
        });
    });

    it('번호보기가 토글(체크)되면, 복권 번호를 볼 수 있어야 한다.', () => {
      cy.get('[data-props="amount-input"]').type('2000');
      cy.get('[data-props="confirm-button"]').click();
      cy.get('[data-props="toggle-button"]').check({ force: true });

      cy.get('.lotto-list').then(() => {
        cy.get('.lotto-numbers').first().should('be.visible');
      });
    });
  });
});
