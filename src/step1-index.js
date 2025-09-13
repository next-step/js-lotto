import { readLineAsync } from "./ui/utils/readLineAsync.js";
import { LottoMachine } from "./domains/LottoMachine/index.js";
import { LottoNumber } from "./domains/LottoNumber/index.js";
import { Lotto } from "./domains/Lotto/index.js";
import { WinningLotto } from "./domains/WinningLotto/index.js";
import { LottoShop } from "./domains/LottoShop/index.js";
import { RANKS, LottoChecker } from "./domains/LottoChecker/index.js";

const play = async () => {
  const lottoShop = new LottoShop({
    lottoMachine: new LottoMachine(),
    lottoPrice: LottoShop.BASE_LOTTO_PRICE,
  });

  const purchasePrice = await readLineAsync("구입금액을 입력해 주세요.");

  const lottos = lottoShop.buyLottos(purchasePrice);

  print(`${lottos.length}개를 구매했습니다.`);
  printLottos(lottos);
  console.log();

  const winningNumbers = await readLineAsync("당첨 번호를 입력해 주세요.");
  console.log();

  const bonusNumber = await readLineAsync("보너스 번호를 입력해 주세요.");
  console.log();

  const winningLotto = new WinningLotto(
    new Lotto(winningNumbers.split(",").map((num) => Number(num))),
    new LottoNumber(Number(bonusNumber))
  );

  const { rankResult, totalPrice } = LottoChecker.checkLotto(
    winningLotto,
    lottos
  );

  print("당첨 통계");
  print("--------------------");
  printRankResult(rankResult);
  console.log();
  printTotalRateOfReturn(totalPrice, purchasePrice);
};

play();

function print(text) {
  console.log(text);
}

function printLottos(lottos) {
  lottos.forEach((lotto) => {
    console.log(lotto.numbers);
  });
}

function printRankResult(lottoResult) {
  RANKS.reverse().forEach((rank) => {
    console.log(
      `${LottoChecker.RANK_INFO[rank].matchingCount}개 일치${
        rank === 2 ? ", 보너스 볼 일치" : ""
      } (${LottoChecker.RANK_INFO[rank].price.toLocaleString()}원) - ${
        lottoResult[rank]
      }개`
    );
  });
}

function printTotalRateOfReturn(totalPrice, purchasePrice) {
  console.log(
    `총 수익률은 ${((totalPrice * 100) / purchasePrice).toFixed(1)}%입니다.`
  );
}
