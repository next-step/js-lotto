class OutputView {
  #outputView;

  #outputError;

  constructor(outputView = console.log, outputError = console.error) {
    this.#outputView = outputView;
    this.#outputError = outputError;
  }

  message(content) {
    return this.#outputView(content);
  }

  error(err) {
    return this.#outputError(err);
  }
}

export default OutputView;
