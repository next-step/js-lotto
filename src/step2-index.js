import { LOTTO } from './domains/common/constants.js';
import { getLotto } from './domains/common/utils.js';
import {
  calculateLottoResults,
  getJackpotTotalAmount,
} from './domains/jackpot/utils.js';
import {
  getProfitRate,
  getStatisticsResult,
} from './domains/statistics/utils.js';
import { renderMainTitle } from './views/common/elements.js';
import { renderJackpotForm } from './views/jackpot/elements.js';
import {
  renderOrderAmountInput,
  renderOrderedLottos,
} from './views/order/elements.js';
import { renderJackpotStatisticDialog } from './views/statistics/elements.js';

let orderAmount = 0;
let lottos = [];

const root = document.querySelector('#app');
root.style.display = 'flex';
root.style.flexDirection = 'column';
root.style.gap = '16px';

const handleReset = () => {
  orderAmount = 0;
  lottos = [];

  root.innerHTML = '';

  root.appendChild(renderMainTitle());
  root.appendChild(renderOrderAmountInput({ onClick: handleClickLottoCount }));
  root.appendChild(renderOrderedLottos({ lottos }));
  root.appendChild(renderJackpotForm({ onClick: handleClickJackpotResult }));
};

const handleClickLottoCount = (amount, orderCount) => {
  orderAmount = amount;

  lottos = Array.from({ length: orderCount }, () =>
    getLotto([...LOTTO.NUMBERS]),
  );

  document
    .querySelector('.lottos__container')
    .replaceWith(renderOrderedLottos({ lottos }));
};

const handleClickJackpotResult = (jackpotNumbers, bonusNumber) => {
  const lottoResults = calculateLottoResults(
    lottos,
    jackpotNumbers,
    bonusNumber,
  );

  const totalJackpotAmount = getJackpotTotalAmount(lottoResults);
  const statisticsResult = getStatisticsResult(lottoResults);

  const profitRate = getProfitRate(orderAmount, totalJackpotAmount);

  root.appendChild(
    renderJackpotStatisticDialog({
      statisticsResult,
      profitRate,
      onClick: handleReset,
    }),
  );
};

root.appendChild(renderOrderAmountInput({ onClick: handleClickLottoCount }));
root.appendChild(renderOrderedLottos({ lottos }));
root.appendChild(renderJackpotForm({ onClick: handleClickJackpotResult }));
