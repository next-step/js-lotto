import { handleSumbit, onShowResultButtonClick } from "./controllers.js";

import {
	$lottoNumbersToggleButton,
	$modalClose,
	$purchaseForm,
	$restartButton,
	$showResultButton,
} from "./view/elements.js";

import { onModalClose, toggleButtonClick } from "./view/ui.js";

const setEventListeners = () => {
	$purchaseForm.addEventListener("submit", handleSumbit);
	$lottoNumbersToggleButton.addEventListener("click", toggleButtonClick);
	$showResultButton.addEventListener("click", onShowResultButtonClick);
	$modalClose.addEventListener("click", onModalClose);
	$restartButton.addEventListener("click", () => {
		// 로또 모델을 초기화한다.
	});
};
setEventListeners();
