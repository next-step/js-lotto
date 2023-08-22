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
