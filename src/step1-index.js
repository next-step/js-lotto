import {queryValidInput} from './view';
import {PRIZE, PRIZE_BENEFIT} from './domain/constants';
import {
  validateBonusNumber,
  validateWinningNumbers,
  validateRetryType,
  formatPrizeKR,
  Lotto,
  getLottoResult,
  getTotalBenefit,
} from './domain';
import {splitNumbers, getDividedInteger, getPercentage, validateOnlyNumber} from './utils';

const LOTTERY_PRICE = 1000;

const start = async () => {
  const price = await queryValidInput('구매금액을 입력해 주세요.', validateOnlyNumber);
  const lotteryCount = getDividedInteger(Number(price), LOTTERY_PRICE);

  console.log(`${lotteryCount}개를 구매했습니다.`);
  const lotto = new Lotto(lotteryCount);

  lotto.lotteries.forEach(lottery => {
    console.log('[', lottery.join(', '), ']');
  });

  const winningNumbersInput = await queryValidInput('당첨 번호를 입력해 주세요.', validateWinningNumbers);
  const winningNumbers = splitNumbers(winningNumbersInput);

  const bonusNumberInput = await queryValidInput('보너스 번호를 입력해 주세요.', input =>
    validateBonusNumber(input, winningNumbers),
  );
  const bonusNumber = Number(bonusNumberInput);

  const lottoResult = getLottoResult({lotteries: lotto.lotteries, winningNumbers, bonusNumber});

  console.log('당첨 통계');
  console.log('--------------------');

  const winningPrizes = Object.keys(PRIZE_BENEFIT).filter(prize => prize !== PRIZE.LOSS);
  winningPrizes.forEach(prize => {
    console.log(`${formatPrizeKR(prize)} - ${lottoResult[prize]}개`);
  });

  const benefit = getTotalBenefit(lottoResult);

  console.log(`총 수익률은 ${getPercentage({total: lotteryCount * LOTTERY_PRICE, value: benefit}, 1)}%입니다.`);

  const retryType = await queryValidInput('다시 시작하시겠습니까? (y/n)', validateRetryType);

  if (retryType === 'y') {
    start();
  }
};

start();
