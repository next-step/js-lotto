export const LOTTO = {
	PRICE: 1000,
	COUNT: 6,
	MINUMUM_LOTTO_VALUE: 1,
	MAXIMUM_LOTTO_VALUE: 45,
	PRIZE_MONEY_BY_MATCH: new Map([
		['0', 0],
		['1', 0],
		['2', 0],
		['3', 5000],
		['4', 50_000],
		['5', 1_500_000],
		['5+', 30_000_000],
		['6', 2_000_000_000],
	]),
};

export const MESSAGES = {
	NON_UNIT_VALUE_ALERT: '로또 구입 금액을 1,000원 단위로 입력해 주세요.',
	HAS_DUPLICATES_IN_WINNING_NUMBERS_ALERT:
		'로또 번호에는 중복된 숫자를 입력할 수 없습니다.',
};

export const EVENT = {
	INITIALIZE: 'INITIALIZE',
	PURCHASE_LOTTO: 'PURCHASE_LOTTO',
	SUBMIT_WINNING_NUMBERS: 'SUBMIT_WINNING_NUMBERS',
};

export const TEXTS = {
	PURCHASED_COUNT: '총 {0}개를 구매하였습니다.',
	MATCH_DESCRIPTION: '{0}개',
	MATCH_DESCRIPTION_WITH_BONUS: '{0}개 + 보너스볼',
	EARNING_RATE: '당신의 총 수익률은 {0}%입니다.',
};

export const STATUS = {
	INIT: 'INIT',
	PURCHASED: 'PURCHASED',
};
