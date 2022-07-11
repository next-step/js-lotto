import {
	SELECTOR_CY,
	RIGHT_PURCHASE_PRICE,
	OVER_1000000_PRICE,
	UNDER_1000_PRICE,
	NOT_TEN_UNIT_PRICE,
	NOT_TEN_UNIT_PRICE_MESSAGE,
} from '../../src/constants';
import { changeAmountToCount } from '../../src/libs';

describe('로또 테스트를 시작합니다.', () => {
	// 성공 시나리오
	context('성공 시나리오', () => {
		beforeEach(() => {
			cy.visit('http://localhost:5500/index.html');
			cy.getByCydata(SELECTOR_CY.AMOUNT_INPUT).clear();
		});

		it('금액을 입력하면, 로또 번호가 자동으로 생성 되어야 한다', () => {
			cy.getByCydata(SELECTOR_CY.AMOUNT_INPUT).type(RIGHT_PURCHASE_PRICE);
			cy.getByCydata(SELECTOR_CY.AMOUNT_INPUT_FORM_SUBMIT).click();

			const purchaseCount = changeAmountToCount(RIGHT_PURCHASE_PRICE);
			cy.getByCydata(SELECTOR_CY.PURCHASE_COUNT).should('have.text', purchaseCount);

			cy.getByCydata(SELECTOR_CY.LOTTO_TICKET).should('have.length', purchaseCount);
			cy.getByCydata(SELECTOR_CY.LOTTO_NUMBER_TOGGLE_BUTTON).click({ force: true });
			cy.getByCydata(SELECTOR_CY.LOTTO_DETAIL).should('have.class', 'd-block');

			cy.getByCydata(SELECTOR_CY.LOTTO_NUMBER_TOGGLE_BUTTON).click({ force: true });
			cy.getByCydata(SELECTOR_CY.LOTTO_DETAIL).should('have.class', 'd-none');
		});
	});

	context('실패 시나리오', () => {
		beforeEach(() => {
			cy.visit('http://localhost:5500/index.html');
			cy.getByCydata(SELECTOR_CY.AMOUNT_INPUT).clear();
		});

		it('1000원 미만금액을 입력하면, HTML Input Invalid 메세지가 나타나야 합니다.', () => {
			cy.getByCydata(SELECTOR_CY.AMOUNT_INPUT).type(OVER_1000000_PRICE);
			cy.getByCydata(SELECTOR_CY.AMOUNT_INPUT_FORM_SUBMIT).click();
			cy.checkInvalidInput();
		});

		it('100000원 초과금액을 입력하면, HTML Input Invalid 메세지가 나타나야 합니다.', () => {
			cy.getByCydata(SELECTOR_CY.AMOUNT_INPUT).type(UNDER_1000_PRICE);
			cy.getByCydata(SELECTOR_CY.AMOUNT_INPUT_FORM_SUBMIT).click();
			cy.checkInvalidInput();
		});

		it('10단위가 아닌 값을 입력하면, Alert 경고 메세지가 떠야합니다.', () => {
			cy.getByCydata(SELECTOR_CY.AMOUNT_INPUT).type(NOT_TEN_UNIT_PRICE);
			cy.getByCydata(SELECTOR_CY.AMOUNT_INPUT_FORM_SUBMIT).click();
			cy.on('window:alert', (t) => {
				//assertions
				expect(t).to.contains(NOT_TEN_UNIT_PRICE_MESSAGE);
			});
		});
	});
});
