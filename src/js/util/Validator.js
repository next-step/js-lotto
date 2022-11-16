export const isNumber = (s) => !isNaN(Number(s));
export const isUniqueNumbers = (numbers = []) => {
  const set = new Set(numbers);
  return set.size === numbers.length;
};
export const isWithInRangedNumber = (numbers = [], greaterThan = 1, lessThan = 45) => {
  const rangedNumber = numbers.filter((number) => number >= greaterThan && number <= lessThan);
  return rangedNumber.length === numbers.length;
};
