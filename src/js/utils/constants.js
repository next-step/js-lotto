const ERROR_MSSAGE = {
  AMOUNT: '로또 구입 금액을 1,000원 단위로 입력해 주세요.',
};

const LOTTO = {
  PRICE_UNIT: 1000,
  MIN_VALUE: 1,
  MAX_VALUE: 45,
  LENGTH: 6,
};

const SELECTOR = {
  //Purchase Form
  PURCHASE_FORM: '#input-price-form',
  PURCHASE_INPUT: '.purchase-amount',

  //Purchase Result
  PURCHASED_LOTTO: '#purchased-lottos',
  TOTAL_PURCHASED: '#total-purchased',
  LOTTO_IMAGES: '.lotto-images',
  LOTTO_NUM_TOGGLE: '.lotto-numbers-toggle-button',
  LOTTO_NUMS: '.lotto-numbers',

  // Input Lotto Nums
  INPUT_LOTTO_NUMS: '#input-lotto-nums',
};

export { ERROR_MSSAGE, LOTTO, SELECTOR };
