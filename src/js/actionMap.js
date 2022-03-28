import store from '../js/store/store.js';
import {
  setPrice,
  setPurchasedLottoNumbers,
  setWinLottoNumber,
  setPurchasedLottoBonusNumber,
  restart,
} from '../js/store/creator.js';

const actionMap = {
  SET_PRICE: (money) => {
    store.dispatch(setPrice(money));
  },
  SET_PURCHASED_LOTTO_NUMBERS: (lottoNumber) => {
    store.dispatch(setPurchasedLottoNumbers(lottoNumber));
  },
  SET_PURCHASED_LOTTO_BONUS_NUMBER: (bonusNumber) => {
    store.dispatch(setPurchasedLottoBonusNumber(bonusNumber));
  },
  SET_WIN_LOTTO_NUMBER: (lottoNumber) => {
    store.dispatch(setWinLottoNumber(lottoNumber));
  },
  RESTART: () => {
    store.dispatch(restart());
  },
};

export default actionMap;
