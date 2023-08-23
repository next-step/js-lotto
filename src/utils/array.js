export const isDuplicateArray = (array) => new Set(array).size !== array.length;
export const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);
export const isTruthyArray = (array) => array.every(Boolean);
export const convertStringToNumber = (string, separator) => string.split(separator).map((number) => Number(number));
