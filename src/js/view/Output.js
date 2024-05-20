import { Lotto } from "../domain/Lotto";
import { LottoRank } from "../domain/LottoRank";

export const Output = {
  /**
   * 로또 구매 시, 로또 정보를 출력한다.
   * @param {Lotto[]} lottos
   */
  printLottoInfo(lottos) {
    this.printTheNumberOfLottos(lottos.length);
    lottos.forEach((lotto) => this.printLottoNumbers(lotto));
  },

  /**
   * @param {Map} lottoRankCounts
   */
  printLottoStatistics({ lottoResult, lottoReturn }) {
    console.log(`당첨 통계\n--------------------`);
    this.printLottoResult(lottoResult);
    this.printLottoReturn(lottoReturn);
  },
  
  printTheNumberOfLottos(value) {
    console.log(`${value}개를 구매했습니다.`);
  },

  /**
   * 로또 한 장의 번호들을 출력한다.
   * @param {Lotto} lotto
   */
  printLottoNumbers(lotto) {
    console.log(lotto.numbers);
  },

  printLottoResult(lottoResult) {
    lottoResult.forEach(({ text, prize, count }) => {
      if (text && prize) {
        console.log(`${text} (${prize.toLocaleString()}원)- ${count}개`);
      }
    });
  },

  printLottoReturn(lottoReturn) {
    console.log(`총 수익률은 ${lottoReturn.toFixed(2)}% 입니다.`);
  },
};
