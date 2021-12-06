import { $ } from "../utils/selector.js";
import { LOTTO_PRICE } from "../utils/constants.js";
import {
  isValidPrice,
  isValidPurchaseAmount,
  isValidPurchaseNumber,
} from "../utils/validator.js";
import { generateLottoNumbers } from "../utils/numberGenerator.js";
import {
  updateLottoAmounts,
  updateLottoTickets,
  addWinningNumberInput,
  addManualNumberInput,
  resetLotto,
  resetManualLotto,
} from "../utils/renderer.js";
import { handleLottoResult, onModalClose } from "./winningResult.js";

function App() {
  let lottoTicketsList = [];
  let manualLottoNumberList = [];
  let isLottoNumberVisible = false;
  let isManualLotto = false;
  let manualLottoCount = 0;

  const showLottoNumbers = () => {
    $(".lotto__tickets")
      .querySelectorAll(".lotto-tickets-numbers")
      .forEach((el) => {
        el.classList.remove("d-none");
        el.classList.add("d-flex");
      });
    isLottoNumberVisible = false;
  };

  const hideLottoNumbers = () => {
    $(".lotto__tickets")
      .querySelectorAll(".lotto-tickets-numbers")
      .forEach((el) => {
        el.classList.remove("d-flex");
        el.classList.add("d-none");
      });
    isLottoNumberVisible = true;
  };

  const purchaseNewLottos = () => {
    const purchasePrice = $(".purchase__price-input").value;

    if (!isValidPrice(purchasePrice)) {
      return;
    }
    lottoTicketsList = [];

    const count = Math.floor(purchasePrice / LOTTO_PRICE);
    let purchaseAmounts = isManualLotto ? count - manualLottoCount : count;
    lottoTicketsList = generateLottoNumbers(purchaseAmounts);

    if (isManualLotto) {
      lottoTicketsList = lottoTicketsList.concat(manualLottoNumberList);
    }

    updateLottoAmounts(".lotto__menu", count);
    updateLottoTickets(count, lottoTicketsList);
    addWinningNumberInput(".winning-number-form");
    isLottoNumberVisible = true;

    handleLottoResult(lottoTicketsList);
  };

  $(".purchase__form").addEventListener("submit", (e) => {
    e.preventDefault();
    purchaseNewLottos();
  });

  $(".lotto__menu").addEventListener("click", (e) => {
    if (e.target.classList.contains("lotto-numbers-toggle-btn")) {
      isLottoNumberVisible ? showLottoNumbers() : hideLottoNumbers();
    }
  });

  $(".restart-btn").addEventListener("click", (e) => {
    onModalClose();
    resetLotto();
  });

  const issueManualLotto = () => {
    const manualNumbers = document.querySelectorAll(".manual-number");

    const manualNumberList = [...manualNumbers].map((number) =>
      Number(number.value)
    );

    if (isValidPurchaseNumber(manualNumberList)) {
      manualLottoNumberList = [];
      for (let i = 0; i < manualLottoCount / 6; i++) {
        manualLottoNumberList[i] = manualNumberList.slice(i * 6, i * 6 + 6);
      }
    }

    purchaseNewLottos();
  };

  $(".manual-purchase__form").addEventListener("submit", (e) => {
    e.preventDefault();
    const purchasePrice = $(".purchase__price-input").value;
    manualLottoCount = $(".manual-purchase__price-input").value;
    isManualLotto = true;

    if (!isValidPrice(purchasePrice)) {
      return;
    }

    if (!isValidPurchaseAmount(manualLottoCount, purchasePrice)) {
      return;
    }

    resetManualLotto();

    if (manualLottoCount > 0) {
      addManualNumberInput(".manual-number-form", manualLottoCount);
    }

    $(".manual-purchase-btn").addEventListener("click", (e) => {
      issueManualLotto();
    });
  });
}

App();
