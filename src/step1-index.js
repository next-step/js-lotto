import {
  checkInputPrice,
  createLottosForAmount,
  formatWinningNumbers,
  getWinningPrizeResult,
  updateLottoPrizeCount,
  validateInputBonusNumber,
  validateInputWinningNumbers,
} from "./controller/lottoController.js";
import { calcLottoCount } from "./utils/calculate.js";
import { closeUserInput, getUserInput } from "./utils/consoleInput.js";
import {
  inputBonusNumberMessage,
  inputLottoNumberMessage,
  inputLottoPriceMessage,
} from "./data/constant.js";
import {
  displayAvailableLottoCount,
  displayLottoNumbers,
  displayTotalProfitRate,
  displayWinningStats,
} from "./view/view.js";

async function getInputPrice() {
  const inputPrice = await getUserInput(inputLottoPriceMessage);

  try {
    checkInputPrice(inputPrice);
  } catch (error) {
    console.log(error.message);
    return false;
  }

  return inputPrice;
}

async function getInputWinningNumbers() {
  const inputWinningNumbers = await getUserInput(inputLottoNumberMessage);
  return validateInputWinningNumbers(inputWinningNumbers)
    ? inputWinningNumbers
    : null;
}

async function getInputBonusNumber(winningNumbers) {
  const inputBonusNumber = await getUserInput(inputBonusNumberMessage);
  return validateInputBonusNumber(winningNumbers, inputBonusNumber)
    ? inputBonusNumber
    : null;
}

async function lottoGame() {
  const inputPrice = await getInputPrice();

  if (!inputPrice) {
    closeUserInput();
    return false;
  }

  const avaliableCount = calcLottoCount(inputPrice);
  displayAvailableLottoCount(avaliableCount);

  const lottoNumbers = createLottosForAmount(avaliableCount);
  displayLottoNumbers(lottoNumbers);

  const inputWinningNumbers = await getInputWinningNumbers();

  if (!inputWinningNumbers) {
    closeUserInput();
    return false;
  }

  const inputBonusNumber = await getInputBonusNumber(inputWinningNumbers);

  if (!inputBonusNumber) {
    closeUserInput();
    return false;
  }

  const winningNumbers = formatWinningNumbers(
    inputWinningNumbers,
    inputBonusNumber
  );

  const winningResult = getWinningPrizeResult(lottoNumbers, winningNumbers);

  updateLottoPrizeCount(winningResult);

  displayWinningStats();
  displayTotalProfitRate(avaliableCount);

  closeUserInput();
}

lottoGame();
