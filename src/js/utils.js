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

export const getInputValues = ($inputs) =>
  Array.from($inputs).map(({ value }) => Number(value));

export const getCombinedInputValues = ($inputs, $bonusInput) =>
  Array.from([...$inputs, $bonusInput]).map(({ value }) => value);

export const hasDuplicatedValueInputs = ($inputs, $bonusInput) => {
  const values = getCombinedInputValues($inputs, $bonusInput);
  const removedDuplicatedValues = [...new Set(values)];

  return values.length !== removedDuplicatedValues.length;
};

export const getMatchedValueCountInArray = (value1, value2) =>
  value1.filter((val) => value2.includes(val)).length;

export const hasClass = (target, className) =>
  target.classList.contains(className);
