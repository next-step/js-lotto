import {
	$lottoNumbersToggleButton,
	$lottoPapers,
	$modal,
	$totalLottoCount,
} from "./elements.js";

export const render = (target, text) => {
	target.innerHTML = text;
};

export const showTotalLottoCount = (totalLottoCount) => {
	$totalLottoCount.innerText = totalLottoCount;
};

export const toggleButtonClick = () => {
	const { classList } = $lottoPapers;
	classList.toggle("hide");
};

export const onModalShow = () => {
	$modal.classList.add("open");
};

export const onModalClose = () => {
	$modal.classList.remove("open");
};

export const turnOffToggleButton = () => {
	$lottoNumbersToggleButton.checked = false;
};
