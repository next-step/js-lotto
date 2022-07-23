import { LOTTO_MAX_NUMBER, LOTTO_LENGTH } from '../constants/lotto.js';

const BALLS = new Array(LOTTO_MAX_NUMBER).fill(null).map((value, index) => index + 1);

export default function createLotto() {
  const balls = [...BALLS];
  const lotto = new Array(LOTTO_LENGTH).fill(null).map(() => {
    const ballIndex = Math.floor(Math.random() * (balls.length - 1));
    return balls.splice(ballIndex, 1)[0];
  });
  return lotto;
}
