import { LottoTicket } from '../Model';

export const PRODUCTS_NAME = Object.freeze({
  LOTTO_TICKET: 'LottoTicket',
});

export const PRODUCTS = Object.freeze({
  LottoTicket: {
    product: LottoTicket,
    price: 1000,
  },
});
