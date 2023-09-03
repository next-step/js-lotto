import { askQuestion, rl } from "../utils/readlineAPI.js";
import { INFO_MESSAGE } from "./constant.js";

import {
  LottoStore,
  Machine,
  Buyer,
  initializeDataStorage,
  dataStorage,
  LottoMainCompany,
} from "./index.js";

import {
  ViewBuyerLottoList,
  ViewProfitRate,
  ViewPurchaseMessage,
  ViewWinnerPriceStats,
} from "../UI/View/OutputView.js";
import { startLottoGame } from "../step2-index.js";

const handleRequestPayment = async () => {
  try {
    const purchaseAmount = await askQuestion(INFO_MESSAGE.REQUEST_PAYMENT);
    const lottoCount = LottoStore.calculateLottoAmount(Number(purchaseAmount));
    ViewPurchaseMessage(lottoCount);

    const buyerLottoList = Buyer.generateLottoList(lottoCount);
    ViewBuyerLottoList(buyerLottoList);

    return;
  } catch (error) {
    console.log(error.message);
    return handleRequestPayment();
  }
};

const handleWinNumbers = async () => {
  try {
    const inputWinNumbers = await askQuestion(INFO_MESSAGE.REQUEST_WIN_NUMBER);
    const winNumbers = Machine.getWinnerLottoList(inputWinNumbers);

    return winNumbers;
  } catch (error) {
    console.log(error.message);
    return handleWinNumbers();
  }
};

const handleBonusNumbers = async () => {
  try {
    const inputBonusNumber = await askQuestion(
      INFO_MESSAGE.REQUEST_BONUS_NUMBER
    );
    Machine.getBonusNumber(dataStorage.winNumbers, inputBonusNumber);
  } catch (error) {
    console.log(error.message);
    return handleBonusNumbers();
  }
};

const handleWinnerStats = () => {
  try {
    const winnerStats = LottoMainCompany.handleWinnerStats();
    ViewWinnerPriceStats(winnerStats);
  } catch (error) {
    console.log(error.message);
  }
};

const handleProfitRate = () => {
  try {
    const profitRate = Buyer.calculateLottoProfit();
    ViewProfitRate(profitRate);
  } catch (error) {
    console.log(error.message);
  }
};

const handleRestartOrExit = async () => {
  try {
    const restartOrExitLotto = await askQuestion(INFO_MESSAGE.REQUEST_RESTART);

    if (restartOrExitLotto.toLowerCase() !== "y") {
      return rl.close();
    } else {
      console.clear();
      initializeDataStorage();
      return startLottoGame();
    }
  } catch (error) {
    console.log(error.message);
    return handleRestartOrExit();
  }
};

export {
  handleRequestPayment,
  handleWinNumbers,
  handleBonusNumbers,
  handleWinnerStats,
  handleProfitRate,
  handleRestartOrExit,
};
