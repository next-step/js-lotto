import { ERROR_MESSAGE, VALID_NUMBER_REQUIRED } from "./errorMessage.js";
import { askQuestion } from "./readlineAPI.js";

export const isValidNumber = num => typeof num === "number";

/**
 * @param {number} num
 */
export const validatePositiveNumber = num => {
  if (!isValidNumber(num) || isNaN(num)) {
    throw new Error(ERROR_MESSAGE[VALID_NUMBER_REQUIRED]);
  }

  if (num <= 0) {
    throw Error(ERROR_MESSAGE[VALID_NUMBER_REQUIRED]);
  }
};

export const validateYesOrNoInput = input => {
  if (!(input.toLowerCase() === "y" || input.toLowerCase() === "n")) {
    throw new Error(ERROR_MESSAGE.ALLOWED_YES_NO);
  }
};
