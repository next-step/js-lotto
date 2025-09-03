import buyLottoAsync from "./asynchronous/lottoPurchase.js";
import LottoPurchase from "./class/lottoPurchase.js";
import WinningNumbers from "./class/winningNumbers.js";

const buyLottoHandler = async () => {
  const lottoPurchaseAmount = await buyLottoAsync(
    "> 구입금액을 입력해 주세요. "
  );

  const lottoPurchase = new LottoPurchase();

  const lottos = lottoPurchase.buyLotto(lottoPurchaseAmount);
};

buyLottoHandler();
