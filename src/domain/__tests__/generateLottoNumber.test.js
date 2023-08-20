import {generateLottoNumbers} from '../generateLottoNumbers';
import {MAX_LOTTO_NUMBER, MIN_LOTTO_NUMBER} from '../constants';

describe('generateLottoNumber 함수 test', () => {
  test(`로또 발급 번호는 ${MIN_LOTTO_NUMBER}~${MAX_LOTTO_NUMBER} 사이의 숫자이다.`, () => {
    const lottoNumbers = generateLottoNumbers();

    lottoNumbers.forEach(number => {
      expect(number).toBeGreaterThanOrEqual(MIN_LOTTO_NUMBER);
      expect(number).toBeLessThanOrEqual(MAX_LOTTO_NUMBER);
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
