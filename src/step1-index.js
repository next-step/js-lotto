import { rl, askQuestion } from "./utils/readlineAPI.js";

import {
  LottoStore,
  Machine,
  Buyer,
  LottoMainCompany,
  initializeDataStorage,
} from "./domain/index.js";

import {
  ViewPurchaseMessage,
  ViewProfitRate,
  ViewWinnerPriceStats,
  ViewBuyerLottoList,
} from "./UI/View/OutputView.js";

import { INFO_MESSAGE } from "./domain/constant.js";
import { validateYesOrNoInput } from "./utils/validator.js";

/*
  Buyer: generate numbers, calculate profit
  Store: lotto amount
  Machine: winner, bonus 
  Company: winner stats
*/
const startLottoGame = async () => {
  const purchaseAmount = await askQuestion(INFO_MESSAGE.REQUEST_PAYMENT);
  const lottoCount = LottoStore.calculateLottoAmount(Number(purchaseAmount));
  ViewPurchaseMessage(lottoCount);

  const buyerLottoList = Buyer.generateLottoList(lottoCount);
  ViewBuyerLottoList(buyerLottoList);

  const inputWinNumbers = await askQuestion(INFO_MESSAGE.REQUEST_WIN_NUMBER);
  const winNumbers = Machine.getWinnerLottoList(inputWinNumbers);

  const inputBonusNumber = await askQuestion(INFO_MESSAGE.REQUEST_BONUS_NUMBER);
  Machine.getBonusNumber(winNumbers, inputBonusNumber);

  const winnerStats = LottoMainCompany.handleWinnerStats();
  ViewWinnerPriceStats(winnerStats);

  const profitRate = Buyer.calculateLottoProfit();
  ViewProfitRate(profitRate);

  const restartOrExitLotto = await askQuestion(INFO_MESSAGE.REQUEST_RESTART);
  validateYesOrNoInput(restartOrExitLotto);

  if (restartOrExitLotto.toLowerCase() === "y") {
    initializeDataStorage();
    startLottoGame();
  } else {
    rl.close();
  }
};

startLottoGame();
