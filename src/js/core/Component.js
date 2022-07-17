export default class component {
	$target;
	$state;
	$props;

	constructor($target, $props) {
		this.$props = $props;
		this.$target = $target;
		this.setup();
		this.setEvent();
		this.render();
	}
	setup() {};
	mounted() {};
	// template() {return '';}
	render() {
		// this.$target.innerHTML = this.template();
		this.mounted();
	}
	setState(newState) {
		this.$state = {...this.$state, ...newState}
		this.render();
	}
	setEvent() {}
	
	addEvent(eventType, selector, callback) {
		const children = [...this.$target.querySelectorAll(selector)];
		const isTarget = (target) => children.includes(target)
																	|| target.closest(selector);

		this.$target.addEventListener(eventType, event => {
			if(!isTarget(event.target))return false;
			callback(event);
		})
	}

}