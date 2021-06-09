import { $, $on } from "../utils/helpers.js";

function PriceForm($root, onSubmit) {
  this.$form = $root;
  this.$input = $('input', $root);
  this.onSubmit = onSubmit;

  this.validCheckOf = (value) => value && value % 1000 === 0;

  this.handleSubmit = (e) => {
    e.preventDefault();
    const value = this.$input.value;
    if (!value) return alert('비어있을 수 없음');
    if (!this.validCheckOf(this.$input.value)) return alert('1000으로 나누어 떨어져야함')
    this.onSubmit(value);
  }
  $on(this.$form, 'submit', this.handleSubmit);
}

export default PriceForm;