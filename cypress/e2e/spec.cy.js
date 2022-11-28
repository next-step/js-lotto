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

function inputSpec() {
    it('금액을 입력할 input이 존재한다.', () => {
        cy.get($purchaseInput).should('exist');
    })

    it('금액을 입력할 수 있다.', () => {
        cy.typePurchaseInput('1000');
    })

    it('입력한 금액을 그대로 보여준다.', () => {
        cy.typePurchaseInput('1000');
        cy.get($purchaseInput).should('have.value', '1000');
    })

    it('금액의 단위는 1000으로만 입력한다. :: 틀린 값', () => {
        cy.typePurchaseInput('1001');
        checkAlert(cy.clickPurchaseButton(), '로또 구입 금액을 1000원 단위로 입력해 주세요.');
    })

    it('1000원 이하의 금액을 입력하고 확인 버튼을 누르면 최소금액 미달 경고창이 뜬다.', () => {
        cy.typePurchaseInput('900');
        checkAlert(cy.clickPurchaseButton(), '1000원 이하로 구입할 수 없습니다.');
    })

    it('10000원 이상의 금액을 입력하고 확인 버튼을 누르면 최대금액 초과 경고창이 뜬다.', () => {
        cy.typePurchaseInput('11000');
        checkAlert(cy.clickPurchaseButton(), '10000원 이상 구입할 수 없습니다.');
    })


    it('숫자 이외의 텍스트를 입력하면 입력을 받지 않는다.', () => {
        cy.typePurchaseInput('abcd');
        cy.get($purchaseInput).should('not.have.value');
    })
}

function purchaseSpec() {
    it('1000 단위의 금액을 입력하고 확인 버튼을 누르면 로또 티켓이 금액에 맞는 갯수만큼 발급된다.', () => {
        cy.typePurchaseInput('2000');
        cy.clickPurchaseButton();
        cy.get($lottoTickets).children('li').should('have.length', 2);
    })

    it('1000 단위의 금액을 입력하고 Enter 키를 누르면 로또 티켓이 금액에 맞는 갯수만큼 발급된다.', () => {
        cy.typePurchaseInput('3000').type('{enter}');
        cy.get($lottoTickets).children('li').should('have.length', 3);
    })

    it('번호보기 버튼을 누르면 자동 배정된 번호를 확인 할 수 있다.', () => {
        cy.typePurchaseInput('1000');
        cy.clickPurchaseButton();
        cy.get($lottoNumbersToggleButton).click();
        cy.get($lottoTickets).children().children('.lotto-numbers').should('exist');
    })

    it('번호보기 버튼을 끄면 자동 배정된 번호를 숨길 수 있다.', () => {
        cy.typePurchaseInput('3000');
        cy.clickPurchaseButton();
        cy.clickLottoNumbersToggleButton();
        cy.get($lottoTickets).children().children('.lotto-numbers').should('exist');
        cy.clickLottoNumbersToggleButton();
        cy.get($lottoTickets).children().children('.lotto-numbers').should('not.be.visible');
    })
}

function checkAlert(scenario, message) {
    const stub = cy.stub();
    cy.on('window:alert', stub);
    scenario.then(() => expect(stub.getCall(0).lastArg).to.equals(message));
}
