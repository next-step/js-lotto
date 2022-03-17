import LottoMachine from "./model/LottoMachine.mjs";
import LottoSeller from "./model/LottoSeller.mjs";
import User from "./model/User.mjs";
import PurchaseForm from "./viewModel/PurchaseForm.mjs";
import LottoHistory from "./viewModel/LottoHistory.mjs";

const $app = document.querySelector("#app");
const $showResultButton = document.querySelector(".open-result-modal-button");
const $modalClose = document.querySelector(".modal-close");
const $modal = document.querySelector(".modal");
const $lottoNumbersToggleButton = document.querySelector(
  ".lotto-numbers-toggle-button"
);

function addAppEventListener() {
  if (!$app) {
    alert("앱을 찾을 수 없습니다.");
    return;
  }
  const user = new User();
  const lottoMachine = new LottoMachine();
  const lottoSeller = new LottoSeller();

  const lottoHistory = new LottoHistory();
  const puchaseForm = new PurchaseForm(
    user,
    lottoSeller,
    lottoMachine,
    lottoHistory
  );
}

addAppEventListener();

const onModalShow = () => {
  $modal.classList.add("open");
};

const onModalClose = () => {
  $modal.classList.remove("open");
};

$showResultButton.addEventListener("click", onModalShow);
$modalClose.addEventListener("click", onModalClose);
