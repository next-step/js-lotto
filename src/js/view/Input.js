import { lottoMoneyRule } from "../rules";
import { readLineAsync } from "../utils/readLineSync";
import { Lotto, WinningLotto } from "../domain/Lotto";


export const Input = {
  async getMoney() {
    const money = await readLineAsync(`> 구입금액을 입력해 주세요.\n`);
    if (lottoMoneyRule.validates(money)) return +money;
  },

  async getWinningNumbers() {
    const winningNumbers = await readLineAsync(`> 당첨 번호를 입력해 주세요.`);
    return winningNumbers.split(",").map((number) => +number);
  },

  async getBonusNumber() {
    const bonusNumber = await readLineAsync(`> 보너스 번호를 입력해 주세요.`);
    return +bonusNumber;
  },
};
