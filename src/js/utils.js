import {
  BONUS_MATCHED_COUNT,
  CLICK_EVENT_TARGET_IDS,
  MESSAGE_ABOUT_UNIT_OF_AMOUNT,
  MINIMUM_MATCHED_COUNT_FOR_2TH,
  MINIMUM_MATCHED_COUNT_FOR_5TH,
  PERCENT,
  SUBMIT_EVENT_TARGET_IDS,
} from "./constants.js";

export class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

export const checkValidAmountUnit = (amount) => {
  if (/000$/.test(amount) === false) {
    throw new ValidationError(MESSAGE_ABOUT_UNIT_OF_AMOUNT);
  }
};

export const removeAllChildNodes = (parent) => {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
};

export const getRandomNumber = (max) => Math.floor(Math.random() * max) + 1;

export const toggleClass = ({ $element, className, flag }) => {
  flag
    ? $element.classList.add(className)
    : $element.classList.remove(className);
};

export const getInputValuesAsNumber = ($inputs) =>
  Array.from($inputs).map(({ value }) => Number(value));

export const getInputValuesWithArray = (inputArray) =>
  inputArray.map(({ value }) => value);

export const hasDuplicatedValueInArray = (original) =>
  original.length !== [...new Set(original)].length;

export const getMatchedValueCountInArray = (value1, value2) =>
  value1.filter((val) => value2.includes(val)).length;

export const isValidSubmitEventTarget = (target) =>
  SUBMIT_EVENT_TARGET_IDS.includes(target.getAttribute("id"));

export const isValidClickEventTarget = (target) =>
  CLICK_EVENT_TARGET_IDS.includes(target.getAttribute("id"));

export const calculatorReturnRate = (profits, investment) =>
  Math.trunc(((profits - investment) / investment) * PERCENT);

export const getTotalSum = (numbers) =>
  numbers.reduce((acc, cur) => {
    acc += cur;
    return acc;
  }, 0);

export const getMatchedNumberCounts = (lottos, winningNumbers, bonusNumber) =>
  lottos.map((lotto) => {
    const matchedValueCount = getMatchedValueCountInArray(
      lotto,
      winningNumbers
    );
    const hasBonusNumber =
      lotto.find((num) => num === bonusNumber) !== undefined;

    if (matchedValueCount === MINIMUM_MATCHED_COUNT_FOR_2TH && hasBonusNumber)
      return "bonus";

    return matchedValueCount >= MINIMUM_MATCHED_COUNT_FOR_5TH && hasBonusNumber
      ? matchedValueCount + BONUS_MATCHED_COUNT
      : matchedValueCount;
  });

export const getWinningStatistics = (matchedNumbers) =>
  matchedNumbers.reduce((acc, cur) => {
    if (cur < 3) return acc;

    acc[cur] = (acc[cur] || 0) + 1;
    return acc;
  }, {});
