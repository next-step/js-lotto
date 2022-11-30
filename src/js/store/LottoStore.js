import { createStore } from '../core/Store.js';

const initStore = {
  lottos: [],
  isShow: false,
  isShowLottoNumbers: false,
}

const reducer = (actionType, payload, store) => {
  const newStore = { ...store };
  // store를 변환시킨 뒤 return한다.
  switch (actionType) {
    case ('update'): {
      newStore.lottos = payload;
      newStore.isShow = true;
      break;
    }
    case ('toggleLottoNumber'): {
      newStore.isShowLottoNumbers = payload;
      break;
    }
    default: {
      return initStore;
    }
  }

  return newStore;
}

export const lottoStore = createStore(initStore, reducer);
