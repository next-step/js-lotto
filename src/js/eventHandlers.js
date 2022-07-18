import { validateInput } from "./validation.js";
import { displayLottoSection, toggleNumberDisplay } from "./view.js";
import { ERROR_MESSAGES } from "./constants.js";

const $lottoSection = document.querySelector(".lotto-section");
const $lottoForm = document.querySelector(".lotto-form");

export const handleSubmitPriceForm = (e) => {
  e.preventDefault();

  const priceInput = e.target[0].valueAsNumber;

  if (
    !validateInput(priceInput >= 1000, () =>
      alert(ERROR_MESSAGES.REQUIRED_MIN_AMOUNT)
    ) ||
    !validateInput(priceInput % 1000 === 0, () =>
      alert(ERROR_MESSAGES.UNIT_ERROR)
    )
  ) {
    return;
  }
  // validateInput(priceInput % 1000 !== 0, () => showSanckBar('some message'));

  $lottoSection.classList.remove("hidden");
  $lottoForm.classList.remove("hidden");

  displayLottoSection(priceInput);
};

export const handleToggleLottoSection = () => {
  toggleNumberDisplay();
};
