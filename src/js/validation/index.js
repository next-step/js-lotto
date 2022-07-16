export const isValidPurchasable = (amount, amountPerLottoTicket) =>
  amount % amountPerLottoTicket === 0;

export const isValidNonDuplicateNumbers = (winningNumbers, bonusNumber) =>
  new Set([...winningNumbers, bonusNumber]).size === 7;
