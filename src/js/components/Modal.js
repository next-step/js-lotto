import { $, $on, $removeClass } from '../utils/helpers.js';
import tableTemplate from '../templates/tableTemplate.js';
import Component from './Component.js';

Modal.prototype = new Component();
Modal.prototype.constructor = Component;

const initialState = {};

function Modal($root, { props, onRetry, onClose }) {
  this.$root = $root;
  this.$tableContainer = $('.table-container', $root);
  this.$retryBtn = $('.retry-btn', $root);
  this.$closeBtn = $('.modal-close', $root);
  this.$yield = $('.yield', $root);
  this.state = initialState;
  this.props = props;
  this.onRetry = onRetry;
  this.onClose = onClose;

  const calculateYield = () => {
    let totalReward = 0;
    const rewards = [2000000000, 30000000, 1500000, 50000, 5000];
    Object.entries(this.props.numberOfWinner).map(([key, value]) => {
      totalReward += rewards[key - 1] * value;
    });
    return (
      ((totalReward - +this.props.purchasedPrice) /
        +this.props.purchasedPrice) *
      100
    );
  };

  const handleRetry = () => {
    $removeClass(this.$root, 'open');
    this.onRetry();
  };

  const handleCloseModal = () => {
    $removeClass(this.$root, 'open');
    this.onClose();
  };

  this.render = () => {
    if (this.props.numberOfWinner) {
      this.$tableContainer.innerHTML = '';
      this.$tableContainer.insertAdjacentHTML(
        'beforeend',
        tableTemplate(this.props.numberOfWinner)
      );
      this.$yield.innerHTML = `당신의 수익률은 ${calculateYield()}% 입니다.`;
    }
    !this.props.isModalHidden && this.$root.classList.add('open');
  };

  // NOTE: Construction
  $on(this.$closeBtn, 'click', handleCloseModal);
  $on(this.$retryBtn, 'click', handleRetry);
}

export default Modal;
