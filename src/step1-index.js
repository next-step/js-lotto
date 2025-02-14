/**
 * step 1의 시작점이 되는 파일입니다.
 * 브라우저 환경에서 사용하는 css 파일 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */

import { buyLottoTickets } from "./domain/buyLottoTickets.js";
import { calculateStatistics } from "./domain/calculateStatistics.js";
import {
  createReadlineInterface,
  getBonusNumber,
  getPurchaseAmount,
  getWinningNumbers,
} from "./view/input.js";
import { printLottoTickets, printStatistics } from "./view/output.js";

const main = async () => {
  const readline = createReadlineInterface();

  try {
    const purchaseAmount = await getPurchaseAmount(readline);
    const lottoTickets = buyLottoTickets(purchaseAmount);

    printLottoTickets(lottoTickets);

    const winnigNumbers = await getWinningNumbers(readline);
    const bonusNumber = await getBonusNumber(readline);

    const comparedResults = lottoTickets.map((lotto) =>
      lotto.compareNumbers(winnigNumbers, bonusNumber)
    );

    const statistics = calculateStatistics(comparedResults);

    printStatistics(statistics);
  } catch (e) {
    if (!(e instanceof Error)) return;
    console.log(e.message);
  } finally {
    readline.close();
  }
};

await main();
