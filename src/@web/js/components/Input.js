export default class Input {
    #$input;

    constructor({$target, onChange}) {
        this.#$input = $target;
        this.#$input.addEventListener("change", onChange);
        this.#$input.addEventListener("keydown", (e) => {
            if(e.key === "Enter") {
                e.preventDefault();
            }
        } );
    }

    get value() {
        return this.#$input.value;
    }

    setValue(value) {
        this.#$input.value = value;
    }
}