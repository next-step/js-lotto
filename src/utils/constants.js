export const MAX = 45;
export const MATCH = {
  matched: [],
  bonus: 0,
};

export const PRIZE = {
  0: [0, 0],
  1: [0, 0],
  2: [0, 0],
  3: [0, 5000],
  4: [0, 50000],
  5: [0, 150000],
  "5a": [0, 30000000],
  6: [0, 2000000000],
};

export const INITIAL_STATE = {
  lottos: [],
  winningNums: [],
  bonusNum: 0,
  result: PRIZE,
  purchaseMoney: 0,
  toggle: false,
  showResultModal: false,
  prize: 0,
  earningRatio: 0,
};
