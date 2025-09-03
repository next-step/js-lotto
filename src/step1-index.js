import buyLottoAsync from "./Asynchronous/LottoPurchase.js";
import LottoPurchase from "./Class/LottoPurchase.js";
import WinningNumbers from "./Class/WinningNumbers.js";

const buyLottoHandler = async () => {
  const lottoPurchaseAmount = await buyLottoAsync(
    "> 구입금액을 입력해 주세요. "
  );

  const lottoPurchase = new LottoPurchase();

  console.log(lottoPurchaseAmount);

  const lottos = lottoPurchase.buyLotto(lottoPurchaseAmount);
};

buyLottoHandler();
