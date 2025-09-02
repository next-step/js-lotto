import { LottoGame } from "./domain/LottoGame.js";
import { View } from "./view/View.js";
import { LottoView } from "./view/LottoView.js";

async function main() {
  const purchasePrice = await View.read("구입금액을 입력해 주세요.");

  const lottoGame = new LottoGame();
  const lottoNumbers = lottoGame.buy(Number(purchasePrice));

  View.log(`${purchasePrice / LottoGame.LOTTO_PRICE}개를 구매했습니다.`);

  for (let i = 0; i < lottoNumbers.length; i += 1) {
    View.log(lottoNumbers[i]);
  }

  const winningNumbersInput = await View.read("\n당첨 번호를 입력해 주세요.");
  const winningNumbers = winningNumbersInput.split(",").map(Number);

  const bonusNumber = await View.read("보너스 번호를 입력해 주세요.");

  const lottoResult = lottoGame.checkResult({
    lottoNumbers,
    winningNumbers,
    bonusNumber,
  });
  const rateOfReturn = lottoGame.getRateOfReturn({
    purchasePrice,
    lottoResult,
  });

  LottoView.printLottoResult({ lottoResult });

  View.log(`총 수익률은 ${rateOfReturn * 100}%입니다.`);
}

main();
