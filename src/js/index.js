import { $ } from "../utils/selector.js";
import { isValidPrice, generateLottoNumbers } from "../utils/utilFunc.js";
import {
  updateLottoAmounts,
  addWinningNumberInput,
  updateLottoTickets,
  resetLotto,
} from "../utils/renderer.js";
import { handleLottoResult, onModalClose } from "./winningResult.js";

function App() {
  let lottoTicketsList = [];
  let IsLottoNumberVisible = false;

  const showLottoNumbers = () => {
    $(".lotto__tickets")
      .querySelectorAll(".lotto-tickets-numbers")
      .forEach((el) => {
        el.classList.remove("d-none");
        el.classList.add("d-flex");
      });
    IsLottoNumberVisible = false;
  };

  const hideLottoNumbers = () => {
    $(".lotto__tickets")
      .querySelectorAll(".lotto-tickets-numbers")
      .forEach((el) => {
        el.classList.remove("d-flex");
        el.classList.add("d-none");
      });
    IsLottoNumberVisible = true;
  };

  const purchaseNewLottos = () => {
    const purchasePrice = $(".purchase__price-input").value;

    if (!isValidPrice(purchasePrice)) {
      return;
    }
    lottoTicketsList = [];

    const purchaseAmounts = Math.floor(purchasePrice / 1000);
    lottoTicketsList = generateLottoNumbers(purchaseAmounts);
    updateLottoAmounts(".lotto__menu", purchaseAmounts);
    updateLottoTickets(purchaseAmounts, lottoTicketsList);
    addWinningNumberInput(".winning-number-form");
    IsLottoNumberVisible = true;

    handleLottoResult(lottoTicketsList);
  };

  $(".purchase__form").addEventListener("submit", (e) => {
    e.preventDefault();
  });

  $(".purchase__price-input").addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      purchaseNewLottos();
    }
  });

  $(".purchase__confirm-btn").addEventListener("click", (e) => {
    purchaseNewLottos();
  });

  $(".lotto__menu").addEventListener("click", (e) => {
    if (e.target.classList.contains("lotto-numbers-toggle-btn")) {
      IsLottoNumberVisible ? showLottoNumbers() : hideLottoNumbers();
    }
  });

  $(".restart-btn").addEventListener("click", (e) => {
    onModalClose();
    resetLotto();
  });
}

App();
