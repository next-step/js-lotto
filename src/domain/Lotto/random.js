import { RULES } from "../../util/rule.js";

export const shuffleArrayToRandomly = (arr) => {
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    // eslint-disable-next-line no-param-reassign
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  return arr;
};

export const getRandomArrayWithTicketLength = () => {
  const arr = Array.from(
    { length: RULES.MAX_TICKET_NUMBER },
    (_, index) => index + 1,
  );

  const shuffleResults = shuffleArrayToRandomly(arr);

  return shuffleResults.slice(0, RULES.TICKET_LENGTH);
};
