import Modal from './Modal.js';
import { MAXIMUM_NUMBER_MESSAGE, MINIMUM_NUMBER_MESSAGE } from './utils/contants.js';

export default class WinningNumber {
	constructor(data) {
		this.data = data;
		this.numbers = [];
		this.render();
		this.registerEvents();
	}

	render() {
		const $form = document.createElement('form');
		$form.className = 'mt-9';
		$form.innerHTML = `
			<label class="flex-auto d-inline-block mb-3">
				지난 주 당첨번호 6개와 보너스 넘버 1개를 입력해주세요.
			</label>
			<div class="d-flex">
				<div>
				<h4 class="mt-0 mb-3 text-center">당첨 번호</h4>
				<div>
					<input
					type="number"
					class="winning-number mx-1 text-center"
					/>
					<input
					type="number"
					class="winning-number mx-1 text-center"
					/>
					<input
					type="number"
					class="winning-number mx-1 text-center"
					/>
					<input
					type="number"
					class="winning-number mx-1 text-center"
					/>
					<input
					type="number"
					class="winning-number mx-1 text-center"
					/>
					<input
					type="number"
					class="winning-number mx-1 text-center"
					/>
				</div>
				</div>
				<div class="bonus-number-container flex-grow">
				<h4 class="mt-0 mb-3 text-center">보너스 번호</h4>
				<div class="d-flex justify-center">
					<input type="number" class="bonus-number text-center" />
				</div>
				</div>
			</div>
			<button
				type="button"
				class="open-result-modal-button mt-5 btn btn-cyan w-100"
			>
				결과 확인하기
			</button>
		`;
		const $div = document.querySelector('.div-w-100');
		$div.appendChild($form);
	}

	registerEvents() {
		const $button = document.querySelector('.open-result-modal-button');
		$button.addEventListener('click', () => {
			this.setNumbers();
			this.renderModal();
		});
	}

	setNumbers() {
		const $inputs = document.querySelectorAll('.winning-number');
		$inputs.forEach(($input) => {
			const value = +$input.value;
			this.numbers.push(value);
		});

		const $bonus = document.querySelector('.bonus-number');
		this.numbers.push(+$bonus.value);

		this.data.setWinningNumbers(this.numbers);
	}

	renderModal() {
		new Modal(this.data);
	}
}
