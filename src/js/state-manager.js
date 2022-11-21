export default class StateManager {
  observers = new Set();
  state = [];

  setState(state) {
    this.state = state;

    this.#publish();
  }

  subscribe(subscriber) {
    this.observers.add(subscriber);
  }

  #publish() {
    this.observers.forEach(fn => fn(this.state));
  }
}
