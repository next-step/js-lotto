export const range = (number) =>
  Array.from({ length: number }, (_, i) => i + 1);

export const size = (array = []) => array.length;
