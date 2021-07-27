export const $ = ({ target = document, selector }) =>
  target.querySelector(selector);

export const addEvent = ({ el, type, callback }) => {
  el.addEventListener(type, callback);
};

const getRandomNumbers = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getRandomNumberArray = () => {
  let numCount = 6;
  let numArray = [];
  while (numCount) {
    const newNum = getRandomNumbers(1, 45);
    if (numArray.includes(newNum)) {
      continue;
    }
    numArray = [...numArray, newNum];
    numCount--;
  }
  return numArray;
};
