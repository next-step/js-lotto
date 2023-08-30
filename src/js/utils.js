export const chooseSome = (array, quantity) => {
  const selectable = [...array];
  const chosen = [];

  Array.from({ length: quantity }).forEach(() => {
    const randomIndex = getRandomIntInclusive(0, selectable.length - 1);
    chosen.push(selectable[randomIndex]);
    selectable.splice(randomIndex, 1);
  });
  chosen.sort((a, b) => a - b);
  return chosen;
};

// Copied from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
const getRandomIntInclusive = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
};
