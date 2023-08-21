export const createStore = ({ state: getState, actions, mutations }) => {
  let state = getState()
  let listeners = []

  const commit = (type, payload) => {
    const mutation = mutations[type]

    if (!mutation) {
      throw new Error('존재하지 않는 mutation입니다!')
    }

    mutation(state, payload)
    listeners.forEach(listener => listener(payload))
  }

  const dispatch = (type, payload) => {
    const action = actions[type]

    if (!action) {
      throw new Error('존재하지 않는 action입니다!')
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
      console.warn('mutation을 통해 state를 변경할 수 있습니다.')
    }
  }
}
