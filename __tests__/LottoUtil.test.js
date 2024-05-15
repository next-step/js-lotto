import {
  isValidLottoNumber,
  isValidLottoNumberArray,
} from '../src/js/utils/LottoUtil';

const context = describe;
const INVALID_LOTTO_NUMBER = [['1'], [0], [46], [Infinity], [-1], [''], ['  ']];
const INVALID_LOTTO_NUMBERS = [
  [[0, 0, 0, 0, 0, 0], '모든 번호가 0인 경우'],
  [[1, 1, 1, 1, 1, 1], '1부터 6까지 중복된 경우'],
  [[1, 2, 3, 4, 5], '번호가 6개가 아닌 경우'],
  [[7, 15, 21, 32, 44, 49], '유효한 번호 범위를 벗어난 경우'],
];

describe('로또 유틸 기능 테스트', () => {
  describe('로또 번호 유효성 테스트 : 번호는 1~45 사이의 숫자값이다.', () => {
    context.each(INVALID_LOTTO_NUMBER)('%s 가 주어진 경우', (lottoNumber) => {
      it('false를 반환한다.', () => {
        expect(isValidLottoNumber(lottoNumber)).toBeFalsy();
      });
    });
  });

  describe('로또 번호 (배열) 유효성 테스트', () => {
    context.each(INVALID_LOTTO_NUMBERS)('%s 와 같이 %s일 때', (lottoNumber) => {
      it('false를 반환한다.', () => {
        expect(isValidLottoNumberArray(lottoNumber)).toBeFalsy();
      });
    });
  });
});
