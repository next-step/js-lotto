import {
  CLICK_EVENT_TARGET_IDS,
  PERCENT,
  SUBMIT_EVENT_TARGET_IDS,
} from "./constants.js";

export const isValidAmountUnit = (amount) => /000$/.test(amount);

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

export const getInputNumberValues = ($inputs) =>
  Array.from($inputs).map(({ value }) => Number(value));

export const hasDuplicatedValueInputs = ($inputs, $bonusInput) => {
  const values = Array.from([...$inputs, $bonusInput]).map(
    ({ value }) => value
  );
  const removedDuplicatedValues = [...new Set(values)];

  return values.length !== removedDuplicatedValues.length;
};

export const getMatchedValueCountInArray = (value1, value2) =>
  value1.filter((val) => value2.includes(val)).length;

export const isValidSubmitEventTarget = (target) =>
  SUBMIT_EVENT_TARGET_IDS.includes(target.getAttribute("id"));

export const isValidClickEventTarget = (target) =>
  CLICK_EVENT_TARGET_IDS.includes(target.getAttribute("id"));

export const calculatorReturnLate = (profits, investment) =>
  Math.trunc(((profits - investment) / investment) * PERCENT);

export const getTotalSum = (numbers) =>
  numbers.reduce((acc, cur) => {
    acc += cur;
    return acc;
  }, 0);
