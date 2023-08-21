import { createStore } from '../../src/js/utils/createStore'
import { ERROR_MESSAGE } from '../../src/js/constants/message'

describe('utils/createStore', () => {
  let store

  beforeEach(() => {
    store = createStore({
      state: () => ({
        keyA: 'keyA',
        keyB: 'keyB'
      }),
      actions: {
        updateKeys: ({ commit }, { keyA, keyB }) => {
          commit('setKeyA', { keyA })
          commit('setKeyB', { keyB })
        }
      },
      mutations: {
        setKeyA: (state, { keyA }) => {
          state.keyA = keyA
        },
        setKeyB: (state, { keyB }) => {
          state.keyB = keyB
        }
      }
    })
  })

  it('store의 상태를 변경할 수 있다.', () => {
    // Given, When
    store.commit('setKeyA', {
      keyA: 'new Key A'
    })

    // Then
    expect(store.state).toEqual({
      keyA: 'new Key A',
      keyB: 'keyB'
    })
  })

  it('store의 action을 dispatch해서 store의 상태를 변경할 수 있다.', () => {
    // Given, When
    store.dispatch('updateKeys', {
      keyA: 'key A',
      keyB: 'key B'
    })

    // Then
    expect(store.state).toEqual({
      keyA: 'key A',
      keyB: 'key B'
    })
  })

  it('store의 state변경 시, 이벤트를 청취할 수 있다.', () => {
    // Given
    const listener = jest.fn()
    store.subscribe(listener)

    // When
    store.commit('setKeyA', {
      keyA: 'new Key A'
    })

    expect(listener).toBeCalledTimes(1)
  })

  it('store의 이벤트를 청취 해제할 수 있다.', () => {
    // Given
    const listener = jest.fn()
    store.subscribe(listener)

    // When
    store.destroy()
    store.commit('setKeyA', {
      keyA: 'new Key A'
    })

    expect(listener).toBeCalledTimes(0)
  })

  it('store에 존재하지 않는 action의 경우, 애러를 발생시킨다.', () => {
    // When, Then
    expect(() => {
      store.dispatch('inValidAction', {
        keyA: 'key A',
        keyB: 'key B'
      })
    }).toThrow(new Error(ERROR_MESSAGE.INVALID_ACTIONS))
  })

  it('store에 존재하지 않는 mutation의 경우, 애러를 발생시킨다.', () => {
    // When, Then
    expect(() => {
      store.commit('inValidMutation', {
        keyA: 'key A'
      })
    }).toThrow(new Error(ERROR_MESSAGE.INVALID_MUTATIONS))
  })
})
