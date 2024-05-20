import { readLineAsync } from "../utils/readLineSync";


export const Input = {
  async getMoney() {
    const money = await readLineAsync(`> 구입금액을 입력해 주세요.\n`);
    return +money;
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
