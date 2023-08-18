import { ERROR_MESSAGE } from '../../../src/step1/constants/message';
import { BonusNumberError } from '../../../src/step1/errors';
import { Bank } from '../../../src/step1/model';

describe('Bank 관련 예외 테스트', () => {
  describe('보너스 번호가 숫자가 아닌 값이 입력된 case 테스트', () => {
    test.each([
      { winningLottoNumbers: [1, 2, 3, 4, 5, 6], bonusNumber: '6' },
      { winningLottoNumbers: [1, 2, 3, 4, 5, 6], bonusNumber: null },
      { winningLottoNumbers: [1, 2, 3, 4, 5, 6], bonusNumber: undefined },
      { winningLottoNumbers: [1, 2, 3, 4, 5, 6], bonusNumber: Symbol('1') },
      { winningLottoNumbers: [1, 2, 3, 4, 5, 6], bonusNumber: true },
      { winningLottoNumbers: [1, 2, 3, 4, 5, 6], bonusNumber: [] },
      { winningLottoNumbers: [1, 2, 3, 4, 5, 6], bonusNumber: {} },
    ])('$bonusNumber는 숫자가 아니므로 에러가 발생한다.', ({ winningLottoNumbers, bonusNumber }) => {
      // given - when
      const createBanks = () => new Bank({ winningLottoNumbers, bonusNumber });
      // then
      expect(() => createBanks()).toThrow(BonusNumberError);
      expect(() => createBanks()).toThrow(ERROR_MESSAGE.TYPE_OF_NUMBER);
    });
  });

  describe('보너스 번호가 유효한 범위에 없는 값인 case 테스트', () => {
    test.each([
      { winningLottoNumbers: [1, 2, 3, 4, 5, 6], bonusNumber: -1 },
      { winningLottoNumbers: [1, 2, 3, 4, 5, 6], bonusNumber: 0 },
      { winningLottoNumbers: [1, 2, 3, 4, 5, 6], bonusNumber: 46 },
      { winningLottoNumbers: [1, 2, 3, 4, 5, 6], bonusNumber: 100 },
    ])('$bonusNumber는 유효한 범위에 없으므로 에러가 발생한다.', ({ winningLottoNumbers, bonusNumber }) => {
      // given - when
      const createBanks = () => new Bank({ winningLottoNumbers, bonusNumber });
      // then
      expect(() => createBanks()).toThrow(BonusNumberError);
      expect(() => createBanks()).toThrow(ERROR_MESSAGE.INVALID_BONUS_NUMBER_RANGE);
    });
  });

  describe('보너스 번호과 당첨 번호 내 중복된 값이 존재하는 case 테스트', () => {
    test.each([
      { winningLottoNumbers: [1, 2, 3, 4, 5, 6], bonusNumber: 1 },
      { winningLottoNumbers: [7, 8, 9, 10, 11, 12], bonusNumber: 7 },
      { winningLottoNumbers: [13, 14, 15, 16, 17, 18], bonusNumber: 14 },
      { winningLottoNumbers: [19, 20, 21, 22, 23, 24], bonusNumber: 21 },
    ])(
      '$bonusNumber는 $winningLottoNumbers에 이미 존재하므로 에러가 발생한다.',
      ({ winningLottoNumbers, bonusNumber }) => {
        // given - when
        const createBanks = () => Bank.from(winningLottoNumbers, bonusNumber);
        // then
        expect(() => createBanks()).toThrow(BonusNumberError);
        expect(() => createBanks()).toThrow(ERROR_MESSAGE.DUPLICATE_BONUS_NUMBER);
      },
    );
  });
});
