import {getDividedInteger} from './utils/getDividedInteger';
import {getLintInput} from './view/getLineInput';
import {Lotto} from './domain/Lotto';
import {splitNumbers} from './utils/splitNumbers';

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
};

start();
