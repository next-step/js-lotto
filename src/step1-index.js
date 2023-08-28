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
} from "./utils/consoleMessage.js";
import {
  displayAvailableLottoCount,
  displayLottoNumbers,
  displayTotalProfitRate,
  displayWinningStats,
} from "./view/view.js";

async function lottoGame() {
  const inputPrice = await getUserInput(inputLottoPriceMessage);
  const isAvaliablePrice = validateInputPrice(inputPrice);

  if (!isAvaliablePrice) {
    closeUserInput();
    return false;
  }

  // 몇개 살 수 있는 지 출력
  const avaliableCount = calcLottoCount(inputPrice);
  displayAvailableLottoCount(avaliableCount);

  // 로또 번호 출력
  const lottoNumbers = createLottosForAmount(calcLottoCount(inputPrice));
  displayLottoNumbers(lottoNumbers);

  // 사용자의 당첨 번호 입력
  const inputWinningNumbers = await getUserInput(inputLottoNumberMessage);
  const isAvaliableNumbers = validateInputWinningNumbers(inputWinningNumbers);

  if (!isAvaliableNumbers) {
    closeUserInput();
    return false;
  }

  // 보너스 번호 입력
  const inputBonusNumber = await getUserInput(inputBonusNumberMessage);
  const isAvaliableBonusNumber = validateInputBonusNumber(
    inputWinningNumbers,
    inputBonusNumber
  );

  if (!isAvaliableBonusNumber) {
    closeUserInput();
    return false;
  }

  const winningNumbers = inputWinningNumbers
    .split(",")
    .map((number) => Number(number.trim()))
    .concat(inputBonusNumber);

  const winningResult = getWinningPrizeResult(lottoNumbers, winningNumbers);

  displayWinningStats(winningResult);
  displayTotalProfitRate(avaliableCount);

  closeUserInput();
}

lottoGame();
