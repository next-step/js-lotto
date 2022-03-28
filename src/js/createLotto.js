import { LOTTO_NUMBERS, LOTTO_MAX_NUMBER } from "./constants.js";

function Lotto(numbers) {
  this.numbers = numbers;
  this.matchingCount = 0;
}

const createLotto = () => {
  const lottoNumbers = new Set();

  while (lottoNumbers.size < LOTTO_NUMBERS) {
    const randomLottoNumber = Math.floor(Math.random() * LOTTO_MAX_NUMBER + 1);
    lottoNumbers.add(randomLottoNumber);
  }

  return new Lotto(lottoNumbers);
};

const createLottos = purchasedLottoCount => {
  const lottoTickets = new Array(purchasedLottoCount)
    .fill()
    .map(() => createLotto());

  return lottoTickets;
};

export { createLottos };
