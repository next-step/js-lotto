import { $, MODAL_SELECTOR } from "../utils/dom.js";

export default function LottoModal() {
  const $modalClose = $(".modal-close");
  const $modal = $(".modal");

  this.open = (results, yieldResult) => {
    Object.entries(results).forEach(([key, value]) => {
      $(MODAL_SELECTOR[key]).textContent = value;
    });
    $(MODAL_SELECTOR.YIELD).textContent = yieldResult;
    $modal.classList.add("open");
  };

  const onModalClose = () => {
    $modal.classList.remove("open");
  };

  $modalClose.addEventListener("click", onModalClose);
}
