import { $ } from "../utils/selector.js";
import { isValidPrice, generateRandomNumbers } from "../utils/utilFunc.js";
import {
  updateLottoAmounts,
  addWinningNumberInput,
} from "../utils/renderer.js";
import { winningResult, onModalClose } from "./winningResult.js";

function activateResult(arr) {
  winningResult(arr);
}

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

  const generateLottoNumbers = (amounts) => {
    Array.from({ length: amounts }, () =>
      lottoTicketsList.push(generateRandomNumbers())
    );
  };

  const updateLottoTickets = (amounts) => {
    const newLottoTickets = new Array(amounts).fill(undefined).map(
      (_, idx) => `
        <div class="d-flex items-center">
          <span class="mx-1 text-4xl lotto-tickets-img">🎟️ </span>
          <span class="lotto-tickets-numbers d-none">
            ${lottoTicketsList[idx].join(", ")}
          </span>
        </div>`
    );
    $(".lotto__tickets").innerHTML = newLottoTickets.join("");
  };

  const purchaseNewLottos = () => {
    const purchasePrice = $(".purchase__price-input").value;

    if (!isValidPrice(purchasePrice)) {
      return;
    }
    lottoTicketsList = [];

    const purchaseAmounts = Math.floor(purchasePrice / 1000);
    generateLottoNumbers(purchaseAmounts);
    updateLottoAmounts(".lotto__menu", purchaseAmounts);
    updateLottoTickets(purchaseAmounts);
    addWinningNumberInput(".winning-number-form");
    IsLottoNumberVisible = true;

    activateResult(lottoTicketsList);
  };

  const resetLotto = () => {
    while ($(".lotto__menu").hasChildNodes()) {
      $(".lotto__menu").removeChild($(".lotto__menu").firstChild);
    }
    while ($(".lotto__tickets").hasChildNodes()) {
      $(".lotto__tickets").removeChild($(".lotto__tickets").firstChild);
    }
    while ($(".winning-number-form").hasChildNodes()) {
      $(".winning-number-form").removeChild(
        $(".winning-number-form").firstChild
      );
    }
    $(".purchase__price-input").value = "";
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
