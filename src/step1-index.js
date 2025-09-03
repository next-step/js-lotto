import buyLottoAsync from "./asynchronous/lottoPurchase.js";
import LottoPurchase from "./class/lottoPurchase.js";
import WinningNumbers from "./class/winningNumbers.js";
import { LOTTO_PRICE_TYPE } from "./constants/lotto.js";
import { checkByType } from "./lib/lottoLib.js";

const buyLottoHandler = async () => {
  const lottoPurchaseAmount = await buyLottoAsync(
    "> 구입금액을 입력해 주세요. "
  );

  if (!checkByType(LOTTO_PRICE_TYPE, lottoPurchaseAmount)) {
    return;
  }

  const lottoPurchase = new LottoPurchase();

  const lottos = lottoPurchase.buyLotto(Number(lottoPurchaseAmount));
};

buyLottoHandler();
