import lottoTemplate from '../templates/lottoTemplate.js';
import Component from './Component.js';

Lotto.prototype = new Component();
Lotto.prototype.constructor = Component;

function Lotto($root, { state }) {
  this.$root = $root;
  this.state = state;

  const createElement = () => {
    this.$lotto = document.createElement('li');
    this.$lotto.dataset.id = this.state.id;
    this.$lotto.innerHTML = lottoTemplate(this.state.lotto);
  }

  this.render = () => {
    this.state.isShowNumber ? 
    this.$lotto.lastElementChild.style.display = 'inline-block' :
    this.$lotto.lastElementChild.style.display = 'none';
  }
 
  // NOTE: Construction
  createElement();
  this.render();
  this.$root.appendChild(this.$lotto);
}

export default Lotto;
