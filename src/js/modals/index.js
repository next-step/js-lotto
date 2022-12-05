class Modal {
  constructor() {
    this.$modal = document.querySelector("#modal");
    this.$modalCloseButton = document.querySelector("#modal-close-button");
    this.$modalTemplate = document.querySelector("#modal-template-container");

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

    return this;
  }

  close() {
    this.$modal.classList.remove("open");
    this.setTemplate("");

    return this;
  }

  setAttributes(callback) {
    callback?.(this.$modal);

    return this;
  }

  setTemplate(template) {
    this.$modalTemplate.innerHTML = template;

    return this;
  }
}

export default Modal;
