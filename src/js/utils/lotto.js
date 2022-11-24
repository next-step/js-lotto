/* eslint-disable no-restricted-syntax */
import { UNIT_OF_PRICE, LOTTO_COUNT, LOTTO_MAX, LOTTO_MIN, PRICE_STANDARD } from './constant.js';

export const getTicketCount = purchasePrice => {
  return purchasePrice / UNIT_OF_PRICE;
};

export const getRandomNumbers = () => {
  const set = new Set();
  while (set.size < LOTTO_COUNT) {
    const value = Math.floor(Math.random() * (LOTTO_MAX - LOTTO_MIN + 1) + LOTTO_MIN);
    set.add(value);
  }
  return Array.from(set);
};

export const getTicketNumbers = ticketAmount => {
  return new Array(ticketAmount).fill('').map(() => getRandomNumbers());
};

export const getWinningNumbers = inputNumbers => {
  const winningNumbers = [];
  inputNumbers.forEach(element => winningNumbers.push(Number(element.value)));
  return winningNumbers;
};

export const countMatchingNumbers = (tickets, numbers) => {
  const winningNumbers = numbers;
  const bonusNumber = numbers.pop();
  const isFiveBonus = (ticket, count) => count === 5 && ticket.includes(bonusNumber);

  return tickets.map(ticket => {
    const matchingCount = ticket.filter(number => winningNumbers.includes(number)).length;
    if (isFiveBonus(ticket, matchingCount) === true) return '5-bonus';
    return matchingCount;
  });
};

export const getWinningScore = matchingNumberCounts => {
  const winningScore = matchingNumberCounts.filter(result => result > 2 || result === '5-bonus');
  return winningScore.reduce((acc, count) => ({ ...acc, [count]: acc[count] + 1 }), {
    3: 0,
    4: 0,
    5: 0,
    '5-bonus': 0,
    6: 0,
  });
};

export const convertWinningNumber = stringNumber => {
  return Number(stringNumber.replaceAll('_', ''));
};

export const getTotalPrize = winningScore => {
  let totalPrize = 0;
  for (const key of Object.keys(winningScore)) {
    const prize = convertWinningNumber(PRICE_STANDARD[`${key}`]);
    const count = winningScore[key];
    totalPrize += prize * count;
  }
  return totalPrize;
};

export const getProfit = (purchasePrice, totalPrize) => (totalPrize - purchasePrice) / 100;
