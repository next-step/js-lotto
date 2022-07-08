import { handleLottoNumbersToggleButtonClick, handlePurchaseButtonClick, initHandler, onModalClose, onModalShow } from "./handlers/index.js";
import { $lottoNumbersToggleButton, $purchaseButton, $modalClose, $showResultButton } from "./view/index.js";

initHandler();

$showResultButton.addEventListener('click', onModalShow)
$modalClose.addEventListener('click', onModalClose)

$purchaseButton.addEventListener('click', handlePurchaseButtonClick)
$lottoNumbersToggleButton.addEventListener('change', (e) => handleLottoNumbersToggleButtonClick(e))