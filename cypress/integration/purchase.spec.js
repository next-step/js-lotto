import { DOM, ERROR_MESSAGE, LOTTO_PRICE } from '../../src/js/constants.js';
import { pickLottoNumbers } from '../../src/js/utils/index.js';

describe('구매 기능', () => {
  beforeEach(() => {
    cy.reload();
  });

  context(`로또는 ${LOTTO_PRICE}원 단위입니다.`, () => {
    it('4500원 = 구매 불가능', () => {
      const alertStub = cy.stub();
      cy.on('window:alert', alertStub);

      cy.get(`#${DOM.PURCHASE_FORM_INPUT}`).type(4500);
      cy.get(`#${DOM.PURCHASE_FORM_BUTTON}`)
        .click()
        .then(() => {
          expect(alertStub.getCall(0)).to.be.calledWith(ERROR_MESSAGE.INVALID_PRICE);
        });
      cy.get(`#${DOM.PURCHASE_FORM_INPUT}`).should('have.value', '');
    });

    it('3500원 = 구매 불가능', () => {
      const alertStub = cy.stub();
      cy.on('window:alert', alertStub);

      cy.get(`#${DOM.PURCHASE_FORM_INPUT}`).type(3500);
      cy.get(`#${DOM.PURCHASE_FORM_BUTTON}`)
        .click()
        .then(() => {
          expect(alertStub.getCall(0)).to.be.calledWith(ERROR_MESSAGE.INVALID_PRICE);
        });
      cy.get(`#${DOM.PURCHASE_FORM_INPUT}`).should('have.value', '');
    });

    it('4000원 = 구매 가능', () => {
      cy.get(`#${DOM.PURCHASE_FORM_INPUT}`).type(4000);
      cy.get(`#${DOM.PURCHASE_FORM_BUTTON}`).click();
      cy.get(`#${DOM.PURCHASE_SECTION_LABEL}`).should('have.text', '총 4개를 구매하였습니다.');
      cy.get(`#${DOM.PURCHASE_FORM_INPUT}`).should('have.value', '');
    });
  });

  context('로또 구입 금액을 입력하면, 금액에 해당하는 로또를 발급해야 합니다.', () => {
    it('2000원 = 2개 구매', () => {
      cy.get(`#${DOM.PURCHASE_FORM_INPUT}`).type(2000);
      cy.get(`#${DOM.PURCHASE_FORM_BUTTON}`).click();
      cy.get(`#${DOM.PURCHASE_SECTION_LABEL}`).should('have.text', '총 2개를 구매하였습니다.');
      cy.get(`#${DOM.PURCHASE_SECTION_LOTTO_NUMBERS_FLEXBOX}`).children().should('have.length', 2);
    });

    it('3000원 = 3개 구매', () => {
      cy.get(`#${DOM.PURCHASE_FORM_INPUT}`).type(3000);
      cy.get(`#${DOM.PURCHASE_FORM_BUTTON}`).click();
      cy.get(`#${DOM.PURCHASE_SECTION_LABEL}`).should('have.text', '총 3개를 구매하였습니다.');
      cy.get(`#${DOM.PURCHASE_SECTION_LOTTO_NUMBERS_FLEXBOX}`).children().should('have.length', 3);
    });

    it('10000원은 = 10개 구매', () => {
      cy.get(`#${DOM.PURCHASE_FORM_INPUT}`).type(10000);
      cy.get(`#${DOM.PURCHASE_FORM_BUTTON}`).click();
      cy.get(`#${DOM.PURCHASE_SECTION_LABEL}`).should('have.text', '총 10개를 구매하였습니다.');
      cy.get(`#${DOM.PURCHASE_SECTION_LOTTO_NUMBERS_FLEXBOX}`).children().should('have.length', 10);
    });
  });

  context('복권 번호는 번호보기 토글 버튼을 클릭하면, 볼 수 있어야 합니다.', () => {
    it('토글이 됐다면 번호가 보여야합니다.', () => {
      cy.get(`#${DOM.PURCHASE_FORM_INPUT}`).type(4000);
      cy.get(`#${DOM.PURCHASE_FORM_BUTTON}`).click();
      cy.get(`#${DOM.PURCHASE_SECTION_LOTTO_NUMBERS_TOGGLE_BUTTON}`).click({ force: true });
      cy.get(`.${DOM.LOTTO_DETAIL}`).each($el => {
        cy.get($el).should('have.css', 'display', 'inline');
      });

      cy.get(`#${DOM.PURCHASE_SECTION_LOTTO_NUMBERS_TOGGLE_BUTTON}`).click({ force: true });
      cy.get(`.${DOM.LOTTO_DETAIL}`).each($el => {
        cy.get($el).should('have.css', 'display', 'none');
      });
    });

    it('토글이 됐다면 flex의 방향은 column이 되어야합니다', () => {
      cy.get(`#${DOM.PURCHASE_FORM_INPUT}`).type(4000);
      cy.get(`#${DOM.PURCHASE_FORM_BUTTON}`).click();
      cy.get(`#${DOM.PURCHASE_SECTION_LOTTO_NUMBERS_TOGGLE_BUTTON}`).click({ force: true });
      cy.get(`#${DOM.PURCHASE_SECTION_LOTTO_NUMBERS_FLEXBOX}`).should('have.class', 'flex-col');
    });
  });

  context('소비자는 자동 구매를 할 수 있어야 합니다.', () => {
    it('구매가 됐다면 6개의 숫자를 가지고 있어야 합니다.', () => {
      cy.get(`#${DOM.PURCHASE_FORM_INPUT}`).type(4000);
      cy.get(`#${DOM.PURCHASE_FORM_BUTTON}`).click();
      cy.get(`.${DOM.LOTTO_DETAIL}`).each($el => {
        cy.get($el)
          .invoke('text')
          .then(text => text.split(',').length)
          .should('equal', 6);
      });
    });

    it('6개의 숫자는 서로 달라야합니다.', () => {
      const set = new Set(pickLottoNumbers());
      expect(set.size).to.equal(6);
    });

    it('6개의 숫자는 1에서 45 사이의 숫자여야 합니다.', () => {
      const pickNumberes = pickLottoNumbers();
      pickNumberes.map(number => expect(number).to.be.greaterThan(0).and.to.be.lessThan(46));
    });
  });
});
