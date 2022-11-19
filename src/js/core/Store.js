// 이걸 실행함으로서 하나의 별도의 store를 만든다.
// 기본적으로 observer pattern으로 state가 변할 때마다, 반응하도록 한다.
export function createStore(initStore, reducer) {
  let store = initStore;
  // 구독자들 리스트
  const subscribeList = [];

  return {
    store,
    // 해당 store를 구독하는 list들
    subscribe: (subscriber) => {
      if (typeof subscriber !== 'function') throw new Error('you can subscribe store with function only');

      subscribeList.push(subscriber);
    },
    dispatch: (actionType, payload) => {
      // reducer를 통해 store를 갱신하고
      store = reducer(actionType, payload, store);
      // 구독자들에게 새로운 store를 알린다.
      subscribeList.forEach((subscriber) => subscriber(store))
    }
  }
}
