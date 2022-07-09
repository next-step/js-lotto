export const isValidPurchasable = (amount, amountPerLottoTicket) =>
  amount % amountPerLottoTicket === 0;
