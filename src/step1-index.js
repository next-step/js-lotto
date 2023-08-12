import {getDividedInteger} from './utils/getDividedInteger';
import {getLintInput} from './view/getLineInput';
import {Lotto} from './domain/Lotto';
import {splitNumbers} from './utils/splitNumbers';
import {LottoPrize} from './domain/LottoPrize';
import {PRIZE_MAP} from './domain/constants/prizeMap';
import {formatPrizeKR} from './domain/formatPrizeKR';
import {getPercentage} from './utils/getPercentage';

const LOTTERY_PRICE = 1000;

const start = async () => {
  const price = await getLintInput('구매금액을 입력해 주세요.');
  const lotteryCount = getDividedInteger(Number(price), LOTTERY_PRICE);

  console.log(`${lotteryCount}개를 구매했습니다.`);
  const lotto = new Lotto(lotteryCount);

  lotto.lotteries.forEach(lottery => {
    console.log('[', lottery.join(', '), ']');
  });

  const winningNumbersInput = await getLintInput('당첨 번호를 입력해 주세요.');
  const winningNumbers = splitNumbers(winningNumbersInput);

  const bonusNumberInput = await getLintInput('보너스 번호를 입력해 주세요.');
  const bonusNumber = Number(bonusNumberInput);

  const lottoPrize = new LottoPrize({winningNumbers, bonusNumber});
  const lottoResult = lotto.lotteries.reduce(
    (acc, lottery) => {
      const prize = lottoPrize.getLottoPrize(lottery);
      acc[prize] += 1;
      return acc;
    },
    {
      FIRST: 0,
      SECOND: 0,
      THIRD: 0,
      FOURTH: 0,
      FIFTH: 0,
      LOSS: 0,
    },
  );

  console.log('당첨 통계');
  console.log('--------------------');

  const winningPrizes = Object.keys(PRIZE_MAP).filter(prize => prize !== 'LOSS');
  winningPrizes.forEach(prize => {
    console.log(`${formatPrizeKR(prize)} - ${lottoResult[prize]}개`);
  });

  const totalPrizePrice = Object.entries(lottoResult).reduce((acc, [prize, count]) => {
    const prizePrice = PRIZE_MAP[prize] * count;
    return acc + prizePrice;
  }, 0);

  console.log(`총 수익률은 ${getPercentage({total: lotteryCount * LOTTERY_PRICE, value: totalPrizePrice}, 1)}%입니다.`);
};

start();
