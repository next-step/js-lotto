import { ERROR_MESSAGE } from "../../src/js/utils/const.js";
import { getRandom } from "../../src/js/utils/util";

const $purchaseInput = '[data-cy="purchase-amount"]';
const $lottoTickets = '[data-cy="lotto-tickets"]';
const cypressPluginTab = require('cypress-plugin-tab');

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
        cy.typePriceInput('1000');
    })

    it('입력한 금액을 그대로 보여준다.', () => {
        cy.typePriceInput('1000');
        cy.get($purchaseInput).should('have.value', '1000');
    })

    it('금액의 단위는 1000으로만 입력한다. :: 틀린 값', () => {
        cy.typePriceInput('1001');
        checkAlert(cy.clickPriceCheckButton(), ERROR_MESSAGE.IncorrectUnit);
    })

    it('1000원 이하의 금액을 입력하고 확인 버튼을 누르면 최소금액 미달 경고창이 뜬다.', () => {
        cy.typePriceInput('900');
        checkAlert(cy.clickPriceCheckButton(), ERROR_MESSAGE.PriceMinInsufficient);
    })

    it('10000원 이상의 금액을 입력하고 확인 버튼을 누르면 최대금액 초과 경고창이 뜬다.', () => {
        cy.typePriceInput('11000');
        checkAlert(cy.clickPriceCheckButton(), ERROR_MESSAGE.PriceMaxExceeded);
    })


    it('숫자 이외의 텍스트를 입력하면 입력을 받지 않는다.', () => {
        cy.typePriceInput('abcd');
        cy.get($purchaseInput).should('not.have.value');
    })
}

function purchaseSpec() {
    it('1000 단위의 금액을 입력하고 확인 버튼을 누르면 수동구매 입력칸을 확인 할 수 있다.', () => {
        cy.typePriceInput('1000');
        cy.clickPriceCheckButton();
        cy.get('.purchased-lotto-manuel-inputs').should('be.visible');
    })

    it('1000 단위의 금액을 입력하고 Enter 키를 누르면 수동구매 입력칸을 확인 할 수 있다.', () => {
        cy.typePriceInput('3000').type('{enter}');
        cy.get('.purchased-lotto-manuel-inputs').should('be.visible');
    })

    it('수동 입력 추가 버튼을 누르면 구매한 갯수만큼 수둥 번호 입력칸을 추가할 수 있다. :: 구매한 갯수 만큼 추가', () => {
        cy.typePriceInput('2000');
        cy.clickPriceCheckButton();
        cy.get('.purchased-lotto-manuel-add').click();
        cy.get('.purchased-lotto-manuel-inputs').should('have.length', 2);
    })

    it('수동 입력 추가 버튼을 누르면 구매한 갯수만큼 수둥 번호 입력칸을 추가할 수 있다. :: 구매한 갯수 초과 추가', () => {
        cy.typePriceInput('1000');
        cy.clickPriceCheckButton();
        checkAlert(cy.get('.purchased-lotto-manuel-add').click(), ERROR_MESSAGE.NotAllowedToAddInput);
    })

    it('삭제 버튼을 누르면 수동 번호 입력칸은 최소 1줄까지 삭제할 수 있다.', () => {
        cy.typePriceInput('2000');
        cy.clickPriceCheckButton();
        cy.get('.purchased-lotto-manuel-add').click();
        cy.get('.purchased-lotto-manuel-delete').click();
        cy.get('.purchased-lotto-manuel-inputs').should('have.length', 1);
    })

    it('삭제 버튼은 수동 버튼 입력칸이 1줄일 경우 disabled 된다', () => {
        cy.typePriceInput('1000');
        cy.clickPriceCheckButton();
        cy.get('.purchased-lotto-manuel-delete').should('be.disabled');
    })

    it('수동 구매 번호는 6자리 전부 입력해야 한다.', () => {
        const numbers = [2, 34];

        cy.typePriceInput('1000');
        cy.clickPriceCheckButton();
        cy.typeLottoManuelNumbers(numbers);
        checkAlert(cy.clickPurchaseButton(), ERROR_MESSAGE.NumbersRequired);
    })

    it('수동 구매 번호는 1 이상 45 이하의 숫자를 입력받는다.', () => {
        const numbers = [10, 2, 44, 67, 89, 4];

        cy.typePriceInput('1000');
        cy.clickPriceCheckButton();
        cy.typeLottoManuelNumbers(numbers);
        checkAlert(cy.clickPurchaseButton(), ERROR_MESSAGE.OutOfNumberRange);
    })

    it('수동 번호 미입력 후 로또 구매하기 버튼을 누르면 구매한 갯수만큼 자동 로또 번호가 발급된다.', () => {
        cy.typePriceInput('2000');
        cy.clickPriceCheckButton();
        cy.clickPurchaseButton();
        cy.get($lottoTickets).children('li').should('have.length', 2);
    })

    it('수동 번호 입력 후 로또 구매하기 버튼을 누르면 수동 로또 번호와 나머지 자동 로또 번호가 발급된다.', () => {
        const numbers = [2, 34, 45, 10, 11, 37];

        cy.typePriceInput('3000');
        cy.clickPriceCheckButton();
        cy.typeLottoManuelNumbers(numbers);
        cy.clickPurchaseButton();
        cy.get($lottoTickets).children('li').should('have.length', 3);
    })

    it('정상적으로 로또 구매하기 버튼을 누른 후 수동 로또 추가/삭제, 로또 구매하기 버튼이 disabled 된다.', () => {
        cy.typePriceInput('2000');
        cy.clickPriceCheckButton();
        cy.clickPurchaseButton();
        cy.get('.purchased-lotto-manuel-add').should('be.disabled');
        cy.get('.purchased-lotto-manuel-delete').should('be.disabled');
        cy.get('.purchase-lotto-button').should('be.disabled');
    })

    it('번호보기 버튼을 켜면 로또 번호를 확인할 수 있다.', () => {
        cy.typePriceInput('3000');
        cy.clickPriceCheckButton();
        cy.clickPurchaseButton();
        cy.clickLottoNumbersToggleButton();
        cy.get($lottoTickets).children().children('.lotto-numbers').should('be.visible');
    })

    it('번호보기 버튼을 끄면 로또 번호를 숨길 수 있다.', () => {
        cy.typePriceInput('3000');
        cy.clickPriceCheckButton();
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
