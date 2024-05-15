import { lottoMoneyRule } from "../rules/LottoMoney.rule";
import { readLineAsync } from "../utils/readLineSync";
import Lotto from "./Lotto";

const View = {
  async getMoney() {
    try {
      const money = await readLineAsync(`> 구입금액을 입력해 주세요.\n`);
      if (lottoMoneyRule.validates(money)) return +money;
    } catch (error) {
      console.error(error);
    }
  },

  /**
   * 로또 구매 시, 로또 정보를 출력한다.
   * @param {Lotto[]} lottos
   */
  printLottoInfo(lottos) {
    this.printTheNumberOfLottos(lottos.length);
    lottos.forEach((lotto) => this.printLottoNumbers(lotto));
  },

  printTheNumberOfLottos(value) {
    console.log(`${value}개를 구매했습니다.`);
  },

  /**
   * 로또 한 장의 번호들을 출력한다.
   * @param {Lotto} lotto
   */
  printLottoNumbers(lotto) {
    console.log(lotto.getNumbers().sort((a, b) => a - b));
  },
};

export default View;
