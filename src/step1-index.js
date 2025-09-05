import { buyLotto, generateLottoBundle } from "../src/domain/purchase.js";
import {
  isValidWinningNumbers,
  isValidBonusNumber,
} from "./domain/inputNumbers.js";
import readLineAsync from "../src/utils/readLineAsync.js";

const LottoGame = async () => {
  // 로또 구매
  const amountPaid = await readLineAsync("구입금액을 입력해 주세요");
  const purchasedLottoCount = buyLotto(amountPaid);

  generateLottoBundle(purchasedLottoCount);

  // 번호 입력
  const winningNumbers = await readLineAsync("당첨 번호를 입력해 주세요.");

  if (!isValidWinningNumbers(winningNumbers)) {
    return;
  }

  const bonusNumber = await readLineAsync("보너스 번호를 입력해 주세요.");

  if (!isValidBonusNumber(bonusNumber, winningNumbers)) {
    return;
  }

  // 당첨 기준 존재
  // 입력한 것과 구매했던 로또 번호를 비교
  // 기준별 몇개 당첨됐는지 출력
  // 수익률 출력(얻은 금액 / 구매금액 * 100)
};

LottoGame();
