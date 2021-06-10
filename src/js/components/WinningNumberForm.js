import { $on, $$, $show, $hide } from "../utils/helpers.js";
import Component from './Component.js';

WinningNumberForm.prototype = new Component();
WinningNumberForm.prototype.constructor = Component;

function WinningNumberForm($root, { state, onSubmit }) {
  this.$form = $root;
  this.$inputs = $$('input', $root);
  this.state = state;
  this.onSubmit = onSubmit;
  
  const checkValidOfWinningNumber = (winningNumber) => {
    // TODO: 중복검사
    const set = new Set(winningNumber);
    let message = '';
    if (set.size !== winningNumber.length) {
      message = '중복된 값 노노노';
    } else if (!winningNumber.every((num) => num > 0 || num <= 45)) {
      message = '0 부터 45까지의 수만 괜찮음';
    }
    if (message) {
      alert(message)
      return false;
    }
    return true;
  }

  this.render = () => {
    this.state.lottos.length ? $show(this.$form) : $hide(this.$form);
    [...this.$inputs].map(($input) => $input.value = '')
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const winningNumber = [...this.$inputs].map((input) => parseInt(input.value));
    if (!checkValidOfWinningNumber(winningNumber)) return;
    this.onSubmit(winningNumber);
  }

  // NOTE: Construction
  $on(this.$form, 'submit', handleSubmit);
}

export default WinningNumberForm;