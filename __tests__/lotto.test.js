import {
  NUMBER_OF_LOTTO_NUMBERS,
  MIN_LOTTO_NUMBER,
  MAX_LOTTO_NUMBER,
} from "../src/js/constants";
import { checkLottoResult, generateRandomLottoNumbers } from "../src/js/lotto";

test.each(Array.from({ length: 20 }))(
  "generateRandomLottoNumbers function should generate correct lotto numbers",
  () => {
    const lottoNumbers = generateRandomLottoNumbers();
    console.log(lottoNumbers);
    expect(lottoNumbers.length).toEqual(NUMBER_OF_LOTTO_NUMBERS);
    lottoNumbers.forEach((number) => {
      expect(number).toBeGreaterThanOrEqual(MIN_LOTTO_NUMBER);
      expect(number).toBeLessThanOrEqual(MAX_LOTTO_NUMBER);
    });
  }
);

test.each([
  [[1, 2, 3, 4, 5, 6], [1, 2, 3, 4, 5, 6], 7, 1],
  [[1, 2, 3, 4, 5, 6], [1, 2, 3, 4, 5, 6], 43, 1],
  [[1, 2, 3, 4, 5, 7], [1, 2, 3, 4, 5, 6], 7, 2],
  [[1, 2, 3, 4, 5, 43], [1, 2, 3, 4, 5, 6], 43, 2],
  [[1, 2, 3, 4, 5, 43], [1, 2, 3, 4, 5, 6], 7, 3],
  [[1, 2, 3, 4, 5, 7], [1, 2, 3, 4, 5, 6], 43, 3],
  [[1, 2, 3, 4, 42, 43], [1, 2, 3, 4, 5, 6], 7, 4],
  [[1, 2, 3, 4, 42, 7], [1, 2, 3, 4, 5, 6], 7, 4],
  [[1, 2, 3, 41, 42, 43], [1, 2, 3, 4, 5, 6], 7, 5],
  [[1, 2, 3, 41, 42, 7], [1, 2, 3, 4, 5, 6], 7, 5],
])(
  "checkLottoResult function should return a correct result",
  (numbers, winningNumbers, bonusNumber, expectedResult) => {
    const result = checkLottoResult(numbers, winningNumbers, bonusNumber);
    expect(result).toEqual(expectedResult);
  }
);

test.each([
  [1, 2000000000],
  [2, 30000000],
  [3, 1500000],
  [4, 50000],
  [5, 5000],
  [0, 0],
])(
  "getPrizeByResult function should return a correct prize for the given result",
  (result, expectedPrize) => {
    expect(getPrizeByResult(result)).toEqual(expectedPrize);
  }
);
