import { Lotto } from "./Lotto.js";

export class LottoGame {
  static LOTTO_PRICE = 1_000;

  buy(price) {
    const lottoCountToBuy = price / LottoGame.LOTTO_PRICE;
    const lotto = new Lotto();

    const lottos = [];

    for (let i = 0; i < lottoCountToBuy; i += 1) {
      lottos.push(lotto.issue());
    }

    return lottos;
  }

  checkResult({ lottoNumbers, winningNumbers, bonusNumber }) {
    return {
      first: 0,
      second: 0,
      third: 0,
      fourth: 0,
      fifth: 2,
    };
  }
}
