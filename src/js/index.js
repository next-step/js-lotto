import {
  handleSubmitToShowTheRest,
  handleToggleLottoSection,
} from "./eventHandlers.js";

const $priceForm = document.querySelector(".price-form");
const $lottoSectionToggleInput = document.querySelector(
  ".lotto-section__toggle-input"
);

// 1. LottoService
// 2. View
// 3. validation
// 4. util
// 5. event handler
// 6. constants

// index에는? => 앱을 '시작'하는 코드만!

$priceForm.addEventListener("submit", handleSubmitToShowTheRest);
$lottoSectionToggleInput.addEventListener("click", handleToggleLottoSection);
