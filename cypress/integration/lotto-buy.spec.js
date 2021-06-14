import {LOTTO_PRICE_PER_UNIT} from '../../src/js/consts/lottoConsts.js';

describe('lotto 구입 기능', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8080');
    });

    it(`로또 구입 금액은 ${LOTTO_PRICE_PER_UNIT} 단위여야 한다. 아닌 경우 alert`, () => {
        //given
        const amount = 1500;
        const stub = cy.stub();
        cy.on('window:alert', stub);

        //when
        cy.getBySel('amount-input')
          .type(amount);

        //then
        cy.getBySel('amount-submit-button')
          .click()
          .then(() => {
              expect(stub.getCall(0))
                  .to
                  .be
                  .calledWithMatch('로또 구입 금액을 1,000원 단위로 입력해 주세요.');
          });

        //다음단계 진행 x
        cy.getBySel('lotto-count-message')
          .should('not.exist');
    });

    it('로또 구입 금액을 입력하면, 금액에 해당하는 로또를 발급해야 한다.', () => {
        //given
        const amount = 2000;

        //when
        cy.getBySel('amount-input')
          .type(amount);
        cy.getBySel('amount-submit-button')
          .click();

        //then
        const count = amount / LOTTO_PRICE_PER_UNIT;
        cy.getBySel('lotto-count-message')
          .contains(count);
        cy.getBySel('lotto-item-wrapper')
          .should('have.length', count);
    });

    it('복권 번호는 번호보기 토글 버튼을 클릭하면, 볼 수 있어야 한다.', () => {
        //given
        const amount = 2000;

        //when
        cy.getBySel('amount-input')
          .type(amount);
        cy.getBySel('amount-submit-button')
          .click();

        //then
        cy.getBySel('lotto-item-number')
          .should('not.visible');

        cy.getBySel('toggle-number-switch')
          .click();
        cy.getBySel('lotto-item-number')
          .should('be.visible');
    });
});
