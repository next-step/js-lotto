import { input } from "./view/console/input";
import { output } from "./view/console/output";
import { LottoGame } from "./domain/LottoGame";
import { Lotto } from "./domain/Lotto";
import { validateNonNegativeInteger } from "./validator/validateNonNegativeInteger";
import { validateArrLength } from "./validator/validateArrLength";
import { validateArrNonNegativeInteger } from "./validator/validateArrNonNegativeInteger";
import { validateArrDuplicate } from "./validator/validateArrDuplicate";
import { validateArrContainNum } from "./validator/validateArrContainNum";

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

  const validatePurchasePrice = (purchasePrice) => {
    validateNonNegativeInteger(purchasePrice);
  };

  const validateWinningNumbers = (winningNumberArray) => {
    validateArrLength(winningNumberArray);
    validateArrNonNegativeInteger(winningNumberArray);
    validateArrDuplicate(winningNumberArray);
  };

  const validateBonusNumber = (winningNumberArray, bonusNumber) => {
    validateNonNegativeInteger(bonusNumber);
    validateArrContainNum(winningNumberArray, bonusNumber);
  };

  const calculateRateOfReturn = (totalIncome, purchasePrice) => {
    return (totalIncome / purchasePrice) * 100;
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
  };

  play();
};

app();
