import LottoMachine from "./model/LottoMachine";
import LottoSeller from "./model/LottoSeller";
import User from "./model/User";
import PurchaseForm from "./viewModel/PurchaseForm";

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

  const puchaseForm = new PurchaseForm(user, lottoSeller, lottoMachine);
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
