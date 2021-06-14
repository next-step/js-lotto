export default class PaymentView {
	constructor(model) {
		this.model = model;
		this.render();
	}

	render() {
		const form = document.createElement('form');
		form.className = 'mt-5 payment';
		form.innerHTML = `
			<label class="mb-2 d-inline-block">
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
		const $container = document.querySelector('.div-w-100');
		$container.appendChild(form);
	}
}
