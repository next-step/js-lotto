import { validateOrder } from "./validator";

export function generateRandomNumbers(range, radix) {
  return parseInt(Math.random() * range + 1, radix);
}

export function countArrayResults(array, condition) {
  return array.filter(condition).length;
}

export function sortArray(order = "ASC" | "DESC", array) {
  validateOrder(order);
  return array.sort((a, b) => {
    if (order === "ASC") {
      return a - b;
    } else if (order === "DESC") {
      return b - a;
    }
  });
}
