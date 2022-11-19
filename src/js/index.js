import { ERROR_MESSAGE } from "./constants/errorMessage.js";
import { LOTTO } from "./constants/lotto.js";
import { clearLottos, issueLottos } from "./service/lotto.js";
import { isInvalidPurchasePrice } from "./utils/validator.js";
import {
	$lottoNumbersToggleButton,
	$lottoPapers,
	$modalClose,
	$purchaseForm,
	$purchaseInput,
	$showResultButton,
	$totalPurchaseMessage,
} from "./view/elements.js";
import {
	lottosTemplate,
	totalPurchaseMessageTemplate,
} from "./view/templates.js";
import {
	onModalClose,
	onModalShow,
	render,
	toggleButtonClick,
	turnOffToggleButton,
} from "./view/ui.js";

export const initialize = () => {
	clearLottos();
	turnOffToggleButton();
};

const handleSumbit = (e) => {
	e.preventDefault();
	if (isInvalidPurchasePrice($purchaseInput.value, LOTTO.LOTTO_UNIT))
		return alert(ERROR_MESSAGE.INVALID_LOTTO_PRICE);

	const totalLottoCount = $purchaseInput.value / LOTTO.LOTTO_UNIT;

	initialize();

	issueLottos(totalLottoCount);
	render($totalPurchaseMessage, totalPurchaseMessageTemplate(totalLottoCount));
	render($lottoPapers, lottosTemplate());
};

const setEventListeners = () => {
	$purchaseForm.addEventListener("submit", handleSumbit);
	$lottoNumbersToggleButton.addEventListener("click", toggleButtonClick);
	$showResultButton.addEventListener("click", onModalShow);
	$modalClose.addEventListener("click", onModalClose);
};

setEventListeners();
