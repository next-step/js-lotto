export const getRank = (winningNumbers, lotto) => {
  const matchingCount = checkMatchingNumberCount(winningNumbers[0], lotto);
  if (matchingCount === 6) return 1;

  if (matchingCount === 5) {
    if (lotto.includes(winningNumbers[1])) return 2;
    return 3;
  }

  if (matchingCount === 4) return 4;
  if (matchingCount === 3) return 5;

  return 6;
};

export const transformUserInput = (userInput, bonusNumber) => {
  return [userInput.split(",").map((num) => Number(num)), Number(bonusNumber)];
};

export const checkMatchingNumberCount = (userInputNumber, lotto) => {
  let count = 0;
  for (let i = 0; i < lotto.length; i++) {
    if (userInputNumber.includes(lotto[i])) count++;
  }
  return count;
};

export const getReward = (rank) => {
  switch (rank) {
    case 1:
      return 2000000000;
    case 2:
      return 30000000;
    case 3:
      return 1500000;
    case 4:
      return 50000;
    case 5:
      return 5000;
    default:
      return 0;
  }
};
