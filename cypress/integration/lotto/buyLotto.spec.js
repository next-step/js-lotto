import {PRICE_PER_TICKET} from '../../../src/js/consts.js';

describe('Lotto 구매', () => {
    beforeEach(() => {
        cy.visit('localhost:8080');
    });

    it('로또 구입 금액을 입력하면, 금액에 해당하는 로또를 발급해야 한다.', () => {
        //로또 1장의 가격은 1,000원이다.
        //소비자는 자동 구매를 할 수 있어야 한다.
        const amount = 2000;
        const count = amount / PRICE_PER_TICKET;

        cy.typeAmount(amount);
        cy.autoPurchase();

        cy.getBySel('tickets-count')
          .should('include.text', count);
        cy.getBySel('lotto-number')
          .should('have.length', count);
    });

    it('로또 구입 금액을 1000원 단위로 입력하지 않는경우 Alert 노출된다.', () => {
        const stub = cy.stub();
        cy.on('window:alert', stub);

        cy.typeAmount(2500)
          .then(() => {
              expect(stub.getCall(0))
                  .to
                  .be
                  .calledWith('로또 구입 금액을 1,000원 단위로 입력해 주세요.');
          });
    });

    it('복권 번호는 번호보기 토글 버튼을 클릭하면, 볼 수 있어야 한다.', () => {
        cy.typeAmount(2000);
        cy.autoPurchase();

        cy.getBySel('lotto-number-detail')
          .then($el => {
              expect(Cypress.dom.isVisible($el)).false;
          });

        cy.getBySel('number-detail-switch')
          .click();

        cy.getBySel('lotto-number-detail')
          .then($el => {
              expect(Cypress.dom.isVisible($el)).true;
          });

        cy.getBySel('number-detail-switch')
          .click();

        cy.getBySel('lotto-number-detail')
          .then($el => {
              expect(Cypress.dom.isVisible($el)).false;
          });
    });

    it('로또번호를 수동으로 입력하여 구매할 수 있다.', () => {
        const amount = 2000;
        cy.typeAmount(amount);

        cy.manualPurchase({lottoNumbers: [1, 2, 3, 4, 5, 6]});

        cy.getBySel('tickets-count')
          .should('include.text', 1);
        cy.getBySel('lotto-number')
          .should('have.length', 1);

        cy.manualPurchase({lottoNumbers: [1, 2, 3, 4, 5, 6]});

        cy.getBySel('tickets-count')
          .should('include.text', 2);
        cy.getBySel('lotto-number')
          .should('have.length', 2);
    });

    it('로또번호를 수동으로 입력하여 구매 후 잔액을 자동으로 구입할 수 있다.', () => {
        const amount = 4000;
        cy.typeAmount(amount);

        cy.manualPurchase({lottoNumbers: [1, 2, 3, 4, 5, 6]});
        cy.manualPurchase({lottoNumbers: [1, 2, 3, 4, 5, 6]});

        cy.getBySel('tickets-count')
          .should('include.text', 2);
        cy.getBySel('lotto-number')
          .should('have.length', 2);

        cy.autoPurchase();

        cy.getBySel('tickets-count')
          .should('include.text', 4);
        cy.getBySel('lotto-number')
          .should('have.length', 4);
    });
});
