import { MAX_LOTTO_NUMBER, MIN_LOTTO_NUMBER } from '../constants/index.js';

const getLottoNumber = () => {
  return (
    (Math.floor(Math.random() * 100) % MAX_LOTTO_NUMBER) + MIN_LOTTO_NUMBER
  );
};

const createLotto = () => {
  const numbers = new Set();

  do {
    numbers.add(getLottoNumber());
  } while (numbers.size < 6);

  return Array.from(numbers).sort((a, b) => a - b);
};

const createLottos = (count) => {
  return Array.from(new Array(count), () => createLotto());
};

export default createLottos;
