import { LOTTO_NUMBERS, PRICE_PER_LOTTO } from "./constants.js";

const createOneLottoTicket = () => {
  const lottoTicket = [];

  for (let i = 0; i < LOTTO_NUMBERS; i++) {
    let lottoNumber = Math.floor(Math.random() * 44) + 1;
    let isDuplicateNumber = lottoTicket.includes(lottoNumber);

    while (isDuplicateNumber) {
      lottoNumber = Math.floor(Math.random() * 44) + 1;
      isDuplicateNumber = lottoTicket.includes(lottoNumber);
    }

    lottoTicket.push(lottoNumber);
  }
  return lottoTicket;
};

const createLottoTickets = numberOfLottoTickets => {
  const lottoTicketsArray = [];

  for (let i = 0; i < numberOfLottoTickets; i++) {
    lottoTicketsArray.push(createLottoTicket());
  }

  return lottoTicketsArray;
};

const isValidateAmountOfPayment = payment => {
  if (!(payment % PRICE_PER_LOTTO === 0)) {
    return false;
  }

  return true;
};

export { createLottoTickets, isValidateAmountOfPayment };
