import Store from './store.js';

import { renderLottoList, renderPurchaseCount } from './render.js';

import {
	changeDisplayNoneToBlock,
	changeDisplayBlockToNone,
	changeAmountToCount,
	generateLotto,
	isPositiveIntegerAmountValidator,
	generateResultValidator,
} from '../libs/index.js';

const $showResultButton = document.querySelector('.open-result-modal-button');
const $toggleLottoDetailSwitch = document.querySelector('.lotto-numbers-toggle-button');

const $modalClose = document.querySelector('.modal-close');
const $modal = document.querySelector('.modal');

const $amountInputForm = document.querySelector('#amount-input-form');
const $purchaseCount = document.querySelector('#purchase-count');
const $purchaseResult = document.querySelector('#purchase-list');
const $lottoList = document.querySelector('#lotto-list');
const $winningNumberInputForm = document.querySelector('#winning-number-input-form');

const store = new Store();

const onModalShow = () => {
	$modal.classList.add('open');
};

const onModalClose = () => {
	$modal.classList.remove('open');
};

const onSubmitAmount = (e) => {
	e.preventDefault();

	const { value: purchaseAmount } = e.target.elements.amount;
	const { valid, msg } = isPositiveIntegerAmountValidator(purchaseAmount);

	if (!valid) {
		window.alert(msg);
		e.target.elements.amount.value = '';
		return;
	}

	changeDisplayNoneToBlock($purchaseResult);

	const purchaseCount = changeAmountToCount(purchaseAmount);

	store.setLotto(generateLotto(purchaseCount));

	renderPurchaseCount($purchaseCount, store.lotto.length);
	renderLottoList($lottoList, store.lotto);
};

const toggleLottoDetail = (e) => {
	$lottoList.classList.toggle('flex-col');
	const $lottoDetails = document.querySelectorAll(`#lotto-detail`);
	const isDetailSwitchOn = e.target.checked;

	if (isDetailSwitchOn) {
		$lottoDetails.forEach((node) => {
			changeDisplayNoneToBlock(node);
		});
	} else {
		$lottoDetails.forEach((node) => {
			changeDisplayBlockToNone(node);
		});
	}
};

const temp = [];
const handleWinningNumber = (e) => {
	const validator = generateResultValidator(temp);
	if (!validator(e.target.value).valid) {
		window.alert(validator(e.target.value).msg);
		e.target.value = '';
		return;
	}
	temp.push(e.target.value);
};

$winningNumberInputForm.addEventListener('change', handleWinningNumber);
$amountInputForm.addEventListener('submit', onSubmitAmount);
$toggleLottoDetailSwitch.addEventListener('click', toggleLottoDetail);
$showResultButton.addEventListener('click', onModalShow);
$modalClose.addEventListener('click', onModalClose);
