export const getRandomIntInclusive = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

export const getNumberOfLottoTickets = (amount, amountPerLottoTicket) =>
  amount / amountPerLottoTicket;

export const getLottoNumbers = () => {
  const MAX_SIZE = 6;
  const numbers = [];

  while (numbers.length < MAX_SIZE) {
    const num = getRandomIntInclusive(1, 45);
    if (!numbers.includes(num)) {
      numbers.push(num);
    }
  }

  return numbers;
};
