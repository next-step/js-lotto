function ticketPriceTooLow() {
  return new Error('구매 금액은 최소 1,000원 이상이어야 합니다.')
}

export const LottoError = {
  TicketPriceTooLow: ticketPriceTooLow,
}