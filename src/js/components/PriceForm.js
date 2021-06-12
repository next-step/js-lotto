import { $, $on } from '../utils/helpers.js';
import Component from './Component.js';

PriceForm.prototype = new Component();
PriceForm.prototype.constructor = Component;

function PriceForm($root, { props, onSubmit }) {
  this.$form = $root;
  this.$input = $('input', $root);
  this.props = props;
  this.onSubmit = onSubmit;

  const validCheckOf = (value) => value && value % 1000 === 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = this.$input.value;
    if (!value) return alert('비어있을 수 없음');
    if (!validCheckOf(this.$input.value))
      return alert('1000으로 나누어 떨어져야함');
    this.onSubmit(value);
  };

  this.render = () => {
    this.$input.value = this.props.purchasedPrice || '';
  };

  $on(this.$form, 'submit', handleSubmit);
}

export default PriceForm;
