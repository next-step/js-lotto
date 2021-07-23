export const VALUE = {
  LOTTO_MIN_PRICE: 1000,
  LOTTO_MAX_PRICE: 100000,
  LOTTO_COUNT: 6,
  LOTTO_BONUS_COUNT: 1,
  LOTTO_ALL_NUMBER_COUNT: 7,
  LOTTO_UNIT: 1000,
  LOTTO_MIN_NUM: 1,
  LOTTO_MAX_NUM: 45,
};

export const ERR_MESSAGE = {
  LOTTO: {
    INVAILD_PRICE: `${VALUE.LOTTO_MIN_PRICE} ~ ${VALUE.LOTTO_MAX_PRICE} 사이의 값만 입력 가능합니다.`,
  },
  WINNER_NUMBER: {
    INVAILD_NUMS: `${VALUE.LOTTO_MIN_NUM} ~ ${VALUE.LOTTO_MAX_NUM} 사이의 값만 입력 가능합니다.`,
    DUPLICATE_NUMS: `로또 번호에는 중복된 숫자를 입력할 수 없습니다.`,
  },
};

export const WINNER_INFOS = {};
