import {
  DUMMY_WINNING_LOTTO,
  DUMMY_INCORRECT_WINNING_LOTTO_BY_NOT_ENOUGH_LENGTH,
  DUMMY_INCORRECT_WINNING_LOTTO_BY_NOT_POSITIVE_NUMBER,
  DUMMY_INCORRECT_WINNING_LOTTO_BY_DUPLICATE_NUMBER,
  DUMMY_INCORRECT_WINNING_LOTTO_BY_DUPLICATE_BONUS_NUMBER,
  DUMMY_INCORRECT_BONUS_NUMBER
} from './constants';
import { LottoMachine } from '../src/domain/models/index';
import {
  ERROR_MESSAGE,
  LOTTO_NUMBER_SEPARATOR,
  LOTTO_NUMBER_LENGTH,
  LOTTO_BONUS_NUMBER_LENGTH,
  LOTTO_MIN_NUMBER,
  LOTTO_MAX_NUMBER
} from '../src/domain/constants/index';

describe('로또 당첨 번호 테스트', () => {
  test.each(DUMMY_WINNING_LOTTO)(
    '로또 기계는 당첨 번호와 보너스 번호를 갖는다.($winningLottoNumber, $bonusNumber)',
    ({ winningLottoNumber, bonusNumber }) => {
      const lottoMachine = new LottoMachine(winningLottoNumber, bonusNumber);
      expect(lottoMachine.winningLottoNumber.join(LOTTO_NUMBER_SEPARATOR)).toBe(winningLottoNumber);
      expect(lottoMachine.bonusNumber).toBe(bonusNumber);
    }
  );

  test.each(DUMMY_WINNING_LOTTO)(
    `로또 당첨 번호는 ${LOTTO_NUMBER_LENGTH}개의 숫자와 ${LOTTO_BONUS_NUMBER_LENGTH}개의 보너스 번호로 이루어져 있다.`,
    ({ winningLottoNumber, bonusNumber }) => {
      const lottoMachine = new LottoMachine(winningLottoNumber, bonusNumber);
      expect(lottoMachine.winningLottoNumber).toHaveLength(LOTTO_NUMBER_LENGTH);
      expect(lottoMachine.bonusNumber).toBe(bonusNumber);
    }
  );

  test.each(DUMMY_INCORRECT_WINNING_LOTTO_BY_NOT_ENOUGH_LENGTH)(
    `로또 당첨 번호가 ${LOTTO_NUMBER_LENGTH}개 숫자 미만이라면 오류가 발생한다.`,
    ({ winningLottoNumber, bonusNumber }) => {
      expect(() => new LottoMachine(winningLottoNumber, bonusNumber)).toThrowError(
        ERROR_MESSAGE.INVALID_WINNING_LOTTO_NUMBER
      );
    }
  );

  test.each(DUMMY_INCORRECT_WINNING_LOTTO_BY_NOT_POSITIVE_NUMBER)(
    `로또 당첨 번호가 로또 숫자 범위(${LOTTO_MIN_NUMBER} ~ ${LOTTO_MAX_NUMBER})를 벗어난다면 오류가 발생한다.`,
    ({ winningLottoNumber, bonusNumber }) => {
      expect(() => new LottoMachine(winningLottoNumber, bonusNumber)).toThrowError(
        ERROR_MESSAGE.INVALID_WINNING_LOTTO_NUMBER_BY_RANGE
      );
    }
  );

  test.each(DUMMY_INCORRECT_WINNING_LOTTO_BY_DUPLICATE_NUMBER)(
    '로또 당첨 번호에 중복된 숫자가 존재한다면 오류가 발생한다.',
    ({ winningLottoNumber, bonusNumber }) => {
      expect(() => new LottoMachine(winningLottoNumber, bonusNumber)).toThrowError(
        ERROR_MESSAGE.INVALID_WINNING_LOTTO_NUMBER_BY_DUPLICATE
      );
    }
  );

  test.each(DUMMY_INCORRECT_WINNING_LOTTO_BY_DUPLICATE_BONUS_NUMBER)(
    '로또 당첨 번호와 보너스 번호가 중복된다면 오류가 발생한다.',
    ({ winningLottoNumber, bonusNumber }) => {
      expect(() => new LottoMachine(winningLottoNumber, bonusNumber)).toThrowError(
        ERROR_MESSAGE.INVALID_BONUS_NUMBER_BY_DUPLICATE
      );
    }
  );

  test.each(DUMMY_INCORRECT_BONUS_NUMBER)(
    `보너스 번호가 로또 숫자 범위(${LOTTO_MIN_NUMBER} ~ ${LOTTO_MAX_NUMBER})를 벗어난다면 오류가 발생한다.`,
    ({ winningLottoNumber, bonusNumber }) => {
      expect(() => new LottoMachine(winningLottoNumber, bonusNumber)).toThrowError(
        ERROR_MESSAGE.INVALID_BONUS_NUMBER_BY_RANGE
      );
    }
  );
});
