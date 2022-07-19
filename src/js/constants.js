const LOTTO = {
  BONUS_NUMBER_SCORE: 1,
  WINNING_NUMBER_SCORE: 2,
  MAX_INPUT_LENGTH: 2,
  SIZE: 6,
  WINNING_INPUT_SIZE: 7,
  UNIT: 1000,
};

const SCORE = {
  FIRST_PLACE_SCORE: 12,
  SECOND_PLACE_BONUS_SCORE: 11,
  THIRD_PLACE_SCORE: 10,
  FOURTH_PLACE_BONUS_SCORE: 9,
  FOURTH_PLACE_SCORE: 8,
  FIFTH_PLACE_BONUS_SCORE: 7,
  FIFTH_PLACE_SCORE: 6,
};

const LOTTO_NUMBER_UNIT = {
  min: 1,
  max: 45,
};

const INPUT_NAME = {
  WINNING_NUMBER: 'winning-number',
  BONUS_NUMBER: 'bonus-number',
};

const ALERT_MESSAGES = {
  LOTTO_UNIT_ERROR: `로또 구입 금액을 ${LOTTO.UNIT}원 단위로 입력해 주세요.`,
  DUPLICATE_WINNING_NUMBER_ERROR: '로또 번호에는 중복된 숫자를 입력할 수 없습니다.',
};

const INITIAL_PURCHASE_TEXT_LABEL = '총 0개를 구매하였습니다.';

const RANKING = {
  [SCORE.FIRST_PLACE_SCORE]: {
    place: 1,
    price: 2_000_000_000,
  },
  [SCORE.SECOND_PLACE_BONUS_SCORE]: {
    place: 2,
    price: 30_000_000,
  },
  [SCORE.THIRD_PLACE_SCORE]: {
    place: 3,
    price: 1_5000_000,
  },
  [SCORE.FOURTH_PLACE_BONUS_SCORE]: {
    place: 4,
    price: 50_000,
  },
  [SCORE.FOURTH_PLACE_SCORE]: {
    place: 4,
    price: 50_000,
  },
  [SCORE.FIFTH_PLACE_BONUS_SCORE]: {
    place: 5,
    price: 5000,
  },
  [SCORE.FIFTH_PLACE_SCORE]: {
    place: 5,
    price: 5000,
  },
};

export { LOTTO, LOTTO_NUMBER_UNIT, ALERT_MESSAGES, INITIAL_PURCHASE_TEXT_LABEL, INPUT_NAME, RANKING };
