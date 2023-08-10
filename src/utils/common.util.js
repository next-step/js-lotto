export const print = (str) => {
  console.log(str);
};

export const getRandomNumber = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;
