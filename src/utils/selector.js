export const SELECTOR = {
  CLASS: {
    INPUT_PRICE_FORM: '.input-price-form',
    INPUT_PRICE: '.input-price',
    PURCHASED_LOTTOS: '.purchased-lottos',
    TOTAL_PURCHASED: '.total-purchased',
    LOTTO_NUMBERS_TOGGLE_BUTTON: '.lotto-numbers-toggle-button',
    LOTTOS: '.lottos',
    INPUT_LOTTO_NUMBERS_FORM: '.input-lotto-nums-form',
    INPUT_WINNING_NUMBERS: '.input-lotto-nums-form .winning-number',
    INPUT_BONUS_NUMBER: '.bonus-number',
  },
};

export const $ = (selector) => {
  const [parentSelector, childSelector] = selector.split(' ');
  return childSelector ? document.querySelectorAll(childSelector) : document.querySelector(parentSelector);
};
