import { getBonusNumber, getWinningNumbers, handleLottoNumbersToggleButtonClick, handlePurchaseButtonClick, handleReset, onModalClose, onModalShow } from "./handlers/index.js";
import { $lottoNumbersToggleButton, $purchaseButton, $modalClose, $showResultButton, hidePurchaseViewSection, $winningNumbers, $bonusNumber, $reset } from "./view/index.js";

hidePurchaseViewSection();

$showResultButton.addEventListener('click',onModalShow)
$modalClose.addEventListener('click', onModalClose)
$purchaseButton.addEventListener('click', handlePurchaseButtonClick)
$lottoNumbersToggleButton.addEventListener('change', (e) => handleLottoNumbersToggleButtonClick(e))
$winningNumbers.forEach((inputBox, index) => {
  inputBox.addEventListener('input', (e) => getWinningNumbers(e, index))
})
$bonusNumber.addEventListener('input', (e) => getBonusNumber(e)
)
$reset.addEventListener('click', handleReset);