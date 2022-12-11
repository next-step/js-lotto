export class StateModel {
    refreshState = {
        restart: false,
        reset: false,
    };
    numbersState = {
        lastNumbers: [],
        lastBonusNumber: [],
        numberSet: [],
        numberSetManuel: []
    };
    purchasedState = {
        price: 0,
        purchasedUnit: 0
    };
    #observers = new Set();

    constructor() {
    }

    reset() {
        this.resetState();
        this.#observers = new Set();
    }

    resetState() {
        ['restart', 'reset'].forEach(prop => {
            this.#setState(this.refreshState, prop, false);
        });

        ['lastNumbers', 'lastBonusNumber', 'numberSet', 'numberSetManuel'].forEach(prop => {
            this.#setState(this.numbersState, prop, []);
        });

        ['price', 'purchasedUnit'].forEach(prop => {
            this.#setState(this.purchasedState, prop, 0);
        });
    }

    register(subscriber) {
        this.#observers.add(subscriber);
    }

    #setState(state, prop, value) {
        state[prop] = value;

        if (state.hasOwnProperty(prop)) {
            Object.defineProperty(state, prop, {
                configurable: true,
                writable: true,
                enumerable: true,
                value
            });

            this.#notify(prop, state[prop]);
        }
    }

    setRefreshState(prop, value) {
        this.#setState(this.refreshState, prop, value);
    }

    setNumbersState(prop, value) {
        this.#setState(this.numbersState, prop, value);
    }

    setPurchasedState(prop, value) {
        this.#setState(this.purchasedState, prop, value);
    }

    #notify(key, value) {
        if (value === true) {
            const fn = () => [...this.#observers]
                .filter(observer => Object.keys(observer)[0] === key)
                .forEach(observer => observer[key]());
            return fn();
        }
    }
}