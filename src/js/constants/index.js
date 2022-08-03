export const LOTTO = {
  PRICE: 1000,
  MAX_NUM: 45,
  MIN_NUM: 1,
  LENGTH: 6,
};

export const ERR_MSG = {
  NOT_MULTIPLE_OF_1000: '로또 구입 금액을 1,000원 단위로 입력해 주세요.',
  NOT_A_DUPLICATE_NUMBER: '로또 번호에는 중복된 숫자를 입력할 수 없습니다.',
};

export const PLACE_LENGTH = 5;

export const PLACE = {
  FIRST: 0,
  SECOND: 1,
  THIRD: 2,
  FOURTH: 3,
  FIFTH: 4,
};

export const PRIZE = {
  [PLACE.FIRST]: 2_000_000_000,
  [PLACE.SECOND]: 30_000_000,
  [PLACE.THIRD]: 1_500_000,
  [PLACE.FOURTH]: 50_000,
  [PLACE.FIFTH]: 5_000,
};
