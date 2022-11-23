import { handleSumbit } from "./controllers.js";

import {
  $lottoNumbersToggleButton,
  $modalClose,
  $purchaseForm,
  $showResultButton,
} from "./view/elements.js";
import { onModalClose, onModalShow, toggleButtonClick } from "./view/ui.js";

const setEventListeners = () => {
  $purchaseForm.addEventListener("submit", handleSumbit);
  $lottoNumbersToggleButton.addEventListener("click", toggleButtonClick);
  $showResultButton.addEventListener("click", onModalShow);
  $modalClose.addEventListener("click", onModalClose);
};

setEventListeners();
