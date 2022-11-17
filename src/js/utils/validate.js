import { ERROR_MESSAGES, MAX_PRICE, UNIT_OF_PRICE } from './constant.js';

export const checkUnitOfPrice = inputPrice => {
  if (inputPrice < 0) {
    throw Error(ERROR_MESSAGES.CANNOT_NEGATIVE_PRICE);
  }
  if (inputPrice > MAX_PRICE) {
    throw Error(ERROR_MESSAGES.EXCEED_PRICE);
  }
  if (inputPrice % UNIT_OF_PRICE > 0 || inputPrice === 0) {
    throw Error(ERROR_MESSAGES.INCORRECT_UNIT_OF_PRICE);
  }
  return true;
};

export const checkInitialState = ({
  purchasePrice,
  ticketCount,
  tickets,
  isNumberVisible,
}) => {
  return {
    purchasePrice: purchasePrice || 0,
    ticketCount: ticketCount || 0,
    tickets: tickets || [],
    isNumberVisible: isNumberVisible || false,
  };
};
