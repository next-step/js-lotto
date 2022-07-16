const getRandomIndex = (array = []) => Math.floor(Math.random() * array.length);
const getPickupElementByIndex = (array, index) => array.splice(index, 1)[0];
const compareNumbers = (prev, next) => {
  return prev - next;
};
const reduceByFunctionCompose =
  (array, defaultValue = '') =>
  (f) =>
    array.reduce((result, element) => result + f(element), defaultValue);
export {
  getRandomIndex,
  getPickupElementByIndex,
  compareNumbers,
  reduceByFunctionCompose,
};
