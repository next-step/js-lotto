export const randomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

export const sortingNumber = (arrayNum) => {
  return [...arrayNum].sort((a, b) => a - b);
};

export const shuffle = (array) => {
  return [...array].sort(() => Math.random() - 0.5);
};
