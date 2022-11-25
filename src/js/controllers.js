import {
	$allWinningNumberInputs,
	$bonusNumber,
	$lottoPapers,
	$purchaseInput,
} from "./view/elements.js";
import { ERROR_MESSAGE } from "./constants/errorMessage.js";
import { LOTTO } from "./constants/lotto.js";
import lotto from "./service/lotto.js";
import { isInvalidPurchasePrice } from "./utils/validator.js";
import {
	onModalShow,
	render,
	showTotalLottoCount,
	turnOffToggleButton,
} from "./view/ui.js";
import { lottosTemplate } from "./view/templates.js";

const getWinningNumbers = () => {
	const winningNumbers = [...$allWinningNumberInputs].map(
		(winningNumberInput) => winningNumberInput.value
	);
	lotto.setResultNumbers(winningNumbers);
};

const getBonusNumber = () => {
	const bonusNumber = $bonusNumber.value;
	lotto.setResultNumbers(bonusNumber);
};

const initialize = () => {
	turnOffToggleButton();
};

export const handleSumbit = (e) => {
	e.preventDefault();
	if (isInvalidPurchasePrice($purchaseInput.value, LOTTO.LOTTO_UNIT))
		return alert(ERROR_MESSAGE.INVALID_LOTTO_PRICE);

	initialize();

	const totalLottoCount = $purchaseInput.value / LOTTO.LOTTO_UNIT;
	const currentLottos = lotto.issueLottos(totalLottoCount);

	showTotalLottoCount(totalLottoCount);
	render($lottoPapers, lottosTemplate(currentLottos));
};

export const onShowResultButtonClick = () => {
	getWinningNumbers();
	getBonusNumber();
	// 로또 하나하나와 당첨 숫자를 비교한다
	// 일치 갯수에 따라 당첨금, 당첨갯수, 당첨금 합이 정해지고 수익률이 결정된다
	onModalShow();
};
