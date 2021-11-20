import { $ } from "../utils/selector.js";
import { isValidPrice, generateRandomNumbers } from "../utils/utilFunc.js";
import {
  updateLottoAmounts,
  addWinningNumberInput,
} from "../utils/renderer.js";
import { winningResult } from "./winningResult.js";

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

    // 입력금액 유효성 검사
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
}

App();
