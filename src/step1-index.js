import Lotto, {
  calculateLottoProfitRatio,
  buyLottos,
  calculateLottoTicketLimit,
  checkResult,
  computeTotalPrize,
} from "./lotto.js";
import {
  readLineAsync,
  getWinningNumbers,
  getBounsNumber,
} from "./getUserInput.js";
import { showLottoResult } from "../src/drawResult.js";
import { transformUserInput } from "../src/getRank.js";

/**
 * step 1의 시작점이 되는 파일입니다.
 * 브라우저 환경에서 사용하는 css 파일 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */
const startLottoGame = async () => {
  let lotto;
  let winngNumbers = [];
  await readLineAsync("구입금액을 입력해 주세요 : ").then((amount) => {
    lotto = new Lotto(amount);
    const ticketCount = calculateLottoTicketLimit(amount);
    buyLottos(ticketCount, lotto);
    for (let i = 0; i < ticketCount; i++) {
      console.log(lotto.numbers[i]);
    }
  });
  const userInputs = await getWinningNumbers("당첨 번호를 입력해 주세요. : ");

  const bounsNumber = await getBounsNumber("보너스 번호를 입력해 주세요. : ");

  winngNumbers = transformUserInput(userInputs, bounsNumber);

  const result = checkResult(winngNumbers, lotto);

  console.log("당첨 통계");
  console.log("--------------------------");
  showLottoResult(result);

  const prizeAmount = computeTotalPrize(result);
  const profit = calculateLottoProfitRatio(prizeAmount, lotto.budget);
  console.log(`총 수익률은 ${profit}%입니다.`);
};

startLottoGame();
