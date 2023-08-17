import { LOTTO_TERMS } from '../../../src/step1/constants/lotto';
import { ERROR_MESSAGE } from '../../../src/step1/constants/message';
import { LottoError } from '../../../src/step1/errors';
import { Lotto } from '../../../src/step1/model';

describe('Lotto 관련 예외 테스트', () => {
  test.each([
    { lottoNumbers: [null, 33, 1, 4, 22, 34] },
    { lottoNumbers: [true, false, 5, 3, 11, 22] },
    { lottoNumbers: [2, 22, {}, [], 23, 44] },
    { lottoNumbers: [undefined, 12, 22, 13, 44, 33] },
    { lottoNumbers: [Symbol('1'), Symbol('3'), '👍', 12, 22, 13] },
    { lottoNumbers: [NaN, Infinity, 1, 5, 3, 11] },
  ])('$lottoNumbers는 숫자 타입이 아니므로 에러가 발생한다.', ({ lottoNumbers }) => {
    // given - when
    const createLottos = () => new Lotto(lottoNumbers);
    // then
    expect(() => createLottos()).toThrow(LottoError);
    expect(() => createLottos()).toThrow(ERROR_MESSAGE.TYPE_OF_NUMBER);
  });
  test.each([
    { lottoNumbers: [47, 33, 1, 4, 22, 34] },
    { lottoNumbers: [44, 47, 5, 3, 11, 22] },
    { lottoNumbers: [45, 12, 46, 13, 44, 33] },
    { lottoNumbers: [45, 2, 3, 47, 22, 13] },
    { lottoNumbers: [45, 2, 3, 43, 66, 13] },
    { lottoNumbers: [45, 2, 3, 43, 22, 99] },
  ])(`$lottoNumbers의 범위는 ${LOTTO_TERMS.MAX_LOTTO_NUMBER}보다 큰 값이 있어 에러가 발생한다.`, ({ lottoNumbers }) => {
    // given - when
    const createLottos = () => new Lotto(lottoNumbers);
    // then
    expect(() => createLottos()).toThrow(LottoError);
    expect(() => createLottos()).toThrow(ERROR_MESSAGE.INVALID_LOTTO_NUMBER_RANGE);
  });

  test.each([
    { lottoNumbers: [0, 33, 34, 35, 36, 37] },
    { lottoNumbers: [45, -1, 38, 39, 40, 41] },
    { lottoNumbers: [42, 43, -2, 2, 3, 4] },
    { lottoNumbers: [5, 6, 7, -3, 44, 9] },
    { lottoNumbers: [10, 11, 12, 13, -4, 15] },
    { lottoNumbers: [16, 17, 18, 19, 20, -5] },
  ])(
    `$lottoNumbers의 범위는 ${LOTTO_TERMS.MIN_LOTTO_NUMBER}보다 작은 값이 있어 에러가 발생한다.`,
    ({ lottoNumbers }) => {
      // given - when
      const createLottos = () => new Lotto(lottoNumbers);
      // then
      expect(() => createLottos()).toThrow(LottoError);
      expect(() => createLottos()).toThrow(ERROR_MESSAGE.INVALID_LOTTO_NUMBER_RANGE);
    },
  );

  test.each([
    { lottoNumbers: [33, 33, 34, 35, 36, 37] },
    { lottoNumbers: [45, 45, 38, 39, 40, 41] },
    { lottoNumbers: [42, 43, 43, 2, 3, 4] },
    { lottoNumbers: [5, 6, 7, 7, 44, 9] },
    { lottoNumbers: [10, 11, 12, 13, 13, 15] },
    { lottoNumbers: [16, 17, 18, 19, 20, 20] },
  ])(`$lottoNumbers는 중복 되는 값이 존재하여 에러가 발생한다.`, ({ lottoNumbers }) => {
    // given - when
    const createLottos = () => new Lotto(lottoNumbers);
    // then
    expect(() => createLottos()).toThrow(LottoError);
    expect(() => createLottos()).toThrow(ERROR_MESSAGE.DUPLICATE_LOTTO_NUMBERS);
  });

  test.each([
    { lottoNumbers: [33, 34, 35, 36, 37] },
    { lottoNumbers: [45, 38, 39, 40, 41, 42, 43] },
    { lottoNumbers: [] },
    { lottoNumbers: [5, 6, 7, 44, 9, 10, 11, 12] },
    { lottoNumbers: [10, 11, 12] },
    { lottoNumbers: [16, 17] },
  ])(
    `$lottoNumbers의 길이가 ${LOTTO_TERMS.DEFAULT_LIMIT_LOTTO_COUNT}개가 아니므로 에러가 발생한다.`,
    ({ lottoNumbers }) => {
      // given - when
      const createLottos = () => new Lotto(lottoNumbers);
      // then
      expect(() => createLottos()).toThrow(LottoError);
      expect(() => createLottos()).toThrow(ERROR_MESSAGE.NOT_DEFAULT_LIMIT_LOTTO_COUNT);
    },
  );
});
