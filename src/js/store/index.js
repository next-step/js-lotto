import Store from './store.js'
import actions from './actions.js'
import mutations from './mutations.js'

const defaultState = {
	price: '',
	lottos: [],
	winningNumbers: [],
	bonusNumbers: [],
	isShowNumber: false,
	isShowModal: false,
	prizes: [],
}

export const store = new Store({
	state: { ...defaultState },
	actions,
	mutations,
})
