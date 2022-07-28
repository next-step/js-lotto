const getRandomIndex = (array = []) => Math.floor(Math.random() * array.length);
const getPickupElementByIndex = (array, index) => array.splice(index, 1)[0];
const compareNumbers = (prev, next) => {
  return prev - next;
};
const reduceByFunctionCompose =
  (array, defaultValue = '') =>
  (f) =>
    array.reduce((result, element) => result + f(element), defaultValue);
const filterByNumber = (array, filteredNumber) =>
  array.filter((element) => +element === +filteredNumber);

const isDuplicated = (array) => {
  return new Set(array).size !== array.length;
};
export {
  getRandomIndex,
  getPickupElementByIndex,
  compareNumbers,
  reduceByFunctionCompose,
  filterByNumber,
  isDuplicated,
};
