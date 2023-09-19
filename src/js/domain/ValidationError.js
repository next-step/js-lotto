export default class ValidationError extends Error {
  #message;

  constructor(message) {
    super(message);
    this.#message = message;
  }

  getMessage() {
    return this.#message;
  }
}
