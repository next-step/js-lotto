import {LOTTO_PRICE, NON_UNIT_VALUE_ALERT_MESSAGE} from './constants/index.js';
import {divmod} from './lib/index.js';

const $purchaseForm = document.querySelector('form[name=purchaseForm]');
$purchaseForm.addEventListener('submit', (event) => {
	event.preventDefault();

	const purchaseFormData = new FormData(event.target);
	const purchaseAmount = Number(purchaseFormData.get('purchaseAmountInput'));
	const [, remainder] = divmod(purchaseAmount, LOTTO_PRICE);

	if (remainder) {
		alert(NON_UNIT_VALUE_ALERT_MESSAGE);
	}
});

const $showResultButton = document.querySelector('.open-result-modal-button');
const $modalClose = document.querySelector('.modal-close');
const $modal = document.querySelector('.modal');
const $lottoNumbersToggleButton = document.querySelector(
	'.lotto-numbers-toggle-button',
);

const onModalShow = () => {
	$modal.classList.add('open');
};

const onModalClose = () => {
	$modal.classList.remove('open');
};

$showResultButton.addEventListener('click', onModalShow);
$modalClose.addEventListener('click', onModalClose);
