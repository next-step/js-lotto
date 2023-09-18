export default class RuntimeError extends Error {
  #message;

  constructor(message) {
    super(message);
    this.#message = message;
  }

  getMessage() {
    return this.#message;
  }
}
