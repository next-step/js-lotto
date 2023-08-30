import { DUMMY_WINNING_LOTTO_NUMBER, DUMMY_BONUS_NUMBER, DUMMY_NOT_WINNING_TICKETS } from './constants';
import { LOTTO_MODE, LOTTO_PRIZE, LOTTO_NUMBER_LENGTH, LOTTO_MATCH_COUNT } from '../src/domain/constants/index';
import { LottoOrganizer, LottoTicket, LottoCalculator } from '../src/domain/classes/index';

const getLottoOrganizer = () => {
  const lottoCalculator = new LottoCalculator(DUMMY_WINNING_LOTTO_NUMBER, DUMMY_BONUS_NUMBER);
  const lottoOrganizer = new LottoOrganizer(lottoCalculator);
  return lottoOrganizer;
};

describe('로또 당첨 확인 테스트', () => {
  it(`당첨 번호 ${LOTTO_NUMBER_LENGTH}개가 모두 일치할 경우, 1등이 되어 ${LOTTO_PRIZE.FIRST}원의 상금을 받는다.`, () => {
    const winningNumber = '1,2,3,4,5,6';
    const expectedRank = 'FIRST';
    const lottoOrganizer = getLottoOrganizer();
    const lottoTicket = new LottoTicket(LOTTO_MODE.MANUAL, winningNumber);
    lottoOrganizer.matchToLottoTickets([lottoTicket]);
    expect(lottoTicket.result.rank).toBe(expectedRank);
    expect(lottoTicket.result.prize).toBe(LOTTO_PRIZE[expectedRank]);
  });

  it(`당첨 번호 ${LOTTO_MATCH_COUNT.SECOND.BASE_NUMBER}개와 보너스 번호가 일치할 경우, ${LOTTO_MATCH_COUNT.SECOND.RANK}등이 되어 ${LOTTO_PRIZE.SECOND}원의 상금을 받는다.`, () => {
    const secondPlaceNumber = '1,2,3,4,5,7';
    const expectedRank = 'SECOND';
    const lottoOrganizer = getLottoOrganizer();
    const lottoTicket = new LottoTicket(LOTTO_MODE.MANUAL, secondPlaceNumber);
    lottoOrganizer.matchToLottoTickets([lottoTicket]);
    expect(lottoTicket.result.rank).toBe(expectedRank);
    expect(lottoTicket.result.prize).toBe(LOTTO_PRIZE[expectedRank]);
  });

  it(`당첨 번호 ${LOTTO_MATCH_COUNT.THIRD.BASE_NUMBER}개가 일치할 경우, ${LOTTO_MATCH_COUNT.THIRD.RANK}등이 되어 ${LOTTO_PRIZE.THIRD}원의 상금을 받는다.`, () => {
    const thirdPlaceNumber = '1,2,3,4,5,9';
    const expectedRank = 'THIRD';
    const lottoOrganizer = getLottoOrganizer();
    const lottoTicket = new LottoTicket(LOTTO_MODE.MANUAL, thirdPlaceNumber);
    lottoOrganizer.matchToLottoTickets([lottoTicket]);
    expect(lottoTicket.result.rank).toBe(expectedRank);
    expect(lottoTicket.result.prize).toBe(LOTTO_PRIZE[expectedRank]);
  });

  it(`당첨 번호 ${LOTTO_MATCH_COUNT.FOURTH.BASE_NUMBER}개가 일치할 경우, ${LOTTO_MATCH_COUNT.FOURTH.RANK}등이 되어 ${LOTTO_PRIZE.FOURTH}원의 상금을 받는다.`, () => {
    const fourthPlaceNumber = '1,2,3,4,9,10';
    const expectedRank = 'FOURTH';
    const lottoOrganizer = getLottoOrganizer();
    const lottoTicket = new LottoTicket(LOTTO_MODE.MANUAL, fourthPlaceNumber);
    lottoOrganizer.matchToLottoTickets([lottoTicket]);
    expect(lottoTicket.result.rank).toBe(expectedRank);
    expect(lottoTicket.result.prize).toBe(LOTTO_PRIZE[expectedRank]);
  });

  it(`당첨 번호 ${LOTTO_MATCH_COUNT.FIFTH.BASE_NUMBER}개가 일치할 경우, ${LOTTO_MATCH_COUNT.FIFTH.RANK}등이 되어 ${LOTTO_PRIZE.FIFTH}원의 상금을 받는다.`, () => {
    const fifthPlaceNumber = '1,2,3,8,9,10';
    const expectedRank = 'FIFTH';
    const lottoOrganizer = getLottoOrganizer();
    const lottoTicket = new LottoTicket(LOTTO_MODE.MANUAL, fifthPlaceNumber);
    lottoOrganizer.matchToLottoTickets([lottoTicket]);
    expect(lottoTicket.result.rank).toBe(expectedRank);
    expect(lottoTicket.result.prize).toBe(LOTTO_PRIZE[expectedRank]);
  });

  test.each(DUMMY_NOT_WINNING_TICKETS)(
    `당첨 번호가 ${LOTTO_MATCH_COUNT.FIFTH.BASE_NUMBER}개 미만일 경우, 상금은 ${LOTTO_PRIZE.OTHERS}원이다.`,
    ({ lottoNumber: notWinningNumber }) => {
      const expectedRank = 'OTHERS';
      const lottoOrganizer = getLottoOrganizer();
      const lottoTicket = new LottoTicket(LOTTO_MODE.MANUAL, notWinningNumber);
      lottoOrganizer.matchToLottoTickets([lottoTicket]);
      expect(lottoTicket.result.rank).toBe(expectedRank);
      expect(lottoTicket.result.prize).toBe(LOTTO_PRIZE[expectedRank]);
    }
  );
});
