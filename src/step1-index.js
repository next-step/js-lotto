/**
 * step 1의 시작점이 되는 파일입니다.
 * 브라우저 환경에서 사용하는 css 파일 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */

import { Lotto } from "./domain/models/Lotto.js";
import { LottoResult } from "./domain/models/LottoResult.js";
import {
  getBonusNumber,
  getPurchaseAmount,
  getWinningNumbers,
} from "./view/ui/input.js";
import { printLottoTickets } from "./view/ui/output.js";

async function main() {
  try {
    const amount = await getPurchaseAmount();
    const lotto = new Lotto(amount);

    const tickets = lotto.generateLottoTickets();
    printLottoTickets(tickets);

    const winningNumbers = await getWinningNumbers();
    const bonusNumber = await getBonusNumber();

    const lottoResult = new LottoResult(winningNumbers, bonusNumber);
  } catch (error) {
    console.error(error.message);
  }
}

main();
