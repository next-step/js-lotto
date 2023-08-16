import {
  ERROR_WRONG_LOTTO_ANSWER_MESSAGE,
  ERROR_WRONG_LOTTO_BONUS_MESSAGE,
  ERROR_WRONG_PURCHASE_AMOUNT_MESSAGE,
} from './constants/error.const.js';
import { readline } from './utils/readline.util.js';
import { UserIO, Lotto, LottoStatistics } from './lotto/index.js';

const userIO = new UserIO(readline);
const lotto = new Lotto();
const lottoStatistics = new LottoStatistics();

const startLotto = async () => {
  await userIO.inputPurchaseAmount().then((purchaseAmount) => {
    if (!lotto.validatePurchaseAmount(purchaseAmount)) {
      userIO.outputErrorMessage(ERROR_WRONG_PURCHASE_AMOUNT_MESSAGE);
      userIO.close();
    }

    lotto.setPurchasedLottoCounts(purchaseAmount);

    const purchaseLottoCounts = lotto.getPurchasedLottoCounts();
    userIO.outputAmount(purchaseLottoCounts);
    lotto.setMyLottos(purchaseLottoCounts);

    const myLottos = lotto.getMyLottos();
    userIO.outputMyLottos(myLottos);
  });

  await userIO.inputLottoAnswer().then((lottoAnswer) => {
    if (!lotto.validateLottoAnswer(lottoAnswer)) {
      userIO.outputErrorMessage(ERROR_WRONG_LOTTO_ANSWER_MESSAGE);
      userIO.close();
    }

    lotto.setLottoAnswer(lottoAnswer);
  });

  await userIO.inputLottoBonus().then((lottoBonus) => {
    if (!lotto.validateLottoBonus(lottoBonus)) {
      userIO.outputErrorMessage(ERROR_WRONG_LOTTO_BONUS_MESSAGE);
      userIO.close();
    }

    lotto.setLottoBonus(lottoBonus);

    const myLottos = lotto.getMyLottos();
    const lottoAnswer = lotto.getLottoAnswer();
    const currentLottoBonus = lotto.getLottoBonus();

    lottoStatistics.setStatistics(myLottos, lottoAnswer, currentLottoBonus);

    const statistics = lottoStatistics.getStatistics();
    const purchaseLottoCounts = lotto.getPurchasedLottoCounts();
    const profitRate = lottoStatistics.calculateProfitRate(purchaseLottoCounts);

    userIO.outputWinStatistics(statistics, profitRate);
  });

  await userIO.inputRestart().then((command) => {
    userIO.restartOrExit(command, startLotto);
  });
};

startLotto();
