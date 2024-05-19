import { ERROR_CODES } from "../../constants/error";
import { Lotto } from "../../domain/Lotto";

export function validateAmount(amount) {
  if (amount < Lotto.PRICE) {
    throw new Error(ERROR_CODES.ERROR_AMOUNT_TOO_SMALL);
  }
}
