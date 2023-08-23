/** LottoCustomer */
export const DUMMY_AMOUNT = [{ amount: 1 }, { amount: 100 }, { amount: 999 }, { amount: 1000 }, { amount: 5000 }];
export const DUMMY_INCORRECT_AMOUNT = [
  { amount: {} },
  { amount: NaN },
  { amount: '1000원' },
  { amount: () => {} },
  { amount: null },
  { amount: undefined }
];

export const DUMMY_PURCHASABLE_AMOUNT = [
  { amount: 1000 },
  { amount: 2000 },
  { amount: 3000 },
  { amount: 4000 },
  { amount: 5000 }
];

export const DUMMY_NOT_PURCHASABLE_AMOUNT = [
  { amount: 100 },
  { amount: 999 },
  { amount: 800 },
  { amount: 500 },
  { amount: 900 }
];

/** LottoTickets */
export const DUMMY_LOTTO_TICKETS = [
  { lottoNumber: '1, 2, 3, 4, 5, 6' },
  { lottoNumber: '9, 10, 22, 33, 44, 45' },
  { lottoNumber: '9, 5, 13, 24, 36, 38' },
  { lottoNumber: '14, 27, 6, 24, 44, 45' },
  { lottoNumber: '40, 41, 42, 43, 44, 45' }
];

export const DUMMY_DUPLICATE_NUMBER_LOTTO_TICKETS = [
  { lottoNumber: '1, 2, 3, 4, 5, 5' },
  { lottoNumber: '10, 10, 33, 44, 45, 10' },
  { lottoNumber: '9, 9, 9, 9, 9, 9' }
];

export const DUMMY_INVALID_RANGE_NUMBER_LOTTO_TICKETS = [
  { lottoNumber: '1, 2, 3, 4, 5, 50' },
  { lottoNumber: '100, 200, 300, 400, 1, 0' },
  { lottoNumber: '41, 42, 43, 44, 45, 46' }
];
