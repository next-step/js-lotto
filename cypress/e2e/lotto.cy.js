import {
	LOTTO_TICKETS_WRAPPER,
	LOTTO_NUMBERS_TOGGLE_BUTTON,
	LOTTO_NUMBERS_DETAIL,
	PRICE_INPUT,
	PURCHASED_LOTTO_COUNT_TEXT,
	PRICE_SUBMIT,
	LOTTO_PURCHASE_FORM,
} from '../../src/js/constants/selectors';

describe('로또 구입 금액을 입력하면, 금액에 해당하는 로또를 발급해야 한다.', () => {
	beforeEach(() => {
		cy.visit('/');
	});

	it('로또 구입 금액 1000원을 입력할 수 있다.', () => {
		cy.get(PRICE_INPUT).type('1000');
	});

	it('확인버튼을 누르면, 폼을 제출할 수 있다.', () => {
		cy.get(PRICE_INPUT).type('1000');
		cy.get(LOTTO_PURCHASE_FORM).submit();
	});

	it('제출한 금액만큼 로또가 발급된다.', () => {
		cy.get(PRICE_INPUT).type('1000');
		cy.get(LOTTO_PURCHASE_FORM).submit();
		cy.get(PURCHASED_LOTTO_COUNT_TEXT).should('have.text', '1');
	});
});

describe('로또 1장의 가격은 1,000원이다.', () => {});

describe('소비자는 자동 구매를 할 수 있어야 한다.', () => {});

// describe('복권 번호는 번호보기 토글 버튼을 클릭하면, 볼 수 있어야 한다.', () => {
// 	it('번호보기 토글 버튼을 클릭하면');
// 	cy.visit('/');
// 	cy.get(LOTTO_NUMBERS_TOGGLE_BUTTON).click();
// });

describe('결과 확인하기 버튼을 누르면 당첨 통계, 수익률을 모달로 확인할 수 있다.', () => {});

describe('다시 시작하기 버튼을 누르면 초기화 되서 다시 구매를 시작할 수 있다.', () => {});

describe('소비자는 수동 구매(스스로 구매 번호를 입력)를 할 수 있어야 한다.', () => {});

describe('수동 구매 후 남는 금액이 있다면 자동으로 구매할 수 있어야 한다.', () => {});
