import { INPUT_MESSAGE } from "../../constants/message";
import { readline } from "../../utils/readline";

export const input = {
  async purchasePrice() {
    const purchasePrice = await readline.question(INPUT_MESSAGE.INPUT_PURCHASE_PRICE, () => readline.close());

    return Number(purchasePrice);
  },

  async winningLotto() {
    const winningNumbers = await readline.question(INPUT_MESSAGE.INPUT_WINNING_NUMBER, () => readline.close());
    const convertNumbersToArray = (numbers) => numbers.split(",").map((number) => parseInt(number.trim()));

    return convertNumbersToArray(winningNumbers);
  },

  async bonusNumber() {
    const bonusNumber = await readline.question(INPUT_MESSAGE.INPUT_BONUS_NUMBER, () => readline.close());

    return Number(bonusNumber);
  },
};
