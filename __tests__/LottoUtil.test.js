import {
  convertLottoStringToLottoArray,
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

  describe('로또 문자열을 로또 배열로 변환 테스트', () => {
    context('로또 문자열 1,2, 3, 4,5,6를 받을 때', () => {
      it('[1, 2, 3, 4, 5, 6]를 반환한다.', () => {
        // given
        const input = ' 1,2, 3, 4,5,6';

        // when
        const lottoNumbers = convertLottoStringToLottoArray(input);

        // then
        expect(lottoNumbers).toEqual([1, 2, 3, 4, 5, 6]);
      });
    });

    context.each([['a, b, d, 3, 24, 43'], ['0, 2, 45, 100, 22, 11']])(
      '%s 와 같이 로또 형식에 맞지 않는 문자열을 받을 때',
      (expected) => {
        it('TypeError를 Throw 한다.', () => {
          expect(() => convertLottoStringToLottoArray(expected)).toThrow();
        });
      }
    );
  });
});
