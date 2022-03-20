import { CLASS_NAME, MESSAGE } from '../../src/js/utils/constants.js';

describe('purchase lotto test', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('브라우저 첫 진입 시 Section과 Lotto Form이 "display: none" 처리가 되어 있는가?', () => {
        cy.get('section').should('have.css', 'display', 'none');

        cy.get(`form.${CLASS_NAME.LOTTO_FORM}`).should(
            'have.css',
            'display',
            'none'
        );
    });

    it('로또 금액 input에 focus 처리가 되어 있는가?', () => {
        cy.get(`form.${CLASS_NAME.PURCHASE_FORM}`).within(() => {
            cy.get('input').should('have.focus');
        });
    });

    it('로또를 구입할 금액을 입력할 수 있는가?', () => {
        cy.get(`form.${CLASS_NAME.PURCHASE_FORM}`).within(() => {
            cy.get('input').type('1000');
            cy.get('input').should('have.value', '1000');
        });
    });

    it('1000원 이상의 금액으로만 로또를 구입할 수 있는가?', () => {
        cy.get(`form.${CLASS_NAME.PURCHASE_FORM}`).within(() => {
            cy.get('input')
                .invoke('prop', 'validationMessage')
                .should('equal', MESSAGE.IS_REQUIRED);
            cy.get('input').type(950);
            cy.get('input')
                .invoke('prop', 'validationMessage')
                .should('equal', MESSAGE.MIN_VALUE);
            cy.get('input').clear().type(1000);
            cy.get('input')
                .invoke('prop', 'validationMessage')
                .should('equal', '');
        });
    });

    it('10000원 이하의 금액으로만 로또를 구입할 수 있는가?', () => {
        cy.get(`form.${CLASS_NAME.PURCHASE_FORM}`).within(() => {
            cy.get('input')
                .invoke('prop', 'validationMessage')
                .should('equal', MESSAGE.IS_REQUIRED);
            cy.get('input').type(11000);
            cy.get('input')
                .invoke('prop', 'validationMessage')
                .should('equal', MESSAGE.MAX_VALUE);
            cy.get('input').clear().type(10000);
            cy.get('input')
                .invoke('prop', 'validationMessage')
                .should('equal', '');
        });
    });

    it('금액에 맞게 로또의 구입이 이루어 졌는가?', () => {
        cy.get(`form.${CLASS_NAME.PURCHASE_FORM}`).within(() => {
            cy.get('input').type(4300);
            cy.get('input').type('{enter}');
        });

        cy.get('section')
            .find(`label.${CLASS_NAME.SECTION_TITLE_LABEL}`)
            .should('have.text', '총 4개를 구매하였습니다.');

        cy.get('section')
            .find(`ul.${CLASS_NAME.LOTTO_LIST} li`)
            .should('have.length', 4);
    });
});
