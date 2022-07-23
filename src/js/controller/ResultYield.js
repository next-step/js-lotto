import { RANK, RANK_AMOUNT } from '../domain/lotto/constants.js';
import store from '../store/index.js';

export default function ResultYield(countByRank) {
  const $yield = document.querySelector('#yield');

  const getRevenue = () => {
    const ranks = Object.keys(RANK);
    const revenue = ranks.reduce((acc, rank) => countByRank[rank] * RANK_AMOUNT[rank] + acc, 0);
    return revenue;
  };

  const getResultYield = () => {
    const revenue = getRevenue();
    const { amount } = store.state;

    if (!revenue || !amount) return 0;

    return revenue / amount;
  };

  const render = () => {
    const resultYield = getResultYield();
    $yield.textContent = `당신의 총 수익률은 ${resultYield}%입니다.`;
  };

  render();
}
