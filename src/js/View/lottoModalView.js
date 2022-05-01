import { PROFIT_RATE_MESSAGE, selector, selectorAll } from '../utils/consts.js';

const lottoModalView = {
  onModalShow() {
    selector('.modal').classList.add('open');
  },
  onModalClose() {
    selector('.modal').classList.remove('open');
  },
  updateModalText(totalRank, totalPrize) {
    const order = [5, 4, 3, 2, 1];

    [...selectorAll('.prize-count')].forEach((tag, i) => {
      totalRank.has(order[i])
        ? (tag.textContent = totalRank.get(order[i]))
        : (tag.textContent = 0);
    });
    const investment = selector('.lotto-purchase-input').value;
    const profitRate = ((totalPrize - investment) / investment) * 100;

    selector('.profit-rate').textContent = PROFIT_RATE_MESSAGE(profitRate);
  },
};

export default lottoModalView;
