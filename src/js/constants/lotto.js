export const LOTTO_PRICE = 1000;
export const LOTTO_MAX_SIZE = 6;
export const LOTTO_MIN_NUM = 1;
export const LOTTO_MAX_NUM = 45;

export const WINNING_REWARD_MONEY_1ST = 2000000000;
export const WINNING_REWARD_MONEY_2ND = 30000000;
export const WINNING_REWARD_MONEY_3RD = 1500000;
export const WINNING_REWARD_MONEY_4TH = 50000;
export const WINNING_REWARD_MONEY_5TH = 5000;

export const WINNING_1ST_MATCH_CASE = 6;
export const WINNING_2ND_MATCH_CASE = 5;
export const WINNING_3RD_MATCH_CASE = 5;
export const WINNING_4TH_MATCH_CASE = 4;
export const WINNING_5TH_MATCH_CASE = 3;

export const WINNING_1ST = 1;
export const WINNING_2ND = 2;
export const WINNING_3RD = 3;
export const WINNING_4TH = 4;
export const WINNING_5TH = 5;
export const WINNING_FAIL = 0;

export const WINNING_RESULT_CASE = [
  {
    label: `${WINNING_5TH_MATCH_CASE}개`,
    reward: WINNING_REWARD_MONEY_5TH,
    key: WINNING_5TH,
  },
  {
    label: `${WINNING_4TH_MATCH_CASE}개`,
    reward: WINNING_REWARD_MONEY_4TH,
    key: WINNING_4TH,
  },
  {
    label: `${WINNING_3RD_MATCH_CASE}개`,
    reward: WINNING_REWARD_MONEY_3RD,
    key: WINNING_3RD,
  },
  {
    label: `${WINNING_2ND_MATCH_CASE}개 + 보너스볼`,
    reward: WINNING_REWARD_MONEY_2ND,
    key: WINNING_2ND,
  },
  {
    label: `${WINNING_1ST_MATCH_CASE}개`,
    reward: WINNING_REWARD_MONEY_1ST,
    key: WINNING_1ST,
  },
];
