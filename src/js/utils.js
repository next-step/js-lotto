const getRandomIndex = (array = []) => Math.floor(Math.random() * array.length);
const getPickupElementByIndex = (array, index) => array.splice(index, 1)[0];
const compareNumbers = (prev, next) => {
  return prev - next;
};
export { getRandomIndex, getPickupElementByIndex, compareNumbers };
