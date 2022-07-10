const LOTTO_PER_PRICE = 1000;
const LOTTO_TRY_COUNT = 6;
const LOTTO_NUMBER_RANGE = 42;
const LOTTO_NUMBERS = Array.from(
  { length: LOTTO_NUMBER_RANGE },
  (_, i) => i + 1
);

export { LOTTO_PER_PRICE, LOTTO_TRY_COUNT, LOTTO_NUMBERS };
