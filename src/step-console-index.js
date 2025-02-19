/**
 * step 1의 시작점이 되는 파일입니다.
 * 브라우저 환경에서 사용하는 css 파일 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */

import { LottoService } from "./domain/services/LottoService.js";
import {
  getBonusNumber,
  getPurchaseAmount,
  getRestartChoice,
  getWinningNumbers,
} from "./view/ui/input.js";
import {
  printLottoResults,
  printLottoTickets,
  printProfitRate,
} from "./view/ui/output.js";

async function main() {
  let restart = false;
  do {
    try {
      const amount = await getPurchaseAmount();
      const lottoService = new LottoService(amount);

      lottoService.generateTickets();

      const tickets = lottoService.getLottoTickets();
      printLottoTickets(tickets);

      const winningNumbers = await getWinningNumbers();
      const bonusNumber = await getBonusNumber();

      lottoService.setWinningNumbers(winningNumbers, bonusNumber);

      const winningRanks = lottoService.getWinningRanks();
      printLottoResults(winningRanks);

      const profitRate = lottoService.getLottoStatistics();
      printProfitRate(profitRate);

      restart = await getRestartChoice();
    } catch (error) {
      console.error(error.message);
    }
  } while (restart);
}

main();
