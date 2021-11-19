import el from '../dom.js';
import View from './index.js';
export default class FormPrice extends View {
    $input;
    $form;
    static template = `
  <form class="mt-5">
    <label class="mb-2 d-inline-block">구입할 금액을 입력해주세요.</label>
    <div class="d-flex">
      <input type="number" class="w-100 mr-2 pl-2 input-price" placeholder="구입 금액" data-cy="price-input"/>
      <button type="submit" class="btn btn-cyan" data-cy="price-submit">확인</button>
    </div>
  </form>
  `;
    constructor() {
        super();
        this.$form = el(FormPrice.template);
        this.$input = this.$form.querySelector('.input-price');
        this.$form.addEventListener('submit', this.onSubmit);
        el(this, [this.$form]);
    }
    onSubmit = (e) => {
        e.preventDefault();
        this.emit('submit@FormPrice', { price: this.$input.value || 0 });
        this.$input.value = '';
    };
    focus = () => {
        this.$input.focus();
    };
    connectedCallback() {
        this.$input.focus();
    }
}
//# sourceMappingURL=formPrice.js.map