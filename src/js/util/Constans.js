export const VALUE = {
  LOTTO: {
    MIN_LOTTO_PRICE: 1000,
    MAX_LOTTO_PRICE: 100000,
    LOTTO_COUNT: 6,
    LOTTO_MAX_NUM: 45,
    LOTTO_UNIT: 1000,
  },
};

export const ERR_MESSAGE = {
  LOTTO: {
    INVAILD_PRICE: `${VALUE.LOTTO.MIN_LOTTO_PRICE} ~ ${VALUE.LOTTO.MAX_LOTTO_PRICE} 사이의 값만 입력 가능합니다.`,
  },
};
