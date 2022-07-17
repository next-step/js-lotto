class LottoWinningNumberFormView {
  #root;

  constructor(root) {
    this.#root = root;
  }

  show() {
    this.#root.style.display = null;
    return this;
  }

  hide() {
    this.#root.style.display = 'none';
    return this;
  }

  resetForm() {
    this.#root.reset();
  }

  addSubmitEventListener(handler) {
    this.#root.addEventListener('submit', handler);
  }
}

export default LottoWinningNumberFormView;
