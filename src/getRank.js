export const getRank = (winningNumbers, lottoNumber) => {
  const matchingCount = checkMatchingNumberCount(winningNumbers[0], lottoNumber);
  if (matchingCount === 6) return 1;

  if (matchingCount === 5) {
    if (lottoNumber.includes(winningNumbers[1])) return 2;
    return 3;
  }

  if (matchingCount === 4) return 4;
  if (matchingCount === 3) return 5;

  return 6;
};

export const transformUserInput = (userInput, bonusNumber) => {
  return [userInput.split(",").map((num) => Number(num)).sort((a,b) => a-b), Number(bonusNumber)];
};

export const checkMatchingNumberCount = (userInputNumber, lottoNumber) => {
  let count = 0;
  const NUMBERS_LENGTH = lottoNumber.length
  for (let i = 0; i < NUMBERS_LENGTH; i++) {
    if (userInputNumber.includes(lottoNumber[i])) count++;
  }
  return count;
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
