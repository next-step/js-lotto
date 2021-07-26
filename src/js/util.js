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

export const calcResult = (lottoList, winningNumbers) => {
  const result = {
    3: {
      value: 0,
      reward: 5000,
    },
    4: {
      value: 0,
      reward: 50000,
    },
    5: {
      value: 0,
      reward: 1500000,
    },
    6: {
      value: 0,
      reward: 2000000000,
    },
    10: {
      value: 0,
      reward: 30000000,
    },
  };

  for (let lotto of lottoList) {
    let matchNumber = 0;
    const isMatchBonus = lotto.includes(Number(winningNumbers[6]));

    for (let i = 0; i < 6; i++) {
      if (lotto.includes(Number(winningNumbers[i]))) {
        matchNumber += 1;
      }
    }
    if (matchNumber === 5 && isMatchBonus) {
      result[10].value += 1;
    } else if (matchNumber >= 3) {
      result[matchNumber].value += 1;
    }
  }

  return result;
};
