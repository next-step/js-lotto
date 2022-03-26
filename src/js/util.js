export const createLotto = () => {
  let result = [];
  while (result.length < 6) {
    let randomInt = getRandomInteger(1, 45);
    while (result.includes(randomInt)) {
      randomInt = getRandomInteger(1, 45);
    }
    result.push(randomInt);
  }
  return result;
};

const getRandomInteger = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
};
