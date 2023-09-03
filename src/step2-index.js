import {
  handleBonusNumbers,
  handleRequestPayment,
  handleRestartOrExit,
  handleWinNumbers,
  handleWinnerStats,
} from "./domain/handler.js";

/*
  Buyer: generate numbers, calculate profit
  Store: lotto amount
  Machine: winner, bonus 
  Company: winner stats
*/
const startLottoGame = async () => {
  await handleRequestPayment();
  await handleWinNumbers();
  await handleBonusNumbers();

  handleWinnerStats();
  handleProfitRate();

  await handleRestartOrExit();
};

startLottoGame();

export { startLottoGame };
