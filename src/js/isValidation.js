export const isDuplicateNumber = (array) =>
  array.length !== new Set(array).size;
