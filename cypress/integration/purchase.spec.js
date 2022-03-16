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

  describe('로또 구입 금액을 입력하면, 금액에 해당하는 로또를 발급해야 한다.', () => {
    it('2000원은 2개 구매 가능합니다.', () => {
      cy.get(`#${DOM.purchaseFormInput}`).type(2000);
      cy.get(`#${DOM.purchaseFormButton}`).click();
      cy.get(`#${DOM.purchaseSectionLabel}`).should('have.text', '총 2개를 구매하였습니다.');
    });

    it('3000원은 3개 구매 가능합니다.', () => {
      cy.get(`#${DOM.purchaseFormInput}`).type(3000);
      cy.get(`#${DOM.purchaseFormButton}`).click();
      cy.get(`#${DOM.purchaseSectionLabel}`).should('have.text', '총 3개를 구매하였습니다.');
    });

    it('4000원은 4개 구매 가능합니다.', () => {
      cy.get(`#${DOM.purchaseFormInput}`).type(4000);
      cy.get(`#${DOM.purchaseFormButton}`).click();
      cy.get(`#${DOM.purchaseSectionLabel}`).should('have.text', '총 4개를 구매하였습니다.');
    });
  });

  // it('소비자는 자동 구매를 할 수 있어야 한다.', () => {
  //   expect(false).to.equal(true);
  // });

  // it('복권 번호는 번호보기 토글 버튼을 클릭하면, 볼 수 있어야 한다.', () => {
  //   expect(false).to.equal(true);
  // });
});
