export const SELECTOR = Object.freeze({
  TICKET_AMOUNT: '#ticket-amount',
  TICKETS: '#tickets',
  PURCHASE_AMOUNT_INPUT: '#purchase-amount-input',
  LOTTO_NUMBER_INPUT: '.winning-number-input',
  BONUS_NUMBER_INPUT: '#bonus-number-input',
  RESTART_INPUT: '#restart-button',
});

export const ELEMENT = Object.freeze({
  TICKET_AMOUNT: document.querySelector(SELECTOR.TICKET_AMOUNT),
  TICKETS: document.querySelector(SELECTOR.TICKETS),
  PURCHASE_AMOUNT_INPUT: document.querySelector(SELECTOR.PURCHASE_AMOUNT_INPUT),
  LOTTO_NUMBER_INPUT: document.querySelector(SELECTOR.LOTTO_NUMBER_INPUT),
  BONUS_NUMBER_INPUT: document.querySelector(SELECTOR.BONUS_NUMBER_INPUT),
  RESTART_INPUT: document.querySelector(SELECTOR.RESTART_INPUT),
});
