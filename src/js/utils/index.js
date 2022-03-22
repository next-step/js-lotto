export const pickRandomIntegerNumber = (start, end) => Math.floor(Math.random() * end) + start;

export const pickRandomNumbers = (start, end, count) => {
  const randomNumbers = new Set();

  while (randomNumbers.size !== count) {
    randomNumbers.add(pickRandomIntegerNumber(start, end));
  }

  return [...randomNumbers];
};

export const isDuplicatedNumbersInArray = array => array.length !== new Set(array).size;

export const isAllSatisfiedConditionInArray = (array, condition) =>
  array.length === array.filter(i => condition(i)).length;
