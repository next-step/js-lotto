import LottoPurchase from "./class/lottoPurchase.js";
import WinningNumbers from "./class/winningNumbers.js";
import { LOTTO_PRICE_TYPE } from "./constants/lotto.js";
import { checkByType } from "./lib/lottoLib.js";
import readlineAsync from "./lib/readlineAsync.js";

const inputNumber = async (lottos) => {
  const winningNumber = await readlineAsync("> 당첨 번호를 입력해 주세요. ");

  const bonusNumber = await readlineAsync("> 당첨 번호를 입력해 주세요. ");
};

const buyLottoHandler = async () => {
  const lottoPurchaseAmount = await readlineAsync(
    "> 구입금액을 입력해 주세요. "
  );

  if (!checkByType(LOTTO_PRICE_TYPE, lottoPurchaseAmount)) {
    return;
  }

  const lottoPurchase = new LottoPurchase();

  const lottos = lottoPurchase.buyLotto(Number(lottoPurchaseAmount));
  inputNumber(lottos);
};

buyLottoHandler();
