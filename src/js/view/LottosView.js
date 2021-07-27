class Lotto {
	constructor(values) {
		this.numbers = [...values];
	}

	getFoldedLotto() {
		return `<span class="mx-1 text-4xl">🎟️ </span>`;
	}

	getExpandedLotto() {
		return `
			<li class="mx-1 text-4xl lotto-wrapper">
            	<span class="lotto-icon">🎟️ </span>
            	<span class="lotto-detail" style="display: inline;">${this.numbers.join(', ')}</span>
        	</li>
		`;
	}

	render() {
		const $span = document.createElement('span');
		$span.className = 'mx-1 text-4xl';
		$span.innerText = '🎟️ ';
	}
}

export default class LottosView {
	constructor(model) {
		this.model = model;
		this.num = 0;
		this.lottos = [];
		this.isFolded = true;
		this.render();
	}

	render() {
		const $section = document.createElement('section');
		$section.className = 'mt-9 lotto-section';
		$section.style.visibility = 'hidden';
		$section.innerHTML = `
			<div class="d-flex">
				<label class="flex-auto my-0">총 ${this.model.getPayment() / 1000}개를 구매하였습니다.</label>
				<div class="flex-auto d-flex justify-end pr-1">
					<label class="switch">
					<input type="checkbox" class="lotto-numbers-toggle-button" />
					<span class="text-base font-normal">번호보기</span>
					</label>
				</div>
			</div>
			<div class="d-flex flex-wrap lotto-number-visible"></div>
		`;

		const $div = document.querySelector('.container');
		$div.appendChild($section);
	}

	changeVisibility(isVisible) {
		const $section = document.querySelector('.lotto-section');
		$section.style.visibility = isVisible ? 'visible' : 'hidden';
	}

	getFoldedFlag() {
		return this.isFolded;
	}

	setFoldedFlag(value) {
		this.isFolded = value;
	}

	setNum(num) {
		this.num = num;
	}

	setLottos(values) {
		values.forEach((val) => this.lottos.push(new Lotto(val)));
	}

	renderLottos() {
		const $div = document.querySelector('.lotto-number-visible');
		$div.innerHTML = this.lottos.map((lotto) => this.isFolded ? lotto.getFoldedLotto() : lotto.getExpandedLotto()).join('');
	}

	bindEvent(handler) {
		const $switch = document.querySelector('.lotto-numbers-toggle-button');
		$switch.addEventListener('change', () => handler());
	}
}