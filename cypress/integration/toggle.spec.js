import { CLASS_NAME } from '../../src/js/utils/constants.js';

describe('toggle button test', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('번호보기를 활성화했을 경우 로또 번호가 제대로 표시되는가?', () => {
        cy.get(`form.${CLASS_NAME.PURCHASE_FORM}`).within(() => {
            cy.get('input').type(4300);
            cy.get('input').type('{enter}');
        });

        cy.get(`input.${CLASS_NAME.TOGGLE_BUTTON}`).check({ force: true });

        cy.get(`ul.${CLASS_NAME.LOTTO_LIST} li`).each(($li) => {
            cy.wrap($li)
                .find('.lotto-numbers')
                .should('have.css', 'display', 'inline');
        });
    });

    it('번호보기를 비활성화했을 경우 로또 번호가 제대로 사리지는가?', () => {
        cy.get(`form.${CLASS_NAME.PURCHASE_FORM}`).within(() => {
            cy.get('input').type(4300);
            cy.get('input').type('{enter}');
        });

        cy.get(`input.${CLASS_NAME.TOGGLE_BUTTON}`).check({ force: true });
        cy.get(`input.${CLASS_NAME.TOGGLE_BUTTON}`).uncheck({ force: true });

        cy.get(`ul.${CLASS_NAME.LOTTO_LIST} li`).each(($li) => {
            cy.wrap($li)
                .find(`.${CLASS_NAME.LOTTO_NUMBERS}`)
                .should('have.css', 'display', 'none');
        });
    });

    it('로또를 새로 구입한 경우 번호보기 초기화가 되는가?', () => {
        cy.get(`form.${CLASS_NAME.PURCHASE_FORM}`).within(() => {
            cy.get('input').type(3000);
            cy.get('input').type('{enter}');
        });

        cy.get(`input.${CLASS_NAME.TOGGLE_BUTTON}`).check({ force: true });

        cy.get(`form.${CLASS_NAME.PURCHASE_FORM}`).within(() => {
            cy.get('input').clear().type(4000);
            cy.get('input').type('{enter}');
        });

        cy.get(`input.${CLASS_NAME.TOGGLE_BUTTON}`).should('be.not.checked');
    });
});
