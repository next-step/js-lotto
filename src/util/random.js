import { RULES } from "./rule.js";

export const shuffleRandom = (arr) => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  return arr;
};

export const getRandomNumber = () => {
  const arr = Array.from(
    { length: RULES.MAX_TICKET_NUMBER },
    (_, index) => index + 1,
  );

  const shuffleResults = shuffleRandom(arr);
  //   console.log(arr);

  return shuffleResults.slice(0, 6);
};
