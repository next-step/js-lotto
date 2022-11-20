import { createStore } from '../core/Store.js';

// 결과 창 통신을 위한 store

// 기본적인 default store의 형태
export const initStore = {
  purchaseCost: 0,
  result: {
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    bonus: 0,
  },
  isShow: false,
}

const reducer = (actionType, payload, store) => {
  const newStore = { ...store };
  // store를 변환시킨 뒤 return한다.
  switch (actionType) {
    case ('purchase'): {
      newStore.purchaseCost = payload;
      break;
    }
    case ('showResult'): {
      newStore.result = payload.result;
      newStore.isShow = true;
      break;
    }
    case ('closeResult'): {
      newStore.result = initStore.result;
      newStore.isShow = false;
      break;
    }
    default: {
      newStore.result = initStore.result;
      newStore.isShow = false;
    }
  }

  return newStore;
}

export const resultStore = createStore(initStore, reducer);
