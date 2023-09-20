import { LOTTO_PRIZE, LOTTO_MATCH_COUNT } from '../constants/index.js';
import { formatNumberToCKoreanCurrency } from '../../utils/index';

export const createPurchaseMessage = (lottoLength) => `${lottoLength}개를 구매했습니다.`;

export const createLottoStatisticsMessage = (lottoTickets) => {
  const statisticsMessageList = [];

  const resultOfLottoMap = new Map(Object.keys(LOTTO_PRIZE).map((key) => [key, 0]));
  lottoTickets.forEach(({ result }) => {
    const { rank } = result;
    resultOfLottoMap.set(rank, resultOfLottoMap.get(rank) + 1);
  });

  resultOfLottoMap.forEach((value, key) => {
    switch (key) {
      case 'FIRST':
        statisticsMessageList.push(
          `${LOTTO_MATCH_COUNT.FIRST.BASE_NUMBER}개 일치(${formatNumberToCKoreanCurrency(
            LOTTO_PRIZE.FIRST
          )}원)- ${value}개`
        );
        break;
      case 'SECOND':
        statisticsMessageList.push(
          `${LOTTO_MATCH_COUNT.SECOND.BASE_NUMBER}개 일치, 보너스 볼 일치(${formatNumberToCKoreanCurrency(
            LOTTO_PRIZE.SECOND
          )}원)- ${value}개`
        );
        break;
      case 'THIRD':
        statisticsMessageList.push(
          `${LOTTO_MATCH_COUNT.THIRD.BASE_NUMBER}개 일치(${formatNumberToCKoreanCurrency(
            LOTTO_PRIZE.THIRD
          )}원)- ${value}개`
        );
        break;
      case 'FOURTH':
        statisticsMessageList.push(
          `${LOTTO_MATCH_COUNT.FOURTH.BASE_NUMBER}개 일치(${formatNumberToCKoreanCurrency(
            LOTTO_PRIZE.FOURTH
          )}원)- ${value}개`
        );
        break;
      case 'FIFTH':
        statisticsMessageList.push(
          `${LOTTO_MATCH_COUNT.FIFTH.BASE_NUMBER}개 일치(${formatNumberToCKoreanCurrency(
            LOTTO_PRIZE.FIFTH
          )}원)- ${value}개`
        );
        break;
      default:
        break;
    }
  });

  return statisticsMessageList.reverse();
};

export const createWinningRateMessage = (winningRate) =>
  `총 수익률은 ${formatNumberToCKoreanCurrency(winningRate)}% 입니다.`;
