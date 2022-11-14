export const makeRandomNumbers = (moneyAmount) => {
  return new Array(moneyAmount / 1000)
    .fill(0)
    .map(() =>
      Array.from({ length: 6 }, () => Math.floor(Math.random() * 45 + 1))
    );
};
