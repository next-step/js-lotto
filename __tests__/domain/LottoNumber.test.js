import { LottoNumber } from '../../src/js/domain/LottoNumber';

describe('로또 번호 테스트', () => {
  it.each([1, 20, 45])('로또 번호는 1~45 사이의 값을 부여받는다.', (value) => {
    const lottoNumber = new LottoNumber(value);

    expect(lottoNumber.number).toBe(value);
  });

  it.each([-1, 0, 46, '한글', {}, [4]])('로또 번호는 1~45 범위 밖의 값을 부여받으면 에러를 표출한다.', (value) => {
    expect(() => {
      const lottoNumber = new LottoNumber(value);
      expect(lottoNumber.number).toBeUndefined();
    }).toThrow();
  });
});
