import { $ } from "../utils/querySelector";

const $modalClose = $(".modal-close");
const $modal = $(".modal");
const $tbody = $("tbody");

export const onModalShow = () => {
  $modal.classList.add("open");
};

export const onModalClose = () => {
  $modal.classList.remove("open");
  $tbody.innerHTML = "";
};

$modalClose.addEventListener("click", onModalClose);
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    onModalClose();
  }
});
