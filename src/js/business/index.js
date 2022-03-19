import { range } from '../utils/index.js';

const swap = (maxIdx, i, arr) => {
  const random = Math.floor(Math.random() * maxIdx);
  const last = maxIdx - i;

  [arr[last], arr[random]] = [arr[random], arr[last]];

  return arr;
};

const generateRandomNumbers = (max) => {
  const maxIdx = max - 1;
  const candidates = range(max, (i) => i + 1);

  candidates.forEach((_, i, arr) => swap(maxIdx, i, arr));

  return candidates;
};

export const issueLottos = (limit, range) =>
  generateRandomNumbers(range)
    .slice(0, limit)
    .sort((a, b) => a - b);
