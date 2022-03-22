export const LOTTO = {
	PRICE: 1000,
	COUNT: 6,
	MINUMUM_LOTTO_VALUE: 1,
	MAXIMUM_LOTTO_VALUE: 45,
};

export const MESSAGES = {
	NON_UNIT_VALUE_ALERT: '로또 구입 금액을 1,000원 단위로 입력해 주세요.',
	HAS_DUPLICATES_IN_WINNING_NUMBERS_ALERT:
		'로또 번호에는 중복된 숫자를 입력할 수 없습니다.',
};

export const EVENT = {
	PURCHASE_LOTTO: 'PURCHASE_LOTTO',
};

export const TEXTS = {
	PURCHASED_COUNTS: '총 {0}개를 구매하였습니다.',
};

export const STATUS = {
	INIT: 'INIT',
	PURCHASED: 'PURCHASED',
};
