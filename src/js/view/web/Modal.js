class Modal {
  #$modal;

  constructor($modal, $closeButton) {
    this.#$modal = $modal;
    $closeButton.addEventListener("click", this.close.bind(this));
  }

  open() {
    this.#$modal.classList.add("open");
  }

  close() {
    this.#$modal.classList.remove("open");
  }
}

export default Modal;
