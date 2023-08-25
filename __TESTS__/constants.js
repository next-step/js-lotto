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

/** WinningLotto */
export const DUMMY_WINNING_LOTTO = [
  { winningLottoNumber: '1,2,3,4,5,6', bonusNumber: 7 },
  { winningLottoNumber: '4,7,17,18,26,28', bonusNumber: 10 },
  { winningLottoNumber: '2,4,6,10,39,44', bonusNumber: 29 },
  { winningLottoNumber: '8,18,26,28,30,38', bonusNumber: 45 },
  { winningLottoNumber: '1,14,23,24,31,33', bonusNumber: 17 }
];

export const DUMMY_INCORRECT_WINNING_LOTTO_BY_NOT_ENOUGH_LENGTH = [
  { winningLottoNumber: '1,2,3,4,5', bonusNumber: 7 },
  { winningLottoNumber: '4,7,17,18,26', bonusNumber: 10 },
  { winningLottoNumber: '2,4,6,10,39', bonusNumber: 29 },
  { winningLottoNumber: '8,18,26,28,30', bonusNumber: 45 },
  { winningLottoNumber: '1,14,23,24,31', bonusNumber: 17 }
];

export const DUMMY_INCORRECT_WINNING_LOTTO_BY_NOT_POSITIVE_NUMBER = [
  { winningLottoNumber: '1,2,3,4,5,99', bonusNumber: 7 },
  { winningLottoNumber: '-1,-2,0,1,2,3', bonusNumber: 10 },
  { winningLottoNumber: 'NaN,1,{},2,3,4', bonusNumber: 29 },
  { winningLottoNumber: '8,18,0,28,30,40', bonusNumber: 45 },
  { winningLottoNumber: '41,42,43,44,45,46', bonusNumber: 17 }
];

export const DUMMY_INCORRECT_WINNING_LOTTO_BY_DUPLICATE_NUMBER = [
  { winningLottoNumber: '1,2,3,4,5,5', bonusNumber: 7 },
  { winningLottoNumber: '4,7,17,18,26,4', bonusNumber: 10 },
  { winningLottoNumber: '2,4,6,10,39,10', bonusNumber: 29 },
  { winningLottoNumber: '8,18,28,28,30,30', bonusNumber: 45 },
  { winningLottoNumber: '14,14,14,14,14,14', bonusNumber: 17 }
];

export const DUMMY_INCORRECT_WINNING_LOTTO_BY_DUPLICATE_BONUS_NUMBER = [
  { winningLottoNumber: '1,2,3,4,5,6', bonusNumber: 6 },
  { winningLottoNumber: '4,7,17,18,26,28', bonusNumber: 4 },
  { winningLottoNumber: '2,4,6,10,39,44', bonusNumber: 10 },
  { winningLottoNumber: '8,18,26,28,30,38', bonusNumber: 8 },
  { winningLottoNumber: '1,14,23,24,31,33', bonusNumber: 1 }
];

export const DUMMY_INCORRECT_BONUS_NUMBER = [
  { winningLottoNumber: '1,2,3,4,5,6', bonusNumber: 46 },
  { winningLottoNumber: '4,7,17,18,26,28', bonusNumber: 0 },
  { winningLottoNumber: '2,4,6,10,39,44', bonusNumber: NaN },
  { winningLottoNumber: '8,18,26,28,30,38', bonusNumber: {} },
  { winningLottoNumber: '1,14,23,24,31,33', bonusNumber: -1 }
];
