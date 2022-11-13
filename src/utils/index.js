export const getRandomNumbers = () => {
  return Array.from({ length: 6 }, () => Math.floor(Math.random() * 45));
};
