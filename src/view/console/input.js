import { INPUT_MESSAGE } from "../../constants/message";
import { readline } from "../../utils/readline";

export const input = {
  async purchasePrice() {
    const purchasePrice = await readline.question(INPUT_MESSAGE.PURCHASE_PRICE, () => readline.close());

    return Number(purchasePrice);
  },

  async winningLotto() {
    const winningNumbers = await readline.question(INPUT_MESSAGE.WINNING_NUMBER, () => readline.close());
    const convertNumbersToArray = (numbers) => numbers.split(",").map((number) => Number(number.trim()));

    return convertNumbersToArray(winningNumbers);
  },

  async bonusNumber() {
    const bonusNumber = await readline.question(INPUT_MESSAGE.BONUS_NUMBER, () => readline.close());

    return Number(bonusNumber);
  },

  async continue() {
    const isContinue = await readline.question(INPUT_MESSAGE.CONTINUE, () => readline.close());

    return isContinue;
  },
};
