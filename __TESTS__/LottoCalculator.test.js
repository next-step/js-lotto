import { DUMMY_WINNING_LOTTO, DUMMY_LOTTO_RETURN_WINNING_RATE } from './constants';
import { LottoCalculator, LottoMachine } from '../src/domain/models/index';

describe('로또 당첨 계산 테스트', () => {
  test.each(DUMMY_WINNING_LOTTO)(
    '입력된 로또 번호($winningLottoNumber)에 대해서 당첨 번호와 일치하는 갯수를 반환한다.',
    ({ winningLottoNumber, bonusNumber }) => {
      const lottoMachine = new LottoMachine(winningLottoNumber, bonusNumber);
      const lottoCalculator = new LottoCalculator(lottoMachine.winningLottoNumber, lottoMachine.bonusNumber);
      const { matchLottoNumberCount, matchBonusNumberCount } = lottoCalculator.calculateLottoMatchCounts(
        lottoMachine.winningLottoNumber
      );
      expect(matchLottoNumberCount).toBe(lottoMachine.winningLottoNumber.length);
      expect(matchBonusNumberCount).toBe(0);
    }
  );

  test.each(DUMMY_LOTTO_RETURN_WINNING_RATE)(
    '총 구매 비용($totalCost)과 상금($totalPrize)을 입력 받아 수익률($expectedWinningRate)을 반환한다.',
    ({ totalCost, totalPrize, expectedWinningRate }) => {
      const lottoCalculator = new LottoCalculator();
      const winningRate = lottoCalculator.calculateWinningReturnRate(totalCost, totalPrize);
      expect(winningRate).toBe(expectedWinningRate);
    }
  );
});
