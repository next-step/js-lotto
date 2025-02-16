import PurchaseHistory from "../../domain/PurchaseHistory.js";
import RatesOfReturn from "../../domain/RatesOfReturn.js";
import WinningDetail from "../../domain/WinningDetail.js";
import Lotto from "../../domain/Lotto/index.js";
import Ticket from "../../domain/Ticket.js";
import { ERROR_LOTTO } from "../../util/error.js";
import { getRandomArrayWithTicketLength } from "../../domain/Lotto/random.js";
import { read, startProgram, stopProgram,
  PLEASE_INPUT_WINNING_NUMBER,
  PLEASE_INPUT_BONUS_NUMBER
 } from "./readline.js";
import { LOTTO_RULES, getTicketAvailable } from "../../util/rule.js";
import { printWinningDetailResult, printRatesOfReturn } from "../printResult.js";
import { RESTART_OPTION, restart } from "./restart.js";

export const playGame = async (rl) => {
  const purchasePrice = await read(rl, "> 구입 금액을 입력해주세요.");
    
  const ticketLength = getTicketAvailable(purchasePrice);

  console.log(`${ticketLength}개를 구매했습니다.`);
  const tickets = Array.from({ length: ticketLength }).map((val) => {
    const randomNumbers = getRandomArrayWithTicketLength();
    
    const sortedRandomNumbers = randomNumbers.sort((a,b) => a-b);
    console.log(sortedRandomNumbers);

    const ticket = new Ticket({
      numbers: sortedRandomNumbers,
    });

    return ticket;
  });

  const winningNumber = await read(rl, `\n${PLEASE_INPUT_WINNING_NUMBER} `);

  const lotto = new Lotto({});
  lotto.setWinningNumber(
    winningNumber.split(",").map((val) => parseInt(val)),
    LOTTO_RULES.winningNumberRule,
    ERROR_LOTTO.WRONG_WINNING_NUMBER_SETTING,
  );

  const bonusNumber = await read(rl, `\n${PLEASE_INPUT_BONUS_NUMBER} `);
  lotto.setBonusNumber(
    parseInt(bonusNumber),
    LOTTO_RULES.bonusNumberRule,
    ERROR_LOTTO.WRONG_BONUS_NUMBER_SETTING,
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
    purchasePrice: purchasePrice,
    winningDetail: winningDetail,
  });

  printRatesOfReturn(ratesOfReturn.getValue)
 
}

export const play = async () => {

  const state = { isRestart: RESTART_OPTION.NO };

  const rl = startProgram();

  do {
    await playGame(rl);
    state.isRestart = await restart(rl);
  } while (state.isRestart === RESTART_OPTION.YES)
    
  stopProgram(rl);
 
};
