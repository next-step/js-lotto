import { DOM, MESSAGE } from '../../src/js/constants.js';

describe('구매 기능', () => {
  beforeEach(() => {
    cy.reload();
  });

  describe('로또는 1000원 단위입니다.', () => {
    it('4500원은 1000원 단위로 나누어지지 않기 때문에 불가능합니다.', () => {
      const alertStub = cy.stub();
      cy.on('window:alert', alertStub);

      cy.get(`#${DOM.purchaseFormInput}`).type(4500);
      cy.get(`#${DOM.purchaseFormButton}`)
        .click()
        .then(() => {
          expect(alertStub.getCall(0)).to.be.calledWith(
            MESSAGE.pleaseEnterlottoPurchasePriceInUnitsOf1000,
          );
        });
      cy.get(`#${DOM.purchaseFormInput}`).should('have.value', '');
    });

    it('3500원은 1000원 단위로 나누어지지 않기 때문에 불가능합니다.', () => {
      const alertStub = cy.stub();
      cy.on('window:alert', alertStub);

      cy.get(`#${DOM.purchaseFormInput}`).type(3500);
      cy.get(`#${DOM.purchaseFormButton}`)
        .click()
        .then(() => {
          expect(alertStub.getCall(0)).to.be.calledWith(
            MESSAGE.pleaseEnterlottoPurchasePriceInUnitsOf1000,
          );
        });
      cy.get(`#${DOM.purchaseFormInput}`).should('have.value', '');
    });
  });

  describe('로또 구입 금액을 입력하면, 금액에 해당하는 로또를 발급해야 합니다.', () => {
    it('2000원은 2개 구매 가능합니다.', () => {
      cy.get(`#${DOM.purchaseFormInput}`).type(2000);
      cy.get(`#${DOM.purchaseFormButton}`).click();
      cy.get(`#${DOM.purchaseSectionLabel}`).should('have.text', '총 2개를 구매하였습니다.');
      cy.get(`#${DOM.purchaseSectionLottoNumbersFlexBox}`).children().should('have.length', 2);
    });

    it('3000원은 3개 구매 가능합니다.', () => {
      cy.get(`#${DOM.purchaseFormInput}`).type(3000);
      cy.get(`#${DOM.purchaseFormButton}`).click();
      cy.get(`#${DOM.purchaseSectionLabel}`).should('have.text', '총 3개를 구매하였습니다.');
      cy.get(`#${DOM.purchaseSectionLottoNumbersFlexBox}`).children().should('have.length', 3);
    });

    it('4000원은 4개 구매 가능합니다.', () => {
      cy.get(`#${DOM.purchaseFormInput}`).type(4000);
      cy.get(`#${DOM.purchaseFormButton}`).click();
      cy.get(`#${DOM.purchaseSectionLabel}`).should('have.text', '총 4개를 구매하였습니다.');
      cy.get(`#${DOM.purchaseSectionLottoNumbersFlexBox}`).children().should('have.length', 4);
    });
  });

  describe('복권 번호는 번호보기 토글 버튼을 클릭하면, 볼 수 있어야 합니다.', () => {
    it('토글이 됐다면 번호가 보여야합니다.', () => {
      cy.get(`#${DOM.purchaseFormInput}`).type(4000);
      cy.get(`#${DOM.purchaseFormButton}`).click();
      cy.get(`#${DOM.purchaseSectionLottoNumbersToggleButton}`).click({ force: true });
      cy.get(`.${DOM.lottoDetail}`).each($el => {
        cy.get($el).should('have.css', 'display', 'inline');
      });

      cy.get(`#${DOM.purchaseSectionLottoNumbersToggleButton}`).click({ force: true });
      cy.get(`.${DOM.lottoDetail}`).each($el => {
        cy.get($el).should('have.css', 'display', 'none');
      });
    });

    it('토글이 됐다면 flex의 방향은 column이 되어야합니다', () => {
      cy.get(`#${DOM.purchaseFormInput}`).type(4000);
      cy.get(`#${DOM.purchaseFormButton}`).click();
      cy.get(`#${DOM.purchaseSectionLottoNumbersToggleButton}`).click({ force: true });
      cy.get(`#${DOM.purchaseSectionLottoNumbersFlexBox}`).should('have.class', 'flex-col');
    });
  });

  describe('소비자는 자동 구매를 할 수 있어야 합니다.', () => {
    it('구매가 됐다면 6개의 숫자를 가지고 있어야 합니다.', () => {
      cy.get(`#${DOM.purchaseFormInput}`).type(1000);
      cy.get(`#${DOM.purchaseFormButton}`).click();
      cy.get(`.${DOM.lottoDetail}`)
        .invoke('text')
        .then(text => text.split(',').length)
        .should('equal', 6);
    });

    it('6개의 숫자는 서로 달라야합니다.', () => {
      const set = new Set(pickDifferentSixNumbers()).size;
      expect(set.size).to.equal(6);
    });

    it('6개의 숫자는 1에서 45 사이의 숫자여야 합니다.', () => {
      const pickNumberes = pickDifferentSixNumbers();
      pickNumberes.map(number => expect(number).to.be.greaterThan(0).and.to.be.lessThan(46));
    });
  });
});
