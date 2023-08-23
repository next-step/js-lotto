import {
  DUMMY_LOTTO_TICKETS,
  DUMMY_INVALID_RANGE_NUMBER_LOTTO_TICKETS,
  DUMMY_DUPLICATE_NUMBER_LOTTO_TICKETS
} from './constants';
import {
  LOTTO_MODE,
  LOTTO_NUMBER_LENGTH,
  LOTTO_MIN_NUMBER,
  LOTTO_MAX_NUMBER,
  ERROR_MESSAGE
} from '../src/domain/constants/index';
import { LottoTicket } from '../src/domain/classes/index';

describe('로또 티켓 테스트', () => {
  it("로또 티켓이 '자동' 또는 '수동' 방식이 아니라면 오류가 발생한다.", () => {
    expect(() => new LottoTicket('')).toThrowError(ERROR_MESSAGE.INVALID_LOTTO_MODE);
  });

  it("로또 티켓이 '자동' 방식이면 로또 번호를 입력 받지 않는다.", () => {
    expect(() => new LottoTicket(LOTTO_MODE.AUTO)).not.toThrowError();
  });

  test.each(DUMMY_LOTTO_TICKETS)("로또 티켓이 '수동' 방식이면 로또 번호를 입력받아야한다.", ({ lottoNumber }) => {
    expect(() => new LottoTicket(LOTTO_MODE.MANUAL, lottoNumber)).not.toThrowError();
  });

  it("로또 티켓이 '수동'방식일 때 입력 받은 로또 번호가 없다면 오류가 발생한다.", () => {
    expect(() => new LottoTicket(LOTTO_MODE.MANUAL)).toThrowError(ERROR_MESSAGE.INVALID_LOTTO_NUMBER_BY_NOT_EXIST);
  });

  test.each(DUMMY_LOTTO_TICKETS)(
    `로또 번호는 중복되지 않는 ${LOTTO_NUMBER_LENGTH}개의 숫자로 이루어져있다.`,
    ({ lottoNumber }) => {
      const lottoTicket = new LottoTicket(LOTTO_MODE.MANUAL, lottoNumber);
      expect(lottoTicket.lottoNumber).toHaveLength(LOTTO_NUMBER_LENGTH);
    }
  );

  test.each(DUMMY_INVALID_RANGE_NUMBER_LOTTO_TICKETS)(
    `로또 번호에서 로또 숫자 범위(${LOTTO_MIN_NUMBER} ~ ${LOTTO_MAX_NUMBER})를 벗어난다면 오류가 발생한다.`,
    ({ lottoNumber }) => {
      expect(() => new LottoTicket(LOTTO_MODE.MANUAL, lottoNumber)).toThrowError(
        ERROR_MESSAGE.INVALID_LOTTO_NUMBER_BY_RANGE
      );
    }
  );

  test.each(DUMMY_DUPLICATE_NUMBER_LOTTO_TICKETS)('중복된 로또 번호가 존재하면 오류가 발생한다.', ({ lottoNumber }) => {
    expect(() => new LottoTicket(LOTTO_MODE.MANUAL, lottoNumber)).toThrowError(
      ERROR_MESSAGE.INVALID_LOTTO_NUMBER_BY_DUPLICATE
    );
  });
});
