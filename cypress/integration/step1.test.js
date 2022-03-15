/// <reference types="cypress" />

context('step1', () => {
    beforeEach(() => {
        cy.visit('http://localhost:5000')
    })


    it('로또 애플리케이션이 존재해야한다.', () => {
        cy.get('#app').should('be.visible')
    })

    context('로또 구입 금액을 입력하면 금액에 해당하는 로또를 발급해야한다.', () => {
        it('2000을 입력하면 2개를 구매한다', () => {
            cy.get('input[placeholder="구입 금액"]').type('2000')
            cy.get('button:contains("확인")').click()

            cy.get('span:contains("🎟")️').should('have.length', 2)
        })
    })

    context('번호보기 활성화 여부에 따라 복권 번호 노출여부가 결정된다.', () => {
        it('번호보기가 활성화인 경우 복권번호가 노출된다.', () => {
            cy.get('label.switch').click()
            cy.get('span:contains("🎟")️').should('have.text', ',')
        })
        it('번호보기가 비활성화인 경우 복권번호가 가려진다.', () => {
            cy.get('label.switch').click()
            cy.get('span:contains("🎟")️').should('have.not.text', ',')
        })
    })
});
