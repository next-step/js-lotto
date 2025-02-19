import {
  ERROR_MESSAGES,
  LOTTO_NUMBER_RANGE,
  TICKET_UNIT,
} from "../../constants.js";
import {
  isValidNumberArray,
  isValidNumberInRange,
  isValidPurchaseAmount,
} from "../../validation.js";
import { promptWithValidation } from "./common/input.js";

export async function getPurchaseAmount() {
  const amount = await promptWithValidation({
    query: "Enter purchase amount: ",
    transformFn: (input) => parseInt(input, 10),
    validationFn: (amount) =>
      !isNaN(amount) && isValidPurchaseAmount(amount, TICKET_UNIT),
    errorMessage: ERROR_MESSAGES.PURCHASE_INVALID_AMOUNT,
  });

  return amount;
}

export async function getWinningNumbers() {
  const numbers = await promptWithValidation({
    query: "Enter winning numbers (comma-separated, 1-45): ",
    transformFn: (input) =>
      input.split(",").map((num) => parseInt(num.trim(), 10)),
    validationFn: (numbers) =>
      Array.isArray(numbers) &&
      numbers.length === 6 &&
      isValidNumberArray(numbers, LOTTO_NUMBER_RANGE),
    errorMessage: ERROR_MESSAGES.WINNING_NUMBERS_INVALID,
  });

  return numbers;
}

export async function getBonusNumber() {
  const bonusNumber = await promptWithValidation({
    query: "Enter bonus number (1-45): ",
    transformFn: (input) => parseInt(input.trim(), 10),
    validationFn: (num) => isValidNumberInRange(num, LOTTO_NUMBER_RANGE),
    errorMessage: ERROR_MESSAGES.BONUS_NUMBER_INVALID,
  });

  return bonusNumber;
}

export async function getRestartChoice() {
  const choice = await promptWithValidation({
    query: "Play again? (Y/N, Enter = Yes): ",
    transformFn: (input) => input.trim().toUpperCase(),
    validationFn: (choice) => ["Y", "N", ""].includes(choice),
    errorMessage:
      "Invalid choice. Press 'Y' to restart, 'N' to exit, or Enter for default.",
  });

  return choice === "Y" || choice === "";
}
