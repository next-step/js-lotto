import { $, MODAL_SELECTOR } from "../utils/dom.js";

export default function LottoModal() {
  const $modal = $(MODAL_SELECTOR.MODAL);
  const $modalClose = $(MODAL_SELECTOR.MODAL_CLOSE);
  const $restart = $(MODAL_SELECTOR.RESTART);

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

  const onRestart = () => location.reload();

  $modalClose.addEventListener("click", onModalClose);
  $restart.addEventListener("click", onRestart);
}
