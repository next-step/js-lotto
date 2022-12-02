import { $, $$ } from '../utils/DOM.js';
import { LOTTO_CONSTRAINT } from '../constants/index.js';

import { getPrizeTypeValue, getPrizeCountState, getProfitRate } from '../getPrizeResult.js';

const renderPrizeResult = (prizeCountState) => {
  const template = Object.entries(prizeCountState)
    .map(
      ([prizeType, prizeCount]) => `<tr class="text-center">
      <td class="p-3">${getPrizeTypeValue(prizeType, 'matchingCount')}</td>
      <td class="p-3">${getPrizeTypeValue(prizeType, 'money').toLocaleString('en-US')}</td>
      <td class="p-3 winning-count">${prizeCount}개</td>
    </tr>`,
    )
    .join('');

  $('.prize-result').innerHTML = template;
};

const renderProfitRate = (profitRate) => {
  $('.profit-rate-result').innerText = `당신의 총 수익률은 ${profitRate}%입니다.`;
};

export const renderModal = (winningNumbersAndBonus) => {
  const $purchasedLottoNumbers = $$('.lotto-item-numbers');
  const purchasedLottoNumbers = [...$purchasedLottoNumbers].map((ele) =>
    ele.innerText.split(', ').map(Number),
  );
  const winningNumbers = winningNumbersAndBonus.slice(0, LOTTO_CONSTRAINT.LOTTO_NUMBERS_COUNT);
  const bonus = winningNumbersAndBonus[LOTTO_CONSTRAINT.LOTTO_NUMBERS_COUNT];

  const prizeCountState = getPrizeCountState({ purchasedLottoNumbers, winningNumbers, bonus });
  const profitRate = getProfitRate(prizeCountState);

  renderPrizeResult(prizeCountState);
  renderProfitRate(profitRate);
};
