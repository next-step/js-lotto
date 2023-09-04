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
  inputReplayMessage,
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
    return inputPrice;
  } catch (error) {
    console.log(error.message);
    return getInputPrice();
  }
}

async function getInputWinningNumbers() {
  const inputWinningNumbers = await getUserInput(inputLottoNumberMessage);

  if (validateInputWinningNumbers(inputWinningNumbers)) {
    return inputWinningNumbers;
  } else {
    return getInputWinningNumbers();
  }
}

async function getInputBonusNumber(winningNumbers) {
  const inputBonusNumber = await getUserInput(inputBonusNumberMessage);

  if (validateInputBonusNumber(winningNumbers, inputBonusNumber)) {
    return inputBonusNumber;
  } else {
    return getInputBonusNumber(winningNumbers);
  }
}

async function playLottoGame() {
  const inputPrice = await getInputPrice();

  const avaliableCount = calcLottoCount(inputPrice);
  displayAvailableLottoCount(avaliableCount);

  const lottoNumbers = createLottosForAmount(avaliableCount);
  displayLottoNumbers(lottoNumbers);

  const inputWinningNumbers = await getInputWinningNumbers();

  const inputBonusNumber = await getInputBonusNumber(inputWinningNumbers);

  const winningNumbers = formatWinningNumbers(
    inputWinningNumbers,
    inputBonusNumber
  );

  const winningResult = getWinningPrizeResult(lottoNumbers, winningNumbers);

  updateLottoPrizeCount(winningResult);

  displayWinningStats();
  displayTotalProfitRate(avaliableCount);
}

async function startLottoGame() {
  await playLottoGame();

  const inputReplayAnswer = await getUserInput(inputReplayMessage);

  if (inputReplayAnswer === "y") {
    startLottoGame();
  } else {
    closeUserInput();
  }
}

startLottoGame();
