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
};
