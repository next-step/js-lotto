import {
  printCount,
  printLottoNumber,
  printRateOfReturn,
  printStatisticsLotto,
} from "./js/view/output.js";
import { readLineAsync } from "./js/utils/readLineAsync.js";
import { LottoMachine } from "./js/domain/LottoMachine.js";
import { WinningLotto } from "./js/domain/WinningLotto.js";
import { StatisticsLotto } from "./js/domain/StatisticsLotto.js";

async function play() {
  let lottoMachine;
  let count;
  let purchase;
  let lottos = [];

  while (true) {
    try {
      purchase = await readLineAsync("> 구입금액을 입력해 주세요. ");
      lottoMachine = new LottoMachine();
      count = lottoMachine.calculateLottoCount(purchase);
      printCount(count);

      lottos = Array.from({ length: count }, () => {
        const lotto = lottoMachine.generateLottoNumber();
        const lottoNumbers = lotto.getLottoNumbers();
        printLottoNumber(lottoNumbers);
        return lottoNumbers;
      });

      break;
    } catch (error) {
      console.error("오류가 발생했습니다: ", error);
    }
  }
  const winningLottoNumbers = await readLineAsync(
    "\n> 당첨 번호를 입력해 주세요. "
  );

  const bonusNumber = await readLineAsync("\n> 보너스 번호를 입력해 주세요. ");

  const winningLotto = new WinningLotto(winningLottoNumbers, bonusNumber);

  const statisticsLotto = new StatisticsLotto();

  lottos.forEach((lotto) => {
    const hit = winningLotto.calculateMatchLottoCount(lotto);
    statisticsLotto.statisticsLotto(hit, winningLotto.isMatchBonus);
  });

  // 통계 출력
  printStatisticsLotto(statisticsLotto.getPrizes());

  // 총 수익률 출력
  const rateOfReturn = statisticsLotto.calculateRateOfReturn(purchase);
  printRateOfReturn(rateOfReturn);

  await reply(statisticsLotto);
}

async function reply(statisticsLotto) {
  const replyAnswer = await readLineAsync("\n> 다시 시작하시겠습니까? (y/n)\n");

  if (isReply(replyAnswer)) {
    statisticsLotto.resetCounts();
    await play();
  }
}

function isReply(replyAnswer) {
  return replyAnswer === "y";
}

play();
