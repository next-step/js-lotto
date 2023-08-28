import {
  createLottosForAmount,
  getWinningPrizeResult,
  validateInputBonusNumber,
  validateInputPrice,
  validateInputWinningNumbers,
} from "./controller/lottoController.js";
import { calcLottoCount } from "./utils/calculate.js";
import { closeUserInput, getUserInput } from "./utils/consoleInput.js";
import {
  inputBonusNumberMessage,
  inputLottoNumberMessage,
  inputLottoPriceMessage,
  inputReplayMessage,
} from "./utils/consoleMessage.js";
import {
  displayAvailableLottoCount,
  displayLottoNumbers,
  displayTotalProfitRate,
  displayWinningStats,
} from "./view/view.js";

async function getInputLottoPrice() {
  const inputPrice = await getUserInput(inputLottoPriceMessage);

  if (!validateInputPrice(inputPrice)) {
    return await getInputLottoPrice();
  }

  return inputPrice;
}

async function getInputWinningNumbers() {
  const inputWinningNumbers = await getUserInput(inputLottoNumberMessage);

  if (!validateInputWinningNumbers(inputWinningNumbers)) {
    return getInputWinningNumbers();
  }

  return inputWinningNumbers;
}

async function getInputBonusNumber(winningNumbers) {
  const inputBonusNumber = await getUserInput(inputBonusNumberMessage);

  if (!validateInputBonusNumber(winningNumbers, inputBonusNumber)) {
    return await getInputBonusNumber();
  }

  return inputBonusNumber;
}

async function playLottoGame() {
  const inputPrice = await getInputLottoPrice();

  // 몇개 살 수 있는 지 출력
  const avaliableCount = calcLottoCount(inputPrice);
  displayAvailableLottoCount(avaliableCount);

  // 로또 번호 출력
  const lottoNumbers = createLottosForAmount(calcLottoCount(inputPrice));
  displayLottoNumbers(lottoNumbers);

  const inputWinningNumbers = await getInputWinningNumbers();

  const inputBonusNumber = await getInputBonusNumber(inputWinningNumbers);

  const winningNumbers = inputWinningNumbers
    .split(",")
    .map((number) => Number(number.trim()))
    .concat(inputBonusNumber);

  const winningResult = getWinningPrizeResult(lottoNumbers, winningNumbers);

  displayWinningStats(winningResult);
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
