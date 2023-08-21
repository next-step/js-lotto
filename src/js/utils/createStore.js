import { ERROR_MESSAGE } from '../constants/message'

export const createStore = ({ state: getState, actions, mutations }) => {
  let state = getState()
  let listeners = []

  const commit = (type, payload) => {
    const mutation = mutations[type]

    if (!mutation) {
      throw new Error(ERROR_MESSAGE.INVALID_MUTATIONS)
    }

    mutation(state, payload)
    listeners.forEach(listener => listener(payload))
  }

  const dispatch = (type, payload) => {
    const action = actions[type]

    if (!action) {
      throw new Error(ERROR_MESSAGE.INVALID_ACTIONS)
    }

    action({ state, commit, dispatch }, payload)
  }

  const subscribe = callback => {
    if (listeners.includes(callback)) {
      return
    }

    listeners.push(callback)
  }

  const destroy = () => {
    listeners = []
  }

  return {
    dispatch,
    commit,
    subscribe,
    destroy,
    get state() {
      return state
    },
    set state(_) {
      console.warn(ERROR_MESSAGE.NOT_ACCESS_STATE)
    }
  }
}
