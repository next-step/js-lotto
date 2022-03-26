export const createLotto = () => {
  let result = Array(6).fill(0);
  result = result.map(() => getRandomInteger(1, 45));
  return result;
};

const getRandomInteger = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
};
