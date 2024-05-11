import { INPUT_MESSAGE } from "../../constants/message";
import { convertNumbersToArray } from "../../utils/convertNumbersToArray";
import { readline } from "../../utils/readline";

export const input = {
  async purchasePrice() {
    const purchasePrice = await readline.question(
      INPUT_MESSAGE.INPUT_PURCHASE_PRICE,
      () => readline.close()
    );

    return Number(purchasePrice);
  },

  async winningLotto() {
    const winningNumbers = await readline.question(
      INPUT_MESSAGE.INPUT_WINNING_NUMBER,
      () => readline.close()
    );

    return convertNumbersToArray(winningNumbers);
  },

  async bonusNumber() {
    return await readline.question(INPUT_MESSAGE.INPUT_BONUS_NUMBER, () =>
      readline.close()
    );
  },
};
