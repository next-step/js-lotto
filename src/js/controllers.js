import {
	$allWinningLottoCount,
	$allWinningNumberInputs,
	$bonusNumber,
	$earningTotalRate,
	$lottoPapers,
	$purchaseInput,
	$totalLottoCount,
} from "./view/elements.js";
import { ERROR_MESSAGE } from "./constants/errorMessage.js";
import { LOTTO } from "./constants/lotto.js";
import lotto from "./service/lotto.js";
import { isInvalidPurchasePrice } from "./utils/validator.js";
import {
	changeInnerText,
	onModalClose,
	onModalShow,
	render,
	toggleButtonClick,
	turnOffToggleButton,
} from "./view/ui.js";
import { lottosTemplate } from "./view/templates.js";

export const handleSumbit = (e) => {
	e.preventDefault();
	if (isInvalidPurchasePrice($purchaseInput.value, LOTTO.LOTTO_UNIT))
		return alert(ERROR_MESSAGE.INVALID_LOTTO_PRICE);

	turnOffToggleButton();

	const totalLottoCount = $purchaseInput.value / LOTTO.LOTTO_UNIT;
	const currentLottos = lotto.issueLottos(totalLottoCount);

	changeInnerText($totalLottoCount, totalLottoCount);
	render($lottoPapers, lottosTemplate(currentLottos));
};

const getWinningNumbers = () => {
	const winningNumbers = [...$allWinningNumberInputs].map(
		(winningNumberInput) => Number(winningNumberInput.value)
	);
	lotto.setWinningOrBonusNumber(winningNumbers);
};

const getBonusNumber = () => {
	const bonusNumber = Number($bonusNumber.value);
	lotto.setWinningOrBonusNumber(bonusNumber);
};

export const handleWinningNumberFormSubmit = (e) => {
	e.preventDefault();

	lotto.clearResult();
	getWinningNumbers();
	getBonusNumber();

	const [lottoResult, earningTotal, inputTotal] = lotto.checkResult();

	$allWinningLottoCount.forEach(($winningLottoCount, idx) =>
		changeInnerText($winningLottoCount, `${lottoResult[5 - idx]}개`)
	);

	const earningTotalRate = (earningTotal / inputTotal) * 100;
	changeInnerText(
		$earningTotalRate,
		`당신의 총 수익률은 ${earningTotalRate}%입니다.`
	);

	onModalShow();
};

export const handleRestartButtonClick = () => {
	lotto.initialize();
	turnOffToggleButton();
	$purchaseInput.value = "";
	changeInnerText($totalLottoCount, 0);
	render($lottoPapers, "");
	[...$allWinningNumberInputs].forEach(
		($winningNumberInput) => ($winningNumberInput.value = "")
	);
	$bonusNumber.value = "";
	onModalClose();
};
