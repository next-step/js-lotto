import { changeDisplayNoneToBlock, changeDisplayBlockToNone } from '../libs/dom.js';
import { changeAmountToCount, generateLotto } from '../libs/lotto.js';
import { isPositiveIntegerAmountValidator } from '../libs/validator.js';
import { renderLottoList, renderPurchaseCount } from './render.js';

import Store from './store.js';

const $showResultButton = document.querySelector('.open-result-modal-button');
const $toggleLottoDetailSwitch = document.querySelector('.lotto-numbers-toggle-button');

const $modalClose = document.querySelector('.modal-close');
const $modal = document.querySelector('.modal');

const $amountInputForm = document.querySelector('#amount-input-form');
const $purchaseCount = document.querySelector('#purchase-count');
const $purchaseResult = document.querySelector('#purchase-list');
const $lottoList = document.querySelector('#lotto-list');

const store = new Store();

const onModalShow = () => {
	$modal.classList.add('open');
};

const onModalClose = () => {
	$modal.classList.remove('open');
};

const onSubmitAmount = (e) => {
	e.preventDefault();

	const { value } = e.target.elements.amount;
	const { valid, msg } = isPositiveIntegerAmountValidator(value);

	if (!valid) {
		window.alert(msg);
		e.target.elements.amount.value = 0;
	}

	changeDisplayNoneToBlock($purchaseResult);

	const count = changeAmountToCount(value);

	store.setLotto(generateLotto(count));

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

$amountInputForm.addEventListener('submit', onSubmitAmount);
$toggleLottoDetailSwitch.addEventListener('click', toggleLottoDetail);
$showResultButton.addEventListener('click', onModalShow);
$modalClose.addEventListener('click', onModalClose);
