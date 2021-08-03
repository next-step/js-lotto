import { store } from '../store/index.js'
import { $getElement, replaceSelectorToDOM } from '../utils/dom.js'
import { CLASS } from '../utils/constants.js'

class Component {
	constructor(props = {}) {
		this.props = { ...props }

		this.mapState()
		this.mapActions()
		store.addComponent(this, this.stateList, this.actionList)
		this.$target = $getElement(this.template())

		this.setElements()
		this.setEvents()
		console.log(this)
	}

	mapState() {
		this.stateList = []
	}

	mapActions() {
		this.actionList = []
	}

	setElements() {}

	setEvents() {}

	slot(selector, child) {
		replaceSelectorToDOM(selector, child.$target)
	}

	toggleTarget(isShow) {
		if (isShow) {
			this.$target.classList.remove(CLASS.DP_NONE)
		} else {
			this.$target.classList.add(CLASS.DP_NONE)
		}
	}

	render() {}

	template() {
		return ``
	}
}

export default Component
