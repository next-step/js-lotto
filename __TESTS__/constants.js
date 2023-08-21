export const DUMMY_AMOUNT = [{ amount: 1 }, { amount: 100 }, { amount: 999 }, { amount: 1000 }, { amount: 5000 }];
export const DUMMY_INCORRECT_AMOUNT = [
  { amount: {} },
  { amount: NaN },
  { amount: '1000원' },
  { amount: () => {} },
  { amount: null },
  { amount: undefined }
];

// export const DUMMY_INCORRECT_AMOUNT = [{ amount: {}, amount: NaN } () => {}, -1000];
