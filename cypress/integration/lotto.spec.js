import { CLASS_NAME, MESSAGE } from '../../src/js/constants/index.js';

describe('lotto form test', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('당첨 번호는 2자리까지만 입력 가능한가?', () => {
        cy.get(`form.${CLASS_NAME.PURCHASE_FORM}`).within(() => {
            cy.get('input').type(3000);
            cy.get('input').type('{enter}');
        });

        cy.get(`input.${CLASS_NAME.WINNING_NUMBER}`).first().type(123);
        cy.get(`input.${CLASS_NAME.WINNING_NUMBER}`).should('have.value', '12');
    });

    it('당첨 번호 focus 전환이 제대로 이루어 지는가?', () => {
        cy.get(`form.${CLASS_NAME.PURCHASE_FORM}`).within(() => {
            cy.get('input').type(3000);
            cy.get('input').type('{enter}');
        });

        cy.get(`input.${CLASS_NAME.WINNING_NUMBER}`).first().type(12);
        cy.get(`input.${CLASS_NAME.WINNING_NUMBER}:nth-of-type(2)`).should(
            'have.focus'
        );
    });

    it('당첨 번호는 45 이하의 숫자만 입력 가능한가?', () => {
        cy.get(`form.${CLASS_NAME.PURCHASE_FORM}`).within(() => {
            cy.get('input').type(3000);
            cy.get('input').type('{enter}');
        });

        cy.get(`input.${CLASS_NAME.WINNING_NUMBER}`).first().type(46);
        cy.get(`input.${CLASS_NAME.WINNING_NUMBER}`)
            .invoke('prop', 'validationMessage')
            .should('equal', MESSAGE.MAX_NUMBER);
    });

    it('당첨 번호는 1 이상의 숫자만 입력 가능한가?', () => {
        cy.get(`form.${CLASS_NAME.PURCHASE_FORM}`).within(() => {
            cy.get('input').type(3000);
            cy.get('input').type('{enter}');
        });

        cy.get(`input.${CLASS_NAME.WINNING_NUMBER}`).first().type(0);
        cy.get(`input.${CLASS_NAME.WINNING_NUMBER}`)
            .invoke('prop', 'validationMessage')
            .should('equal', MESSAGE.MIN_NUMBER);
    });

    it('결과 확인하기를 눌렀을 때 담청 통계 모달이 제대로 보이는가?', () => {
        cy.get(`form.${CLASS_NAME.PURCHASE_FORM}`).within(() => {
            cy.get('input').type(3000);
            cy.get('input').type('{enter}');
        });

        cy.get(`input.${CLASS_NAME.WINNING_NUMBER}`).then(($inputElements) =>
            [...$inputElements].forEach(($inputElement, index) =>
                cy.wrap($inputElement).type(12 + index)
            )
        );
        cy.get(`input.${CLASS_NAME.BONUS_NUMBER}`).type(18);

        cy.get(`button.${CLASS_NAME.RESULT_BUTTON}`).click();

        cy.get(`div.${CLASS_NAME.MODAL}`).should(
            'have.css',
            'visibility',
            'visible'
        );
    });

    it('다시 시작하기 버튼을 눌렀을 때 구입 금액 입력창과 버튼을 제외한 나머지 요소들은 초기 상태인가?', () => {
        cy.get(`form.${CLASS_NAME.PURCHASE_FORM}`).within(() => {
            cy.get('input').type(3000);
            cy.get('input').type('{enter}');
        });

        cy.get(`input.${CLASS_NAME.WINNING_NUMBER}`).then(($inputElements) =>
            [...$inputElements].forEach(($inputElement, index) =>
                cy.wrap($inputElement).type(12 + index)
            )
        );
        cy.get(`input.${CLASS_NAME.BONUS_NUMBER}`).type(18);

        cy.get(`button.${CLASS_NAME.RESULT_BUTTON}`).click();

        cy.get(`button.${CLASS_NAME.RESET}`).click();

        cy.get('section').should('have.css', 'display', 'none');

        cy.get(`form.${CLASS_NAME.LOTTO_FORM}`).should(
            'have.css',
            'display',
            'none'
        );

        cy.get(`div.${CLASS_NAME.MODAL}`).should(
            'have.css',
            'visibility',
            'hidden'
        );

        cy.get(`form.${CLASS_NAME.PURCHASE_FORM}`).should('have.value', '');
    });
});
