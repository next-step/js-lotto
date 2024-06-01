import { input } from "./view/console/input";
import { output } from "./view/console/output";
import { LottoGame } from "./domain/LottoGame";
import { Lotto } from "./domain/Lotto";
import { validateNumber } from "./validator/validateNumber";
import { validateArray } from "./validator/validateArray";
import { CONTINUE } from "./constants/message";
import calculateRateOfReturn from "./utils/calculateRateOfReturn";

const app = async () => {
  const getPurchasePrice = async () => {
    try {
      const purchasePrice = await input.purchasePrice();
      validatePurchasePrice(purchasePrice);

      return purchasePrice;
    } catch (error) {
      console.log(error.message);
      return await getPurchasePrice();
    }
  };

  const settingLottos = (purchasePrice) => {
    const lotto = new Lotto(purchasePrice);

    return { lottos: lotto.lottos, lottosCount: lotto.lottos.length };
  };

  const getWinningNumbers = async () => {
    try {
      const winningNumberArray = await input.winningLotto();
      validateWinningNumbers(winningNumberArray);

      return winningNumberArray;
    } catch (error) {
      console.log(error.message);
      return await getWinningNumbers();
    }
  };

  const getBonusNumber = async (winningNumberArray) => {
    try {
      const bonusNumber = await input.bonusNumber();
      validateBonusNumber(winningNumberArray, bonusNumber);

      return bonusNumber;
    } catch (error) {
      console.log(error.message);
      return await getBonusNumber(winningNumberArray);
    }
  };

  const continueStage = async () => {
    const continueLetter = await input.continue();

    if (continueLetter === CONTINUE.YES) {
      await play();
    }

    process.exit();
  };

  const validatePurchasePrice = (purchasePrice) => {
    validateNumber.nan(purchasePrice);
    validateNumber.negative(purchasePrice);
  };

  const validateWinningNumbers = (winningNumberArray) => {
    validateArray.length(winningNumberArray);
    validateArray.inRange(winningNumberArray);
    validateArray.duplicate(winningNumberArray);
  };

  const validateBonusNumber = (winningNumberArray, bonusNumber) => {
    validateNumber.nan(bonusNumber);
    validateNumber.negative(bonusNumber);
    validateNumber.integer(bonusNumber);
    validateNumber.max(bonusNumber);
    validateArray.containNum(winningNumberArray, bonusNumber);
  };

  const play = async () => {
    const purchasePrice = await getPurchasePrice();
    const { lottos, lottosCount } = settingLottos(purchasePrice);
    output.lottosCount(lottosCount);
    output.lottos(lottos);
    const winningNumberArray = await getWinningNumbers();
    const bonusNumber = await getBonusNumber(winningNumberArray);
    const lottoGame = new LottoGame(lottos, winningNumberArray, bonusNumber);
    const result = lottoGame.result;
    const totalIncome = lottoGame.totalIncome;
    const rateOfReturn = calculateRateOfReturn(totalIncome, purchasePrice);
    output.result(result);
    output.rateOfReturn(rateOfReturn);
    await continueStage();
  };

  await play();
};

app();
