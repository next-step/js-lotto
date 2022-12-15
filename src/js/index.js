import {
	handleRestartButtonClick,
	handleSumbit,
	handleWinningNumberFormSubmit,
} from "./controllers.js";

import {
	$lottoNumbersToggleButton,
	$modalClose,
	$purchaseForm,
	$restartButton,
	$winningNumberForm,
} from "./view/elements.js";

import { onModalClose, toggleButtonClick } from "./view/ui.js";

const setEventListeners = () => {
	$purchaseForm.addEventListener("submit", handleSumbit);
	$lottoNumbersToggleButton.addEventListener("click", toggleButtonClick);
	$modalClose.addEventListener("click", onModalClose);
	$winningNumberForm.addEventListener("submit", handleWinningNumberFormSubmit);
	$restartButton.addEventListener("click", handleRestartButtonClick);
};

setEventListeners();
