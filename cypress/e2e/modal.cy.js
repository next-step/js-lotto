import { ERROR_MESSAGE, SELECTOR } from '../../src/js/utils/constants.js';

describe('LOTTO APLICATION의 Modal을 테스트한다.', () => {
  beforeEach(() => {
    cy.visit('../../index.html');
    cy.purchaseLotto(7000);
  });

  context('결과 확인 하기 버튼을 테스트한다.', () => {
    it('input 값을 입력하지 않고 결과 확인 버튼을 클릭하면 모달이 열리지 않는다.', () => {
      cy.get(SELECTOR.INPUT_LOTTO_NUMS).submit();
      cy.get('.modal').should('not.have.class', 'open');
    });

    it('input 값에 1보다 작은 수를 입력할 수 없다.', () => {
      cy.get('.winning-number').each(($el) => {
        cy.wrap($el).type(0);
      });
      cy.get(SELECTOR.INPUT_LOTTO_NUMS).submit();
      cy.get('.modal').should('not.have.class', 'open');
    });

    it('input 값에 45보다 큰 수를 입력할 수 없다.', () => {
      cy.get('.winning-number').each(($el) => {
        cy.wrap($el).type(46);
      });
      cy.get(SELECTOR.INPUT_LOTTO_NUMS).submit();
      cy.get('.modal').should('not.have.class', 'open');
    });

    it('input 값에 중복된 숫자가 입력되면 alert를 띄운다.', () => {
      const alertStub = cy.stub();
      cy.on('window:alert', alertStub);

      cy.get('.winning-number').each(($el) => {
        cy.wrap($el).type(3);
      });

      cy.get('.bonus-number').type(3);

      cy.get(SELECTOR.INPUT_LOTTO_NUMS)
        .submit()
        .then(() => {
          expect(alertStub.getCall(0)).to.be.calledWith(ERROR_MESSAGE.DUPLICATED_NUMBER);
        });
    });

    it('모든 숫자가 다 입력되면, modal 창이 열린다.', () => {
      const lottoNumbers = [1,34,23,33,7,8];
      cy.get('.winning-number').each(($el, index) => {
        cy.wrap($el).type(lottoNumbers[index]);
      });
      cy.get('.bonus-number').type(42);

      cy.get(SELECTOR.INPUT_LOTTO_NUMS)
      .submit();
      cy.get('.modal').should('have.class', 'open');
    })
  });
});
