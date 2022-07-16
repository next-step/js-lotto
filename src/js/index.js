import Store from './store.js';

import {
	renderLottoList,
	renderLottoResultTable,
	renderPurchaseCount,
	renderLottoReturn,
} from './render.js';

import {
	changeDisplayNoneToBlock,
	changeDisplayBlockToNone,
	changeAmountToCount,
	generateLotto,
	isPurchaseAmountValidator,
	generateResultValidator,
	getWinningNumberIndex,
	winningNumberValidator,
} from '../libs/index.js';
import {
	getRankArrayPerLotto,
	calculateWinningPerRank,
	calculateTotalWinning,
	calculateTotalReturn,
} from '../libs/statistics.js';
import { go } from '../libs/fp.js';

const $showResultButton = document.querySelector('.open-result-modal-button');
const $toggleLottoDetailSwitch = document.querySelector('.lotto-numbers-toggle-button');

const $modalClose = document.querySelector('.modal-close');
const $modal = document.querySelector('.modal');

const $amountInputForm = document.querySelector('#amount-input-form');
const $amountInput = document.querySelector('#amount-input');
const $purchaseCount = document.querySelector('#purchase-count');
const $purchaseResult = document.querySelector('#purchase-list');
const $lottoList = document.querySelector('#lotto-list');
const $winningNumberInputForm = document.querySelector('#winning-number-input-form');
const $winningInputs = document.querySelectorAll('.winning-number');
const $resultTable = document.querySelector('#result-table');
const $profit = document.querySelector('#profit');
const $restart = document.querySelector('#restart');

const store = new Store();

const onModalShow = () => {
	const { valid, msg } = winningNumberValidator(store.winningNumbers);
	if (!valid) {
		window.alert(msg);
		return;
	}
	$modal.classList.add('open');

	const totalWinnings = go(store, getRankArrayPerLotto, calculateTotalWinning);
	const winningsPerRank = go(store, getRankArrayPerLotto, calculateWinningPerRank);
	const totalReturn = calculateTotalReturn(store.purchaseAmount, totalWinnings);

	renderLottoResultTable($resultTable, winningsPerRank);
	renderLottoReturn($profit, totalReturn);
};

const onModalClose = () => {
	$modal.classList.remove('open');
};

const restartLotto = () => {
	$modal.classList.remove('open');
	$winningInputs.forEach((e) => (e.value = ''));
	$amountInput.value = '';
	store.reset();
	changeDisplayBlockToNone($purchaseResult);
};

const onSubmitAmount = (e) => {
	e.preventDefault();

	const { value: purchaseAmount } = e.target.elements.amount;
	const { valid, msg } = isPurchaseAmountValidator(purchaseAmount);

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
	const { valid, msg } = validator(winningNumber);

	if (!valid) {
		window.alert(msg);
		store.setWinningNumbers(index, undefined);
		return;
	}

	store.setWinningNumbers(index, winningNumber);
};

const onSubmitWinningNumbers = (e) => {
	e.preventDefault();
};

$amountInputForm.addEventListener('submit', onSubmitAmount);
$toggleLottoDetailSwitch.addEventListener('click', toggleLottoDetail);
$winningNumberInputForm.addEventListener('change', handleWinningNumbers);
$winningNumberInputForm.addEventListener('submit', onSubmitWinningNumbers);
$showResultButton.addEventListener('click', onModalShow);
$modalClose.addEventListener('click', onModalClose);
$restart.addEventListener('click', restartLotto);
