import Lotto from "../domain/Lotto.js";

const PRINT_PRIZE_TEXT = {
  FIFTH: "3개 일치 (5,000원)",
  FOURTH: "4개 일치 (50,000원)",
  THIRD: "5개 일치 (1,500,000원)",
  SECOND: "5개 일치, 보너스 볼 일치 (30,000,000원)",
  FIRST: "6개 일치 (2,000,000,000원)",
};

const calculateProfitRate = (lottoWinningList) => {
  const totalPrize = lottoWinningList.reduce((acc, cur) => {
    return acc + cur.prize;
  }, 0);
  const totalPurchase = lottoWinningList.length * Lotto.LOTTO_PRICE;
  return (totalPrize / totalPurchase) * 100;
};

export const printLottoWinningResult = (lottoWinningList) => {
  console.log("당첨 통계");
  console.log("--------------------");

  const winningCounts = {
    FIFTH: 0,
    FOURTH: 0,
    THIRD: 0,
    SECOND: 0,
    FIRST: 0,
  };

  lottoWinningList.forEach((winning) => {
    if (winning.rank) {
      winningCounts[winning.rank] += 1;
    }
  });

  Object.entries(PRINT_PRIZE_TEXT).forEach(([rank, text]) => {
    console.log(`${text} - ${winningCounts[rank]}개`);
  });

  console.log(`총 수익률은 ${calculateProfitRate(lottoWinningList)}%입니다.`);
};
