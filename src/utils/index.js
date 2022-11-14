const makeRandomNumber = () => {
  return Array.from({ length: 6 }, () => Math.floor(Math.random() * 45 + 1));
};

export const makeRandomNumbers = (moneyAmount) => {
  return new Array(moneyAmount / 1000).fill(0).map(makeRandomNumber);
};

export const checkRandom = (randomNumberArray) => {
  const set = new Set();

  randomNumberArray.forEach((eachNumbers) => {
    set.add(eachNumbers);
  });

  if (set.size() !== randomNumberArray.length) {
    const diff = randomNumberArray.length - set.size();
    const newRandomNumber = new Array(diff).fill(0).map(makeRandomNumber);
    return checkRandom([...set, ...newRandomNumber]);
  }

  return;
};
