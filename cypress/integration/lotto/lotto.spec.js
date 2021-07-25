
const $input = () => cy.get("#input-component")
const $purchaseList = () => cy.get('#purchase-list')
const $result = () => cy.get('#result-component')
const $modal = () => cy.get('#modal-component')


context('Lotto E2E 테스트', () => {
    beforeEach(() => {
        cy.visit('../../index.html')
    })

    it('구매금액 입력', () => {
        //given
        const purchaseAmount = 1000

        //when
        $input()
        .find('input')
        .type(purchaseAmount)

        //then
        .should('have.value', 1000)

    })

    it('구매금액 적용', () => {
        //given
        const purchaseAmount = 1000

        //when
        $input()
        .find('input')
        .type(purchaseAmount)
        .type('{Enter}')

        //then
        $purchaseList()
        .should('be.visible')

        $result()
        .should('be.visible')
    })

    it('번호보기 적용', () => {
        //given
        const purchaseAmount = 1000
        $input()
        .find('input')
        .type(purchaseAmount)
        .type('{Enter}')

        //when
        $purchaseList()
        .find('label span')
        .click()


        //then
        $purchaseList()
        .find('.lotto-detail')
        .should('be.visible')
    })


    it('당첨번호 입력', () => {
        //given
        const purchaseAmount = 1000
        $input()
        .find('input')
        .type(purchaseAmount)
        .type('{Enter}')

        
        //when
        $result()
        .find('div:nth-child(1) input:nth-child(1)')
        .type(1)

        $result()
        .find('div:nth-child(1) input:nth-child(2)')
        .type(2)

        $result()
        .find('div:nth-child(1) input:nth-child(3)')
        .type(3)

        $result()
        .find('div:nth-child(1) input:nth-child(4)')
        .type(4)

        $result()
        .find('div:nth-child(1) input:nth-child(5)')
        .type(5)

        $result()
        .find('div:nth-child(1) input:nth-child(6)')
        .type(6)

        $result()
        .find('.bonus-number-container.flex-grow input')
        .type(7)

        $result()
        .find('.bonus-number-container.flex-grow input')
        .focused(false)

        

        //then
        $result()
        .find('div:nth-child(1) input:nth-child(1)')
        .should('be.have', 1)

        $result()
        .find('div:nth-child(1) input:nth-child(2)')
        .should('be.have', 2)

        $result()
        .find('div:nth-child(1) input:nth-child(3)')
        .should('be.have', 3)

        $result()
        .find('div:nth-child(1) input:nth-child(4)')
        .should('be.have',4)

        $result()
        .find('div:nth-child(1) input:nth-child(5)')
        .should('be.have',5)

        $result()
        .find('div:nth-child(1) input:nth-child(6)')
        .should('be.have',6)

        $result()
        .find('.bonus-number-container.flex-grow input')
        .should('be.have',7)

    })


    it('결과보기', () => {
        //given
        const purchaseAmount = 1000
        $input()
        .find('input')
        .type(purchaseAmount)
        .type('{Enter}')

        $result()
        .find('div:nth-child(1) input:nth-child(1)')
        .type(1)

        $result()
        .find('div:nth-child(1) input:nth-child(2)')
        .type(2)

        $result()
        .find('div:nth-child(1) input:nth-child(3)')
        .type(3)

        $result()
        .find('div:nth-child(1) input:nth-child(4)')
        .type(4)

        $result()
        .find('div:nth-child(1) input:nth-child(5)')
        .type(5)

        $result()
        .find('div:nth-child(1) input:nth-child(6)')
        .type(6)

        $result()
        .find('.bonus-number-container.flex-grow input')
        .type(7)

        
        //when
        $result()
        .find('button')
        .click()


        //then
        $modal()
        .should('have.class', 'open')
    })

})