import ReadLineInput from "./readLineInput.js";
import Output from "./output.js";
import Lotto from "../domain/Lotto/Lotto.js";
import LottoTicket from "../domain/LottoTicket/LottoTicket.js";
import LottoResult from "../domain/LottoResult/LottoResult.js";
import LottoStatistics from "../domain/LottoStatistics/LottoStatistics.js";

async function main() {
  const readLineInput = new ReadLineInput();
  const output = new Output();

  const price = await readLineInput.askPurchaseAmount();
  const lotto = new Lotto(price, LottoTicket.makeLotto);
  const tickets = lotto.getLottoTicket();

  console.log(readLineInput.sayPurchase(lotto.getTicketAmount()));

  tickets.forEach((ticket) => {
    console.log(output.printGetLottoTicket(ticket));
  });

  console.log("\n");

  const winningNumbers = await readLineInput.askWinningNumbers();
  console.log("\n");
  const bonusNumber = await readLineInput.askBonusNumbers();
  console.log("\n");

  console.log(output.printResult());

  console.log(output.printDriven());

  const lottoResult = new LottoResult(winningNumbers, bonusNumber);

  const compareResult = lottoResult.compareNumber(tickets);

  const lottoStatistics = new LottoStatistics(price);

  compareResult.forEach(({ matchedNumbers, hasBonus }) => {
    const rank = lottoStatistics.getLottoRank(matchedNumbers, hasBonus);
    lottoStatistics.setLottoRank(rank);
  });

  const finalResult = lottoStatistics.setLottoResult();
  console.log(output.lottoStatisticsPrint(finalResult));

  const totalWinning = LottoStatistics.totalWinning(finalResult);

  const roi = lottoStatistics.calculateROI(totalWinning);
  console.log(output.resultRoi(roi));
}

export default main;
