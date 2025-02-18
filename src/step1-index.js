/**
 * step 1의 시작점이 되는 파일입니다.
 * 브라우저 환경에서 사용하는 css 파일 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */

import { buyLottoTickets } from "./domain/buyLottoTickets.js";
import { calculateStatistics } from "./domain/calculateStatistics.js";
import LottoGame from "./domain/LottoGame.js";
import {
  askToRestartOrExit,
  getBonusNumber,
  getPurchaseAmount,
  getWinningNumbers,
} from "./view/input.js";
import { printLottoTickets, printStatistics } from "./view/output.js";

const main = async () => {
  let isGameRunning = true;

  while (isGameRunning) {
    const purchaseAmount = await getPurchaseAmount();
    const lottoTickets = buyLottoTickets(purchaseAmount);

    printLottoTickets(lottoTickets);

    const winnigNumbers = await getWinningNumbers();
    const bonusNumber = await getBonusNumber(winnigNumbers);

    const lottoGame = new LottoGame(winnigNumbers, bonusNumber);

    const comparedResults = lottoTickets.map((lotto) =>
      lottoGame.compareNumbers(lotto.numbers)
    );

    const statistics = calculateStatistics(comparedResults);

    printStatistics(statistics);

    const response = await askToRestartOrExit();
    isGameRunning = response === "y";
  }
};

main();
