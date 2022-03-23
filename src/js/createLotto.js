import { LOTTO_NUMBERS, PRICE_PER_LOTTO, LOTTO_MAX_NUMBER } from "./constants.js";

const createOneLottoTicket = () => {
  const lottoTicket = new Set();

  while (lottoTicket.size < LOTTO_NUMBERS) {
    const randomLottoNumber = Math.floor(Math.random() * LOTTO_MAX_NUMBER + 1);
    lottoTicket.add(randomLottoNumber);
  }

  return lottoTicket;
};

const createLottoTickets = purchasedLottoCount => {
  const lottoTickets = [];

  for (let count = 0; count < purchasedLottoCount; count++) {
    lottoTickets.push(createOneLottoTicket());
  }

  return lottoTickets;
};

const isValidateAmountOfPayment = payment => {
  if (payment % PRICE_PER_LOTTO === 0) {
    return true;
  }

  return false;
};

export { createLottoTickets, isValidateAmountOfPayment };
