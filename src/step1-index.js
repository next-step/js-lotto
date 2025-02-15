import { getLotto } from './domains/common/utils.js';
import {
  getJackpotResult,
  getJackpotTotalPrice,
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

const RANK_KEYS = ['FIRST', 'SECOND', 'THIRD', 'FOURTH', 'FIFTH'];

const main = async () => {
  const inputAmount = await renderOrderAmountInput();

  const amount = Number(inputAmount);
  const count = calculateLottoCount(amount);

  renderOrderedLottoCount(count);

  const orderedLottos = Array.from({ length: count }, () => getLotto());
  renderOrderedLottos(orderedLottos);
  renderLineBreak();

  const inputJackpot = await renderJackpotNumbersInput();
  renderLineBreak();

  const inputBonusNumber = await renderBonusNumberInput();
  renderLineBreak();

  const jackpotNumbers = inputJackpot.split(',').map((value) => Number(value));
  const bonusNumber = Number(inputBonusNumber);

  const lottoResults = orderedLottos.map((orderedLotto) =>
    getJackpotResult(
      { ordered: orderedLotto, jackpot: jackpotNumbers },
      bonusNumber,
    ),
  );

  renderJackpotStatisticsAnnouncement();

  const statisticsResult = getStatisticsResult(lottoResults);
  renderLottoStatisticInfo(statisticsResult);

  const totalJackpotPrice = getJackpotTotalPrice(statisticsResult);

  const profitPercent = getProfitRate(amount, totalJackpotPrice);

  renderProfitRate(profitPercent);
};

main();
