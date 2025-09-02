import { LottoGame } from "./domain/LottoGame.js";
import { View } from "./view/View.js";

async function main() {
  const purchasePrice = await View.read("구입금액을 입력해 주세요.");

  const lottoGame = new LottoGame();
  const lottos = lottoGame.buy(Number(purchasePrice));

  View.log(`${purchasePrice / LottoGame.LOTTO_PRICE}개를 구매했습니다.`);

  for (let i = 0; i < lottos.length; i += 1) {
    View.log(lottos[i]);
  }

  const winningNumbersInput = await View.read("\n당첨 번호를 입력해 주세요.");
  const winningNumbers = winningNumbersInput.split(",").map(Number);

  const bonusNumber = await View.read("보너스 번호를 입력해 주세요.");
}

main();
