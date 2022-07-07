export const SET_TYPED_PRICE = "lotto/SET_TYPED_PRICE";
export const SET_PURCHASED_LOTTO_COUNT = "lotto/SET_PURCHASED_LOTTO_COUNT";
export const RESET_ALL = "lotto/RESET_ALL";

export const setTypedPrice = (payload) => ({ type: SET_TYPED_PRICE, payload });
export const setPurchasedLottoCnt = (payload) => ({
  type: SET_PURCHASED_LOTTO_COUNT,
  payload,
});
export const resetAll = () => ({
  type: RESET_ALL,
});
