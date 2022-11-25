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
        this.notify(newState);
    }

    notify(key) {
        console.log(this.#observers);
        this.#observers.forEach(row => row[key]);
    }

    getState(key) {
        return this.#state[key];
    }
}