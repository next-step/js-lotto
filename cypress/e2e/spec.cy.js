const $purchaseInput = '[data-cy="purchase-amount"]';
const $purchaseButton = '[data-cy="purchase-button"]';
const $lottoTickets = '[data-cy="lotto-tickets"]';
const $lottoNumbersToggleButton = '[data-cy="toggle-lotto-numbers"]';

describe('로또 구현 테스트', () => {
    beforeEach('로또 페이지 방문', () => {
        cy.visit('/');
    })

    inputSpec();
    purchaseSpec();
})

function typePurchaseInput(price) {
    return cy.get($purchaseInput).type(price);
}

function clickPurchaseButton() {
    return cy.get($purchaseButton).click();
}

function clickLottoNumbersToggleButton() {
    return cy.get($lottoNumbersToggleButton).click();
}

function checkAlert(scenario, message) {
    const stub = cy.stub();
    cy.on('window:alert', stub);
    scenario.then(() => expect(stub.getCall(0).lastArg).to.equals(message));
}

function inputSpec() {
    it('금액을 입력할 input이 존재한다.', () => {
        cy.get($purchaseInput).should('exist');
    })

    it('금액을 입력할 수 있다.', () => {
        typePurchaseInput('1000');
    })

    it('입력한 금액을 그대로 보여준다.', () => {
        typePurchaseInput('1000');
        cy.get($purchaseInput).should('have.value', '1000');
    })

    it('금액의 단위는 1000으로만 입력한다. :: 틀린 값', () => {
        typePurchaseInput('1001');
        checkAlert(clickPurchaseButton(), '로또 구입 금액을 1,000원 단위로 입력해 주세요.');
    })

    it('금액의 단위는 1000으로만 입력한다. :: 1000보다 작은 단위', () => {
        typePurchaseInput('900');
        checkAlert(clickPurchaseButton(), '로또 구입 금액을 1,000원 단위로 입력해 주세요.');
    })

    it('금액의 단위는 1000으로만 입력한다. :: 음수값 입력', () => {
        typePurchaseInput('-1000');
        checkAlert(clickPurchaseButton(), '로또 구입 금액을 1,000원 단위로 입력해 주세요.');
    })

    it('숫자 이외의 텍스트를 입력하면 입력을 받지 않는다.', () => {
        typePurchaseInput('abcd');
        cy.get($purchaseInput).should('not.have.value');
    })
}

function purchaseSpec() {
    it('1000 단위의 금액을 입력하고 확인 버튼을 누르면 로또 티켓이 금액에 맞는 갯수만큼 발급된다.', () => {
        typePurchaseInput('2000');
        clickPurchaseButton();
        cy.get($lottoTickets).children().should('have.length', 2);
    })

    it('번호보기 버튼을 누르면 자동 배정된 번호를 확인 할 수 있다.', () => {
        typePurchaseInput('1000');
        clickPurchaseButton();
        cy.get($lottoNumbersToggleButton).click();
        cy.get($lottoTickets).children().children('.lotto-numbers').should('exist');
    })

    it('번호보기 버튼을 끄면 자동 배정된 번호를 숨길 수 있다.', () => {
        typePurchaseInput('3000');
        clickPurchaseButton();
        clickLottoNumbersToggleButton();
        cy.get($lottoTickets).children().children('.lotto-numbers').should('exist');
        clickLottoNumbersToggleButton();
        cy.get($lottoTickets).children().children('.lotto-numbers').should('not.be.visible');
    })
}