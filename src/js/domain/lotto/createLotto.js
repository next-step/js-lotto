import { LOTTO_MAX_NUMBER } from './constants.js';

const BALLS = new Array(LOTTO_MAX_NUMBER).fill(null).map((value, index) => index + 1);

export default function createLotto() {
  return BALLS.sort(() => 0.5 - Math.random()).slice(0, 6);
}
