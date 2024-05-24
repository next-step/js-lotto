import { checkEntityType } from '../utils';

export class Toggle {
    #node;

    constructor(entity) {
        this.#node = checkEntityType(entity);
    }

    onClick(show) {
        if (this.#node.style.display === 'none') {
            this.#node.style.display = 'block';
            show && show();
            return;
        }

        this.#node.style.display = 'none';
        this.#node.innerHTML = '';
    }
}
