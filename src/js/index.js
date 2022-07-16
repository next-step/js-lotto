import Store from './store.js';

import { renderLottoList, renderPurchaseCount } from './render.js';

import {
	changeDisplayNoneToBlock,
	changeDisplayBlockToNone,
	changeAmountToCount,
	generateLotto,
	isPositiveIntegerAmountValidator,
	generateResultValidator,
	getWinningNumberIndex,
} from '../libs/index.js';
import {
	getWinningsResult,
	calculateWinningsPerRank,
	calculateTotalWinnings,
	calculateTotalReturn,
} from '../libs/statistics.js';

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

	store.setPurchaseAmount(purchaseAmount);
	store.setLotto(generateLotto(purchaseCount));

	renderPurchaseCount($purchaseCount, store.lottoNumbers.length);
	renderLottoList($lottoList, store.lottoNumbers);
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

const handleWinningNumbers = (e) => {
	const { value: winningNumber, name } = e.target;
	const index = getWinningNumberIndex(name);

	const validator = generateResultValidator(store.winningNumbers);
	if (!validator(winningNumber).valid) {
		window.alert(validator(winningNumber).msg);
		store.setWinningNumbers(index, undefined);
		return;
	}
	store.setWinningNumbers(index, winningNumber);
	const resultArray = getWinningsResult(store);
	const winningsPerRank = calculateWinningsPerRank(resultArray);
	const totalWinnings = calculateTotalWinnings(resultArray);
	const totalReturn = calculateTotalReturn(store.purchaseAmount, totalWinnings);

	console.log(winningsPerRank, totalWinnings, totalReturn);
};

$winningNumberInputForm.addEventListener('change', handleWinningNumbers);
$amountInputForm.addEventListener('submit', onSubmitAmount);
$toggleLottoDetailSwitch.addEventListener('click', toggleLottoDetail);
$showResultButton.addEventListener('click', onModalShow);
$modalClose.addEventListener('click', onModalClose);
