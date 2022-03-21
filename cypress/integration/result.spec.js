import { DOM, ERROR_MESSAGE } from '../../src/js/constants';

describe('당첨 결과 기능', () => {
  beforeEach(() => {
    cy.reload();
  });

  context('로또 구매 이후 당첨번호와 보너스 번호를 입력하는 form이 나타납니다.', () => {
    beforeEach(() => {
      cy.get(`#${DOM.PURCHASE_FORM_INPUT_ID}`).type(4000);
      cy.get(`#${DOM.PURCHASE_FORM_BUTTON_ID}`).click();
    });

    it('당첨 번호 DOM 확인', () => {
      cy.get(`.${DOM.WINNING_NUMBER_CLASS}`).should('exist');
    });

    it('보너스 번호 DOM 확인', () => {
      cy.get(`.${DOM.BONUS_NUMBER_CLASS}`).should('exist');
    });

    it('결과 확인 버튼 DOM 확인', () => {
      cy.get(`#${DOM.OPEN_RESULT_MODAL_BUTTON_ID}`).should('exist');
    });
  });

  context('당첨 번호와 보너스 번호는 1과 45사이의 값이어야 합니다.', () => {
    beforeEach(() => {
      cy.get(`#${DOM.PURCHASE_FORM_INPUT_ID}`).type(4000);
      cy.get(`#${DOM.PURCHASE_FORM_BUTTON_ID}`).click();
    });

    it('당첨 번호: 1, 2, 3, 4, 5, 6 보너스 번호: 7 = 가능', () => {
      cy.get(`.${DOM.WINNING_NUMBER_CLASS}`).each(($el, index) => {
        cy.get($el).type(index + 1);
      });
      cy.get(`.${DOM.BONUS_NUMBER_CLASS}`).type(7);
      cy.get(`#${DOM.OPEN_RESULT_MODAL_BUTTON_ID}`)
        .click()
        .then(() => {
          expect(alertStub.getCall(0)).to.be.calledWith(ERROR_MESSAGE.INVALID_PRICE);
        });
      cy.get(`#${DOM.MODAL_CLASS}`).should('have.class', 'open');
    });

    it('당첨 번호: 41, 42, 43, 44, 45, 46 보너스 번호: 40 = 불가능', () => {
      const alertStub = cy.stub();
      cy.on('window:alert', alertStub);

      cy.get(`.${DOM.WINNING_NUMBER_CLASS}`).each(($el, index) => {
        cy.get($el).type(index + 41);
      });
      cy.get(`.${DOM.BONUS_NUMBER_CLASS}`).type(40);
      cy.get(`#${DOM.OPEN_RESULT_MODAL_BUTTON_ID}`)
        .click()
        .then(() => {
          expect(alertStub.getCall(0)).to.be.calledWith(ERROR_MESSAGE.INVALID_RANGE_LOTTO_NUMBER);
        });
      cy.get(`#${DOM.MODAL_CLASS}`).should('not.have.class', 'open');
    });

    it('당첨 번호: 0, 5, 10, 15, 20, 25 보너스 번호: 30 = 불가능', () => {
      const alertStub = cy.stub();
      cy.on('window:alert', alertStub);

      cy.get(`.${DOM.WINNING_NUMBER_CLASS}`).each(($el, index) => {
        cy.get($el).type(5 * index);
      });
      cy.get(`.${DOM.BONUS_NUMBER_CLASS}`).type(30);
      cy.get(`#${DOM.OPEN_RESULT_MODAL_BUTTON_ID}`)
        .click()
        .then(() => {
          expect(alertStub.getCall(0)).to.be.calledWith(ERROR_MESSAGE.INVALID_RANGE_LOTTO_NUMBER);
        });
      cy.get(`#${DOM.MODAL_CLASS}`).should('not.have.class', 'open');
    });
  });

  context('당첨 번호와 보너스 번호는 겹치지 않는 숫자여야 합니다.', () => {
    beforeEach(() => {
      cy.get(`#${DOM.PURCHASE_FORM_INPUT_ID}`).type(4000);
      cy.get(`#${DOM.PURCHASE_FORM_BUTTON_ID}`).click();
    });

    it('보너스 번호: 1, 1, 2, 2, 3, 3 보너스 번호: 7 = 불가능', () => {
      const alertStub = cy.stub();
      cy.on('window:alert', alertStub);

      cy.get(`.${DOM.WINNING_NUMBER_CLASS}`).each(($el, index) => {
        cy.get($el).type(Math.round((index + 1) / 2));
      });
      cy.get(`.${DOM.BONUS_NUMBER_CLASS}`).type(7);

      cy.get(`#${DOM.OPEN_RESULT_MODAL_BUTTON_ID}`)
        .click()
        .then(() => {
          expect(alertStub.getCall(0)).to.be.calledWith(ERROR_MESSAGE.DUPLICATED_LOTTO_NUMBER);
        });
      cy.get(`#${DOM.MODAL_CLASS}`).should('not.have.class', 'open');
    });

    it('보너스 번호: 40, 41, 42, 43, 44, 45 보너스 번호: 40 = 불가능', () => {
      const alertStub = cy.stub();
      cy.on('window:alert', alertStub);

      cy.get(`.${DOM.WINNING_NUMBER_CLASS}`).each(($el, index) => {
        cy.get($el).type(Math.round(index + 40));
      });
      cy.get(`.${DOM.BONUS_NUMBER_CLASS}`).type(40);

      cy.get(`#${DOM.OPEN_RESULT_MODAL_BUTTON_ID}`)
        .click()
        .then(() => {
          expect(alertStub.getCall(0)).to.be.calledWith(ERROR_MESSAGE.DUPLICATED_LOTTO_NUMBER);
        });
      cy.get(`#${DOM.MODAL_CLASS}`).should('not.have.class', 'open');
    });

    it('보너스 번호: 1, 6, 11, 16, 21, 1 보너스 번호: 13 = 불가능', () => {
      const alertStub = cy.stub();
      cy.on('window:alert', alertStub);

      cy.get(`.${DOM.WINNING_NUMBER_CLASS}`).each(($el, index) => {
        if (index === 5) cy.get($el).type(1);
        else cy.get($el).type(index * 5 + 1);
      });
      cy.get(`.${DOM.BONUS_NUMBER_CLASS}`).type(13);

      cy.get(`#${DOM.OPEN_RESULT_MODAL_BUTTON_ID}`)
        .click()
        .then(() => {
          expect(alertStub.getCall(0)).to.be.calledWith(ERROR_MESSAGE.DUPLICATED_LOTTO_NUMBER);
        });
      cy.get(`#${DOM.MODAL_CLASS}`).should('not.have.class', 'open');
    });
  });
});
