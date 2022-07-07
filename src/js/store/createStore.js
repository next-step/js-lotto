export class Store {
  #state;

  constructor(initialState, reducer) {
    this.#state = initialState;
    this.reducer = reducer;
  }

  getState() {
    return this.#state;
  }

  dispatch(action) {
    this.#state = this.reducer(this.#state, action);
    console.log(this.#state);
  }
}
