export default class Store {
	constructor({ state, actions, mutations }) {
		this.state = state
		this.actions = actions
		this.mutations = mutations

		this.listeners = {}
	}

	getContext() {
		return {
			state: this.state,
			commit: (mutationKey, mutationParams) =>
				this.commit(mutationKey, mutationParams),
		}
	}

	addComponent(component, stateList, actionList) {
		this.mapComponentState(component, stateList)
		this.mapComponentActions(component, actionList)
	}

	mapComponentState(component, stateList) {
		stateList.forEach((stateKey) => {
			component[stateKey] = this.state[stateKey]

			if (stateKey in this.listeners) {
				this.listeners[stateKey].push(component)
				return
			}
			this.listeners[stateKey] = [component]
		})
	}

	mapComponentActions(component, actionList) {
		actionList.forEach((actionKey) => {
			const actionFunc = (actionParams) => {
				const context = this.getContext()
				this.actions[actionKey](context, actionParams)
			}

			component[actionKey] = actionFunc
		})
	}

	commit(mutationKey, params) {
		const oldState = { ...this.state }
		this.mutations[mutationKey](this.state, params)

		const editedKeys = this.compare(oldState)
		console.log(editedKeys)
		console.log(this.state)

		this.publish(editedKeys)
		this.rerenderComponents(editedKeys)
	}

	compare(oldState) {
		return Object.keys(oldState).filter(
			(key) => oldState[key] !== this.state[key]
		)
	}

	publish(keyList) {
		keyList.forEach((key) => {
			if (!(key in this.listeners)) return

			this.listeners[key].forEach((component) => {
				component[key] = this.state[key]
			})
		})
	}

	rerenderComponents(keyList) {
		const components = keyList.reduce((componentSet, key) => {
			if (!(key in this.listeners)) return componentSet

			return new Set([...componentSet, ...this.listeners[key]])
		}, [])

		components.forEach((component) => component.render())
	}
}
