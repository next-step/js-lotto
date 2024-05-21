export const LOTTO = {
  NUMBER_COUNT: 6,
  BONUS_NUMBER_COUNT: 1,
  MIN_NUMBER: 1,
  MAX_NUMBER: 45,
  PRICE_PER_LOTTO: 1000,
  PRIZE_INFO: [
    {
      rank: "1st",
      matchingNumberCount: 6,
      bonusAffectsWinning: false,
      reward: 2000000000,
    },
    {
      rank: "2nd",
      matchingNumberCount: 5,
      bonusAffectsWinning: true,
      reward: 30000000,
    },
    {
      rank: "3rd",
      matchingNumberCount: 5,
      bonusAffectsWinning: false,
      reward: 1500000,
    },
    {
      rank: "4th",
      matchingNumberCount: 4,
      bonusAffectsWinning: false,
      reward: 50000,
    },
    {
      rank: "5th",
      matchingNumberCount: 3,
      bonusAffectsWinning: false,
      reward: 5000,
    },
  ],
  WINNING_NUMBER_SEPARATOR: ",",
  NUMBER_FLAG: {
    IS_WINNING: 1,
    IS_BONUS: 2,
    NOT_MATCHED: 0,
  },
};

export const MESSAGE = {
  ERROR: {
    LOTTO_PRICE: "로또 구매 금액은 로또 한 장의 가격보다 적을 수 없습니다.",
    NUMBER_COUNT: `로또 번호는 ${LOTTO.NUMBER_COUNT}개여야 합니다.`,
    NUMBER_RANGE: `모든 로또의 번호는 ${LOTTO.MIN_NUMBER}부터 ${LOTTO.MAX_NUMBER}사이의 수 입니다.`,
    UNIQUE_NUMBER: "중복된 번호가 있습니다.",
    LOTTO_NUMBER_SHOULD_BE_NATURAL: "모든 로또의 번호는 자연수여야 합니다.",
    MONEY_SHOULD_BE_NATURAL: "금액은 자연수이어야 합니다.",
    SET_WINNING_NUMBER: "당첨 번호를 설정해주세요.",
    SET_BONUS_NUMBER: "보너스 번호를 설정해주세요.",
  },
};
