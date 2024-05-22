import { checkEntityType } from '../utils';

export class Message {
    #node;

    constructor(entity) {
        this.#node = checkEntityType(entity);
    }

    render(message) {
        this.#node.innerText = message;
    }

    reset() {
        this.#node.innerText = '';
    }
}
