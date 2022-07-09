import { isPositiveIntegerAmountValidator, changeAmountToCount } from '../libs/index.js';
import { generateLotto } from './lotto.js';
import { renderLottoList } from './render.js';

const $showResultButton = document.querySelector('.open-result-modal-button');
const $modalClose = document.querySelector('.modal-close');
const $modal = document.querySelector('.modal');
const $lottoListContainer = document.querySelector('.lotto-container');

const $amountInputForm = document.querySelector('.amount-input-form');

let lotto;

$amountInputForm.addEventListener('submit', (e) => {
	e.preventDefault();

	const { value } = e.target.elements.amount;
	const { valid, msg } = isPositiveIntegerAmountValidator(value);

	if (!valid) {
		window.alert(msg);
		e.target.elements.amount.value = 0;
	}

	const count = changeAmountToCount(value);
	lotto = generateLotto(count);

	console.log(lotto);

	renderLottoList($lottoListContainer, lotto);
});

const onModalShow = () => {
	$modal.classList.add('open');
};

const onModalClose = () => {
	$modal.classList.remove('open');
};

$showResultButton.addEventListener('click', onModalShow);
$modalClose.addEventListener('click', onModalClose);
