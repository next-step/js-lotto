import ReadLineInput from "./readLineInput.js";
import Output from "./output.js";
import Lotto from "../domain/Lotto/Lotto.js";
import LottoTicket from "../domain/LottoTicket/LottoTicket.js";
import LottoResult from "../domain/LottoResult/LottoResult.js";
import LottoStatistics from "../domain/LottoStatistics/LottoStatistics.js";
import { executeWithRetry } from "../utils/executeWithRetry.js";

async function main() {
  const readLineInput = new ReadLineInput();
  const output = new Output();

  let lotto = await executeWithRetry(
    (price) => new Lotto(price, LottoTicket.makeLotto),
    {
      askFunc: () => readLineInput.askPurchaseAmount(),
    }
  );

  const tickets = lotto.getLottoTicket();

  readLineInput.sayPurchase(lotto.getTicketAmount());

  for (const ticket of tickets) {
    output.printGetLottoTicket(ticket);
  }

  output.printEnter();

  const lottoResult = await executeWithRetry(
    (winningData) =>
      new LottoResult(winningData.winningNumbers, winningData.bonusNumber),
    {
      askFunc: async () => {
        const winningNumbers = await readLineInput.askWinningNumbers();
        output.printEnter();
        const bonusNumber = await readLineInput.askBonusNumbers();
        return { winningNumbers, bonusNumber };
      },
    }
  );

  output.printEnter();

  output.printResult();
  output.printDriven();

  const compareResult = lottoResult.compareNumber(tickets);
  const lottoStatistics = new LottoStatistics(lotto.money);

  for (const { matchedNumbers, hasBonus } of compareResult) {
    const rank = lottoStatistics.getLottoRank(matchedNumbers, hasBonus);
    lottoStatistics.setLottoRank(rank);
  }

  const finalResult = lottoStatistics.setLottoResult();
  output.lottoStatisticsPrint(finalResult);

  const totalWinning = LottoStatistics.totalWinning(finalResult);
  const roi = lottoStatistics.calculateROI(totalWinning);
  output.resultRoi(roi);

  try {
    const isRetry = await readLineInput.askRetry();
    if (isRetry) {
      main();
    }
  } catch (err) {
    console.log(err);
  }
}

export default main;
