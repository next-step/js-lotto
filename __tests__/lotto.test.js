import {
  NUMBER_OF_LOTTO_NUMBERS,
  MIN_LOTTO_NUMBER,
  MAX_LOTTO_NUMBER,
} from "../src/js/constants";
import { generateRandomLottoNumbers } from "../src/js/lotto";

test("generateRandomLottoNumbers function should generate correct lotto numbers", () => {
  const lottoNumbers = generateRandomLottoNumbers();
  expect(lottoNumbers.length).toEqual(NUMBER_OF_LOTTO_NUMBERS);
  lottoNumbers.forEach((number) => {
    expect(number).toBeGreaterThanOrEqual(MIN_LOTTO_NUMBER);
    expect(number).toBeLessThanOrEqual(MAX_LOTTO_NUMBER);
  });
});
