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

  /*
  수동구매 기능
  - [ ] 구입할 금액과 수동으로 구입할 로또의 개수를 입력 받는다.
    - [ ] 금액에 비해 로또 개수가 클 시 에러처리
    - [ ] 티켓의 수에 숫자가 아닌 것을 입력하면 에러처리
  - [ ] 수동구매 개수에 맞게 번호 입력창을 띄운다. 6개씩
    - [ ] 숫자가 중복되면 에러처리
    - [ ] 범위를 벗어난 숫자를 입력하면 에러처리
  */
}

App();
