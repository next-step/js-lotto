export const range = (number, callback = null) =>
  Array.from({ length: number }, (_, i) => (callback ? callback(i) : i));

export const size = (array = []) => array.length;
