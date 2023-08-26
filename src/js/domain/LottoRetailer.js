import { LOTTO_PRICE, MAX_SELL_QUANTITY_AT_ONCE } from "../constants";
import { Lotto } from "./Lotto";

export class LottoRetailer {
  issues(money) {
    const numberOfLottoCanBuy = parseInt(money / LOTTO_PRICE);
    const numberOfLottoToIssue =
      numberOfLottoCanBuy < MAX_SELL_QUANTITY_AT_ONCE
        ? numberOfLottoCanBuy
        : MAX_SELL_QUANTITY_AT_ONCE;
    const change = money - numberOfLottoToIssue * LOTTO_PRICE;
    const lottoList = Array.from({ length: numberOfLottoToIssue }).map(() =>
      Lotto.random()
    );
    return { lottoList, change };
  }
}
