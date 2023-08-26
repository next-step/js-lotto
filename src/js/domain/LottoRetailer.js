import { LOTTO_PRICE } from "../constants";
import { Lotto } from "./Lotto";

export class LottoRetailer {
  issues(money) {
    const numberOfLottoToIssue = parseInt(money / LOTTO_PRICE);
    const change = money % LOTTO_PRICE;
    const lottoList = Array.from({ length: numberOfLottoToIssue }).map(() =>
      Lotto.random()
    );
    return { lottoList, change };
  }
}
