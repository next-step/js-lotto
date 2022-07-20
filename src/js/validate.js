import {
  ERROR_INPUT_MONEY_TOO_SMALL,
  ERROR_INPUT_MONEY_TOO_MANY,
  ERROR_INPUT_MONEY_NOT_NUMBER,
  ERROR_INPUT_MONEY_MULTIPLE_OF_LOTTO_PRICE,
} from "./constants/errors.js";
import { LOTTO_PRICE, MAX_INPUT_MONEY } from "./constants/nums.js";

const fireError = function (error) {
  console.error(error);
  window.alert(error);
};

export const validateInputMoney = function (inputMoney) {
  const isInputMoneyNumber = !Number.isNaN(inputMoney);
  const isInputMoneyTooSmall = inputMoney <= 0;
  const isInputMoneyTooMany = inputMoney > MAX_INPUT_MONEY;
  const isInputMoneyMulitpleOfLottoPrice = inputMoney % LOTTO_PRICE === 0;

  try {
    if (!isInputMoneyNumber) throw ERROR_INPUT_MONEY_NOT_NUMBER;
    if (isInputMoneyTooSmall) throw ERROR_INPUT_MONEY_TOO_SMALL;
    if (!isInputMoneyMulitpleOfLottoPrice)
      throw ERROR_INPUT_MONEY_MULTIPLE_OF_LOTTO_PRICE;
    if (isInputMoneyTooMany) throw ERROR_INPUT_MONEY_TOO_MANY;
    return true;
  } catch (err) {
    fireError(err);
  }
};
