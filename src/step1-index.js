import { getLotto, isValidBonusNumber } from './domains/common/utils.js';
import {
  getJackpotResult,
  getJackpotTotalAmount,
  isValidJackpotNumbersInput,
} from './domains/jackpot/utils.js';
import { calculateLottoCount } from './domains/order/utils.js';
import {
  getProfitRate,
  getStatisticsResult,
} from './domains/statistics/utils.js';
import { isNumber, isPositiveInteger } from './utils/index.js';
import {
  renderErrorMessage,
  renderLineBreak,
  startMachine,
} from './views/common/index.js';
import {
  renderBonusNumberInput,
  renderJackpotNumbersInput,
} from './views/jackpot/index.js';
import {
  renderOrderAmountInput,
  renderOrderedLottoCount,
  renderOrderedLottos,
} from './views/order/index.js';
import {
  renderJackpotStatisticsAnnouncement,
  renderLottoStatisticInfo,
  renderProfitRate,
} from './views/statistics/index.js';

const processInputOrderAmount = async () => {
  const inputOrderAmount = await renderOrderAmountInput();
  const orderAmount = Number(inputOrderAmount);

  try {
    if (!isNumber(orderAmount) || !isPositiveInteger(orderAmount)) {
      throw new Error('구입금액을 잘못 입력하셨습니다. 다시 시도해 주세요.');
    }
  } catch (error) {
    renderErrorMessage(error.message);
    await processInputOrderAmount();
  }

  return orderAmount;
};

const processInputJackpotInfo = async () => {
  const inputJackpot = await renderJackpotNumbersInput();
  renderLineBreak();

  const inputBonusNumber = await renderBonusNumberInput();
  renderLineBreak();

  const jackpotNumbers = inputJackpot.split(',').map((value) => Number(value));
  const bonusNumber = Number(inputBonusNumber);

  try {
    if (
      !isValidJackpotNumbersInput(jackpotNumbers) ||
      !isValidBonusNumber(bonusNumber, jackpotNumbers)
    ) {
      throw new Error(
        '당첨 번호 또는 보너스 숫자를 잘못 입력하셨습니다. 다시 시도해 주세요.',
      );
    }
  } catch (error) {
    renderErrorMessage(error.message);
    await processInputJackpotInfo();
  }

  return [jackpotNumbers, bonusNumber];
};

const main = async () => {
  // 구매
  const orderAmount = await processInputOrderAmount();

  const orderCount = calculateLottoCount(orderAmount);
  renderOrderedLottoCount(orderCount);

  const orderedLottos = Array.from({ length: orderCount }, () => getLotto());
  renderOrderedLottos(orderedLottos);
  renderLineBreak();

  // 당첨

  const [jackpotNumbers, bonusNumber] = await processInputJackpotInfo();

  const lottoResults = orderedLottos.map((orderedLotto) =>
    getJackpotResult(
      { ordered: orderedLotto, jackpot: jackpotNumbers },
      bonusNumber,
    ),
  );
  const totalJackpotAmount = getJackpotTotalAmount(lottoResults);

  // 통계
  renderJackpotStatisticsAnnouncement();

  const statisticsResult = getStatisticsResult(lottoResults);
  renderLottoStatisticInfo(statisticsResult);

  const profitRate = getProfitRate(orderAmount, totalJackpotAmount);

  renderProfitRate(profitRate);
};

startMachine(main);
