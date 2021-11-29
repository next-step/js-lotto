import SELECTOR from '../constant/selector.js';
import lottoManager from '../model/lotto.js';

const $modal = document.querySelector(SELECTOR.MODAL);
const $first = document.querySelector(SELECTOR.RESULT.FIRST);
const $second = document.querySelector(SELECTOR.RESULT.SECOND);
const $third = document.querySelector(SELECTOR.RESULT.THIRD);
const $fourth = document.querySelector(SELECTOR.RESULT.FOURTH);
const $fifth = document.querySelector(SELECTOR.RESULT.FIFTH);
const $profitPercentage = document.querySelector(SELECTOR.RESULT.PROFIT_PERCENTAGE);

export const openModal = () => {
  $modal.classList.add('open');
};

export const closeModal = () => {
  $modal.classList.remove('open');
};

export const updateResultView = () => {
  $first.textContent = lottoManager.result[6];
  $second.textContent = lottoManager.result[5.5];
  $third.textContent = lottoManager.result[5];
  $fourth.textContent = lottoManager.result[4];
  $fifth.textContent = lottoManager.result[3];
  $profitPercentage.textContent = lottoManager.getProfitPercentage();
};
