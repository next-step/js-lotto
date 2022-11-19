export function getNumberFilledArray(length) {
  return Array.from({ length }, (_, i) => i + 1);
}

export function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}
