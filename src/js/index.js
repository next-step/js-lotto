import { createLottoTickets, isValidateAmountOfPayment } from "./createLotto.js";
import { PRICE_PER_LOTTO } from "./constants.js";

function LottoApp() {
  this.init = () => {
    initEventListeners();
  };

  const $showResultButton = document.querySelector(".open-result-modal-button");
  const $modalClose = document.querySelector(".modal-close");
  const $modal = document.querySelector(".modal");
  const $lottoNumbersToggleButton = document.querySelector(".lotto-numbers-toggle-button");
  const $purchaseButton = document.querySelector("#purchaseButton");

  const onModalShow = () => {
    $modal.classList.add("open");
  };

  const onModalClose = () => {
    $modal.classList.remove("open");
  };

  const lottoNumbersToggle = () => {
    const lottoNumbers = document.querySelectorAll(".lotto-numbers");
    lottoNumbers.forEach(lottoNumber => {
      lottoNumber.classList.toggle("numbers-closed");
    });

    const lottoList = document.querySelector(".lotto-list");
    lottoList.classList.toggle("d-flex");

    const lottoListWithNumbers = document.querySelector(".lotto-item");
    lottoListWithNumbers.classList.toggle("lotto-item-with-numbers");
  };

  const purchaseLottoTickets = () => {
    const $purchasePrice = document.querySelector("#purchasePrice");
    const purchasePrice = Number($purchasePrice.value);

    if (!isValidateAmountOfPayment(purchasePrice)) {
      $purchasePrice.value = "";
      return;
    }
    const numberOfLottoTickets = purchasePrice / PRICE_PER_LOTTO;
    const purchasedLottoTickets = createLottoTickets(numberOfLottoTickets);

    const $purchasedLottoCount = document.querySelector("#purchasedLottoCount");
    $purchasedLottoCount.innerText = numberOfLottoTickets;

    const $lottoIconAndNumbers = document.querySelector("#lottoIconAndNumbers");
    const lottoTemplate = purchasedLottoTickets
      .map(lotto => {
        return `
          <li class="mx-1 text-4xl lotto-item">
            <span class="lotto-icon">🎟️ </span>
            <span class="lotto-numbers numbers-closed">${lotto.join(", ")}</span>
          </li>
        `;
      })
      .join("");

    $lottoIconAndNumbers.innerHTML = lottoTemplate;

    const $purchaseResult = document.querySelector("#purchaseResult");
    $purchaseResult.classList.remove("pre-purchase");

    const $confirmWinningNumbers = document.querySelector("#confirmWinningNumbers");
    $confirmWinningNumbers.classList.remove("pre-purchase");
  };

  const initEventListeners = () => {
    $showResultButton.addEventListener("click", onModalShow);

    $modalClose.addEventListener("click", onModalClose);

    $purchaseButton.addEventListener("click", purchaseLottoTickets);

    $lottoNumbersToggleButton.addEventListener("click", lottoNumbersToggle);
  };
}

const app = new LottoApp();
app.init();
