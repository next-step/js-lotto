import {getDividedInteger} from './utils/getDividedInteger';
import {queryValidInput} from './view/queryValidInput';
import {Lotto} from './domain/Lotto';
import {splitNumbers} from './utils/splitNumbers';
import {PRIZE_MAP} from './domain/constants/prizeMap';
import {formatPrizeKR} from './domain/formatPrizeKR';
import {getPercentage} from './utils/getPercentage';
import {validateOnlyNumber} from './utils/validateOnlyNumber';
import {getLottoResult} from './domain/getLottoResult';
import {getTotalBenefit} from './domain/getTotalBenefit';
import {validateWinningNumbers} from './domain/validateWinningNumbers';
import {validateBonusNumber} from './domain/validateBonusNumber';

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

  const winningPrizes = Object.keys(PRIZE_MAP).filter(prize => prize !== 'LOSS');
  winningPrizes.forEach(prize => {
    console.log(`${formatPrizeKR(prize)} - ${lottoResult[prize]}개`);
  });

  const benefit = getTotalBenefit(lottoResult);

  console.log(`총 수익률은 ${getPercentage({total: lotteryCount * LOTTERY_PRICE, value: benefit}, 1)}%입니다.`);
};

start();
