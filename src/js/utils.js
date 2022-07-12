const getRandomIndex = (array = []) => Math.floor(Math.random() * array.length);
const getPickupElementByIndex = (array, index) => array.splice(index, 1)[0];
const compareNumbers = (prev, next) => {
  return prev - next;
};
const reduceByFunctionCompose = (array) => (f) =>
  array.reduce((result, element) => result + f(element), ``);
export {
  getRandomIndex,
  getPickupElementByIndex,
  compareNumbers,
  reduceByFunctionCompose,
};
