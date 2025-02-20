const LOTTO_RANGE = {
  min: 1,
  max: 45,
};

const LOTTO_NUMBERS = Array.from(
  { length: LOTTO_RANGE.max - LOTTO_RANGE.min + 1 },
  (_, index) => LOTTO_RANGE.min + index,
);

export const LOTTO = {
  SIZE: 6,
  PRICE: 1000,

  NUMBERS: LOTTO_NUMBERS,
  RANGE: LOTTO_RANGE,
};
