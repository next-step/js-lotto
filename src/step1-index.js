import LottoPurchase from "./class/lottoPurchase.js";
import WinningNumbers from "./class/winningNumbers.js";
import {
  LOTTO_BONUS_NUMBER_TYPE,
  LOTTO_PRICE_TYPE,
  LOTTO_WINNER_NUMBERS_TYPE,
} from "./constants/lotto.js";
import { checkByType } from "./lib/lottoLib.js";
import readlineAsync from "./lib/readlineAsync.js";

const inputNumber = async (lottos, purchaseAmount) => {
  console.log();
  const winningNumber = await readlineAsync(" > 당첨 번호를 입력해 주세요.");

  if (!checkByType(LOTTO_WINNER_NUMBERS_TYPE, winningNumber)) {
    return;
  }

  console.log();
  const bonusNumber = await readlineAsync("> 보너스 번호를 입력해 주세요. ");
  console.log();

  if (!checkByType(LOTTO_BONUS_NUMBER_TYPE, bonusNumber)) {
    return;
  }

  const changeStringToNumberArr = winningNumber
    .replace(/ /g, "")
    .split(",")
    .map((num) => Number(num));

  const classWinningNumber = new WinningNumbers(
    changeStringToNumberArr,
    Number(bonusNumber)
  );

  if (
    !classWinningNumber.isValidRangeWinningNumber() ||
    !classWinningNumber.isValidRangeBonusNumber() ||
    !classWinningNumber.isDigitCount() ||
    !classWinningNumber.isBonusNumberNotInWinningNumbers()
  ) {
    return;
  }

  const priceCheck = classWinningNumber.checkWinningStatistics(lottos);
  classWinningNumber.rateOfReturn(priceCheck, purchaseAmount);
};

const buyLottoHandler = async () => {
  const lottoPurchaseAmount = await readlineAsync(
    "> 구입금액을 입력해 주세요. "
  );

  if (!checkByType(LOTTO_PRICE_TYPE, lottoPurchaseAmount)) {
    return;
  }

  const classLottoPurchase = new LottoPurchase(Number(lottoPurchaseAmount));

  const lottos = classLottoPurchase.buyLotto(Number(lottoPurchaseAmount));
  inputNumber(lottos, lottoPurchaseAmount);
};

buyLottoHandler();
