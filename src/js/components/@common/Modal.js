class Modal {
  constructor({ $modal, $modalOpenButton, $modalCloseButton }) {
    this.$modal = $modal;
    this.$modalOpenButton = $modalOpenButton;
    this.$modalCloseButton = $modalCloseButton;
  }

  init() {
    this.$modalOpenButton.addEventListener("click", this.open.bind(this));
    this.$modalCloseButton.addEventListener("click", this.close.bind(this));
    this.$modal.addEventListener("mouseup", this.onModalBackDropClick.bind(this));
  }

  open() {
    this.$modal.classList.add("open");
  }

  close() {
    this.$modal.classList.remove("open");
  }

  onOpen() {}

  onModalBackDropClick({ target, currentTarget }) {
    if (target === currentTarget) {
      this.close();
    }
  }
}

export default Modal;
