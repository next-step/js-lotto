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
  processLottoPurchase,
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
} from "./utils/consoleMessage.js";
import {
  displayAvailableLottoCount,
  displayLottoNumbers,
} from "./view/view.js";

async function lottoGame() {
  const inputPrice = await getUserInput(inputLottoPriceMessage);
  const isAvaliablePrice = validateInputPrice(inputPrice);

  if (!isAvaliablePrice) {
>>>>>>> a7c387c ([feat] 기능 실행 부분 로직 작성)
    closeUserInput();
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
  // 몇개 살 수 있는 지 출력
  const avaliableCount = processLottoPurchase(inputPrice);
  displayAvailableLottoCount(avaliableCount);

  // 로또 번호 출력
  const lottoNumbers = createLottosForAmount(calcLottoCount(inputPrice));
  displayLottoNumbers(lottoNumbers);

  // 사용자의 당첨 번호 입력
  const inputWinningNumbers = await getUserInput(inputLottoNumberMessage);
  const isAvaliableNumbers = validateInputWinningNumbers(inputWinningNumbers);

  if (!isAvaliableNumbers) {
>>>>>>> a7c387c ([feat] 기능 실행 부분 로직 작성)
    closeUserInput();
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
    closeUserInput();
    return false;
  }
>>>>>>> a7c387c ([feat] 기능 실행 부분 로직 작성)
}

lottoGame();
