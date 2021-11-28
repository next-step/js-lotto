export const MESSAGES = {
  PURCHASE: "로또 구입 금액을 1,000원 단위로 입력해 주세요.",
};

export const LOTTO_MAX = 45;
export const LOTTO_MIN = 1;

export const LOTTOS_RESULT = {
  0: [0, 0],
  1: [0, 0],
  2: [0, 0],
  3: [0, 5000],
  4: [0, 50000],
  5: [0, 150000],
  "5a": [0, 30000000],
  6: [0, 2000000000],
};

export const LOTTOS_STATE = {
  lottos: [],
  winningNums: [0, 0, 0, 0, 0, 0],
  bonusNum: 0,
  result: LOTTOS_RESULT,
  purchaseMoney: 0,
  toggle: false,
  showResultModal: false,
  prizeMoney: 0,
  earningRatio: 0,
};
export const LOTTOS_ACTION = {
  BUY_LOTTOS: "BUY_LOTTOS",
  TOGGLE_LOTTO_DISPLAY: "TOGGLE_LOTTO_DISPLAY",
  SHOW_LOTTO_RESULT: "SHOW_LOTTO_RESULT",
  CLOSE_MODAL: "CLOSE_MODAL",
  RESTART: "RESTART",
};
