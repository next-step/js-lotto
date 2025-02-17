import { LOTTO_PRIZES } from "../domain/constants.js";

export const printLottoTickets = (lottos) => {
  console.log(`${lottos.length}개를 구매했습니다.`);
  lottos.forEach((lotto) => printLottoNumbers(lotto.numbers));
  printNewLine();
};

const printLottoNumbers = (lottoNumbers) => {
  console.log(`[${lottoNumbers.join(", ")}]`);
};

export const printStatistics = ({ matchedCount, profitRate }) => {
  printNewLine();
  console.log("당첨 통계");
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

  const resultText = {
    3: `3개 일치 ${prizeText} - ${count}개`,
    4: `4개 일치 ${prizeText} - ${count}개`,
    5: `5개 일치 ${prizeText} - ${count}개`,
    6: `6개 일치 ${prizeText} - ${count}개`,
    "5bonus": `5개 일치, 보너스 볼 일치 ${prizeText} - ${count}개`,
  };

  if (!resultText[resultKey]) return;

  console.log(resultText[resultKey]);
};

const printNewLine = () => {
  console.log("");
};
