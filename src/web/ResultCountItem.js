class ResultCountItem {

    #count;
    #prize;
    #value;

    constructor(count, prize, value) {
        this.#count = count;
        this.#prize = prize;
        this.#value = value;
    }

    get count() {
        return this.#count;
    }

    get prize() {
        return this.#prize;
    }

    get value() {
        return this.#value;
    }

}

export default ResultCountItem;