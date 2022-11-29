import { $, $$ } from './utils/DOM.js';
import { PERCENTAGE_UNIT, LOTTO_CONSTRAINT, PRIZE_TYPES } from './constants/index.js';

const getPrizeType = ({ lotto, winningNumbers, bonus }) => {
  const hit = lotto.filter((number) => winningNumbers.includes(number)).length;
  const isBonus = lotto.includes(bonus);

  switch (hit) {
    case 3:
      return 'three';
    case 4:
      return 'four';
    case 5:
      return isBonus ? 'fiveBonus' : 'five';
    case 6:
      return 'six';
    default:
      return undefined;
  }
};

const getPrizeTypeValue = (prizeType, prop) => {
  return prizeType === 'fiveBonus'
    ? PRIZE_TYPES.FIVE_BONUS[prop]
    : PRIZE_TYPES[prizeType.toUpperCase()][prop];
};

const getPrizeCountState = ({ purchasedLottoNumbers, winningNumbers, bonus }) => {
  const prizeCountState = {
    three: 0,
    four: 0,
    five: 0,
    fiveBonus: 0,
    six: 0,
  };

  purchasedLottoNumbers.forEach((lotto) => {
    const rank = getPrizeType({ lotto, winningNumbers, bonus });

    if (rank !== undefined) {
      prizeCountState[rank] += 1;
    }
  });

  return prizeCountState;
};

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

  $('.prize-result').insertAdjacentHTML('beforeend', template);
};

const getProfitRate = (prizeCountState) => {
  const price = $('.purchasing-lotto-input').valueAsNumber;
  const profit = Object.keys(prizeCountState).reduce(
    (acc, cur) => acc + getPrizeTypeValue(cur, 'money') * prizeCountState[cur],
    0,
  );

  return ((profit - price) / price) * PERCENTAGE_UNIT;
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
