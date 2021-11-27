import { $ } from "../utils/selector.js";
import {
  isValidPrice,
  isValidPurchaseAmount,
  isValidPurchaseNumber,
  generateLottoNumbers,
} from "../utils/utilFunc.js";
import {
  updateLottoAmounts,
  addWinningNumberInput,
  updateLottoTickets,
  resetLotto,
  addManualNumberInput,
  resetManualLotto,
} from "../utils/renderer.js";
import { handleLottoResult, onModalClose } from "./winningResult.js";
import { LOTTO_PRICE } from "../utils/constants.js";

function App() {
  let lottoTicketsList = [];
  let manualLottoNumberList = [];
  let IsLottoNumberVisible = false;
  let IsManualLotto = false;
  let manualLottoCount = 0;

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

    const count = Math.floor(purchasePrice / LOTTO_PRICE);
    let purchaseAmounts = IsManualLotto ? count - manualLottoCount : count;
    lottoTicketsList = generateLottoNumbers(purchaseAmounts);

    if (IsManualLotto) {
      lottoTicketsList = lottoTicketsList.concat(manualLottoNumberList);
    }

    updateLottoAmounts(".lotto__menu", purchaseAmounts);
    updateLottoTickets(count, lottoTicketsList);
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

  const issueManualLotto = () => {
    const manualNumbers = document.querySelectorAll(".manual-number");
    let manualNumberList = [];

    manualNumbers.forEach((number) => {
      manualNumberList.push(Number(number.value));
    });

    if (isValidPurchaseNumber(manualNumberList)) {
      manualLottoNumberList = [];
      for (let i = 0; i < manualNumberList.length / 6; i++) {
        manualLottoNumberList[i] = manualNumberList.slice(i * 6, i * 6 + 6);
      }
    }
    purchaseNewLottos();
  };

  $(".manual-purchase__form").addEventListener("submit", (e) => {
    e.preventDefault();
    const purchasePrice = $(".purchase__price-input").value;
    manualLottoCount = $(".manual-purchase__price-input").value;
    IsManualLotto = true;

    if (!isValidPrice(purchasePrice)) {
      return;
    }

    if (!isValidPurchaseAmount(manualLottoCount, purchasePrice)) {
      return;
    }

    resetManualLotto();
    addManualNumberInput(".manual-number-form", manualLottoCount);

    $(".manual-purchase-btn").addEventListener("click", (e) => {
      issueManualLotto();
    });
  });
}

App();
