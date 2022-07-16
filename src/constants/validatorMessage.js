import { MAX_LOTTO_NUMBER, MIN_LOTTO_NUMBER } from './magicNumber.js';

const getUnderMinimumNumberMessage = (min) => `${min}보다 커야합니다.`;

const getOverMaximumNumberMessage = (max) => `${max}보다 작아야 합니다.`;

export const NOT_TEN_UNIT_PRICE_MESSAGE = '로또 구입 금액을 1,000원 단위로 입력해 주세요.';

export const UNDER_MIN_NUMBER_MESSAGE = getUnderMinimumNumberMessage(MIN_LOTTO_NUMBER);

export const OVER_MAX_NUMBER_MESSAGE = getOverMaximumNumberMessage(MAX_LOTTO_NUMBER);

export const DUPLICATE_NUMBER_MESSAGE = '중복된 숫지는 입력할 수 없습니다.';

export const INPUT_AMOUNT_MESSAGE = '금액을 입력해주세요.';

export const NOT_EMPTY_WINNING_NUMBERS_MESSAGE = '모든 당첨 숫자를 채워야 합니다.';
