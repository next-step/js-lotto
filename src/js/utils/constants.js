export const SLOTS = {
	PRICE_FORM: 'price-form',
	LOTTO_SECTION: 'lotto-section',
	NUMBER_SECTION: 'number-section',
	RESULT_MODAL: 'result-modal',
}

export const CLASS = {
	DP_NONE: 'dp-none',
	LOTTO_CONTAINER: 'lotto-container',
	LOTTO_COUNT: 'lotto-count',
	LOTTO: 'lotto',
	LOTTO_NUMBERS: 'lotto-numbers',
	LOTTO_TOGGLE_BTN: 'lotto-numbers-toggle-button',
	NUMBER_WINNING_CONTAINER: 'winning-number-container',
	NUMBER_BONUS_CONTAINER: 'bonus-number-container',
	NUMBER_WINNING: 'winning-number',
	NUMBER_BONUS: 'bonus-number',
	EARNINGS_RATE: 'earnings-rate',
	RESULT_BTN: 'open-result-modal-button',
	RESULT_ROW_CONTAINER: 'result-row-container',
	MODAL_OPEN: 'open',
	MODAL_CLOSE_BTN: 'modal-close',
	RELOAD_BTN: 'load-btn',
}

export const SELECTOR = {
	PRICE_FORM: `[data-slot="${SLOTS.PRICE_FORM}"]`,
	LOTTO_SECTION: `[data-slot="${SLOTS.LOTTO_SECTION}"]`,
	NUMBER_SECTION: `[data-slot="${SLOTS.NUMBER_SECTION}"]`,
	RESULT_MODAL: `[data-slot="${SLOTS.RESULT_MODAL}"]`,
	INPUT_PRICE: `#input-price`,
	PRICE_BTN: `#price-btn`,
	LOTTO_CONTAINER: `.${CLASS.LOTTO_CONTAINER}`,
	LOTTO_COUNT: `.${CLASS.LOTTO_COUNT}`,
	LOTTOS: `.lotto-container > .${CLASS.LOTTO}`,
	LOTTO_NUMBERS: `.${CLASS.LOTTO_NUMBERS}`,
	LOTTO_TOGGLE_BTN: `.${CLASS.LOTTO_TOGGLE_BTN}`,
	NUMBER_WINNING_CONTAINER: `.${CLASS.NUMBER_WINNING_CONTAINER}`,
	NUMBER_BONUS_CONTAINER: `.${CLASS.NUMBER_BONUS_CONTAINER}`,
	EARNINGS_RATE: `.${CLASS.EARNINGS_RATE}`,
	RESULT_BTN: `.${CLASS.RESULT_BTN}`,
	RESULT_ROW_CONTAINER: `.${CLASS.RESULT_ROW_CONTAINER}`,
	MODAL_CLOSE_BTN: `.${CLASS.MODAL_CLOSE_BTN}`,
	RELOAD_BTN: `.${CLASS.RELOAD_BTN}`,
}

export const KEYS = {
	ENTER: 13,
}

export const TEXTS = {
	ALERT_WRONG_PRICE: '로또 구입 금액을 1,000원 단위로 입력해 주세요.',
	ALERT_INVALID_NUMBER: '로또 번호는 1부터 45까지만 입력할 수 있습니다.',
	ALERT_DUPLICATE_NUMBER: '로또 번호에는 중복된 숫자를 입력할 수 없습니다.',
}

export const NUMBERS = {
	LOTTO_PRICE_UNIT: 1000,
	LOTTO_NUMBER_SIZE: 6,
	LOTTO_BONUS_SIZE: 1,
	LOTTO_MAX: 45,
	LOTTO_MIN: 1,
}

export const PRIZES = [
	{
		condition: {
			winning: 3,
			bonus: 0,
		},
		title: '3개',
		money: '5,000',
	},
	{
		condition: {
			winning: 4,
			bonus: 0,
		},
		title: '4개',
		money: '50,000',
	},
	{
		condition: {
			winning: 5,
			bonus: 0,
		},
		title: '5개',
		money: '1,500,000',
	},
	{
		condition: {
			winning: 5,
			bonus: 1,
		},
		title: '5개 + 보너스볼',
		money: '30,000,000',
	},
	{
		condition: {
			winning: 6,
			bonus: 0,
		},
		title: '6개',
		money: '2,000,000,000',
	},
]
