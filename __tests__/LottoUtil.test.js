import {
  isValidLottoNumber,
  isValidLottoNumberArray,
} from '../src/js/utils/LottoUtil';

describe('로또 유틸 기능 테스트', () => {
  describe('번호는 1~45 사이의 숫자값이다.', () => {
    it.each([['1'], [0], [46], [Infinity], [-1], [''], ['  ']])(
      '%s 는 유효하지 않는 로또 번호입니다.',
      (lottoNumber) => {
        expect(isValidLottoNumber(lottoNumber)).toBeFalsy();
      }
    );
  });

  describe('유효한 로또 번호 테스트', () => {
    it.each([
      [[0, 0, 0, 0, 0, 0], '모든 번호가 0인 경우'],
      [[1, 1, 1, 1, 1, 1], '1부터 6까지 중복된 경우'],
      [[1, 2, 3, 4, 5], '번호가 6개가 아닌 경우'],
      [[7, 15, 21, 32, 44, 49], '유효한 번호 범위를 벗어난 경우'],
    ])('"%s" %s', (lottoNumber) => {
      expect(isValidLottoNumberArray(lottoNumber)).toBeFalsy();
    });
  });
});
