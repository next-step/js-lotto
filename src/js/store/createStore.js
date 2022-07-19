export class Store {
	#state;
	#observers;

	constructor(initialState, reducer) {
		this.#state = initialState;
		this.reducer = reducer;
		this.#observers = new Set();
	}

	#publish() {
		this.#observers.forEach((cb) => cb());
	}

	subscribe(cb) {
		this.#observers.add(cb);
	}

	getState() {
		return this.#state;
	}

	dispatch(action) {
		this.#state = this.reducer(this.#state, action);
		this.#publish();
	}
}
