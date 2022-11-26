import {
	handleSumbit,
	onShowResultButtonClick,
	restart,
} from "./controllers.js";
import { Lotto } from "./service/lotto.js";

import {
	$lottoNumbersToggleButton,
	$modalClose,
	$purchaseForm,
	$restartButton,
	$showResultButton,
} from "./view/elements.js";
import { onModalClose, toggleButtonClick } from "./view/ui.js";

export const lotto = new Lotto();

const setEventListeners = () => {
	$purchaseForm.addEventListener("submit", handleSumbit);
	$lottoNumbersToggleButton.addEventListener("click", toggleButtonClick);
	$showResultButton.addEventListener("click", onShowResultButtonClick);
	$modalClose.addEventListener("click", onModalClose);
	$restartButton.addEventListener("click", restart);
};

setEventListeners();
