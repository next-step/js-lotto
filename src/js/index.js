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
  const user = new User();
  const lottoHistory = new LottoHistory();
  const puchaseForm = new PurchaseForm({
    user,
    lottoHistory,
  });
}

if ($app) {
  addAppEventListener();
} else {
  alert("앱을 찾을 수 없습니다.");
}

const onModalShow = () => {
  $modal.classList.add("open");
};

const onModalClose = () => {
  $modal.classList.remove("open");
};

$showResultButton.addEventListener("click", onModalShow);
$modalClose.addEventListener("click", onModalClose);
