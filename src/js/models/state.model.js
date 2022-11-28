export class StateModel {
    #state;
    #observers = new Set();

    constructor(state) {
        this.#state = state;
    }

    reset() {
        this.#state = {};
    }

    register(subscriber) {
        this.#observers.add(subscriber);
    }

    setState(newState) {
        this.#state = { ...this.#state, ...newState };
        if (Object.values(newState)[0] === null) this.notify();
    }

    notify() {
        this.#observers.forEach(fn => fn());
    }

    getState(key) {
        return this.#state[key];
    }
}