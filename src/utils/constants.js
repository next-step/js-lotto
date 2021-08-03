export const MESSAGES = {
  PURCHASE: "로또 구입 금액을 1,000원 단위로 입력해 주세요.",
};

export const MAX = 45;

export const INITIAL_STATE = {
  lottos: [],
  winningNums: [0, 0, 0, 0, 0, 0],
  bonusNum: 0,
  result: {
    0: [0, 0],
    1: [0, 0],
    2: [0, 0],
    3: [0, 5000],
    4: [0, 50000],
    5: [0, 150000],
    "5a": [0, 30000000],
    6: [0, 2000000000],
  },
  purchaseMoney: 0,
  toggle: false,
  showResultModal: false,
  prizeMoney: 0,
  earningRatio: 0,
};