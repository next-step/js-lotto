export const validateRange = (number) => {
  return number.every((number) => number === "" || number < 0 || number > 45);
};

export const isDuplicatedNumbers = (number) => {
  return new Set(number).size !== number.length;
};
