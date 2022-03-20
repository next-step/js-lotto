import { ONE, ZERO } from '../const/constant.js';
import { range } from '../utils/index.js';

const swap = (maxIdx, i, arr) => {
  const random = Math.floor(Math.random() * maxIdx);
  const last = maxIdx - i;

  [arr[last], arr[random]] = [arr[random], arr[last]];

  return arr;
};

const generateRandomNumbers = (max) => {
  const maxIdx = max - ONE;
  const candidates = range(max, (i) => i + ONE);

  candidates.forEach((_, i, arr) => swap(maxIdx, i, arr));

  return candidates;
};

export const issueLottos = (limit, range) =>
  generateRandomNumbers(range)
    .slice(ZERO, limit)
    .sort((a, b) => a - b);
