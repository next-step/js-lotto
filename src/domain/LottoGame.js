import { LOTTO_WINNING_PRICE } from "../constants/lotto.js";
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
    const result = {
      first: 0,
      second: 0,
      third: 0,
      fourth: 0,
      fifth: 0,
    };

    for (let i = 0; i < lottoNumbers.length; i += 1) {
      const lottoNumber = lottoNumbers[i];
      let matchCount = 0;

      for (let j = 0; j < lottoNumber.length; j += 1) {
        const number = lottoNumber[j];

        if (winningNumbers.includes(number)) {
          matchCount += 1;
        }
      }

      if (matchCount < 3) {
        continue;
      }

      if (matchCount === 3) {
        result.fifth += 1;
      }

      if (matchCount === 4) {
        result.fourth += 1;
      }

      if (matchCount === 5) {
        if (lottoNumber.includes(bonusNumber)) {
          result.second += 1;
          return;
        }

        result.third += 1;
      }

      if (matchCount === 6) {
        result.first += 1;
      }
    }

    return result;
  }

  /**
   * 0%는 0, 100%는 1로 반환하고 있어서 사용하는 곳에서 필요에 따라 포맷팅이 필요합니다.
   */
  getRateOfReturn({ purchasePrice, lottoResult }) {
    const totalPrice = this.#getLottoResultTotalPrice(lottoResult);

    return totalPrice / purchasePrice;
  }

  #getLottoResultTotalPrice(lottoResult) {
    let result = 0;

    Object.entries(lottoResult).forEach(([rank, count]) => {
      result += LOTTO_WINNING_PRICE[rank] * count;
    });

    return result;
  }
}
