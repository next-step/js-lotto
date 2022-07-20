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
	/**
	 * @todo : mounted, template, render는 사용법 정확히 이해하고 다시 사용하기
	 */
	mounted() {};
	template() {return '';}
	render() {
		// this.$target.innerHTML = this.template();
		this.mounted();
	}
	initState() {
		this.$state = {}
	}
	setState(newState) {
		this.$state = {...this.$state, ...newState}
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