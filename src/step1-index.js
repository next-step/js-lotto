import { LottoGame } from "./domain/LottoGame.js";
import { View } from "./view/View.js";
import { LottoView } from "./view/LottoView.js";
import { getPercentage } from "./utils/getPercentage.js";
import { LottoShop } from "./domain/LottoShop.js";
import { WinningLotto } from "./domain/WinningLotto.js";

async function main() {
  while (true) {
    await play();

    const retryYn = await View.read("\n다시 시작하시겠습니까? (y/n)");

    if (retryYn === "n") {
      break;
    }

    if (retryYn === "y") {
      continue;
    }
  }
}

async function play() {
  const purchasePrice = await LottoView.getPurchasePrice();

  const lottos = LottoShop.buy(purchasePrice);

  View.log(`${purchasePrice / LottoShop.LOTTO_PRICE}개를 구매했습니다.`);

  for (let i = 0; i < lottos.length; i += 1) {
    View.log(lottos[i].value.map((lottoNumber) => lottoNumber.value));
  }

  const winningNumber = await LottoView.getWinningNumber();

  const bonusNumber = await LottoView.getBonusNumber({ winningNumber });

  const winningLotto = WinningLotto.of({
    winningNumber,
    bonusNumber,
  });

  const lottoResult = LottoGame.checkResult({
    lottos,
    winningLotto,
  });

  const rateOfReturn = LottoGame.getRateOfReturn({
    purchasePrice,
    lottoResult,
  });

  LottoView.printLottoResult({
    lottoResult,
    lottoRank: LottoGame.LOTTO_RANK,
  });

  View.log(`총 수익률은 ${getPercentage(rateOfReturn)}%입니다.`);
}

main();
