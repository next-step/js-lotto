import { createStore } from '../utils/createStore'
import { state } from './state'
import { actions } from './actions'
import { mutations } from './mutations'

export const lottoStore = createStore({
  state,
  actions,
  mutations
})
