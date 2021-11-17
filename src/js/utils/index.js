export const getRandomNumber = (MIN, MAX) => {
  return Math.floor(Math.random() * (MAX - MIN) + MIN);
};
