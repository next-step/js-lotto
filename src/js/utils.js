export const checkAmountUnit = (amount) => /000$/.test(amount);

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
