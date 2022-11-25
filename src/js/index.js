import { handleSumbit, onShowResultButtonClick } from "./controllers.js";

import {
	$lottoNumbersToggleButton,
	$modalClose,
	$purchaseForm,
	$showResultButton,
} from "./view/elements.js";
import { onModalClose, toggleButtonClick } from "./view/ui.js";

const setEventListeners = () => {
	$purchaseForm.addEventListener("submit", handleSumbit);
	$lottoNumbersToggleButton.addEventListener("click", toggleButtonClick);
	$showResultButton.addEventListener("click", onShowResultButtonClick);
	$modalClose.addEventListener("click", onModalClose);
};

setEventListeners();
