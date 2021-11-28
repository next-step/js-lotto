export const createRandomLotto = (min, max) => {
  const lotto = new Set();
  while (lotto.size <= 5) {
    lotto.add(Math.floor(Math.random() * (max - min) + min));
  }
  return [...lotto];
};

export const cloneDeep = (target) => {
  return JSON.parse(JSON.stringify(target))
}