import { LottoGame } from "../domain/LottoGame";
import calculateRateOfReturn from "../utils/calculateRateOfReturn";
import { validateArray } from "../validator/validateArray";
import { validateNumber } from "../validator/validateNumber";
import { output } from "../view/web/output";

const lottoGameHandler = {
  validateWinningNumbers(winningNumberArray) {
    validateArray.length(winningNumberArray);
    validateArray.inRange(winningNumberArray);
    validateArray.duplicate(winningNumberArray);
  },

  validateBonusNumber(winningNumberArray, bonusNumber) {
    validateNumber.nan(bonusNumber);
    validateNumber.negative(bonusNumber);
    validateNumber.integer(bonusNumber);
    validateNumber.max(bonusNumber);
    validateArray.containNum(winningNumberArray, bonusNumber);
  },

  getLottoGameResult(lottos, winningNumberArray, bonusNumber) {
    const lottoGame = new LottoGame(lottos, winningNumberArray, bonusNumber);
    const { result, totalIncome } = lottoGame;

    return { result, totalIncome };
  },

  outputLottoGameResult(result) {
    output.lottoGameResult(result);
  },

  outputRateOfReturn(totalIncome, purchasePrice) {
    const rateOfReturn = calculateRateOfReturn(totalIncome, purchasePrice);
    output.rateOfReturn(rateOfReturn);
  },
};

export default lottoGameHandler;
