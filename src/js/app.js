import { getLottoPapers, lotto } from "./lotto.js";
import { get, getAll } from "./utils.js";

const displayType = {
  none: "inline",
  inline: "none",
};

class App {
  init() {
    this.setEventListeners();
  }

  setEventListeners() {
    const $purchaseForm = get(".purchase-form");
    const $purchaseInput = get(".purchase-input");
    const $lottoNumbersToggleButton = get(".lotto-numbers-toggle-button");
    const $lottoPapers = get(".lotto-papers");
    const $totalPurchaseMessage = get(".total-purchase-message");

    $purchaseForm.addEventListener("submit", (e) => {
      const totalLottoCount = $purchaseInput.value / 1000;

      e.preventDefault();

      if ($purchaseInput.value % 1000) {
        alert("로또 구입 금액을 1,000원 단위로 입력해 주세요.");
        return;
      }

      this.initialize();

      $totalPurchaseMessage.innerText = `총 ${totalLottoCount}개를 구매하였습니다.`;
      lotto.issue(totalLottoCount);
      $lottoPapers.innerHTML = getLottoPapers(totalLottoCount);
    });

    $lottoNumbersToggleButton.addEventListener("click", () => {
      const $lottoNumbers = getAll(".lotto-numbers");

      $lottoNumbers.forEach(
        ($lottoNumber) =>
          ($lottoNumber.style.display = displayType[$lottoNumber.style.display])
      );
    });
  }

  initialize() {
    const $lottoNumbersToggleButton = get(".lotto-numbers-toggle-button");

    lotto.initialize();
    $lottoNumbersToggleButton.checked = false;
  }
}

export default App;
