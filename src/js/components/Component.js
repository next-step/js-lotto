export class Component {
	constructor($element) {
		this.$element = $element;
	}

	show(display = 'block') {
		this.$element.style.display = display;
		return this;
	}

	hide() {
		this.$element.style.display = 'none';
		return this;
	}
}
