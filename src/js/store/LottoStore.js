import { createStore } from '../core/Store.js';

const initStore = {
  balance: 0,
  lottos: [],
  isShow: false,
  isShowLottoNumbers: false,
}

const reducer = (actionType, payload, store) => {
  const newStore = { ...store };

  switch (actionType) {
    case ('show'): {
      newStore.isShow = true;
      break;
    }
  case ('updateBalance'): {
      newStore.balance = payload;
      break;
    }
    case ('addLotto'): {
      newStore.lottos = [...newStore.lottos, ...payload];
      break;
    }
    case ('toggleLottoNumber'): {
      newStore.isShowLottoNumbers = payload;
      break;
    }
    default: {
      store = initStore;
      return store;
    }
  }

  store = newStore;
  return store;
}

export const lottoStore = createStore(initStore, reducer);
