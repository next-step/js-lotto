import lottoTemplate from '../templates/lottoTemplate.js';
import Component from './Component.js';

Lotto.prototype = new Component();
Lotto.prototype.constructor = Component;

const initialState = {};

function Lotto($root, { props }) {
  this.$root = $root;
  this.state = initialState;
  this.props = props;

  const createElement = () => {
    this.$lotto = document.createElement('li');
    this.$lotto.dataset.id = this.props.id;
    this.$lotto.innerHTML = lottoTemplate(this.props.lotto);
  };

  this.render = () => {
    this.props.isShowNumber
      ? (this.$lotto.lastElementChild.style.display = 'inline-block')
      : (this.$lotto.lastElementChild.style.display = 'none');
  };

  // NOTE: Construction
  createElement();
  this.render();
  this.$root.appendChild(this.$lotto);
}

export default Lotto;
