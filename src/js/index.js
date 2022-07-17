import { LottoController } from "./Controllers/LottoController.js";
import { LottoModel } from "./Models/LottoModel.js";
import { LottoView } from "./Views/LottoView.js";

const $showResultButton = document.querySelector(".open-result-modal-button");
const $modalClose = document.querySelector(".modal-close");
const $modal = document.querySelector(".modal");

const onModalShow = () => {
  $modal.classList.add("open");
};

const onModalClose = () => {
  $modal.classList.remove("open");
};

$showResultButton.addEventListener("click", onModalShow);
$modalClose.addEventListener("click", onModalClose);

new LottoController(new LottoView(document.querySelector("#app")), new LottoModel());
