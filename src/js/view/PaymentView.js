export default class PaymentView {
	constructor() {
		this.form = undefined;
		this.input = undefined;
		this.render();
	}
	
	render() {
		const $form = document.createElement('form');
		$form.className = 'mt-5 payment-form';
		$form.innerHTML = `
			<label class="mb-2 d-inline-block"
			>
				구입할 금액을 입력해주세요.
			</label>
			<div class="d-flex">
				<input
				type="number"
				class="w-100 mr-2 pl-2 payment-input"
				placeholder="구입 금액"
				/>
				<button type="button" class="btn btn-cyan payment-button">확인</button>
			</div>
		`;

		const $div = document.querySelector('.container');
		$div.appendChild($form);

		this.form = $form;
		this.input = document.querySelector('.payment-input');
	}

	resetInput() {
		this.input.value = '';
	}

	bindEvent(handler) {
		this.form.addEventListener('submit', (event) => {
			event.preventDefault();
			const value = +this.input.value;
			handler(value);
		});

		const $button = document.querySelector('.payment-button');
		$button.addEventListener('click', () => {
			const value = +this.input.value;
			handler(value);
		});
	}
}