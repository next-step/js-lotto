import { createStore } from '../core/Store';

// 기본적인 default store의 형태
const initStore = {
  lottos: [],
}

const reducer = (actionType, payload, store) => {
  const newStore = { ...store };
  // store를 변환시킨 뒤 return한다.
  switch (actionType) {
    case ('create'): {
      newStore.lottos = payload;
    }
    default: {
      newStore.lottos = [];
    }
  }

  return newStore;
}

export const lottoStore = createStore(initStore, reducer);
