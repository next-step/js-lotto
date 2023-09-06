export default class Button {
    #$button;

    constructor({$target, onClick}) {
        this.#$button = $target;
        this.#$button.addEventListener("click", onClick);
    }
}