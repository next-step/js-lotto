import { print } from "./utils/print.js";
import { LottoChecker } from "../domains/LottoChecker/index.js";

export function printLottos(lottos) {
  lottos.forEach((lotto) => {
    print(lotto.numbers);
  });
}

export function printRankResult(lottoResult) {
  const RANKS = [1, 2, 3, 4, 5];

  RANKS.forEach((rank) => {
    print(
      `${LottoChecker.RANK_INFO[rank].matchingCount}개 일치${
        rank === 2 ? ", 보너스 볼 일치" : ""
      } (${LottoChecker.RANK_INFO[rank].price.toLocaleString()}원) - ${
        lottoResult[rank]
      }개`
    );
  });
}

export function printTotalRateOfReturn(totalPrice, purchasePrice) {
  print(
    `총 수익률은 ${((totalPrice * 100) / purchasePrice).toFixed(1)}%입니다.`
  );
}
