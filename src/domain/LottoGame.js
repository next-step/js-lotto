import { Lotto } from "./Lotto.js";

export class LottoGame {
  buy(price) {
    const lottoCountToBuy = price / 1_000;
    const lotto = new Lotto();

    const lottos = [];

    for (let i = 0; i < lottoCountToBuy; i += 1) {
      lottos.push(lotto.issue());
    }

    return lottos;
  }
}
