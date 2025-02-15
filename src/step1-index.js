import { getLotto } from './domains/common/utils.js';
import { getJackpotResult } from './domains/jackpot/utils.js';
import { calculateLottoCount } from './domains/order/utils.js';
import { getProfitRate } from './domains/statistics/utils.js';
import { renderLineBreak } from './views/common/index.js';
import {
  renderBonusNumberInput,
  renderJackpotNumbersInput,
} from './views/jackpot/index.js';
import {
  renderOrderAmountInput,
  renderOrderedLottoCount,
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

  const userLottos = Array.from({ length: count }, () => {
    const lotto = getLotto();
    console.log(lotto);

    return lotto;
  });
  renderLineBreak();

  const inputJackpot = await renderJackpotNumbersInput();
  renderLineBreak();

  const inputBonusNumber = await renderBonusNumberInput();
  renderLineBreak();

  const jackpotNumbers = inputJackpot.split(',').map((value) => Number(value));
  const bonusNumber = Number(inputBonusNumber);

  const lottoResults = userLottos.map((orderedLotto) =>
    getJackpotResult(
      { ordered: orderedLotto, jackpot: jackpotNumbers },
      bonusNumber,
    ),
  );

  renderJackpotStatisticsAnnouncement();

  const totalJackpotAmount = RANK_KEYS.reverse().reduce(
    (totalAmount, key, index) => {
      const currentRank = RANK_KEYS.length - index;
      const { count, amount } = lottoResults.reduce(
        (results, { rank, price }) =>
          rank === currentRank
            ? { count: results.count + 1, amount: results.amount + price }
            : results,
        { count: 0, amount: 0 },
      );

      renderLottoStatisticInfo(key, count);

      return (totalAmount += count * amount);
    },
    0,
  );

  const profitPercent = getProfitRate(amount, totalJackpotAmount);

  renderProfitRate(profitPercent);
};

main();
