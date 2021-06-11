import lottoTemplate from '../templates/lottoTemplate.js';
import Component from './Component.js';

Lotto.prototype = new Component();
Lotto.prototype.constructor = Component;

const initialState = {};

function Lotto($root, { props }) {
  this.$root = $root;
  this.state = initialState;
  this.props = props;

  this.render = () => {
    this.props.isShowNumber
      ? (this.$lotto.lastElementChild.style.display = 'inline-block')
      : (this.$lotto.lastElementChild.style.display = 'none');
  };

  const init = () => {
    this.$lotto = document.createElement('li');
    this.$lotto.dataset.id = this.props.id;
    this.$lotto.innerHTML = lottoTemplate(this.props.lotto);
    this.props.isShowNumber
      ? (this.$lotto.lastElementChild.style.display = 'inline-block')
      : (this.$lotto.lastElementChild.style.display = 'none');
    this.$root.appendChild(this.$lotto);
  };

  // NOTE: Construction
  init();
}

export default Lotto;
