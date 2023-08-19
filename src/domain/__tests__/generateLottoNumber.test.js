import {generateLottoNumbers} from '../generateLottoNumbers';
import {LOTTO_NUMBERS} from '../constants';

describe('generateLottoNumber 함수 test', () => {
  test(`로또 발급 번호는 ${LOTTO_NUMBERS[0]}~${LOTTO_NUMBERS[LOTTO_NUMBERS.length - 1]} 사이의 숫자이다.`, () => {
    const lottoNumbers = generateLottoNumbers();

    lottoNumbers.forEach(number => {
      expect(number).toBeGreaterThanOrEqual(LOTTO_NUMBERS[0]);
      expect(number).toBeLessThanOrEqual(LOTTO_NUMBERS[LOTTO_NUMBERS.length - 1]);
    });
  });

  test('로또 발급 번호는 중복되지 않으며 오름차순이다.', () => {
    const lottoNumbers = generateLottoNumbers();

    const isUniqueAndAscending = lottoNumbers.every((number, index, arr) => {
      if (index === 0) return true;
      return number > arr[index - 1];
    });

    expect(isUniqueAndAscending).toBe(true);
  });
});
