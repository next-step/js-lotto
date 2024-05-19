import { go } from "../../utils/fx.js";
import validation from "../../utils/validation.js";

export const validateAmountPaid = (amountPaid) =>
  go(amountPaid, validation.isInteger, validation.isInRange(0, Infinity));
