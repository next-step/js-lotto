import Lotto from "../../domain/Lotto/index.js";
import { getRandomArrayWithTicketLength } from "../../domain/Lotto/random.js";
import LOTTO_RULES from "../../domain/Lotto/rule.js";
import PURCHASE_HISTORY_CONSTANTS from "../../domain/PurchaseHistory/constant.js";
import PurchaseHistory from "../../domain/PurchaseHistory/index.js";
import RatesOfReturn from "../../domain/RatesOfReturn/index.js";
import {
  BONUS_NUMBER_CONSTANTS,
  WINNING_NUMBER_CONSTANTS,
} from "../../domain/Ticket/constant.js";
import Ticket from "../../domain/Ticket/index.js";
import { getTicketAvailable } from "../../domain/Ticket/rule.js";
import WinningDetail from "../../domain/WinningDetail/index.js";
import {
  printRatesOfReturn,
  printWinningDetailResult,
  printTicketLength,
} from "./printResult.js";
import { read, startProgram, stopProgram } from "./readline.js";
import { RESTART_OPTION, restart } from "./restart.js";

export const playGame = async (rl) => {
  const purchasePrice = await read(rl, {
    message: PURCHASE_HISTORY_CONSTANTS.MESSAGE,
    errorMessage: PURCHASE_HISTORY_CONSTANTS.ERROR_MESSAGE,
    checkPolicy: (val) => {
      const number = parseInt(val, 10);
      return LOTTO_RULES.purChasePriceRule(number);
    },
  });

  const ticketLength = getTicketAvailable(purchasePrice);

  printTicketLength(ticketLength);
  const tickets = Array.from({ length: ticketLength }).map(() => {
    const randomNumbers = getRandomArrayWithTicketLength();

    const sortedRandomNumbers = randomNumbers.sort((a, b) => a - b);
    console.log(sortedRandomNumbers);

    const ticket = new Ticket({
      numbers: sortedRandomNumbers,
    });

    return ticket;
  });

  const winningNumber = await read(rl, {
    message: WINNING_NUMBER_CONSTANTS.MESSAGE,
    errorMessage: WINNING_NUMBER_CONSTANTS.ERROR_MESSAGE,
    checkPolicy: (val) => {
      const numberArray = val.split(",").map((a) => parseInt(a, 10));
      return LOTTO_RULES.winningNumberRule(numberArray);
    },
  });

  const bonusNumber = await read(rl, {
    message: BONUS_NUMBER_CONSTANTS.MESSAGE,
    errorMessage: BONUS_NUMBER_CONSTANTS.ERROR_MESSAGE,
    checkPolicy: (val) => {
      const number = parseInt(val, 10);
      return LOTTO_RULES.bonusNumberRule(number);
    },
  });

  const lotto = new Lotto({
    winningNumber: winningNumber.split(",").map((val) => parseInt(val, 10)),
    bonusNumber: parseInt(bonusNumber, 10),
  });

  const purchaseHistory = new PurchaseHistory({
    tickets,
  });

  const winningDetail = new WinningDetail({
    purchaseHistory,
    lotto,
  });

  printWinningDetailResult(winningDetail.getWinner);

  const ratesOfReturn = new RatesOfReturn({
    purchasePrice,
    winningDetail,
  });

  printRatesOfReturn(ratesOfReturn.getValue);
};

export const play = async () => {
  const state = { isRestart: RESTART_OPTION.NO };

  const rl = startProgram();

  do {
    // eslint-disable-next-line no-await-in-loop
    await playGame(rl);
    // eslint-disable-next-line no-await-in-loop
    state.isRestart = await restart(rl);
  } while (state.isRestart === RESTART_OPTION.YES);

  stopProgram(rl);
};
