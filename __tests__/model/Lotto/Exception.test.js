import { LOTTO_TERMS } from '../../../src/step1/constants/lotto';
import { ERROR_MESSAGE } from '../../../src/step1/constants/message';
import { LottoError } from '../../../src/step1/errors';
import { Lotto } from '../../../src/step1/model';

describe('Lotto 관련 예외 테스트', () => {
  describe('로또 번호 내 다른 타입이 존재하는 case 테스트', () => {
    test.each([
      { lottoNumbers: [null, 33, 1, 4, 22, 34] },
      { lottoNumbers: [true, false, 5, 3, 11, 22] },
      { lottoNumbers: ['7', 4, 5, 3, 11, 22] },
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
  });

  describe('생성된 로또 번호 중 유효하지 않은 로또 번호 범위의 값이 존재하는 case 테스트', () => {
    test.each([{ lottoNumbers: [47, 33, 1, 4, 22, 34] }])(
      `$lottoNumbers의 범위는 ${LOTTO_TERMS.MAX_LOTTO_NUMBER}보다 큰 값이 있어 에러가 발생한다.`,
      ({ lottoNumbers }) => {
        // given - when
        const createLottos = () => new Lotto(lottoNumbers);
        // then
        expect(() => createLottos()).toThrow(LottoError);
        expect(() => createLottos()).toThrow(ERROR_MESSAGE.INVALID_LOTTO_NUMBER_RANGE);
      },
    );

    test.each([{ lottoNumbers: [0, 33, 34, 35, 36, 37] }, { lottoNumbers: [45, -1, 38, 39, 40, 41] }])(
      `$lottoNumbers의 범위는 ${LOTTO_TERMS.MIN_LOTTO_NUMBER}보다 작은 값이 있어 에러가 발생한다.`,
      ({ lottoNumbers }) => {
        // given - when
        const createLottos = () => new Lotto(lottoNumbers);
        // then
        expect(() => createLottos()).toThrow(LottoError);
        expect(() => createLottos()).toThrow(ERROR_MESSAGE.INVALID_LOTTO_NUMBER_RANGE);
      },
    );
  });

  describe('생성된 로또 번호 중 중복 되는 값이 존재하는 case 테스트', () => {
    test.each([{ lottoNumbers: [33, 33, 34, 35, 36, 37] }])(
      `$lottoNumbers는 중복 되는 값이 존재하여 에러가 발생한다.`,
      ({ lottoNumbers }) => {
        // given - when
        const createLottos = () => new Lotto(lottoNumbers);
        // then
        expect(() => createLottos()).toThrow(LottoError);
        expect(() => createLottos()).toThrow(ERROR_MESSAGE.DUPLICATE_LOTTO_NUMBERS);
      },
    );
  });

  describe('로또 내 존재하는 로또 번호의 갯수가 올바른 갯수가 아닌 case 테스트', () => {
    test.each([
      { lottoNumbers: [33, 34, 35, 36, 37] },
      { lottoNumbers: [45, 38, 39, 40, 41, 42, 43] },
      { lottoNumbers: [] },
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
});
