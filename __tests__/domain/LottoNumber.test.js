import ERROR from '../../src/js/constants/error.js';
import { LottoNumber } from '../../src/js/domain/index.js';

describe('로또 번호 테스트', () => {
  it.each([1, 20, 45])('로또 번호는 1~45 사이의 값을 부여받는다.', (number) => {
    const lottoNumber = new LottoNumber(number);
    expect(lottoNumber.value).toBe(number);
  });

  it.each([-1, 0, 46, '한글', {}, [4]])('로또 번호는 1~45 범위 밖의 값을 부여받으면 에러를 표출한다.', (number) => {
    expect(() => {
      // eslint-disable-next-line no-new
      new LottoNumber(number);
    }).toThrow(ERROR.BEYOND_NUMBER_RANGE(LottoNumber.MIN, LottoNumber.MAX));
  });
});
