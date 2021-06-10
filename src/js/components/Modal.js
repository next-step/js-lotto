import { $, $on, $removeClass } from "../utils/helpers.js";
import tableTemplate from '../templates/tableTemplate.js';
import Component from './Component.js';

Modal.prototype = new Component();
Modal.prototype.constructor = Component;

function Modal($root, { state, onRetry }) {
  this.$root = $root;
  this.$tableContainer = $('.table-container', $root);
  this.$retryBtn = $('.retry-btn', $root);
  this.$closeBtn = $('.modal-close', $root);
  this.$yield = $('.yield', $root);
  this.state = state;
  this.onRetry = onRetry;

  const calculateYield = () => {
    let totalReward = 0;
    const rewards = [2000000000, 30000000, 1500000, 50000, 5000];
    Object.entries(this.state.numberOfWinner).map(([key, value]) => {
      totalReward += rewards[key - 1] * value;
    })
    return ((totalReward - +this.state.purchasedPrice) / +this.state.purchasedPrice) * 100
  }
  
  const handleRetry = () => {
    $removeClass(this.$root, 'open');
    this.onRetry();
  }
  
  const handleCloseModal = () => {
    $removeClass(this.$root, 'open');
  }
  
  this.render = () => {
    if (this.state.numberOfWinner) {
      this.$tableContainer.innerHTML = ''
      this.$tableContainer.insertAdjacentHTML('beforeend', tableTemplate(this.state.numberOfWinner))
      this.$yield.innerHTML = `당신의 수익률은 ${calculateYield()}% 입니다.`
    } 
    !this.state.isModalHidden && this.$root.classList.add('open')
  }

  $on(this.$closeBtn, 'click', handleCloseModal);
  $on(this.$retryBtn, 'click', handleRetry);
}

export default Modal;