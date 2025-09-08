import LottoPurchase from "./class/lottoPurchase.js";
import WinningNumbers from "./class/winningNumbers.js";
import { InputType } from "./constants/lotto.js";
import { checkByType } from "./lib/lottoLib.js";
import readlineAsync from "./lib/readlineAsync.js";

async function inputBonusWinningNumber() {
  try {
    console.log();
    const bonusNumber = await readlineAsync("> 보너스 번호를 입력해 주세요. ");
    console.log();

    if (checkByType(InputType.BONUS_NUMBER, bonusNumber)) {
      throw new Error("잘못된 입력 방식입니다.");
    }

    return bonusNumber;
  } catch (e) {
    console.error(e);
    return inputBonusWinningNumber();
  }
}

async function inputWinningNumber(lottos, purchaseAmount) {
  try {
    console.log();
    const winningNumber = await readlineAsync(" > 당첨 번호를 입력해 주세요.");

    if (checkByType(InputType.WINNER_NUMBER, winningNumber)) {
      throw new Error("잘못된 입력 방식입니다.");
    }

    const bonusNumber = await inputBonusWinningNumber();

    const changeStringToNumberArr = winningNumber
      .replace(/ /g, "")
      .split(",")
      .map((num) => Number(num));

    const classWinningNumber = new WinningNumbers(
      changeStringToNumberArr,
      Number(bonusNumber)
    );

    const priceCheck = classWinningNumber.checkWinningStatistics(lottos);
    classWinningNumber.rateOfReturn(priceCheck, purchaseAmount);

    restartBuyLotto();
  } catch (e) {
    console.error(e);
    inputWinningNumber(lottos, purchaseAmount);
  }
}

async function buyLottoHandler() {
  try {
    const lottoPurchaseAmount = await readlineAsync(
      "> 구입금액을 입력해 주세요. "
    );

    if (checkByType(InputType.PRICE, lottoPurchaseAmount)) {
      throw new Error("숫자만 입력 가능하며, 1000원 단위로 입력해주세요.");
    }

    const classLottoPurchase = new LottoPurchase(Number(lottoPurchaseAmount));

    const lottos = classLottoPurchase.buyLotto(Number(lottoPurchaseAmount));
    inputWinningNumber(lottos, lottoPurchaseAmount);
  } catch (e) {
    console.error(e);
    buyLottoHandler();
  }
}

async function restartBuyLotto() {
  try {
    console.log();
    const restart = await readlineAsync("> 다시 시작하시겠습니까? (y/n) ");
    console.log();

    if (restart.toUpperCase() !== "Y" && restart.toUpperCase() !== "N") {
      throw new Error("잘못된 입력 방식입니다.");
    }

    if (restart.toUpperCase() === "Y") {
      buyLottoHandler();
    }

    return;
  } catch (e) {
    console.error(e);
    restartBuyLotto();
  }
}

buyLottoHandler();
