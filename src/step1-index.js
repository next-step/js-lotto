/**
 * step 1의 시작점이 되는 파일입니다.
 * 브라우저 환경에서 사용하는 css 파일 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */

import readline from "node:readline/promises";
import lotto from "./lotto/lotto.js";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const printLottoReport = (winningReport) => {
  console.log("당첨 통계");
  console.log("--------------------");
  for (const pz of Object.values(lotto.LottoWinningRule.PRIZE_MAP)) {
    console.log(
      `${pz.matchedNumberCount}개 일치 (${pz.prize}원) - ${
        winningReport.matched.get(pz) ?? 0
      }개`
    );
  }
  console.log(`총 수익률은 ${winningReport.winningRate.toFixed(1)}%입니다.`);
};

const main = async () => {
  const purchaseAmountString = await rl.question(
    "> 구입금액을 입력해 주세요. "
  );
  console.log(`구입 금액: ${purchaseAmountString}원`);
  const lottos = lotto.createLotto(purchaseAmountString);
  console.log(`${lottos.length}개를 구매했습니다.`);

  console.log("");
  const lottoNumberString = await rl.question("> 당첨 번호를 입력해 주세요. ");

  console.log("");
  const bonusNumberString = await rl.question(
    "> 보너스 번호를 입력해 주세요. "
  );

  const winningLotto = new lotto.WinningLotto(
    new lotto.Lotto(lottoNumberString.split(",").map(Number)),
    new lotto.BonusLotto(bonusNumberString.split(",").map(Number))
  );
  const winningResult = lotto.LottoWinningRule.getWinningResult(
    winningLotto,
    lottos
  );

  console.log("");
  const winningReport = lotto.LottoWinningRule.getWinningReport(
    winningResult,
    purchaseAmountString
  );
  printLottoReport(winningReport);

  rl.close();
};

main();
