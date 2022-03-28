import CreateAction from './createAction.js';
import {
  SET_PRICE,
  SET_PURCHASED_LOTTO_NUMBERS,
  SET_PURCHASED_LOTTO_BONUS_NUMBER,
  SET_WIN_LOTTO_NUMBER,
  RESTART,
} from './actions.js';

const setPrice = (price) => CreateAction(SET_PRICE, { price });
const setPurchasedLottoNumbers = (purchasedLottoNumbers) =>
  CreateAction(SET_PURCHASED_LOTTO_NUMBERS, { purchasedLottoNumbers });
const setWinLottoNumber = (winLottoNumber) =>
  CreateAction(SET_WIN_LOTTO_NUMBER, { winLottoNumber });
const setPurchasedLottoBonusNumber = (bonusNumber) =>
  CreateAction(SET_PURCHASED_LOTTO_BONUS_NUMBER, { bonusNumber });
const restart = () => CreateAction(RESTART);

export {
  setPrice,
  setPurchasedLottoNumbers,
  setPurchasedLottoBonusNumber,
  setWinLottoNumber,
  restart,
};
