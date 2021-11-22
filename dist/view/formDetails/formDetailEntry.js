import { NUMBERS_PER_LOTTO, MIN_NUM, MAX_NUM } from '../../constants.js';
import el from '../../dom.js';
import View from '../index.js';
export default class FormDetailEntry extends View {
    static #template = `
  <li class="picked-item">
    <label>
      자동/반자동
      <input type="checkbox" />
    </label>
    ${Array(NUMBERS_PER_LOTTO).fill(`<input type="number" min="${MIN_NUM}" max="${MAX_NUM}" required>`).join('')}
  </li>
  `;
    $toggle;
    $inputs;
    constructor() {
        super();
        const $content = el(FormDetailEntry.#template);
        this.$toggle = $content.querySelector('input[type=checkbox]');
        this.$inputs = Array.from($content.querySelectorAll('input[type="number"]'));
        this.$toggle.addEventListener('change', this.onChange);
        el(this, [$content]);
    }
    focus() {
        this.$inputs[0].focus();
    }
    onChange = () => {
        this.emit('toggleEntry@formDetailEntry', {
            checked: this.$toggle.checked,
            index: Number(this.getAttribute('index')),
        });
    };
    setToggle(checked) {
        this.$toggle.checked = checked;
        this.$inputs.forEach($item => ($item.disabled = checked));
    }
}
//# sourceMappingURL=formDetailEntry.js.map