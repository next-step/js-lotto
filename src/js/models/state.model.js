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

    notify(state) {
        if (Object.values(state)[0] === true) {
            const key = Object.keys(state)[0];
            const fn = () => [...this.#observers].find(observer => Object.keys(observer)[0] === key)[key]();
            return fn();
        }
    }

    getState(key) {
        return this.#state[key];
    }
}