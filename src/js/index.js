import { handleLottoNumbersToggleButtonClick, handlePurchaseButtonClick, onModalClose, onModalShow } from "./handlers/index.js";
import { $lottoNumbersToggleButton, $purchaseButton, $modalClose, $showResultButton, hidePurchaseViewSection } from "./view/index.js";

hidePurchaseViewSection();

$showResultButton.addEventListener('click', onModalShow)
$modalClose.addEventListener('click', onModalClose)
$purchaseButton.addEventListener('click', handlePurchaseButtonClick)
$lottoNumbersToggleButton.addEventListener('change', (e) => handleLottoNumbersToggleButtonClick(e))