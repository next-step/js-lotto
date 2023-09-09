export const createSignal = initialState => {
  let state = initialState

  const read = () => {
    return state
  }

  const write = newState => {
    state = newState
  }

  return [read, write]
}
