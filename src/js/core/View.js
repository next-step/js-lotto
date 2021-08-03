export default class View {
	constructor(pubsub, dataComponent) {
		this.visivility = '';
		this.pubsub = pubsub;
		this.$target = document.querySelector(
			`[data-component="${dataComponent}"]`
		);
		// 지연 실행 방법이 이것밖에 없을까?
		setTimeout(this.addEvents.bind(this), 0);
		this.registerSubscribes();
	}
	addEvents() {}
	registerSubscribes() {}
	hidden() {
		this.visivility = this.$target.style.display;
		this.$target.style.display = 'none';
	}
	show() {
		this.$target.style.display = this.visivility;
	}
}
