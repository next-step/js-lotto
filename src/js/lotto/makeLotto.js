import { LOTTO_MAX_NUMBER, LOTTO_LENGTH } from '../constants/lotto.js';

export default function makeLotto() {
  const balls = new Array(LOTTO_MAX_NUMBER).fill(null).map((value, index) => index + 1);
  const lotto = new Array(LOTTO_LENGTH).fill(null).map(() => {
    const ballIndex = Math.floor(Math.random() * (balls.length - 1));
    return balls.splice(ballIndex, 1)[0];
  });
  return lotto;
}
