import { $ } from "../utils/querySelector";

const $showResultButton = $(".open-result-modal-button");
const $modalClose = $(".modal-close");
const $modal = $(".modal");
const $tbody = $("tbody");

const onModalShow = () => {
  $modal.classList.add("open");
};

const onModalClose = () => {
  $modal.classList.remove("open");
  $tbody.innerHTML = "";
};

$showResultButton.addEventListener("click", onModalShow);
$modalClose.addEventListener("click", onModalClose);
