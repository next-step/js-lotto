export class StateModel {
    state;
    #observers = new Set();

    constructor(state) {
        this.state = state;
    }

    reset() {
        this.state = {};
        this.#observers = new Set();
    }

    resetState() {
        this.state = {};
    }

    register(subscriber) {
        this.#observers.add(subscriber);
    }

    setState(props, value) {
        Object.defineProperty(this.state, props,{
            configurable: true,
            writable: true,
            value
        });
        this.notify(props, this.state[props]);
    }

    notify(key, value) {
        if (value === true) {
            const fn = () => [...this.#observers]
                .filter(observer => Object.keys(observer)[0] === key)
                .forEach(observer => observer[key]());
            return fn();
        }
    }

    getState(key) {
        return this.state[key];
    }
}