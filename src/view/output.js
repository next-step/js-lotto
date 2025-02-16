import { LOTTO_PRIZES } from "../domain/constants.js";

export const printLottoTickets = (lottos) => {
  console.log(`${lottos.length}개를 구매했습니다.`);
  lottos.forEach((lotto) => printLottoNumbers(lotto.numbers));
  console.log("");
};

const printLottoNumbers = (lottoNumbers) => {
  console.log(`[${lottoNumbers.join(", ")}]`);
};

export const printStatistics = ({ matchedCount, profitRate }) => {
  console.log("\n당첨 통계");
  console.log("--------------------");

  for (const key of matchedCount.keys()) {
    const prize = LOTTO_PRIZES[key];
    const count = matchedCount.get(key);

    printMathcedResult({ resultKey: key, prize, count });
  }

  console.log(`총 수익률은 ${profitRate.toFixed(1)}%입니다.`);
};

const printMathcedResult = ({ resultKey, prize, count }) => {
  if (prize === undefined || count === undefined) return;

  const prizeText = `(${prize.toLocaleString()}원)`;

  switch (resultKey) {
    case "3":
    case "4":
    case "5":
    case "6":
      console.log(`${resultKey}개 일치 ${prizeText} - ${count}개`);
      break;
    case "5bonus":
      console.log(`5개 일치, 보너스 볼 일치 ${prizeText} - ${count}개`);
      break;
    default:
      break;
  }
};
