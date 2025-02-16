const LOTTO_NUMBERS = Array.from({ length: 45 }).map((_, index) => index + 1);

const LOTTO_RANGE = {
  min: LOTTO_NUMBERS[0],
  max: LOTTO_NUMBERS[LOTTO_NUMBERS.length - 1],
};

export const LOTTO = {
  SIZE: 6,
  PRICE: 1000,

  NUMBERS: LOTTO_NUMBERS,
  RANGE: LOTTO_RANGE,
};
