class Modal {
  constructor() {
    this.$modal = document.getElementById("modal");
    this.$modalCloseButton = document.getElementById("modal-close-button");
    this.$modalTemplate = document.getElementById("modal-template-container");

    this.#subscribeEvents();
  }

  #subscribeEvents() {
    this.$modalCloseButton.addEventListener("click", this.close.bind(this));
  }

  static getInstance() {
    if (this.instance) {
      return this.instance;
    }

    return (this.instance = new Modal());
  }

  show() {
    this.$modal.classList.add("open");
  }

  close() {
    this.$modal.classList.remove("open");
  }

  setTemplate(template) {
    this.$modalTemplate.innerHTML = template;

    return this;
  }
}

export default Modal;
