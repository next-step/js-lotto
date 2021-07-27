export default class WinningNumberView {
	constructor() {
		this.render();
	}

	render() {
		const $form = document.createElement('form');
		$form.className = 'mt-9 winning-number-form';
		$form.style.visibility = 'hidden';
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

		const $div = document.querySelector('.container');
		$div.appendChild($form);
	}

	changeVisibility(isVisible) {
		const $form = document.querySelector('.winning-number-form');
		$form.style.visibility = isVisible ? 'visible' : 'hidden';
	}

	resetInputs() {
		const $inputs = document.querySelectorAll('.winning-number');
		$inputs.forEach(($input) => {
			$input.value = '';
		});
		const $bonus = document.querySelector('.bonus-number');
		$bonus.value = '';
	}

	bindEvent(handler) {
		const $button = document.querySelector('.open-result-modal-button');
		$button.addEventListener('click', () => {
			const $inputs = document.querySelectorAll('.winning-number');
			const $bonus = document.querySelector('.bonus-number');
			const numbers = [];
			$inputs.forEach(($input) => {
				numbers.push(+$input.value);
			});
			numbers.push(+$bonus.value);
			handler(numbers);
		});
	}
}