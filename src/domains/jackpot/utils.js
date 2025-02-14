const isValidBounsNumber = (orderedNumbers, bounsNumber) =>
  orderedNumbers.includes(bounsNumber);

const matchJackpotNumbers = (orderedNumbers, jackpotNumbers) => {
  return orderedNumbers.filter((value) => jackpotNumbers.includes(value));
};

const getJackpotRank = (matchedNumbers, isBouns) => {
  const count = matchedNumbers.length;

  return (() => {
    if (count === 6) return 1;
    if (count === 5 && isBouns) return 2;
    if (count === 5 && !isBouns) return 3;
    if (count === 4) return 4;
    if (count === 3) return 5;
    return 0;
  })();
};

export const getJackpotPrice = (rank) => {
  return (() => {
    if (rank === 1) return 2_000_000_000;
    if (rank === 2) return 30_000_000;
    if (rank === 3) return 1_500_000;
    if (rank === 4) return 50_000;
    if (rank === 5) return 5000;
    return 0;
  })();
};

export const getJackpotResult = (lotto, bounsNumber) => {
  const { ordered, jackpot } = lotto;

  const hasBounsNumber = isValidBounsNumber(ordered, bounsNumber);
  const matchedNumbers = matchJackpotNumbers(ordered, jackpot);

  const isJackpot = matchJackpotNumbers.length > 3;
  const rank = getJackpotRank(matchedNumbers, hasBounsNumber);
  const price = getJackpotPrice(rank);

  return { isJackpot, rank, price };
};
