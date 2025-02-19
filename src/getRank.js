const RANK_FIRST = 1;
const RANK_SECOND = 2;
const RANK_THIRD = 3;
const RANK_FOURTH = 4;
const RANK_FIFTH = 5;
const RANK_NONE = 6;

export const getRank = ([winningNumbers, bonusNumber], ticketNumbers) => {
  const matchingCount = checkMatchingNumberCount(winningNumbers, ticketNumbers);
  if (matchingCount === 6) return RANK_FIRST;
  if (matchingCount === 5)
    return ticketNumbers.includes(bonusNumber) ? RANK_SECOND : RANK_THIRD;
  if (matchingCount === 4) return RANK_FOURTH;
  if (matchingCount === 3) return RANK_FIFTH;

  return RANK_NONE;
};

export const transformUserInput = (userInput, bonusNumber) => {
  return [
    userInput
      .split(",")
      .map((num) => Number(num))
      .sort((a, b) => a - b),
    Number(bonusNumber),
  ];
};

export const checkMatchingNumberCount = (userInputNumber, lottoNumber) => {
  return lottoNumber.filter((v) => userInputNumber.includes(v)).length;
};

export const getReward = (rank) => {
  switch (rank) {
    case 1:
      return 2_000_000_000;
    case 2:
      return 30_000_000;
    case 3:
      return 1_500_000;
    case 4:
      return 50_000;
    case 5:
      return 5_000;
    default:
      return 0;
  }
};
