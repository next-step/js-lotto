export const isValidPurchasable = (amount, amountPerLottoTicket) =>
  amount % amountPerLottoTicket === 0;

export const isValidNonDuplicateNumbers = (winningNumbers, bonusNumber) => true;
