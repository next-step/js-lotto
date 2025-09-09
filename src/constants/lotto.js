
const PRICE = "PRICE_TYPE";
const WINNER_NUMBER = "WINNER_NUMBER_TYPE";
const BONUS_NUMBER = "BONUS_NUMBER_TYPE";

export const InputType = { PRICE, WINNER_NUMBER, BONUS_NUMBER };

export const LOTTO_PRICE = 1000;
export const LOTTO_COUNT = 6;
export const LOTTO_NUMBERS = Array.from({ length: 45 }, (_, i) => i + 1);
export const LOTTO_MIN_NUMBER = 1;
export const LOTTO_MAX_NUMBER = 45;


const MATCH_THREE = 3;
const MATCH_FOUR = 4;
const MATCH_FIVE = 5;
const MATCH_SIX = 6;
const MATCH_FIVE_BONUS = "BONUS";

export const MatchBallCount = {
  MATCH_THREE,
  MATCH_FOUR,
  MATCH_FIVE,
  MATCH_SIX,
  MATCH_FIVE_BONUS,
};

export const RESULTS_ORDER = [
  {
    key: MatchBallCount.MATCH_THREE,
    label: "3개 일치",
    price: 5000,
  },
  { key: MatchBallCount.MATCH_FOUR, label: "4개 일치", price: 50000 },
  { key: MatchBallCount.MATCH_FIVE, label: "5개 일치", price: 1500000 },
  {
    key: MatchBallCount.MATCH_FIVE_BONUS,
    label: "5개 일치, 보너스 볼 일치",
    price: 30000000,
  },
  { key: MatchBallCount.MATCH_SIX, label: "6개 일치", price: 2000000000 },
];
