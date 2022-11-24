export const validateRange = (number) => {
  return number.every((number) => number > 0 && number <= 45);
};

export const isDuplicatedNumbers = (number) => {
  let notDuplicatedNumber = new Set(number);
  return notDuplicatedNumber.size !== number.length;
};
