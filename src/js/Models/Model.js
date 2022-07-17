export class Model {
  #state;
  #initialState;

  constructor(initialState) {
    this.#initialState = initialState;
    this.#state = { ...initialState };
  }

  set state(next) {
    this.#state = {
      ...this.#state,
      ...next,
    };
  }

  get state() {
    return this.#state;
  }

  reset() {
    this.state = this.#initialState;
  }
}
