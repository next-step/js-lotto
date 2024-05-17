import { lottoMoneyRule } from "../rules/LottoMoney.rule";
import { bonusNumberRule, lottoRule } from "../rules/Lotto.rule";
import { readLineAsync } from "../utils/readLineSync";
import { Lotto } from "./Lotto";
import { LOTTO_PRIZE } from "../constants";

const View = {
  async getMoney() {
    try {
      const money = await readLineAsync(`> 구입금액을 입력해 주세요.\n`);
      if (lottoMoneyRule.validates(money)) return +money;
    } catch (error) {
      console.error(error);
    }
  },

  async getLottoNumbers() {
    try {
      const winningNumbers = await this.getWinningNumbers();
      const bonusNumber = await this.getBonusNumber(winningNumbers);

      return { winningNumbers, bonusNumber };
    } catch (error) {
      console.error(error);
    }
  },

  async getWinningNumbers() {
    const winningNumbers = await readLineAsync(`> 당첨 번호를 입력해 주세요.`);
    if (lottoRule.validates(winningNumbers))
      return winningNumbers.split(",").map((number) => +number);
  },

  async getBonusNumber(winningNumbers) {
    const bonusNumber = await readLineAsync(`> 보너스 번호를 입력해 주세요.`);
    if (bonusNumberRule.validates(bonusNumber, winningNumbers)) return +bonusNumber;
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

  /**
   * @param {Map} lottoRankCounts
   */
  printLottoStatistics(lottoRankCounts) {
    console.log(`당첨 통계\n--------------------`);
    this.printLottoResult(lottoRankCounts);
    this.printLottoReturn(lottoRankCounts);
  },

  printLottoResult(lottoRankCounts) {
    Object.values(LOTTO_PRIZE).forEach(({ text, prize, rank }) => {
      const count = lottoRankCounts.get(rank) || 0;
      if (text && prize) {
        console.log(`${text} (${prize.toLocaleString()}원)- ${count}개`);
      }
    });
  },

  printLottoReturn(lottoRankCounts) {
    const total = Array.from(lottoRankCounts.values()).reduce((acc, value) => acc + value, 0);
    const failed = lottoRankCounts.get(LOTTO_PRIZE.FAIL.rank) || 0;
    const lottoReturn = ((total - failed) / total) * 100;
    
    console.log(`총 수익률을 ${lottoReturn.toFixed(2)}% 입니다.`);
  },
};

export default View;
