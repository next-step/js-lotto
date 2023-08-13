import {
  getTotalInvestgatePrice,
  getTotalWinningPrice,
} from "../controller/lottoController.js";
import { LOTTO_PRIZE } from "../data/lotto.js";
import { priceWithCommas } from "../utils/calculate.js";

export const displayAvailableLottoCount = (lottoCount) => {
  console.log(`${lottoCount}개를 구매했습니다.`);
};

export const displayLottoNumbers = (lottoNumbers) => {
  lottoNumbers.forEach((lotto) => console.log(lotto));
};

export const displayWinningStats = () => {
  console.log("당첨 통계");
  console.log("======================");

  Object.values(LOTTO_PRIZE).forEach((prize) => {
    console.log(
      `${prize.message} (${priceWithCommas(prize.price)}원) - ${prize.count}개`
    );
  });
};

export const displayTotalProfitRate = (avaliableCount) => {
  const totalWinningPrice = getTotalWinningPrice();
  const totalInvestgatePrice = getTotalInvestgatePrice(avaliableCount);

  const totalProfitRate =
    ((totalWinningPrice - totalInvestgatePrice) / totalInvestgatePrice) * 100;

  console.log(`총 수익률은 ${totalProfitRate.toFixed(2)}%입니다.`);
};
