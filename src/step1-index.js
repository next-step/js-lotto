import {
<<<<<<< HEAD
  checkInputPrice,
  createLottosForAmount,
  formatWinningNumbers,
  getWinningPrizeResult,
  updateLottoPrizeCount,
  validateInputBonusNumber,
=======
  createLottosForAmount,
  getWinningPrizeResult,
  validateInputBonusNumber,
  validateInputPrice,
>>>>>>> a7c387c ([feat] 기능 실행 부분 로직 작성)
  validateInputWinningNumbers,
} from "./controller/lottoController.js";
import { calcLottoCount } from "./utils/calculate.js";
import { closeUserInput, getUserInput } from "./utils/consoleInput.js";
import {
  inputBonusNumberMessage,
  inputLottoNumberMessage,
  inputLottoPriceMessage,
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
=======
  inputReplayMessage,
>>>>>>> 0792fce ([feat] 재시작을 위한 로직 변경)
} from "./utils/consoleMessage.js";
import {
  displayAvailableLottoCount,
  displayLottoNumbers,
  displayTotalProfitRate,
  displayWinningStats,
} from "./view/view.js";

async function getInputLottoPrice() {
  const inputPrice = await getUserInput(inputLottoPriceMessage);

<<<<<<< HEAD
  if (!isAvaliablePrice) {
<<<<<<< HEAD
>>>>>>> a7c387c ([feat] 기능 실행 부분 로직 작성)
    closeUserInput();
=======
>>>>>>> 0792fce ([feat] 재시작을 위한 로직 변경)
    return false;
  }

<<<<<<< HEAD
  const avaliableCount = calcLottoCount(inputPrice);
  displayAvailableLottoCount(avaliableCount);

  const lottoNumbers = createLottosForAmount(avaliableCount);
  displayLottoNumbers(lottoNumbers);

  const inputWinningNumbers = await getInputWinningNumbers();

  if (!inputWinningNumbers) {
=======
=======
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

>>>>>>> 729d2cf ([feat] UX 개선에 따른 index.js 로직 변경)
  // 몇개 살 수 있는 지 출력
  const avaliableCount = calcLottoCount(inputPrice);
  displayAvailableLottoCount(avaliableCount);

  // 로또 번호 출력
  const lottoNumbers = createLottosForAmount(calcLottoCount(inputPrice));
  displayLottoNumbers(lottoNumbers);

  const inputWinningNumbers = await getInputWinningNumbers();

<<<<<<< HEAD
  if (!isAvaliableNumbers) {
<<<<<<< HEAD
>>>>>>> a7c387c ([feat] 기능 실행 부분 로직 작성)
    closeUserInput();
=======
>>>>>>> 0792fce ([feat] 재시작을 위한 로직 변경)
    return false;
  }

<<<<<<< HEAD
  const inputBonusNumber = await getInputBonusNumber(inputWinningNumbers);

  if (!inputBonusNumber) {
    closeUserInput();
    return false;
  }

  const winningNumbers = formatWinningNumbers(
=======
  // 보너스 번호 입력
  const inputBonusNumber = await getUserInput(inputBonusNumberMessage);
  const isAvaliableBonusNumber = validateInputBonusNumber(
>>>>>>> a7c387c ([feat] 기능 실행 부분 로직 작성)
    inputWinningNumbers,
    inputBonusNumber
  );

<<<<<<< HEAD
  const winningResult = getWinningPrizeResult(lottoNumbers, winningNumbers);

  updateLottoPrizeCount(winningResult);

  displayWinningStats();
  displayTotalProfitRate(avaliableCount);

  closeUserInput();
=======
  if (!isAvaliableBonusNumber) {
    return false;
  }
<<<<<<< HEAD
>>>>>>> a7c387c ([feat] 기능 실행 부분 로직 작성)
=======
=======
  const inputBonusNumber = await getInputBonusNumber(inputWinningNumbers);
>>>>>>> 729d2cf ([feat] UX 개선에 따른 index.js 로직 변경)

  const winningNumbers = inputWinningNumbers
    .split(",")
    .map((number) => Number(number.trim()))
    .concat(inputBonusNumber);

  const winningResult = getWinningPrizeResult(lottoNumbers, winningNumbers);

  displayWinningStats(winningResult);
  displayTotalProfitRate(avaliableCount);
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> 3b7c1b7 ([feat] 1차 기능 구현 완료)
=======

  closeUserInput();
>>>>>>> a7b8ec4 ([feat] index 로직 작성)
=======
>>>>>>> 0792fce ([feat] 재시작을 위한 로직 변경)
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
