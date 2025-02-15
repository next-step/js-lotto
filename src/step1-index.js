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
import { renderLineBreak } from './views/common/index.js';
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

const main = async () => {
  // 구매
  const inputOrderAmount = await renderOrderAmountInput();

  const orderAmount = Number(inputOrderAmount);
  const orderCount = calculateLottoCount(orderAmount);

  renderOrderedLottoCount(orderCount);

  const orderedLottos = Array.from({ length: orderCount }, () => getLotto());
  renderOrderedLottos(orderedLottos);
  renderLineBreak();

  // 당첨
  const inputJackpot = await renderJackpotNumbersInput();
  renderLineBreak();

  const inputBonusNumber = await renderBonusNumberInput();
  renderLineBreak();

  const jackpotNumbers = inputJackpot.split(',').map((value) => Number(value));
  const bonusNumber = Number(inputBonusNumber);

  if (
    !isValidJackpotNumbersInput(jackpotNumbers) ||
    !isValidBonusNumber(bonusNumber, jackpotNumbers)
  ) {
    throw new Error(
      '당첨 숫자 또는 보너스 번호를 처리하는 과정에서 문제가 생겼습니다.',
    );
  }

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

main();
