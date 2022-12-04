export class StateModel {
    #state;
    #observers = new Set();

    constructor(state) {
        this.#state = state;
    }

    init() {
        this.#state = {};
        this.#observers = new Set();
    }

    register(subscriber) {
        this.#observers.add(subscriber);
    }

    setState(newState) {
        this.#state = { ...this.#state, ...newState };
        this.notify(newState);
        console.log(this.#state);
        console.log(this.#observers);
    }

    notify(state) {
        if (Object.values(state)[0] === true) {
            const key = Object.keys(state)[0];
            console.log([...this.#observers]
                .filter(observer => Object.keys(observer)[0] === key));
            const fn = () => [...this.#observers]
                .filter(observer => Object.keys(observer)[0] === key)
                .forEach(observer => observer[key]());
            return fn();
        }
    }

    getState(key) {
        return this.#state[key];
    }
}