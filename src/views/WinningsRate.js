import { calculateWinningsRate } from '../domain/winningsRate.js';

const WinningsRate = (amountPaid, rankCountsMap) => {
  const winningRate = calculateWinningsRate(amountPaid, rankCountsMap);

  console.log(`총 수익률은 ${winningRate.toLocaleString()}% 입니다.`);
};

export default WinningsRate;
