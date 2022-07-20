import Component from "../core/Component.js"
export default class ItemToggle extends Component{

	setEvent() {
		const { setItemToggle } = this.$props
		this.addEvent('click', '.lotto-numbers-toggle-button', ({ target }) => {
			setItemToggle(target)
		})
	}
}