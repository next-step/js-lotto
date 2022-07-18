import {
	CORRECT_PURCHASE_PRICE,
	OVER_MAX_PRICE,
	UNDER_MIN_PRICE,
	NOT_TEN_UNIT_PRICE,
} from '../fixtures/price.js';
import { SELECTOR_CY } from '../fixtures/selector.js';
import { changeAmountToCount } from '../../src/libs';
import { NOT_TEN_UNIT_PRICE_MESSAGE } from '../../src/constants/validatorMessage.js';

describe('로또 테스트를 시작합니다.', () => {
	beforeEach(() => {
		cy.visit('http://localhost:5500/index.html');
		cy.getByCydata(SELECTOR_CY.AMOUNT_INPUT).clear();
	});

	context('성공 시나리오', () => {
		beforeEach(() => {
			cy.getByCydata(SELECTOR_CY.AMOUNT_INPUT).type(CORRECT_PURCHASE_PRICE);
			cy.getByCydata(SELECTOR_CY.AMOUNT_INPUT_FORM_SUBMIT).click();
		});

		context('로또 금액 입력 및 로또 구매 과정', () => {
			it('금액을 입력하면, 로또 번호가 자동으로 생성 되어야 한다', () => {
				const purchaseCount = changeAmountToCount(CORRECT_PURCHASE_PRICE);
				cy.getByCydata(SELECTOR_CY.PURCHASE_COUNT).should('have.text', purchaseCount);

				cy.getByCydata(SELECTOR_CY.LOTTO_TICKET).should('have.length', purchaseCount);
			});

			it('로또를 구매하고, 스위치 버튼을 클릭하면 로또 번호를 확인할 수 있어야 한다.', () => {
				cy.getByCydata(SELECTOR_CY.LOTTO_NUMBER_TOGGLE_BUTTON).click({ force: true });
				cy.getByCydata(SELECTOR_CY.LOTTO_DETAIL).should('have.class', 'd-block');

				cy.getByCydata(SELECTOR_CY.LOTTO_NUMBER_TOGGLE_BUTTON).click({ force: true });
				cy.getByCydata(SELECTOR_CY.LOTTO_DETAIL).should('have.class', 'd-none');
			});
		});

		context('로또 결과 확인 과정', () => {
			beforeEach('', () => {
				cy.getByCydata(SELECTOR_CY.WINNING_NUMBER).then((elements) => cy.typeMultiInput(elements));
				cy.getByCydata(SELECTOR_CY.BONUS_NUMBER).then((element) => cy.typeSoleInput(element));
				cy.getByCydata(SELECTOR_CY.OPEN_RESULT_MODAL).click();
			});

			it('로또 당첨번호를 입력하고, 결과학인버튼을 누르면 결과 모달을 확인할 수 있어야 한다.', () => {
				cy.getByCydata(SELECTOR_CY.MODAL).should('have.class', 'open');
			});

			it('결과확인 모달에는 당첨 통계와 수익률이 표시되어야 한다.', () => {
				cy.getByCydata(SELECTOR_CY.WINNING_5).should('not.contain', 'rank');
				cy.getByCydata(SELECTOR_CY.PROFIT).should('not.be.empty');
			});

			it('모달 종료버튼을 클릭하면, 모달창이 사라져야 한다.', () => {
				cy.getByCydata(SELECTOR_CY.CLOSE_RESULT_MODAL).click();
				cy.getByCydata(SELECTOR_CY.MODAL).should('not.have.class', 'open');
			});

			it('다시 시작하기를 누르면, 초기화면으로 돌아가야 한다.', () => {
				cy.getByCydata(SELECTOR_CY.RESTART).click();
				cy.getByCydata(SELECTOR_CY.AMOUNT_INPUT).should('be.empty');
			});
		});
	});

	context('실패 시나리오', () => {
		it('1000원 미만금액을 입력하면, HTML Input Invalid 메세지가 나타나야 합니다.', () => {
			cy.getByCydata(SELECTOR_CY.AMOUNT_INPUT).type(OVER_MAX_PRICE);
			cy.getByCydata(SELECTOR_CY.AMOUNT_INPUT_FORM_SUBMIT).click();
			cy.checkInvalidInput(SELECTOR_CY.AMOUNT_INPUT, '값은 100000 이하여야 합니다.');
		});

		it('100000원 초과금액을 입력하면, HTML Input Invalid 메세지가 나타나야 합니다.', () => {
			cy.getByCydata(SELECTOR_CY.AMOUNT_INPUT).type(UNDER_MIN_PRICE);
			cy.getByCydata(SELECTOR_CY.AMOUNT_INPUT_FORM_SUBMIT).click();
			cy.checkInvalidInput(SELECTOR_CY.AMOUNT_INPUT, '값은 1000 이상이어야 합니다.');
		});

		it('10단위가 아닌 값을 입력하면, Alert 경고 메세지가 떠야합니다.', () => {
			cy.getByCydata(SELECTOR_CY.AMOUNT_INPUT).type(NOT_TEN_UNIT_PRICE);
			cy.getByCydata(SELECTOR_CY.AMOUNT_INPUT_FORM_SUBMIT).click();
			cy.on('window:alert', (t) => {
				expect(t).to.contains(NOT_TEN_UNIT_PRICE_MESSAGE);
			});
		});
	});
});
