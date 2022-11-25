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
	onModalShow,
	render,
	turnOffToggleButton,
} from "./view/ui.js";
import { lottosTemplate } from "./view/templates.js";

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

	changeInnerText($totalLottoCount, totalLottoCount);
	render($lottoPapers, lottosTemplate(currentLottos));
};

export const onShowResultButtonClick = () => {
	getWinningNumbers();
	getBonusNumber();
	const [lottoResult, earningTotal] = lotto.checkResult();
	$allWinningLottoCount.forEach(($winningLottoCount, idx) =>
		changeInnerText($winningLottoCount, `${lottoResult[5 - idx]}개`)
	);
	const earningTotalRate = (earningTotal / Number($purchaseInput.value)) * 100;
	changeInnerText(
		$earningTotalRate,
		`당신의 총 수익률은 ${earningTotalRate}%입니다.`
	);
	onModalShow();
};
