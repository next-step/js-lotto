import { deepFreeze } from './utils.js';

const MESSAGES = {
	PURCHASE: {
		INVALID_AMOUNT_UNIT_INPUT: '로또 구입 금액을 1,000원 단위로 입력해 주세요.',
		MIN_AMOUNT: '값은 1000 이상이어야 합니다.',
		MAX_AMOUNT: '값은 100000 이하여야 합니다.',
	},
	EMPTY_INPUT: '이 입력란을 작성하세요.',
	LOTTOS: {
		MIN_NUMBER: '값은 1 이상이어야 합니다.',
		MAX_NUMBER: '값은 45 이하여야 합니다.',
		DUPLICATED: '로또 번호에는 중복된 숫자를 입력할 수 없습니다.',
	},
};

const TEXT_COMPONENTS = {
	TITLE: '🎱 행운의 로또',
	PURCHASE: {
		INPUT_LABEL: '구입할 금액을 입력해주세요.',
		INPUT_PLACEHOLDER: '구입 금액',
		BUTTON_LABEL: '확인',
	},
	TICKETS: {
		LABEL_PREFIX: '총',
		LABEL_POSTFIX: '개를 구매하였습니다.',
		SWITCH_LABEL: '번호보기',
		TICKET_TEXT: '🎟️',
	},
	LASTWEEK_RESULT: {
		LABEL: '지난 주 당첨번호 6개와 보너스 넘버 1개를 입력해주세요.',
		WINNING_NUMBERS: '당첨 번호',
		BONUS_NUMBER: '보너스 번호',
	},
	RESULT_BUTTON: {
		LABEL: '결과 확인하기',
	},
	RESULT_MODAL: {
		TITLE: '🏆 당첨 통계 🏆',
		COLUMN_LABELS: {
			NUMBER_OF_MATCHES: '일치 갯수',
			WINNING_AMOUNT: '당첨금',
			NUMBER_OF_WINS: '당첨 갯수',
		},
		ROWS_LABELS: [
			{
				WINNING_PLACE: 1,
				NUMBER_OF_MATCHES: '6개',
				WINNING_AMOUNT: '2,000,000,000',
			},
			{
				WINNING_PLACE: 2,
				NUMBER_OF_MATCHES: '5개 + 보너스볼',
				WINNING_AMOUNT: '30,000,000',
			},
			{
				WINNING_PLACE: 3,
				NUMBER_OF_MATCHES: '5개',
				WINNING_AMOUNT: '1,500,000',
			},
			{
				WINNING_PLACE: 4,
				NUMBER_OF_MATCHES: '4개',
				WINNING_AMOUNT: '50,000',
			},
			{
				WINNING_PLACE: 5,
				NUMBER_OF_MATCHES: '3개',
				WINNING_AMOUNT: '5,000',
			},
		],
		PROFITS: {
			PREFIX: '당신의 총 수익률은',
			POSTFIX: '입니다.',
		},
		RESTART_BUTTON: {
			LABEL: '다시 시작하기',
		},
	},
};

export default {
	MESSAGES: MESSAGES,
	TEXT_COMPONENTS: TEXT_COMPONENTS,
};
