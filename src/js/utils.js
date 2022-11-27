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

export const hasDuplicatedValueInputs = ($inputs, $bonusInput) => {
  const values = Array.from([...$inputs, $bonusInput]).map(
    ({ value }) => value
  );
  const removedDuplicatedValue = [...new Set(values)];

  return values.length !== removedDuplicatedValue.length;
};
