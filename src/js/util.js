export const $ = {
  get: (selector, element = document) => element.querySelector(selector),
  getAll: (selector, element = document) => element.querySelectorAll(selector),
};

export const createEl = {
  div: () => document.createElement("div"),
};

const makeLotto = () => {
  const lotto = [];

  while (lotto.length !== 6) {
    const num = Math.ceil(Math.random() * 45);
    if (!lotto.includes(num)) {
      lotto.push(num);
    }
  }

  return lotto.sort((a, b) => a - b);
};

export const createLottoList = (num) => {
  const list = [];

  for (let i = 0; i < num; i++) {
    list.push(makeLotto());
  }
  return list;
};
