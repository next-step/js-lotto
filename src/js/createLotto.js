import { LOTTO_NUMBERS, LOTTO_MAX_NUMBER } from "./constants.js";

const createLotto = () => {
  const lottoTicket = new Set();

  while (lottoTicket.size < LOTTO_NUMBERS) {
    const randomLottoNumber = Math.floor(Math.random() * LOTTO_MAX_NUMBER + 1);
    lottoTicket.add(randomLottoNumber);
  }

  return lottoTicket;
};

const createLottos = purchasedLottoCount => {
  const lottoTickets = new Array(purchasedLottoCount)
    .fill()
    .map(() => createLotto());

  return lottoTickets;
};

export { createLottos };
