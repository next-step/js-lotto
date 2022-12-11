import { $lottoNumbersToggleButton, $lottoPapers, $modal } from "./elements.js";

export const render = (target, html) => {
  target.innerHTML = html;
};

export const changeInnerText = (target, text) => {
  target.innerText = text;
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
  const { classList } = $lottoPapers;
  classList.add("hide");
};

export const uiInitialize = () => {
  turnOffToggleButton();

  changeInnerText($totalLottoCount, 0);
  $purchaseInput.value = "";
  $bonusNumber.value = "";
  render($lottoPapers, "");
  [...$allWinningNumberInputs].forEach(
    ($winningNumberInput) => ($winningNumberInput.value = "")
  );

  onModalClose();
};
