export function getRandomLottoNumbers() {
  const numberArray = Array.from({ length: 45 }, (_, i) => i + 1);
  return numberArray
    .sort(() => Math.random() - 0.5)
    .slice(0, 6)
    .join(", ");
}
