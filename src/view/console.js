import Lotto from "../domain/Lotto.js";
import Ticket from "../domain/Ticket.js";
import { LOTTO_RULES, RULES } from "../util/rule.js";
import { getRandomNumber } from "../util/random.js";
import { stopProgram, read, startProgram } from "../util/readline.js";
import PurchaseHistory from "../../src/domain/PurchaseHistory.js";
import WinningDetail from "../../src/domain/WinningDetail.js";
import RatesOfReturn from "../../src/domain/RatesOfReturn.js";
import { printWinningDetailResult } from "./printResult.js";

export const play = async () => {
  const rl = startProgram();

  const answer = await read(rl, "> 구입 금액을 입력해주세요.");
  console.log(answer);

  const lotto = new Lotto({
    purchasePrice: answer,
  });
  lotto.setCountOfTickets();

  const ticketLength = lotto.getCountOfTickets;
  console.log(`${ticketLength}개를 구매했습니다.`);
  const tickets = Array.from({ length: ticketLength }).map((val) => {
    const randomNumbers = getRandomNumber();
    console.log(randomNumbers);

    const ticket = new Ticket({
      numbers: randomNumbers,
    });

    return ticket;
  });

  const winningNumber = await read(rl, "> 당첨 번호를 입력해 주세요.");

  lotto.setWinningNumber(
    winningNumber.split(",").map((val) => parseInt(val)),
    LOTTO_RULES.winningNumberRule,
    "잘못된 당첨번호 설정입니다.",
  );

  const bonusNumber = await read(rl, "> 보너스 번호를 입력해 주세요.");
  lotto.setBonusNumber(
    parseInt(bonusNumber),
    LOTTO_RULES.bonusNumberRule,
    "잘못된 보너스 번호 설정입니다.",
  );

  const purchaseHistory = new PurchaseHistory({
    tickets: tickets,
  });

  const winningDetail = new WinningDetail({
    purchaseHistory: purchaseHistory,
    lotto: lotto,
  });

  printWinningDetailResult(winningDetail.getWinner);

  const ratesOfReturn = new RatesOfReturn({
    purchasePrice: lotto.getPurchasePrice,
    winningDetail: winningDetail,
  });

  console.log(`총 수익률은 ${ratesOfReturn.getValue}입니다.`);

  stopProgram(rl);
};
